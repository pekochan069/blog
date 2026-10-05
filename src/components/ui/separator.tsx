import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as SeparatorPrimitive from "@kobalte/core/separator";
import { cn } from "cn";
import { merge, omit } from "solid-js";

type SeparatorProps = PolymorphicProps<"hr", SeparatorPrimitive.SeparatorRootProps<"hr">>;

function Separator(props: SeparatorProps) {
  const merged = merge({ orientation: "horizontal" } satisfies Partial<SeparatorProps>, props);
  const rest = omit(merged, "orientation", "class");

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      orientation={merged.orientation}
      class={cn(
        "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        merged.class
      )}
      {...rest}
    />
  );
}

export { Separator };
