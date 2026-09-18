import type { ComponentProps, JSX } from "@solidjs/web";
import { Command as CommandPrimitive } from "cmdk-solid";
import { cn } from "cn";
import { merge, omit } from "solid-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#components/ui/dialog";
import { InputGroup, InputGroupAddon } from "#components/ui/input-group";
import { CheckIcon } from "#icons/runeicons/normal/check";
import { SearchIcon } from "#icons/runeicons/normal/search";

function Command(props: ComponentProps<typeof CommandPrimitive>) {
  const rest = omit(props, "class");
  return (
    <CommandPrimitive
      data-slot="command"
      class={cn(
        "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-xl! p-1",
        props.class
      )}
      {...rest}
    />
  );
}

type CommandDialogProps = Omit<ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  class?: string;
  showCloseButton?: boolean;
  children: JSX.Element;
};

function CommandDialog(props: CommandDialogProps) {
  const merged = merge(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
      showCloseButton: false,
    } satisfies Partial<CommandDialogProps>,
    props
  );
  const rest = omit(merged, "title", "description", "class", "showCloseButton", "children");

  return (
    <Dialog {...rest}>
      <DialogHeader class="sr-only">
        <DialogTitle>{merged.title}</DialogTitle>
        <DialogDescription>{merged.description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        class={cn("top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0", merged.class)}
        showCloseButton={merged.showCloseButton}
      >
        {merged.children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput(props: ComponentProps<typeof CommandPrimitive.Input>) {
  const rest = omit(props, "class");
  return (
    <div data-slot="command-input-wrapper" class="p-1 pb-0">
      <InputGroup class="border-input/30 bg-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          class={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            props.class
          )}
          {...rest}
        />
        <InputGroupAddon>
          <SearchIcon class="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList(props: ComponentProps<typeof CommandPrimitive.List>) {
  const rest = omit(props, "class");
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      class={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        props.class
      )}
      {...rest}
    />
  );
}

function CommandEmpty(props: ComponentProps<typeof CommandPrimitive.Empty>) {
  const rest = omit(props, "class");
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      class={cn("py-6 text-center text-sm", props.class)}
      {...rest}
    />
  );
}

function CommandGroup(props: ComponentProps<typeof CommandPrimitive.Group>) {
  const rest = omit(props, "class");
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      class={cn(
        "text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium",
        props.class
      )}
      {...rest}
    />
  );
}

function CommandSeparator(props: ComponentProps<typeof CommandPrimitive.Separator>) {
  const rest = omit(props, "class");
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      class={cn("bg-border -mx-1 h-px", props.class)}
      {...rest}
    />
  );
}

function CommandItem(props: ComponentProps<typeof CommandPrimitive.Item>) {
  const rest = omit(props, "class", "children");
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      class={cn(
        "group/command-item data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class
      )}
      {...rest}
    >
      {props.children}
      <CheckIcon class="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut(props: ComponentProps<"span">) {
  const rest = omit(props, "class");
  return (
    <span
      data-slot="command-shortcut"
      class={cn(
        "text-muted-foreground group-data-selected/command-item:text-foreground ml-auto text-xs tracking-widest",
        props.class
      )}
      {...rest}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
