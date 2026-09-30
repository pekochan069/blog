import { defineHastPlugin } from "satteri";
import type { HastPluginInput } from "satteri";

const nonWhitespacePattern = /\S/u;

/** Convert Mermaid code fences to elements rendered by Mermaid in the browser. */
export const satteriMermaid = (): HastPluginInput => () =>
  defineHastPlugin({
    element: {
      filter: ["pre"],
      visit(node, context) {
        const contentChildren = node.children.filter(
          (child) => child.type !== "text" || nonWhitespacePattern.test(child.value)
        );
        if (contentChildren.length !== 1) {
          return;
        }

        // oxlint-disable-next-line prefer-destructuring
        const code = contentChildren[0];
        if (
          node.properties.dataLanguage !== "mermaid" ||
          code?.type !== "element" ||
          code.tagName !== "code"
        ) {
          return;
        }

        return {
          children: [{ type: "text", value: context.textContent(code) }],
          properties: { className: ["mermaid"] },
          tagName: "pre",
          type: "element",
        };
      },
    },
    name: "satteri-mermaid",
  });

export default satteriMermaid;
