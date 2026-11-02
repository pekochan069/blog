import {
  Autocomplete,
  Collection,
  composeRenderProps,
  Header,
  Input,
  Menu,
  MenuItem,
  MenuSection,
  SearchField,
  Separator,
  createFilter,
} from "@solid2-aria/components";
import type {
  AutocompleteProps,
  InputProps,
  MenuItemProps,
  MenuProps,
  MenuSectionProps,
  SeparatorProps,
} from "@solid2-aria/components";
import type { JSX, ComponentProps } from "@solidjs/web";
import { cn } from "cn";
import { merge, omit } from "solid-js";

import { CheckIcon } from "#icons/runeicons/normal/check";
import { SearchIcon } from "#icons/runeicons/normal/search";

import { Dialog, DialogDescription, DialogHeader, DialogTitle } from "./dialog";
import { InputGroup, InputGroupAddon } from "./input-group";
import { isTextValue } from "./text-value";

function Command(
  props: Omit<AutocompleteProps, "class" | "style"> & {
    class?: string;
    dir?: JSX.IntrinsicElements["div"]["dir"];
    style?: JSX.CSSProperties;
  }
) {
  const rest = omit(props, "class", "dir", "style");
  const { contains } = createFilter({ sensitivity: "base" });

  return (
    <div
      data-slot="command"
      dir={props.dir}
      class={cn(
        "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-xl! p-1",
        props.class
      )}
      style={props.style}
    >
      <Autocomplete {...rest} filter={rest.filter ?? contains}>
        {rest.children}
      </Autocomplete>
    </div>
  );
}

function CommandDialog(
  props: Omit<ComponentProps<typeof Dialog>, "children"> & {
    title?: string;
    description?: string;
    children: JSX.Element;
  }
) {
  const merged = merge(
    {
      description: "Search for a command to run...",
      showCloseButton: false,
      title: "Command Palette",
    } as const,
    props
  );

  const rest = omit(merged, "title", "description", "children", "class", "showCloseButton");

  return (
    <Dialog
      class={cn("top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0", merged.class)}
      showCloseButton={merged.showCloseButton}
      isDismissable
      {...rest}
    >
      <DialogHeader class="sr-only">
        <DialogTitle>{merged.title}</DialogTitle>
        <DialogDescription>{merged.description}</DialogDescription>
      </DialogHeader>
      {merged.children}
    </Dialog>
  );
}

function CommandInput(props: Omit<InputProps, "value" | "defaultValue" | "onChange">) {
  const rest = omit(props, "class", "autoFocus", "aria-label");

  const label = () => {
    if (isTextValue(props["aria-label"])) {
      return props["aria-label"];
    }

    return isTextValue(rest.placeholder) && rest.placeholder !== "" ? rest.placeholder : "Search";
  };

  return (
    <SearchField
      autoFocus={props.autoFocus}
      aria-label={label()}
      data-slot="command-input-wrapper"
      class="p-1 pb-0"
    >
      <InputGroup class="bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <Input
          {...rest}
          data-slot="command-input"
          class={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:hidden",
            props.class
          )}
        />
        <InputGroupAddon>
          <SearchIcon class="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </SearchField>
  );
}

function CommandList<T extends object>(props: MenuProps<T>) {
  const rest = omit(props, "class");

  return (
    <Menu
      {...rest}
      data-slot="command-list"
      class={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        props.class
      )}
    />
  );
}

function CommandEmpty(props: ComponentProps<"div">) {
  const rest = omit(props, "class");

  return (
    <div data-slot="command-empty" class={cn("py-6 text-center text-sm", props.class)} {...rest} />
  );
}

function CommandGroup<T extends object>(
  props: MenuSectionProps<T> & {
    heading?: string;
  }
) {
  const rest = omit(props, "class", "children", "items", "heading");

  return (
    <MenuSection
      data-slot="command-group"
      class={cn(
        "text-foreground **:data-[slot=command-group-heading]:text-muted-foreground overflow-hidden p-1 **:data-[slot=command-group-heading]:px-2 **:data-[slot=command-group-heading]:py-1.5 **:data-[slot=command-group-heading]:text-xs **:data-[slot=command-group-heading]:font-medium",
        props.class
      )}
      {...rest}
    >
      {Boolean(props.heading) && <Header data-slot="command-group-heading">{props.heading}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </MenuSection>
  );
}

function CommandSeparator(props: SeparatorProps) {
  const rest = omit(props, "class");

  return (
    <Separator
      data-slot="command-separator"
      class={cn("bg-border -mx-1 h-px border-0", props.class)}
      {...rest}
    />
  );
}

function CommandItem<T extends object>(props: MenuItemProps<T>) {
  const rest = omit(props, "class", "children", "textValue");

  return (
    <MenuItem
      {...rest}
      data-slot="command-item"
      class={cn(
        "data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground data-focused:bg-muted data-focused:text-foreground data-focused:*:[svg]:text-foreground group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class
      )}
      textValue={props.textValue ?? (isTextValue(props.children) ? props.children : undefined)}
    >
      {composeRenderProps(props.children, (children, renderProps) => (
        <>
          {children}
          <CheckIcon
            class={cn(
              "ml-auto group-has-data-[slot=command-shortcut]/command-item:hidden",
              renderProps.isSelected ? "opacity-100" : "opacity-0"
            )}
          />
        </>
      ))}
    </MenuItem>
  );
}

function CommandShortcut(props: ComponentProps<"span">) {
  const rest = omit(props, "class");

  return (
    <span
      data-slot="command-shortcut"
      class={cn(
        "text-muted-foreground group-data-selected/command-item:text-foreground group-data-focused/command-item:text-foreground ml-auto text-xs tracking-widest",
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
