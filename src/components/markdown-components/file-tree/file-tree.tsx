import { CONTEXT_MENU_SLOT_NAME, HEADER_SLOT_NAME } from "@pierre/trees";
import type {
  ContextMenuItem,
  ContextMenuOpenContext,
  FileTree as FileTreeModel,
  FileTreeCompositionOptions,
  FileTreeSsrPayload,
} from "@pierre/trees";
import type { JSX } from "@solidjs/web";
import { Dynamic, isServer } from "@solidjs/web";
import { createEffect, createMemo, createSignal, omit, Show, untrack } from "solid-js";
import type { Element } from "solid-js";

import { createFileTree } from "./create-file-tree";
import { parseFileTree } from "./parse-file-tree";

interface ActiveContextMenuState {
  context: ContextMenuOpenContext;
  item: ContextMenuItem;
}

export type FileTreePreloadedData = Pick<FileTreeSsrPayload, "id" | "shadowHtml">;

export interface FileTreeProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "children"> {
  header?: Element;
  model: FileTreeModel;
  preloadedData?: FileTreePreloadedData;
  renderContextMenu?: (item: ContextMenuItem, context: ContextMenuOpenContext) => Element;
}

function hasExistingPreloadedContent(host: HTMLElement): boolean {
  const shadowContent = host.shadowRoot?.querySelector("[data-file-tree-id]");

  return (
    shadowContent instanceof HTMLElement ||
    shadowContent instanceof SVGElement ||
    host.querySelector('template[shadowrootmode="open"]') instanceof HTMLTemplateElement
  );
}

function resolveComposition(
  baseline: FileTreeCompositionOptions | undefined,
  hasHeader: boolean,
  hasContextMenu: boolean,
  onClose: () => void,
  onOpen: (item: ContextMenuItem, context: ContextMenuOpenContext) => void
): FileTreeCompositionOptions | undefined {
  const composition: FileTreeCompositionOptions = { ...baseline };

  if (hasHeader) {
    delete composition.header;
  }

  if (hasContextMenu) {
    const baselineContextMenu = baseline?.contextMenu;

    composition.contextMenu = {
      ...baselineContextMenu,
      enabled: true,
      onClose: () => {
        baselineContextMenu?.onClose?.();
        onClose();
      },
      onOpen: (item, context) => {
        onOpen(item, context);
        baselineContextMenu?.onOpen?.(item, context);
      },
    };
    delete composition.contextMenu.render;
  }

  return composition.header === undefined && composition.contextMenu === undefined
    ? undefined
    : composition;
}

/* oxlint-disable anti-slop/no-runtime-typeof */
function resolveHostStyle(
  model: FileTreeModel,
  style: FileTreeProps["style"]
): JSX.CSSProperties | string {
  const itemHeight = `${String(model.getItemHeight())}px`;
  const density = model.getDensityFactor();

  if (typeof style === "string") {
    return `--trees-item-height:${itemHeight};--trees-density-override:${String(density)};${style}`;
  }

  const resolvedStyle = {
    "--trees-density-override": density,
    "--trees-item-height": itemHeight,
  };

  if (typeof style === "object" && style !== null) {
    Object.assign(resolvedStyle, style);
  }

  // SAFETY: keys and values come from Solid's validated CSSProperties input.
  return resolvedStyle as JSX.CSSProperties;
}
/* oxlint-enable anti-slop/no-runtime-typeof */

export function FileTree(props: FileTreeProps) {
  let host: HTMLElement | undefined;
  let baselineModel: FileTreeModel | undefined;
  let baselineComposition: FileTreeCompositionOptions | undefined;
  const [activeContextMenu, setActiveContextMenu] = createSignal<ActiveContextMenuState | null>(
    null
  );
  const hostProps = omit(
    props,
    "header",
    "id",
    "model",
    "preloadedData",
    "ref",
    "renderContextMenu",
    "style"
  );

  const attachment = createMemo(() => {
    const { model } = props;

    if (model !== baselineModel) {
      baselineModel = model;
      baselineComposition = model.getComposition();
    }

    return { baseline: baselineComposition, model };
  });

  const closeContextMenu = () => setActiveContextMenu(null);
  const openContextMenu = (item: ContextMenuItem, context: ContextMenuOpenContext) =>
    setActiveContextMenu({ context, item });
  const composition = createMemo(() => {
    const current = attachment();

    return {
      composition: resolveComposition(
        current.baseline,
        props.header !== undefined && props.header !== null,
        props.renderContextMenu !== undefined,
        closeContextMenu,
        openContextMenu
      ),
      model: current.model,
    };
  });

  createEffect(
    () => props.renderContextMenu === undefined,
    (disabled) => {
      if (disabled) {
        setActiveContextMenu(null);
      }
    }
  );

  createEffect(composition, ({ composition: nextComposition, model }) => {
    model.setComposition(nextComposition);
  });

  createEffect(
    () => ({ ...attachment(), preloadedData: props.preloadedData }),
    ({ baseline, model, preloadedData }) => {
      if (host === undefined) {
        return;
      }

      if (preloadedData !== undefined && hasExistingPreloadedContent(host)) {
        model.hydrate({ fileTreeContainer: host });
      } else {
        model.render({ fileTreeContainer: host });
      }

      return () => {
        model.unmount();
        model.setComposition(baseline);
      };
    }
  );

  return (
    <Dynamic
      component="file-tree-container"
      {...hostProps}
      id={props.id ?? props.preloadedData?.id}
      ref={(element) => {
        host = element;
      }}
      style={resolveHostStyle(props.model, props.style)}
    >
      {isServer && props.preloadedData !== undefined ? (
        <template innerHTML={props.preloadedData.shadowHtml} shadowrootmode="open" />
      ) : null}
      <Show when={props.header !== undefined && props.header !== null}>
        <div slot={HEADER_SLOT_NAME}>{props.header}</div>
      </Show>
      <Show keyed when={props.renderContextMenu === undefined ? null : activeContextMenu()}>
        {(active) => (
          <div slot={CONTEXT_MENU_SLOT_NAME}>
            {props.renderContextMenu?.(active.item, active.context)}
          </div>
        )}
      </Show>
    </Dynamic>
  );
}

export interface MarkdownFileTreeProps {
  source: string;
}

export function MarkdownFileTree(props: MarkdownFileTreeProps) {
  const paths = untrack(() => parseFileTree(props.source).map(({ name }) => name));
  const { model } = createFileTree({ paths, search: true });

  return <FileTree model={model} style={{ height: "clamp(240px, 60vh, 420px)" }} />;
}
