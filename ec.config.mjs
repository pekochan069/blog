import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  themes: ["catppuccin-latte", "catppuccin-macchiato"],
  frames: {},
  styleOverrides: {
    borderColor: "var(--color-border)",
  },
});
