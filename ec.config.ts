import { defineEcConfig } from "astro-expressive-code";

import { codeThemes } from "./src/lib/code-themes";

export default defineEcConfig({
  frames: {},
  shiki: {
    langAlias: {
      math: "txt",
    },
    // @ts-expect-error: lib
    langs: ["math"],
  },
  styleOverrides: {
    borderColor: "var(--color-border)",
  },
  themes: codeThemes,
});
