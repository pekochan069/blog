import { Autocomplete, TextField, createFilter } from "@solid2-aria/components";
import { createSignal, For, Show } from "solid-js";
import type { StoreSetter } from "solid-js";

import { Badge } from "#components/ui/badge";
import { Button, LinkButton } from "#components/ui/button";
import { Checkbox } from "#components/ui/checkbox";
import { CommandEmpty, CommandItem, CommandList } from "#components/ui/command";
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
  const { contains } = createFilter({ sensitivity: "base" });

  return (
    <div class="bg-background border-border mx-auto mt-4 flex w-full flex-col gap-4 rounded-xl border p-4 shadow-sm md:w-[95%] md:max-w-6xl">
      <div>
        <LinkButton href="/admin">
          <ArrowLeftIcon />
          <span>어드민으로 이동</span>
        </LinkButton>
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
      <div
        class="relative flex flex-col gap-1"
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
        <Label for="category">카테고리</Label>
        <Autocomplete
          filter={contains}
          inputValue={props.editorContext.category}
          onInputChange={(value) => {
            props.setEditorContext((ctx) => {
              ctx.category = value;
            });
          }}
        >
          <TextField aria-label="카테고리">
            <Input id="category" />
          </TextField>
          <Show when={openCategoryList()}>
            <CommandList
              aria-label="카테고리 목록"
              items={props.availableCategories.map((category) => ({
                id: category,
                label: category,
              }))}
              renderEmptyState={() => (
                <CommandEmpty class="text-muted-foreground px-2 py-3 text-left">
                  일치하는 카테고리가 없습니다.
                </CommandEmpty>
              )}
              class="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-full left-0 z-10 mt-1 w-full rounded-lg border p-1 shadow-md motion-reduce:animate-none"
            >
              {(category) => (
                <CommandItem
                  id={category.id}
                  textValue={category.label}
                  onPointerDown={(event) => event.preventDefault()}
                  onAction={() => {
                    props.setEditorContext((ctx) => {
                      ctx.category = category.label;
                    });
                  }}
                >
                  {category.label}
                </CommandItem>
              )}
            </CommandList>
          </Show>
        </Autocomplete>
      </div>
      <div class="flex flex-col gap-1">
        <Label for="tags">태그</Label>
        <div class="flex items-center gap-2">
          <div
            class="relative min-w-0 flex-1 overflow-visible"
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
            <Autocomplete
              filter={contains}
              inputValue={selectedTag()}
              onInputChange={setSelectedTag}
            >
              <TextField aria-label="태그">
                <Input id="tags" />
              </TextField>
              <Show when={openTagsList()}>
                <CommandList
                  aria-label="태그 목록"
                  items={props.availableTags.map((tag) => ({ id: tag, label: tag }))}
                  renderEmptyState={() => (
                    <CommandEmpty class="text-muted-foreground px-2 py-3 text-left">
                      일치하는 태그가 없습니다.
                    </CommandEmpty>
                  )}
                  class="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-full left-0 z-10 mt-1 w-full rounded-lg border p-1 shadow-md motion-reduce:animate-none"
                >
                  {(tag) => (
                    <CommandItem
                      id={tag.id}
                      textValue={tag.label}
                      onPointerDown={(event) => event.preventDefault()}
                      onAction={() => setSelectedTag(tag.label)}
                    >
                      {tag.label}
                    </CommandItem>
                  )}
                </CommandList>
              </Show>
            </Autocomplete>
          </div>
          <Button
            variant="outline"
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
          aria-label="드래프트"
          id="draft"
          isSelected={props.editorContext.draft}
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
