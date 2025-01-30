import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";
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
    FileTree: { render: component("./src/components/doc/file-tree.astro") },
  },
});
