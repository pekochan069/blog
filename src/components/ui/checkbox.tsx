import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "cn";
import { omit } from "solid-js";

import { CheckIcon } from "#icons/runeicons/normal/check";

function Checkbox(props: PolymorphicProps<"div", CheckboxPrimitive.CheckboxRootProps<"div">>) {
  const rest = omit(props, "class", "id");

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      class="peer border-input group-has-focus-visible/field-label:not-data-checked:border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-focus-visible/field-label:data-checked:border-primary dark:data-checked:bg-primary relative flex size-4 shrink-0 items-center justify-center rounded-lg border transition-colors outline-none group-has-focus-visible/field-label:ring-0 group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3"
      {...rest}
    >
      <CheckboxPrimitive.Input data-slot="checkbox-input" class="peer sr-only" id={props.id} />
      <CheckboxPrimitive.Control
        onClick={(e) => e.preventDefault()}
        class={cn(
          "z-checkbox relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2",
          props.class
        )}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          class="grid place-content-center text-current transition-none [&>svg]:size-3.5"
        >
          <CheckIcon class="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
    </CheckboxPrimitive.Root>
    // <CheckboxPrimitive.Root
    //   data-slot="checkbox"
    //   class={cn(
    //     "peer border-input group-has-focus-visible/field-label:not-data-checked:border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-focus-visible/field-label:data-checked:border-primary dark:data-checked:bg-primary relative flex size-4 shrink-0 items-center justify-center rounded-lg border transition-colors outline-none group-has-focus-visible/field-label:ring-0 group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3",
    //     props.class
    //   )}
    //   {...rest}
    // >
    //   <CheckboxPrimitive.Input data-slot="checkbox-input" />
    //   <CheckboxPrimitive.Control>
    //     <CheckboxPrimitive.Indicator
    //       data-slot="checkbox-indicator"
    //       class="grid place-content-center text-current transition-none [&>svg]:size-3.5"
    //     >
    //       <CheckIcon />
    //     </CheckboxPrimitive.Indicator>
    //   </CheckboxPrimitive.Control>
    // </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
