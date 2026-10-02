import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { actions } from "astro:actions";
import { createSignal, createStore, Show } from "solid-js";

import { toast } from "#components/sonner";
import { Button } from "#components/ui/button";
import { publicEnv } from "#env";
import { SvgSpinners180RingWithBg } from "#icons/svg-spinners/180-ring-with-bg";

import { Editor } from "./editor";
import { EditorMeta } from "./editor-meta";
import { EditorPreview } from "./preview";

const markdownStyle = HighlightStyle.define([
  {
    class: "font-bold underline text-xl",
    tag: tags.heading1,
  },
  {
    class: "font-bold underline text-xl",
    tag: tags.heading2,
  },
  {
    class: "font-bold underline text-lg",
    tag: tags.heading3,
  },
  {
    class: "font-bold underline text-lg",
    tag: tags.heading4,
  },
  {
    class: "font-bold underline text-base",
    tag: tags.heading5,
  },
  {
    class: "font-bold underline text-base",
    tag: tags.heading6,
  },
  {
    class: "line-through",
    tag: tags.strikethrough,
  },
  {
    class: "font-bold",
    tag: tags.strong,
  },
  {
    class: "italic",
    tag: tags.emphasis,
  },
  {
    class: "hover:underline font-semibold text-catppuccin-blue",
    tag: tags.link,
  },
  {
    class: "font-mono",
    tag: tags.monospace,
  },
  {
    class: "text-catppuccin-teal",
    tag: tags.angleBracket,
  },
  {
    class: "text-catppuccin-blue",
    tag: tags.tagName,
  },
  {
    class: "text-catppuccin-yellow",
    tag: tags.attributeName,
  },
  {
    class: "text-catppuccin-green",
    tag: tags.string,
  },
  {
    class: "text-catppuccin-peach",
    tag: tags.literal,
  },
]);

function isEqualArray<T>(a: T[], b: T[]) {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((e, i) => e === b[i]);
}

export interface EditorContextStore {
  category: string;
  description: string;
  draft: boolean;
  tags: string[];
  title: string;
}

type EditorContainerProps = EditorContextStore & {
  id: string;
  body: string;
  published: Date | undefined;
  sha: string | undefined;
  availableCategories: string[];
  availableTags: string[];
};

export function EditorContainer(props: EditorContainerProps) {
  const [saveLoading, setSaveLoading] = createSignal(false);
  const [editorContext, setEditorContext] = createStore<EditorContextStore>({
    // oxlint-disable-next-line solid/reactivity
    category: props.category,
    // oxlint-disable-next-line solid/reactivity
    description: props.description,
    // oxlint-disable-next-line solid/reactivity
    draft: props.draft,
    // oxlint-disable-next-line solid/reactivity
    tags: props.tags,
    // oxlint-disable-next-line solid/reactivity
    title: props.title,
  });
  // oxlint-disable-next-line solid/reactivity
  const [body, setBody] = createSignal(props.body);

  const save = async () => {
    if (saveLoading()) {
      return;
    }

    setSaveLoading(true);
    try {
      const now = new Date();
      const result = await actions.savePost.orThrow({
        body: body(),
        frontmatter: {
          ...editorContext,
          published: props.published ?? now,
          updated: now,
        },
        id: props.id,
        sha: props.sha,
      });

      if (!result.ok) {
        throw new Error(result.error);
      }

      globalThis.window.location.href = `${publicEnv.VITE_PUBLIC_FRONTEND_URL}/admin`;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setSaveLoading(false);
    }
  };

  const check = () => {
    if (editorContext.title === "") {
      return false;
    }

    if (
      editorContext.title === props.title &&
      editorContext.description === props.description &&
      editorContext.draft === props.draft &&
      isEqualArray(editorContext.tags, editorContext.tags) &&
      editorContext.category === props.category &&
      body() === props.body
    ) {
      return false;
    }

    return true;
  };

  return (
    <>
      <EditorMeta
        availableCategories={props.availableCategories}
        availableTags={props.availableTags}
        editorContext={editorContext}
        setEditorContext={setEditorContext}
      />
      <div class="mx-auto mt-4 flex flex-col gap-2 px-4 lg:grid lg:w-[95%] lg:max-w-[1920px] lg:grid-cols-[1fr_1fr] lg:gap-6">
        <div class="bg-background border-border h-[90svh] w-full overflow-hidden rounded-xl border p-2 shadow-sm">
          <Editor
            class="h-[calc(90svh-1rem)]"
            extensions={[
              markdown({
                base: markdownLanguage,
              }),
              syntaxHighlighting(markdownStyle),
            ]}
            value={body()}
            onChange={setBody}
          />
        </div>
        <div class="bg-background border-border h-[90svh] w-full overflow-y-auto rounded-xl border p-2 shadow-sm">
          <EditorPreview text={body()} />
        </div>
      </div>
      <div class="mx-auto mt-12 mb-16 px-4 lg:w-[95%] lg:max-w-[1920px]">
        <Button
          size="lg"
          variant="primary"
          class="w-full"
          disabled={saveLoading() || !check()}
          onClick={save}
        >
          <Show when={!saveLoading()} fallback={<SvgSpinners180RingWithBg />}>
            저장
          </Show>
        </Button>
      </div>
    </>
  );
}
