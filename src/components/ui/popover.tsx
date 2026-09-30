// function PopoverContent(
//   props:
// ) {
//   const [props, props] = splitProps(
//     mergeProps({ align: "center", alignOffset: 0, side: "bottom", sideOffset: 4 }, _props),
//     ["className", "align", "alignOffset", "side", "sideOffset"]
//   );
//   return (
//     <PopoverPrimitive.Portal>
//       <PopoverPrimitive.Positioner
//         align={props.align}
//         alignOffset={props.alignOffset}
//         side={props.side}
//         sideOffset={props.sideOffset}
//         className="isolate z-50"
//       >
//         <PopoverPrimitive.Popup
//           data-slot="popover-content"
//           className={cn(
//             "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100",
//             props.className
//           )}
//           {...props}
//         />
//       </PopoverPrimitive.Positioner>
//     </PopoverPrimitive.Portal>
//   );
// }

import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as PopoverPrimitive from "@kobalte/core/popover";
import type { ComponentProps, ValidComponent } from "@solidjs/web";
import { cn } from "cn";
import { merge, omit } from "solid-js";

type PopoverProps = PopoverPrimitive.PopoverRootProps;

const Popover = (props: PopoverProps) => {
  const mergedProps = merge({ gutter: 4, placement: "bottom" } as const, props);
  return <PopoverPrimitive.Root data-slot="popover" {...mergedProps} />;
};

type PopoverTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverTriggerProps<T>
>;

const PopoverTrigger = <T extends ValidComponent = "button">(props: PopoverTriggerProps<T>) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

type PopoverAnchorProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  PopoverPrimitive.PopoverAnchorProps<T>
>;

const PopoverAnchor = <T extends ValidComponent = "div">(props: PopoverAnchorProps<T>) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
);

type PopoverContentProps = PolymorphicProps<"div", PopoverPrimitive.PopoverContentProps<"div">>;

const PopoverContent = (props: PopoverContentProps) => {
  const rest = omit(props, "class", "children");

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        class={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 outline-hidden duration-100",
          props.class
        )}
        {...rest}
      >
        {props.children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

type PopoverCloseButtonProps = PolymorphicProps<
  "button",
  PopoverPrimitive.PopoverCloseButtonProps<"button">
>;

const PopoverCloseButton = (props: PopoverCloseButtonProps) => {
  const rest = omit(props, "class");
  return (
    <PopoverPrimitive.CloseButton
      data-slot="popover-close-button"
      class={cn("", props.class)}
      {...rest}
    />
  );
};

type PopoverHeaderProps = ComponentProps<"div"> & {
  class?: string | undefined;
};

const PopoverHeader = (props: PopoverHeaderProps) => {
  const rest = omit(props, "class");
  return (
    <div
      data-slot="popover-header"
      class={cn("flex flex-col gap-0.5 text-sm", props.class)}
      {...rest}
    />
  );
};

type PopoverTitleProps = PolymorphicProps<"h2", PopoverPrimitive.PopoverTitleProps<"h2">>;

const PopoverTitle = (props: PopoverTitleProps) => {
  const rest = omit(props, "class");
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      class={cn("font-medium", props.class)}
      {...rest}
    />
  );
};

type PopoverDescriptionProps = PolymorphicProps<"p", PopoverPrimitive.PopoverDescriptionProps<"p">>;

const PopoverDescription = (props: PopoverDescriptionProps) => {
  const rest = omit(props, "class");
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      class={cn("text-muted-foreground", props.class)}
      {...rest}
    />
  );
};

type PopoverArrowProps = PolymorphicProps<"div", PopoverPrimitive.PopoverArrowProps<"div">>;

const PopoverArrow = (props: PopoverArrowProps) => {
  const rest = omit(props, "class");
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" class={cn("", props.class)} {...rest} />;
};

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
