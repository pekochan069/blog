"use client";

import * as DialogPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { callHandler } from "@kobalte/utils";
import type { ComponentProps } from "@solidjs/web";
import { cn } from "cn";
import { merge, omit, Show } from "solid-js";

import { Button } from "#/components/ui/button";
import { XIcon } from "#icons/runeicons/normal/x";

function Dialog(props: DialogPrimitive.DialogRootProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: DialogPrimitive.DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(props: DialogPrimitive.DialogCloseButtonProps) {
  return <DialogPrimitive.CloseButton data-slot="dialog-close" {...props} />;
}

function DialogOverlay(props: PolymorphicProps<"div", DialogPrimitive.DialogOverlayProps<"div">>) {
  const context = DialogPrimitive.useDialogContext();
  const rest = omit(props, "class", "onClick");
  const handleClick: ComponentProps<"div">["onClick"] = (event) => {
    callHandler(event, props.onClick);
    if (!event.defaultPrevented) {
      context.close();
    }
  };

  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      class={cn(
        "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        props.class
      )}
      onClick={handleClick}
      {...rest}
    />
  );
}

function DialogContent(
  props: PolymorphicProps<"div", DialogPrimitive.DialogContentProps<"div">> & {
    showCloseButton?: boolean;
  }
) {
  const merged = merge({ showCloseButton: true }, props);
  const rest = omit(merged, "class", "children", "showCloseButton");

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        class={cn(
          "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none sm:max-w-sm",
          merged.class
        )}
        {...rest}
      >
        {merged.children}
        <Show when={merged.showCloseButton}>
          <DialogPrimitive.CloseButton
            data-slot="dialog-close"
            as={() => (
              <Button variant="ghost" class="absolute top-2 right-2" size="icon-sm">
                <XIcon />
                <span class="sr-only">닫기</span>
              </Button>
            )}
          />
        </Show>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader(props: ComponentProps<"div">) {
  const rest = omit(props, "class");
  return <div data-slot="dialog-header" class={cn("flex flex-col gap-2", props.class)} {...rest} />;
}

function DialogFooter(
  props: ComponentProps<"div"> & {
    showCloseButton?: boolean;
  }
) {
  const merged = merge({ showCloseButton: false }, props);
  const rest = omit(merged, "class", "showCloseButton", "children");
  return (
    <div
      data-slot="dialog-footer"
      class={cn(
        "bg-muted/50 -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 sm:flex-row sm:justify-end",
        merged.class
      )}
      {...rest}
    >
      {merged.children}
      <Show when={merged.showCloseButton}>
        <DialogPrimitive.CloseButton as={() => <Button variant="outline">닫기</Button>} />
      </Show>
    </div>
  );
}

function DialogTitle(props: PolymorphicProps<"h2", DialogPrimitive.DialogTitleProps<"h2">>) {
  const rest = omit(props, "class");
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      class={cn("cn-font-heading text-base leading-none font-medium", props.class)}
      {...rest}
    />
  );
}

function DialogDescription(
  props: PolymorphicProps<"p", DialogPrimitive.DialogDescriptionProps<"p">>
) {
  const rest = omit(props, "class");
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      class={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        props.class
      )}
      {...rest}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
