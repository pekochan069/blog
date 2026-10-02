"use client";

import { Toaster as Sonner } from "#components/sonner";
import type { ToasterProps } from "#components/sonner";
import { CircleCheckIcon } from "#icons/runeicons/normal/circle-check";
import { CircleXIcon } from "#icons/runeicons/normal/circle-x";
import { InfoIcon } from "#icons/runeicons/normal/info";
import { TriangleAlertIcon } from "#icons/runeicons/normal/triangle-alert";
import { SvgSpinners180RingWithBg } from "#icons/svg-spinners/180-ring-with-bg";

const Toaster = (props: ToasterProps) => (
  <Sonner
    class="toaster group"
    icons={{
      success: <CircleCheckIcon class="size-4" />,
      info: <InfoIcon class="size-4" />,
      warning: <TriangleAlertIcon class="size-4" />,
      error: <CircleXIcon class="size-4" />,
      loading: <SvgSpinners180RingWithBg class="size-4" />,
    }}
    style={{
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)",
      "--border-radius": "var(--radius)",
    }}
    toastOptions={{
      classNames: {
        toast: "cn-toast",
      },
    }}
    {...props}
  />
);

export { Toaster };
