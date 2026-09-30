import { defineMdastPlugin } from "satteri";
import type { MdastPluginInput } from "satteri";

export default function satteriFileTreeSource(): MdastPluginInput {
  return ({ source }) =>
    defineMdastPlugin({
      mdxJsxFlowElement(node, context) {
        if (node.name !== "FileTree" || !node.position) {
          return;
        }

        const element = source.slice(node.position.start.offset, node.position.end.offset);
        const value = element.slice(element.indexOf(">") + 1, element.lastIndexOf("</FileTree>"));

        context.replaceNode(node, {
          ...node,
          attributes: [...node.attributes, { name: "source", type: "mdxJsxAttribute", value }],
          children: [],
        });
      },
      name: "file-tree-source",
      options: { position: true },
    });
}
