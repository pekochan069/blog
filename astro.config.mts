import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import swup from "@swup/astro";
import tailwindcss from "@tailwindcss/vite";
import compressor from "astro-compressor";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

// import mdx from "@astrojs/mdx";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypeSlug from "rehype-slug";
// import remarkFlexibleToc from "remark-flexible-toc";
// import { remarkAlert } from "remark-github-blockquote-alert";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap(),
    swup({
      containers: ["#swup"],
    }),
    markdoc(),
    solidJs(),
    expressiveCode(),
    compressor(),
  ],
  // markdown: {
  //   remarkPlugins: [
  //     [remarkFlexibleToc, {}],
  //     [
  //       remarkAlert,
  //       {
  //         tagName: "blockquote",
  //       },
  //     ],
  //   ],
  //   rehypePlugins: [
  //     rehypeSlug,
  //     [
  //       rehypeAutolinkHeadings,
  //       {
  //         behavior: "append",
  //         properties: {
  //           className: ["anchor"],
  //         },
  //         content: {
  //           type: "element",
  //           tagName: "span",
  //           properties: {
  //             className: ["anchor-icon"],
  //             "data-pagefind-ignore": true,
  //           },
  //           children: [
  //             {
  //               type: "text",
  //               value: "#",
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   ],
  //   remarkRehype: {},
  //   shikiConfig: {
  //     themes: {
  //       light: "catppuccin-latte",
  //       dark: "catppuccin-macchiato",
  //     },
  //   },
  // },
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    contentIntellisense: true,
  },
  output: "static",
  adapter: vercel({}),
});
