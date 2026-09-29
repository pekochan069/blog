import { Checkbox } from "#components/ui/checkbox";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";

import { EditorContextProvider, useEditorContext } from "./context";

function Editor() {
  const { editorContext, setEditorContext } = useEditorContext();

  return (
    <div class="bg-background flex min-h-120 w-full flex-col gap-4 p-4">
      <div class="">
        <Input
          value={editorContext.title}
          onInput={(e) => {
            setEditorContext((prev) => ({
              ...prev,
              title: e.currentTarget.value,
            }));
          }}
        />
      </div>
      <div class="">
        <Input
          value={editorContext.description}
          onInput={(e) => {
            setEditorContext((prev) => ({
              ...prev,
              description: e.currentTarget.value,
            }));
          }}
        />
      </div>
      <div>
        <Input
          value={editorContext.category}
          onInput={(e) => {
            setEditorContext((prev) => ({
              ...prev,
              category: e.currentTarget.value,
            }));
          }}
        />
      </div>
      <div>
        <Checkbox
          id="draft"
          checked={editorContext.draft}
          onChange={(v) => {
            setEditorContext((prev) => ({
              ...prev,
              draft: v,
            }));
          }}
        />
        <Label for="draft">드래프트</Label>
      </div>
    </div>
  );
}

export function EditorContainer() {
  return (
    <EditorContextProvider>
      <Editor />
    </EditorContextProvider>
  );
}
