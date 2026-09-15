import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error: lib type error
import solidNext from "astro-solid-next";
import { defineConfig } from "astro/config";
import { satteriAutolinkHeadings } from "satteri-autolink-headings";
import { satteriSlug } from "satteri-slug";

import satteriPluginFileTreeSource from "./satteri/satteri-plugin-file-tree-source";
import satteriPluginMathML from "./satteri/satteri-plugin-mathml";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), solidNext()],
  markdown: {
    processor: satteri({
      features: {
        gfm: true,
        math: true,
      },
      hastPlugins: [
        satteriSlug(),
        satteriAutolinkHeadings({
          behavior: "append",
          content: {
            children: [
              {
                type: "text",
                value: "3",
              },
            ],
            properties: {
              className: ["anchor-icon"],
              "data-pagefind-ignore": true,
            },
            tagName: "span",
            type: "element",
          },
          properties: {
            className: ["anchor"],
          },
        }),
      ],
      mdastPlugins: [satteriPluginFileTreeSource(), satteriPluginMathML()],
    }),
    shikiConfig: {
      themes: {
        dark: "catppuccin-macchiato",
        light: "catppuccin-latte",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
