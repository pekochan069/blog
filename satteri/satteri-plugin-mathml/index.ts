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

  const render = (source: string, displayMode: boolean) => {
    try {
      return {
        mdxExpressions: false as const,
        raw: Temml.renderToString(source, { ...options, displayMode }),
      };
    } catch (error) {
      return {
        mdxExpressions: false as const,
        raw: errorSpan(source, String(error), errorColor),
      };
    }
  };

  return () =>
    defineMdastPlugin({
      inlineMath: (node) => render(node.value, false),
      math: (node) => render(node.value, true),
      name: "satteri-mathml",
    });
};

export default satteriMathML;
