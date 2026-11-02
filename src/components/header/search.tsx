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
  CommandShortcut,
} from "#components/ui/command";
import { SearchIcon } from "#icons/runeicons/normal/search";

export function SiteSearch(_props: { searchTerm?: string; category?: string; tags?: string[] }) {
  const [open, setOpen] = createSignal(true);
  const [input, setInput] = createSignal("");

  return (
    <div>
      <Button
        aria-label="검색"
        size="icon-lg"
        variant="ghost"
        onPress={() => setOpen((prev) => !prev)}
      >
        <SearchIcon class="size-5" />
      </Button>
      <CommandDialog class="max-w-sm rounded-lg border" isOpen={open()} onOpenChange={setOpen}>
        <Command inputValue={input()} onInputChange={setInput}>
          <CommandInput autoFocus placeholder="검색어를 입력하세요..." />
          <div class="p-1">
            <h2 class="text-muted-foreground px-2 py-1.5 text-xs font-medium">검색 방법</h2>
            <div class="my-1 flex flex-wrap gap-2 px-2 text-xs">
              <span>검색어</span>
              <span>#태그</span>
              <span>#"긴 태그"</span>
              <span>@카테고리</span>
              <span>@"긴 카테고리"</span>
            </div>
          </div>
          <CommandList
            aria-label="검색 결과"
            renderEmptyState={() => <CommandEmpty>검색 결과가 존재하지 않습니다.</CommandEmpty>}
          >
            <CommandGroup heading="Settings">
              <CommandItem id="profile" textValue="Profile">
                {/* <User /> */}
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem id="billing" textValue="Billing">
                {/* <CreditCard /> */}
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem id="settings" textValue="Settings">
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
