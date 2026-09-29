import { createContext, createStore, useContext } from "solid-js";
import type { ParentProps, StoreSetter } from "solid-js";

interface EditorContextStore {
  category: string;
  description: string;
  draft: boolean;
  tags: string[];
  title: string;
}

const EditorContext = createContext<{
  editorContext: EditorContextStore;
  setEditorContext: StoreSetter<EditorContextStore>;
}>();

export function useEditorContext() {
  const context = useContext(EditorContext);

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
    <EditorContext
      value={{
        editorContext,
        setEditorContext,
      }}
    >
      {props.children}
    </EditorContext>
  );
}
