import { Checkbox as CheckboxPrimitive, composeRenderProps } from "@solid2-aria/components";
import type { CheckboxProps } from "@solid2-aria/components";
import { cn } from "cn";
import { omit } from "solid-js";

import { CheckIcon } from "#icons/runeicons/normal/check";

function Checkbox(props: CheckboxProps) {
  const rest = omit(props, "class", "children");

  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      class={composeRenderProps(props.class, (className) =>
        cn(
          "peer border-input group-has-data-focus-visible/field-label:not-data-selected:border-input data-focus-visible:border-ring data-focus-visible:ring-ring/50 data-invalid:border-destructive data-invalid:ring-destructive/20 data-invalid:data-selected:border-primary dark:bg-input/30 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40 data-selected:border-primary data-selected:bg-primary data-selected:text-primary-foreground group-has-data-focus-visible/field-label:data-selected:border-primary dark:data-selected:bg-primary relative flex size-4 shrink-0 items-center justify-center rounded-lg border transition-colors outline-none group-has-data-disabled/field:opacity-50 group-has-data-focus-visible/field-label:ring-0 after:pointer-events-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-visible:ring-3 data-invalid:ring-3",
          className
        )
      )}
      {...rest}
    >
      {composeRenderProps(props.children, (children, renderProps) => (
        <>
          <span
            data-slot="checkbox-indicator"
            class="grid place-content-center text-current transition-none [&>svg]:size-3.5"
          >
            {(renderProps.isSelected || renderProps.isIndeterminate) && (
              <CheckIcon class="size-3.5" />
            )}
          </span>
          {children}
        </>
      ))}
    </CheckboxPrimitive>
  );
}

export { Checkbox };
