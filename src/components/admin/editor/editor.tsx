import { EditorState, Compartment } from "@codemirror/state";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { onSettled, untrack } from "solid-js";

interface EditorProps {
  value?: string;
  class?: string;
  extensions?: Extension[];
  readOnly?: boolean;
  onChange?: (value: string) => void;
  ref?: (view: EditorView) => void;
}

export function Editor(props: EditorProps) {
  let editorParentRef: HTMLDivElement | undefined;

  const extensionsCompartment = new Compartment();
  const readOnlyCompartment = new Compartment();

  onSettled(() => {
    if (!editorParentRef) {
      return;
    }

    const state = EditorState.create({
      doc: props.value ?? "",
      extensions: [
        EditorView.updateListener.of((update) => {
          if (!update.docChanged) {
            return;
          }

          untrack(() => props.onChange?.(update.state.doc.toString()));
        }),

        extensionsCompartment.of(props.extensions ?? []),

        EditorView.lineWrapping,

        readOnlyCompartment.of([
          EditorState.readOnly.of(props.readOnly ?? false),
          EditorView.editable.of(!(props.readOnly ?? false)),
        ]),
      ],
    });

    const view = new EditorView({
      parent: editorParentRef,
      state,
    });

    props.ref?.(view);

    return () => view.destroy();
  });

  return (
    <div
      class={props.class}
      ref={(element) => {
        editorParentRef = element;
      }}
    />
  );
}
