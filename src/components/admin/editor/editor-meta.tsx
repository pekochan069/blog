import { CommandInput } from "cmdk-solid";
import { createSignal, For, Show } from "solid-js";
import type { StoreSetter } from "solid-js";

import { Badge } from "#components/ui/badge";
import { Button, ButtonAnchor } from "#components/ui/button";
import { Checkbox } from "#components/ui/checkbox";
import { Command, CommandEmpty, CommandItem, CommandList } from "#components/ui/command";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { ArrowLeftIcon } from "#icons/runeicons/normal/arrow-left";
import { XIcon } from "#icons/runeicons/normal/x";

import type { EditorContextStore } from ".";

export interface EditorMetaProps {
  availableCategories: string[];
  availableTags: string[];
  editorContext: EditorContextStore;
  setEditorContext: StoreSetter<EditorContextStore>;
}

export function EditorMeta(props: EditorMetaProps) {
  const [openCategoryList, setOpenCategoryList] = createSignal(false);
  const [openTagsList, setOpenTagsList] = createSignal(false);
  const [selectedTag, setSelectedTag] = createSignal("");

  return (
    <div class="bg-background border-border mx-auto mt-4 flex w-full flex-col gap-4 rounded-xl border p-4 shadow-sm md:w-[95%] md:max-w-6xl">
      <div>
        <ButtonAnchor href="/admin">
          <ArrowLeftIcon />
          <span>어드민으로 이동</span>
        </ButtonAnchor>
      </div>
      <div class="flex flex-col gap-1">
        <Label for="title">제목</Label>
        <Input
          id="title"
          value={props.editorContext.title}
          onInput={(e) => {
            props.setEditorContext((ctx) => {
              ctx.title = e.currentTarget.value;
            });
          }}
        />
      </div>
      <div class="flex flex-col gap-1">
        <Label for="description">설명</Label>
        <Input
          id="description"
          value={props.editorContext.description}
          onInput={(e) => {
            props.setEditorContext((ctx) => {
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
          onFocusOut={(event) => {
            const nextTarget = event.relatedTarget;
            if (!(nextTarget instanceof Node && event.currentTarget.contains(nextTarget))) {
              setOpenCategoryList(false);
            }
          }}
        >
          <CommandInput
            data-slot="command-input"
            class="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base outline-hidden transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm"
            value={props.editorContext.category}
            onValueChange={(v) => {
              props.setEditorContext((ctx) => {
                ctx.category = v;
              });
            }}
          />
          <Show when={openCategoryList()}>
            <CommandList class="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-10 z-10 mt-1 w-full rounded-md border shadow-md">
              <CommandEmpty class="py-2"></CommandEmpty>
              <For each={props.availableCategories}>
                {(category) => (
                  <CommandItem
                    value={category}
                    onPointerDown={(event) => event.preventDefault()}
                    onSelect={(v) => {
                      props.setEditorContext((ctx) => {
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
      <div class="flex flex-col gap-1">
        <Label>태그</Label>
        <div class="flex items-center gap-2">
          <Command
            class="relative overflow-visible"
            onFocusIn={() => {
              setOpenTagsList(true);
            }}
            onFocusOut={(event) => {
              const nextTarget = event.relatedTarget;
              if (!(nextTarget instanceof Node && event.currentTarget.contains(nextTarget))) {
                setOpenTagsList(false);
              }
            }}
          >
            <CommandInput
              data-slot="command-input"
              class="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base outline-hidden transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm"
              value={selectedTag()}
              onValueChange={setSelectedTag}
            />
            <Show when={openTagsList()}>
              <CommandList class="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-10 z-10 mt-1 w-full rounded-md border shadow-md">
                <CommandEmpty class="py-2"></CommandEmpty>
                <For each={props.availableTags}>
                  {(tag) => (
                    <CommandItem
                      value={tag}
                      onPointerDown={(event) => event.preventDefault()}
                      onSelect={setSelectedTag}
                    >
                      {tag}
                    </CommandItem>
                  )}
                </For>
              </CommandList>
            </Show>
          </Command>
          <Button
            onClick={() => {
              const tag = selectedTag();
              props.setEditorContext((ctx) => {
                ctx.tags = [...ctx.tags, tag];
              });
              setSelectedTag("");
            }}
          >
            추가
          </Button>
        </div>
        <ul class="flex flex-wrap gap-1">
          <For each={props.editorContext.tags}>
            {(tag) => (
              <li>
                <Badge
                  variant="primaryButton"
                  onClick={() =>
                    props.setEditorContext((ctx) => {
                      ctx.tags = ctx.tags.filter((t) => t !== tag);
                    })
                  }
                >
                  <span>{tag}</span>
                  <XIcon />
                </Badge>
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class="flex gap-2">
        <Checkbox
          id="draft"
          checked={props.editorContext.draft}
          onChange={(v) => {
            props.setEditorContext((ctx) => {
              ctx.draft = v;
            });
          }}
        />
        <Label for="draft">드래프트</Label>
      </div>
    </div>
  );
}
