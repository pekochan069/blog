/**
Copyright © 2023 Remco Haszing

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the “Software”), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import type { Element, Root } from "hast";
import type { Plugin } from "unified";

import { toText } from "hast-util-to-text";
import { parse } from "space-separated-tokens";
import { visitParents } from "unist-util-visit-parents";

interface CodeInstance {
  /**
   * The mermaid diagram.
   */
  diagram: string;

  /**
   * The inclusive ancestors of the element to process.
   */
  ancestors: Element[];
}

/**
 * A regular expression to test for non-whitespace characters.
 */
const nonWhitespacePattern = /\w/;

/**
 * Allowed output strategies.
 */
type Strategy = "pre-mermaid";

/**
 * Check if a hast element has the `language-mermaid` class name.
 *
 * @param element
 *   The hast element to check.
 * @param strategy
 *   The mermaid strategy to use.
 * @returns
 *   Whether or not the element has the `language-mermaid` class name.
 */
function isMermaidElement(element: Element, strategy: Strategy): boolean {
  let mermaidClassName: string;

  if (element.tagName === "pre") {
    if (strategy === "pre-mermaid") {
      return false;
    }
    mermaidClassName = "mermaid";
  } else if (element.tagName === "code") {
    mermaidClassName = "language-mermaid";
  } else {
    return false;
  }

  let className = element.properties?.className;
  if (typeof className === "string") {
    className = parse(className);
  }

  if (!Array.isArray(className)) {
    return false;
  }

  return className.includes(mermaidClassName);
}

/**
 * A [rehype](https://rehype.js.org) plugin to render [mermaid](https://mermaid-js.github.io)
 * diagrams.
 *
 * @param options
 *   Options that may be used to tweak the output.
 */
const rehypeMermaid: Plugin<[null], Root> = () => {
  const strategy: Strategy = "pre-mermaid";

  return (ast) => {
    const instances: CodeInstance[] = [];

    visitParents(ast, "element", (node, ancestors) => {
      if (!isMermaidElement(node, strategy)) {
        return;
      }

      const parent = ancestors.at(-1)!;
      let inclusiveAncestors = ancestors as Element[];

      // This is <code> wrapped in a <pre> element.
      if (parent.type === "element" && parent.tagName === "pre") {
        for (const child of parent.children) {
          // We allow whitespace text siblings, but any other siblings mean we don’t process the
          // diagram.
          if (child.type === "text") {
            if (nonWhitespacePattern.test(child.value)) {
              return;
            }
          } else if (child !== node) {
            return;
          }
        }
      } else {
        inclusiveAncestors = [...inclusiveAncestors, node];
      }

      instances.push({
        diagram: toText(node, { whitespace: "pre" }),
        ancestors: inclusiveAncestors,
      });
    });

    // Nothing to do. No need to start a browser in this case.
    if (!instances.length) {
      return;
    }

    for (const { ancestors, diagram } of instances) {
      const parent = ancestors.at(-2)!;
      const node = ancestors.at(-1)!;

      parent.children[parent.children.indexOf(node)] = {
        type: "element",
        tagName: "pre",
        properties: {
          className: ["mermaid"],
        },
        children: [{ type: "text", value: diagram }],
      };
    }
    return;
  };
};

export default rehypeMermaid;
