import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import rehypeMathML from "@daiji256/rehype-mathml";
import tailwindcss from "@tailwindcss/vite";
import compressor from "astro-compressor";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMermaid from "rehype-mermaid";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkMath from "remark-math";

// import { remarkAlert } from "remark-github-blockquote-alert";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), sitemap(), expressiveCode(), mdx(), solidJs(), compressor()],
  markdown: {
    remarkPlugins: [
      [remarkFlexibleToc, {}],
      remarkMath,
      // [
      //   remarkAlert,
      //   {
      //     tagName: "blockquote",
      //   },
      // ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor"],
          },
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: ["anchor-icon"],
              "data-pagefind-ignore": true,
            },
            children: [
              {
                type: "text",
                value: "#",
              },
            ],
          },
        },
      ],
      [
        rehypeMermaid,
        {
          strategy: "pre-mermaid",
        },
      ],
      rehypeMathML,
    ],
    remarkRehype: {},
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-macchiato",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    contentIntellisense: true,
  },
  output: "static",
  adapter: vercel({}),
});
