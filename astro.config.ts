import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
// @ts-expect-error: lib type error
import solidNext from "astro-solid-next";
import { defineConfig } from "astro/config";

import { satteriOptions } from "#lib/markdown/satteri-optjons";

import ecConfig from "./ec.config";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),

  integrations: [expressiveCode(ecConfig), mdx(), solidNext()],

  markdown: {
    processor: satteri(satteriOptions),
    shikiConfig: {
      themes: {
        dark: "catppuccin-macchiato",
        light: "catppuccin-latte",
      },
    },
  },

  output: "static",

  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
