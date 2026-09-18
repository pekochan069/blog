import type { JSX as SolidJSX } from "@solidjs/web";

declare module "@solidjs/web" {
  namespace JSX {
    interface HTMLAttributes<T> {
      shadowrootmode?: "closed" | "open";
    }

    interface IntrinsicElements {
      "file-tree-container": SolidJSX.HTMLAttributes<HTMLElement>;
    }
  }
}
