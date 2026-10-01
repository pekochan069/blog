import type { CompileOptions } from "satteri";
import { satteriAutolinkHeadings } from "satteri-autolink-headings";
import { satteriSlug } from "satteri-slug";

import satteriPluginFileTreeSource from "../satteri/satteri-plugin-file-tree-source";
import satteriPluginMathML from "../satteri/satteri-plugin-mathml";
import satteriPluginMermaid from "../satteri/satteri-plugin-mermaid";

export const satteriOptions: CompileOptions = {
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
};
