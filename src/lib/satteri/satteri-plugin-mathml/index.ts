import { defineMdastPlugin } from "satteri";
import type { MdastPluginInput } from "satteri";
import Temml from "temml";
import type { Options as TemmlOptions } from "temml";

export type SatteriMathMLOptions = Readonly<TemmlOptions>;

const escapeHtml = (value: string): string =>
  value.replaceAll(/[&<>"']/gu, (character) => `&#${character.codePointAt(0)};`);

const errorSpan = (source: string, message: string, color: string): string =>
  `<span class="rehype-mathml-error" style="color:${escapeHtml(color)}" ` +
  `title="${escapeHtml(message)}">${escapeHtml(source)}</span>`;

/** Render Sätteri math nodes to MathML with Temml. */
export const satteriMathML = (options: SatteriMathMLOptions = {}): MdastPluginInput => {
  const { errorColor = "#b22222" } = options;

  const render = (source: string, displayMode: boolean, sourceFormat: "markdown" | "mdx") => {
    let value: string;
    try {
      value = Temml.renderToString(source, { ...options, displayMode });
    } catch (error) {
      value = errorSpan(source, String(error), errorColor);
    }

    return sourceFormat === "mdx"
      ? { mdxExpressions: false as const, raw: value }
      : { type: "html" as const, value };
  };

  return () =>
    defineMdastPlugin({
      inlineMath: (node, context) => render(node.value, false, context.sourceFormat),
      math: (node, context) => render(node.value, true, context.sourceFormat),
      name: "satteri-mathml",
    });
};

export default satteriMathML;
