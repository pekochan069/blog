import { EditorState, Compartment } from "@codemirror/state";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { onCleanup, onSettled } from "solid-js";

interface EditorProps {
  value?: string;
  class?: string;
  extensions?: Extension[];
  readOnly?: boolean;
  onChange?: (value: string) => void;
  ref?: (view: EditorView) => void;
}

export function Editor(props: EditorProps) {
  let editorParentRef: HTMLDivElement;
  let view: EditorView;

  const extensionsCompartment = new Compartment();
  const readOnlyCompartment = new Compartment();

  onSettled(() => {
    const state = EditorState.create({
      doc: props.value ?? "",
      extensions: [
        // oxlint-disable-next-line solid/reactivity
        EditorView.updateListener.of((update) => {
          if (!update.docChanged) {
            return;
          }

          props.onChange?.(update.state.doc.toString());
        }),

        extensionsCompartment.of(props.extensions ?? []),

        readOnlyCompartment.of([
          EditorState.readOnly.of(props.readOnly ?? false),
          EditorView.editable.of(!(props.readOnly ?? false)),
        ]),
      ],
    });

    view = new EditorView({
      parent: editorParentRef!,
      state,
    });

    props.ref?.(view);
  });

  onCleanup(() => {
    view.destroy();
  });

  return <div class={props.class} ref={editorParentRef!}></div>;
}
