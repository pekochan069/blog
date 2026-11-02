import { Separator as SeparatorPrimitive } from "@solid2-aria/components";
import type { ComponentProps } from "@solidjs/web";
import { cn } from "cn";
import { merge, omit } from "solid-js";

function Separator(props: ComponentProps<typeof SeparatorPrimitive>) {
  const merged = merge({ orientation: "horizontal" } as const, props);
  const rest = omit(merged, "class", "orientation");

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={merged.orientation}
      class={cn(
        "bg-border block shrink-0 border-0 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=vertical]:w-px aria-[orientation=vertical]:self-stretch [:is(hr)]:h-px [:is(hr)]:w-full",
        merged.class
      )}
      {...rest}
    />
  );
}

export { Separator };
