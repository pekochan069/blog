import { createContext, createSignal, createStore, useContext } from "solid-js";
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
