import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ValidComponent } from "@solidjs/web";
import { cn } from "cn";
import { omit, merge } from "solid-js";

import { CheckIcon } from "#icons/runeicons/normal/check";
import { ChevronRightIcon } from "#icons/runeicons/normal/chevron-right";

function DropdownMenu(props: DropdownMenuPrimitive.DropdownMenuRootProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal(props: DropdownMenuPrimitive.DropdownMenuPortalProps) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger(props: DropdownMenuPrimitive.DropdownMenuTriggerProps) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent(
  props: DropdownMenuPrimitive.DropdownMenuContentProps & {
    class?: string;
  }
) {
  const rest = omit(props, "class");

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        class={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg p-1 shadow-md ring-1 duration-100 outline-none data-closed:overflow-hidden",
          props.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup<T extends ValidComponent = "div">(
  props: DropdownMenuPrimitive.DropdownMenuGroupProps<T>
) {
  return <DropdownMenuPrimitive.Group {...props} />;
}

function DropdownMenuLabel<T extends ValidComponent = "span">(
  props: DropdownMenuPrimitive.DropdownMenuGroupLabelProps<T> &
    Pick<ComponentProps<T>, "class"> & {
      inset?: boolean;
    }
) {
  const rest = omit(props, "inset", "class");

  return (
    <DropdownMenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={props.inset}
      class={cn(
        "text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7",
        props.class
      )}
      {...rest}
    />
  );
}

type DropdownMenuItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuPrimitive.DropdownMenuItemProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  };

function DropdownMenuItem<T extends ValidComponent = "div">(props: DropdownMenuItemProps<T>) {
  const merged = merge(
    {
      variant: "default",
    },
    props
  );
  const rest = omit(merged, "variant", "inset", "class");

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={merged.inset}
      data-variant={merged.variant}
      class={cn(
        "group/dropdown-menu-item focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:*:[svg]:text-destructive relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        merged.class
      )}
      {...rest}
    />
  );
}

function DropdownMenuSub(props: DropdownMenuPrimitive.DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

type DropdownMenuSubTriggerProps = PolymorphicProps<
  "div",
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps<"div">
> & {
  inset?: boolean;
};

function DropdownMenuSubTrigger(props: DropdownMenuSubTriggerProps) {
  const rest = omit(props, "class", "inset", "children");

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={props.inset}
      class={cn(
        "focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class
      )}
      {...rest}
    >
      {props.children}
      <ChevronRightIcon class="cn-rtl-flip ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent(
  props: PolymorphicProps<"div", DropdownMenuPrimitive.DropdownMenuSubContentProps<"div">>
) {
  const rest = omit(props, "class");

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        class={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 w-auto min-w-24 rounded-lg p-1 shadow-lg ring-1 duration-100",
          props.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuCheckboxItem(
  props: PolymorphicProps<"div", DropdownMenuPrimitive.DropdownMenuCheckboxItemProps<"div">> & {
    inset?: boolean;
  }
) {
  const rest = omit(props, "class", "children", "inset");

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={props.inset}
      class={cn(
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class
      )}
      {...rest}
    >
      <span
        class="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup(
  props: PolymorphicProps<"div", DropdownMenuPrimitive.DropdownMenuRadioGroupProps>
) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem(
  props: PolymorphicProps<"div", DropdownMenuPrimitive.DropdownMenuRadioItemProps> & {
    inset?: boolean;
  }
) {
  const rest = omit(props, "class", "children", "inset");

  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={props.inset}
      class={cn(
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-7 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class
      )}
      {...rest}
    >
      <span
        class="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {props.children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator(
  props: PolymorphicProps<"hr", DropdownMenuPrimitive.DropdownMenuSeparatorProps<"hr">>
) {
  const rest = omit(props, "class");

  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      class={cn("bg-border -mx-1 my-1 h-px", props.class)}
      {...rest}
    />
  );
}

function DropdownMenuShortcut(props: ComponentProps<"span">) {
  const rest = omit(props, "class");

  return (
    <span
      data-slot="dropdown-menu-shortcut"
      class={cn(
        "text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest",
        props.class
      )}
      {...rest}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};
