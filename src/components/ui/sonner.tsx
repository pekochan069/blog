import { Toaster as Sonner } from "@solid2-aria/sonner";

import "@solid2-aria/sonner/styles.css";
import type { ToasterProps } from "@solid2-aria/sonner";

import { CircleCheckIcon } from "#icons/runeicons/normal/circle-check";
import { CircleXIcon } from "#icons/runeicons/normal/circle-x";
import { InfoIcon } from "#icons/runeicons/normal/info";
import { TriangleAlertIcon } from "#icons/runeicons/normal/triangle-alert";
import { SvgSpinners180RingWithBg } from "#icons/svg-spinners/180-ring-with-bg";

export { toast } from "@solid2-aria/sonner";

export type { ToasterProps } from "@solid2-aria/sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="system"
      class="toaster group"
      icons={{
        error: <CircleXIcon class="size-4" />,
        info: <InfoIcon class="size-4" />,
        loading: <SvgSpinners180RingWithBg class="size-4" />,
        success: <CircleCheckIcon class="size-4" />,
        warning: <TriangleAlertIcon class="size-4" />,
      }}
      style={{
        "--border-radius": "var(--radius)",
        "--normal-bg": "var(--popover)",
        "--normal-border": "var(--border)",
        "--normal-text": "var(--popover-foreground)",
      }}
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
}
