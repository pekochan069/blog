import { component } from "@astrojs/markdoc/config";

export default {
  render: component("src/markdoc/components/custom-code.astro"),
  attributes: {
    content: {
      type: String,
      required: true,
      render: "code",
    },
    language: {
      type: String,
      required: false,
      render: "lang",
    },
    /**
     * Markdoc ignores meta attributes (markers) after a fence block (e.g.
     * ```js title="example.js" del={2} ins={3-4} {6} ).
     * This means that Expressive Code markers defined after the fence block are ignored and
     * users would need to use the `code` tag instead.
     *
     * @see https://github.com/withastro/astro/blob/9f943c1344671b569a0d1ddba683b3cca0068adc/packages/integrations/markdoc/src/extensions/shiki.ts#L15-L17
     */
  },
};
