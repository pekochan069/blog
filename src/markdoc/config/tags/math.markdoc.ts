import { component } from "@astrojs/markdoc/config";

export default {
  render: component("./src/markdoc/components/inline-math.astro"),
  attributes: {
    m: { type: String },
  },
};
