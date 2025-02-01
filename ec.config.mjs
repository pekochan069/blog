import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  shiki: {
    langs: ["math"],
    langAlias: {
      math: "txt",
    },
  },
  themes: ["catppuccin-latte", "catppuccin-macchiato"],
  frames: {},
  styleOverrides: {
    borderColor: "var(--color-border)",
  },
});
