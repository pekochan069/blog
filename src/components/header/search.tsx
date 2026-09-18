import { createSignal } from "solid-js";

import { Button } from "#components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "#components/ui/command";
import { SearchIcon } from "#icons/runeicons/normal/search";

export function SiteSearch(_props: { searchTerm?: string; category?: string; tags?: string[] }) {
  const [open, setOpen] = createSignal(true);
  const [input, setInput] = createSignal("");

  return (
    <div>
      <Button size="icon-lg" variant="ghost" onClick={() => setOpen((prev) => !prev)}>
        <SearchIcon class="size-5" />
      </Button>
      <CommandDialog class="max-w-sm rounded-lg border" open={open()} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="검색어를 입력하세요..."
            value={input()}
            onValueChange={setInput}
          />
          <CommandList>
            <CommandEmpty>검색 결과가 존재하지 않습니다.</CommandEmpty>
            <CommandGroup heading="검색 방법">
              <div class="my-1 flex flex-wrap gap-2 px-2 text-xs">
                <span>검색어</span>
                <span>#태그</span>
                <span>#"긴 태그"</span>
                <span>@카테고리</span>
                <span>@"긴 카테고리"</span>
              </div>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                {/* <User /> */}
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                {/* <CreditCard /> */}
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                {/* <Settings /> */}
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
