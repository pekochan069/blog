import type { KbdKey } from "@solid-primitives/keyboard";
import type { EntryWithTags } from "~/lib/content";
import { createShortcut } from "@solid-primitives/keyboard";
import { debounce } from "@solid-primitives/scheduled";
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  onMount,
  Show,
  Suspense,
} from "solid-js";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";
import { FluentArrowEnter24Filled } from "~/icons/fluent/arrow-enter-24-filled";
import { TablerArrowDown } from "~/icons/tabler/arrow-down";
import { TablerArrowUp } from "~/icons/tabler/arrow-up";
import { TablerSearch } from "~/icons/tabler/search";

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: No type available
    pagefind: any;
  }
}

type PagefindResult = {
  id: string;
  data: () => Promise<PagefindData>;
  excerpt_range: number[];
  score: number;
  words: number[];
};

type PagefindData = {
  id: string;
  url: string;
  content: string;
  word_count: number;
  filters: object;
  meta: {
    title: string;
  };
  raw_content: string;
  excerpt: string;
  raw_url: string;
};

const [open, setOpen] = createSignal(false);
const MAX_SEARCH_RESULTS = 5;

export function SearchButton() {
  const modifier: KbdKey = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "Meta" : "Control";
  onMount(() => {
    createShortcut([modifier, "K"], () => setOpen((prev) => !prev));
  });

  return (
    <Button
      variant="ghost"
      size="icon"
      class="size-9"
      type="button"
      aria-label="검색"
      aria-keyshortcuts={`${modifier}+K`}
      onClick={() => setOpen(true)}
    >
      <TablerSearch class="size-5" />
    </Button>
  );
}

async function search(query: string) {
  if (!window.pagefind) {
    return [];
  }

  if (query.startsWith("#")) {
    return [];
  }

  if (query.length < 2) {
    return [];
  }

  try {
    const pagefindResults = await window.pagefind.search(query);

    if (!pagefindResults.results) {
      return [];
    }

    const dataArray: PagefindData[] = await Promise.all(
      pagefindResults.results.slice(0, MAX_SEARCH_RESULTS).map(async (result: PagefindResult) => {
        const data = await result.data();
        return { ...data, id: result.id };
      }),
    );

    return dataArray;
  } catch {
    return [];
  }
}

type SearchDialogProps = {
  tags: string[];
  entries: EntryWithTags[];
};

export function SearchDialog(props: SearchDialogProps) {
  const modifier = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl";
  const [input, setInput] = createSignal("");
  const debouncedInput = debounce(setInput, 200);
  const [results] = createResource(input, search);

  const tagMatched = (tag: string) => {
    return input().length > 1 && input().startsWith("#") && tag.includes(input().substring(1));
  };

  return (
    <CommandDialog open={open()} onOpenChange={setOpen}>
      <CommandInput
        placeholder="검색어를 입력하세요..."
        value={input()}
        onValueChange={debouncedInput}
      />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        <CommandGroup heading="커맨드">
          <CommandItem onSelect={() => setOpen(false)}>
            <span>사이트 검색</span>
            <CommandShortcut>{modifier}+K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="글 목록">
          <For each={props.entries}>
            {(entry) => (
              <CommandItem
                keywords={entry.tags.map((t) => `#${t}`)}
                onSelect={() => (window.location.assign(entry.url), setOpen(false))}
              >
                <div>
                  <div class="text-sm font-medium">{entry.title}</div>
                  <div class="mt-0.5 flex flex-wrap gap-x-1 gap-y-0.5">
                    <For each={entry.tags}>
                      {(tag) => (
                        <Badge variant={tagMatched(tag) ? "green" : "default"}>{tag}</Badge>
                      )}
                    </For>
                  </div>
                </div>
              </CommandItem>
            )}
          </For>
        </CommandGroup>
        <Suspense>
          <Show when={!input().startsWith("#") && results() && results()!.length > 0}>
            <CommandSeparator />
            <CommandGroup heading="검색 결과">
              <For each={results()}>
                {(result) => (
                  <CommandItem onSelect={() => window.location.assign(result.url)} class="py-2!">
                    <div>
                      <h2 class="mb-1 text-lg font-bold">{result.meta.title}</h2>
                      <span
                        innerHTML={result.excerpt}
                        class="[&_mark]:rounded-xs [&_mark]:bg-primary [&_mark]:px-0.5 [&_mark]:text-primary-foreground"
                      />
                    </div>
                  </CommandItem>
                )}
              </For>
            </CommandGroup>
          </Show>
        </Suspense>
      </CommandList>
      <CommandSeparator />
      <div class="px-4 py-2">
        <ul class="flex gap-4 text-sm">
          <li class="flex items-center gap-1">
            <span class="rounded bg-accent p-0.5">
              <FluentArrowEnter24Filled />
            </span>
            <span>로 선택</span>
          </li>
          <li class="flex items-center gap-1">
            <span class="rounded bg-accent p-0.5">
              <TablerArrowUp />
            </span>
            <span class="rounded bg-accent p-0.5">
              <TablerArrowDown />
            </span>
            <span>로 이동</span>
          </li>
          <li class="flex items-center gap-1">
            <span class="rounded bg-accent p-0.5 text-xs">Esc</span>
            <span>로 닫기</span>
          </li>
        </ul>
      </div>
    </CommandDialog>
  );
}
