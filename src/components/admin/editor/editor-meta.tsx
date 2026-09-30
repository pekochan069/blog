import { CommandInput } from "cmdk-solid";
import { createSignal, For, Show } from "solid-js";

import { Checkbox } from "#components/ui/checkbox";
import { Command, CommandItem, CommandList } from "#components/ui/command";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";

import { useEditorContext } from "./context";

export interface EditorMetaProps {
  availableCategories: string[];
}

export function EditorMeta(props: EditorMetaProps) {
  const [openCategoryList, setOpenCategoryList] = createSignal(false);

  const { editorContext, setEditorContext } = useEditorContext();

  return (
    <div class="bg-background border-border mx-auto mt-26 flex w-full flex-col gap-4 rounded-xl border p-4 shadow-sm md:w-[95%] md:max-w-6xl">
      <div class="flex flex-col gap-1">
        <Label for="title">제목</Label>
        <Input
          id="title"
          value={editorContext.title}
          onInput={(e) => {
            setEditorContext((ctx) => {
              ctx.title = e.currentTarget.value;
            });
          }}
        />
      </div>
      <div class="flex flex-col gap-1">
        <Label for="description">설명</Label>
        <Input
          id="description"
          value={editorContext.description}
          onInput={(e) => {
            setEditorContext((ctx) => {
              ctx.description = e.currentTarget.value;
            });
          }}
        />
      </div>
      <div class="flex flex-col gap-1">
        <Label for="category">카테고리</Label>
        <Command
          class="relative overflow-visible"
          onFocusIn={() => {
            setOpenCategoryList(true);
          }}
          onFocusOut={() => {
            setOpenCategoryList(false);
          }}
        >
          <CommandInput
            data-slot="command-input"
            class="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base outline-hidden transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm"
            value={editorContext.category}
            onValueChange={(v) => {
              setEditorContext((ctx) => {
                ctx.category = v;
              });
            }}
          />
          <Show when={openCategoryList()}>
            <CommandList class="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-10 z-10 mt-1 w-full rounded-md border shadow-md">
              <For each={props.availableCategories}>
                {(category) => (
                  <CommandItem
                    onSelect={(v) => {
                      setEditorContext((ctx) => {
                        ctx.category = v;
                      });
                    }}
                  >
                    {category}
                  </CommandItem>
                )}
              </For>
            </CommandList>
          </Show>
        </Command>
      </div>
      <div class="flex gap-2">
        <Checkbox
          id="draft"
          checked={editorContext.draft}
          onChange={(v) => {
            console.log(v);
            setEditorContext((ctx) => {
              ctx.draft = v;
            });
          }}
        />
        <Label for="draft">드래프트</Label>
      </div>
    </div>
  );
}
