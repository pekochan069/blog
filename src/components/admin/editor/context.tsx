import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { createContext, createStore, onSettled, useContext } from "solid-js";
import type { ParentProps, StoreSetter } from "solid-js";

interface EditorContextStore {
  category: string;
  description: string;
  draft: boolean;
  tags: string[];
  title: string;
}

const EditorContextContext = createContext<{
  editorContext: EditorContextStore;
  setEditorContext: StoreSetter<EditorContextStore>;
}>();

export function useEditorContext() {
  const context = useContext(EditorContextContext);

  return context;
}

export function EditorContextProvider(props: ParentProps) {
  const [editorContext, setEditorContext] = createStore<EditorContextStore>({
    category: "",
    description: "",
    draft: true,
    tags: [],
    title: "",
  });

  return (
    <EditorContextContext
      value={{
        editorContext,
        setEditorContext,
      }}
    >
      {props.children}
    </EditorContextContext>
  );
}

export function createEditor() {}
// const EditorContext = createContext<EditorView>();

// export function useEditor() {
//   const context = useContext(EditorContext);

//   return context;
// }

// export function EditorProvider(
//   props: ParentProps<{
//     editorParentRef: HTMLElement;
//   }>
// ) {
//   let editor: EditorView;

//   onSettled(() => {
//     editor = new EditorView({
//       extensions: [basicSetup, markdown({ base: markdownLanguage })],
//       parent: props.editorParentRef,
//     });
//   });

//   return (
//     <EditorContext value={editor}></EditorContext>
//   )
// }
