import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
// @ts-expect-error: lib type error
import solidNext from "astro-solid-next";
import { defineConfig } from "astro/config";
import { satteriAutolinkHeadings } from "satteri-autolink-headings";
import { satteriSlug } from "satteri-slug";

import ecConfig from "./ec.config";
import satteriPluginFileTreeSource from "./satteri/satteri-plugin-file-tree-source";
import satteriPluginMathML from "./satteri/satteri-plugin-mathml";
import satteriPluginMermaid from "./satteri/satteri-plugin-mermaid";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),

  integrations: [expressiveCode(ecConfig), mdx(), solidNext()],

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
                value: "#",
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
        satteriPluginMermaid(),
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

  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
