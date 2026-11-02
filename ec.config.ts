import { defineEcConfig } from "astro-expressive-code";

import { codeThemes } from "./src/lib/code-themes";

export default defineEcConfig({
  frames: {},
  shiki: {
    langAlias: {
      math: "txt",
    },
  },
  styleOverrides: {
    borderColor: "var(--color-border)",
  },
  themes: codeThemes,
});
