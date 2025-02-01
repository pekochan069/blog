import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";
import { callout } from "~/markdoc/config/tags/callout.markdoc";
import math from "~/markdoc/config/tags/math.markdoc";
import fence from "./src/markdoc/config/nodes/fence.markdoc";

export default defineMarkdocConfig({
  extends: [
    shiki({
      wrap: false,
    }),
  ],
  nodes: {
    fence,
  },
  tags: {
    FileTree: { render: component("./src/markdoc/components/file-tree.astro") },
    math,
    callout,
  },
});
