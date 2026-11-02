import { LabelContext, Label as LabelPrimitive } from "@solid2-aria/components";
import type { LabelProps } from "@solid2-aria/components";
import { cn } from "cn";
import { omit, useContext } from "solid-js";

function Label(props: LabelProps) {
  const rest = omit(props, "class", "for", "slot");
  const context = useContext(LabelContext);

  return (
    <LabelContext value={Boolean(props.for) && props.slot === undefined ? null : context}>
      <LabelPrimitive
        data-slot="label"
        class={cn(
          "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-disabled:pointer-events-none group-data-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-disabled:opacity-50",
          props.class
        )}
        {...rest}
        for={props.for}
        slot={props.slot}
      />
    </LabelContext>
  );
}

export { Label };
