import { createContext, createSignal, createStore, untrack, useContext } from "solid-js";
import type { Accessor, ParentProps, Setter, StoreSetter } from "solid-js";

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
  text: Accessor<string>;
  setText: Setter<string>;
}>();

export function useEditorContext() {
  const context = useContext(EditorContextContext);

  return context;
}

export function EditorContextProvider(
  props: ParentProps<
    EditorContextStore & {
      text: string;
    }
  >
) {
  const [editorContext, setEditorContext] = createStore<EditorContextStore>(
    untrack(() => ({
      category: props.category,
      description: props.description,
      draft: props.draft,
      tags: props.tags,
      title: props.title,
    }))
  );

  const [text, setText] = createSignal(() => props.text);

  return (
    <EditorContextContext
      value={{
        editorContext,
        setEditorContext,
        setText,
        text,
      }}
    >
      {props.children}
    </EditorContextContext>
  );
}
