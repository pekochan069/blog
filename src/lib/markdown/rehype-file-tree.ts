/*
MIT License

Copyright (c) 2023 [Astro contributors](https://github.com/withastro/starlight/graphs/contributors)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import { readFileSync } from "fs";
import { resolve } from "path";
import type { Element, ElementContent, Text } from "hast";
import type { Child } from "hastscript";
import { AstroError } from "astro/errors";
import { fromHtml } from "hast-util-from-html";
import { select } from "hast-util-select";
import { toString } from "hast-util-to-string";
import { h, s } from "hastscript";
import { rehype } from "rehype";
import { rootDir } from "root-dir";
import { CONTINUE, SKIP, visit } from "unist-util-visit";
import { env } from "~/env";
import { defaultFileSvg, folderOpenSvg, folderSvg, mi } from "../markdown/file-tree-icons";

declare module "vfile" {
  interface DataMap {
    directoryLabel: string;
  }
}

/**
 * Process the HTML for a file tree to create the necessary markup for each file and directory
 * including icons.
 * @param html Inner HTML passed to the `<FileTree>` component.
 * @param directoryLabel The localized label for a directory.
 * @returns The processed HTML for the file tree.
 */
export function processFileTree(html: string, directoryLabel: string) {
  const file = fileTreeProcessor.processSync({ data: { directoryLabel }, value: html });

  return file.toString();
}

/** Rehype processor to extract file tree data and turn each entry into its associated markup. */
const fileTreeProcessor = rehype()
  .data("settings", { fragment: true })
  .use(function fileTree() {
    return (tree: Element) => {
      // const { directoryLabel } = file.data;

      validateFileTree(tree);

      visit(tree, "element", (node) => {
        // Strip nodes that only contain newlines.
        node.children = node.children.filter(
          (child) =>
            child.type === "comment" || child.type !== "text" || !/^\n+$/.test(child.value),
        );

        // Skip over non-list items.
        if (node.tagName !== "li") return CONTINUE;

        const [firstChild, ...otherChildren] = node.children;

        // Keep track of comments associated with the current file or directory.
        const comment: Child[] = [];

        // Extract text comment that follows the file name, e.g. `README.md This is a comment`
        if (firstChild?.type === "text") {
          const [filename, ...fragments] = firstChild.value.split(" ");
          firstChild.value = filename || "";
          const textComment = fragments.join(" ").trim();
          if (textComment.length > 0) {
            comment.push(fragments.join(" "));
          }
        }

        // Comments may not always be entirely part of the first child text node,
        // e.g. `README.md This is an __important__ comment` where the `__important__` and `comment`
        // nodes would also be children of the list item node.
        const subTreeIndex = otherChildren.findIndex(
          (child) => child.type === "element" && child.tagName === "ul",
        );

        const commentNodes =
          subTreeIndex > -1 ? otherChildren.slice(0, subTreeIndex) : [...otherChildren];
        otherChildren.splice(0, subTreeIndex > -1 ? subTreeIndex : otherChildren.length);
        comment.push(...commentNodes);

        const firstChildTextContent = firstChild ? toString(firstChild) : "";

        // Decide a node is a directory if it ends in a `/` or contains another list.
        const isDirectory =
          /\/\s*$/.test(firstChildTextContent) ||
          otherChildren.some((child) => child.type === "element" && child.tagName === "ul");
        // A placeholder is a node that only contains 3 dots or an ellipsis.
        const isPlaceholder = /^\s*(\.{3}|…)\s*$/.test(firstChildTextContent);
        // A node is highlighted if its first child is bold text, e.g. `**README.md**`.
        const isHighlighted = firstChild?.type === "element" && firstChild.tagName === "strong";

        // Create an icon for the file or directory (placeholder do not have icons).
        const icon = h(
          "span",
          isDirectory ? makeDirectoryIcon() : makeFileIcon(firstChildTextContent),
        );
        icon.properties.class = isDirectory ? "tree-directory-icon" : "tree-file-icon";
        if (isDirectory) {
          // Add a screen reader only label for directories before the icon so that it is announced
          // as such before reading the directory name.
          // icon.children.unshift(h("span", { class: "sr-only" }, directoryLabel));
        }

        // Add classes and data attributes to the list item node.
        node.properties.class = isDirectory ? "directory" : "file";
        if (isPlaceholder) node.properties.class += " empty";

        // Create the tree entry node that contains the icon, file name and comment which will end up
        // as the list item’s children.
        const treeEntryChildren: Child[] = [
          h("span", { class: isHighlighted ? "tree-item highlight" : "tree-item" }, [
            isPlaceholder ? null : icon,
            firstChild,
          ]),
        ];

        if (comment.length > 0) {
          treeEntryChildren.push(makeText(" "), h("span", { class: "comment" }, ...comment));
        }

        const treeEntry = h(
          "span",
          { class: isDirectory ? "tree-directory-entry" : "tree-entry" },
          ...treeEntryChildren,
        );

        if (isDirectory) {
          const hasContents = otherChildren.length > 0;

          node.children = [
            h("details", { open: hasContents }, [
              h("summary", treeEntry),
              ...(hasContents ? otherChildren : [h("ul", h("li", "…"))]),
            ]),
          ];

          // Continue down the tree.
          return CONTINUE;
        }

        node.children = [treeEntry, ...otherChildren];

        // Files can’t contain further files or directories, so skip iterating children.
        return SKIP;
      });
    };
  });

/** Make a text node with the pass string as its contents. */
function makeText(value = ""): Text {
  return { type: "text", value };
}

/** Make a node containing an SVG icon from the passed HTML string. */
function makeFileIcon(fileName: string) {
  const svgFileName = getFileIcon(fileName);
  let path;
  if (env.NODE_ENV === "development") {
    path = resolve(rootDir, "node_modules", "material-icon-theme", "icons", `${svgFileName}`);
  } else {
    path = resolve(
      rootDir,
      "../..",
      "node_modules",
      "material-icon-theme",
      "icons",
      `${svgFileName}`,
    );
  }
  const svg = readFileSync(path, "utf8");

  if (svg === "") {
    return s(
      "svg",
      {
        class: "tree-icon",
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "transparent",
      },
      fromHtml(defaultFileSvg),
    );
  }

  const html = fromHtml(svg, { fragment: true, space: "svg" });

  return s(
    "svg",
    {
      class: "tree-icon",
      "aria-hidden": "true",
      // @ts-ignore
      viewBox: html.children[0].properties.viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "transparent",
    },
    // @ts-ignore
    ...html.children[0].children,
  );
}

/** Return the icon for a file based on its file name. */
function getFileIcon(fileName: string) {
  const name = getFileIconName(fileName);
  if (!name) return defaultFileSvg;

  const icon = mi.iconDefinitions?.[name];
  if (!icon) return defaultFileSvg;

  const path = icon.iconPath.split("/");

  return path[path.length - 1];
}

/** Return the icon name for a file based on its file name. */
function getFileIconName(fileName: string) {
  if (mi.fileNames === undefined) {
    return defaultFileSvg;
  }

  let icon: string | undefined = mi.fileNames[fileName];
  if (icon) return icon;

  if (fileName.toLowerCase() === "cmakelist.txt" || fileName.toLowerCase() === "cmakelists.txt") {
    return "cmake";
  } else if (fileName.toLowerCase() === "readme.md") {
    return "readme";
  }

  icon = getFileIconFromExtension(fileName);
  if (icon) return icon;

  return icon;
}

/**
 * Get an icon from a file name based on its extension.
 * Note that an extension in Seti is everything after a dot, so `README.md` would be `.md` and
 * `name.with.dots` will try to look for an icon for `.with.dots` and then `.dots` if the first one
 * is not found.
 */
function getFileIconFromExtension(fileName: string) {
  const firstDotIndex = fileName.indexOf(".");
  if (firstDotIndex === -1) return;

  let extension = fileName.slice(firstDotIndex + 1);

  while (extension !== "") {
    if (extension === "ts") {
      return "typescript";
    } else if (extension === "js") {
      return "javascript";
    } else if (extension === "yml" || extension === "yaml") {
      return "yaml";
    }

    const icon = mi.fileExtensions?.[extension];
    if (icon) return icon;

    const nextDotIndex = extension.indexOf(".", 1);
    if (nextDotIndex === -1) return;

    extension = extension.slice(nextDotIndex + 1);
  }

  return;
}

function makeDirectoryIcon() {
  // const folder = getDirectoryIcon(folderName);

  return [
    s(
      "svg",
      {
        viewBox: "0 0 32 32",
        fill: "transparent",
        xmlns: "http://www.w3.org/2000/svg",
        class: "tree-icon close",
        "aria-hidden": "true",
      },
      fromHtml(folderSvg, { fragment: true, space: "svg" }),
    ),
    s(
      "svg",
      {
        viewBox: "0 0 32 32",
        fill: "transparent",
        xmlns: "http://www.w3.org/2000/svg",
        class: "tree-icon open",
        "aria-hidden": "true",
      },
      fromHtml(folderOpenSvg, { fragment: true, space: "svg" }),
    ),
  ];
}

/** Icon for a folder. */
// function getDirectoryIcon(directoryName: string) {
//   const icon = getDirectoryIconName(directoryName);
//   if (!icon)
//     return {
//       default: defaultFolder,
//       open: defaultFolderOpen,
//     };

//   const path = mi.iconDefinitions?.[icon]?.iconPath.split("/");
//   if (!path) return { default: defaultFolder, open: defaultFolderOpen };

//   return {
//     default: `/node_modules/material-icon-theme/icons/${path[path.length - 1]}`,
//     open: `/node_modules/material-icon-theme/icons/${path[path.length - 1].replace(".svg", "-open.svg")}`,
//   };
// }

/**
 * Get an icon from a folder name
 */
// function getDirectoryIconName(directoryName: string) {
//   const icon = mi.folderNames?.[directoryName];
//   if (icon) return icon;

//   return;
// }

/** Validate that the user provided HTML for a file tree is valid. */
function validateFileTree(tree: Element) {
  const rootElements = tree.children.filter(isElementNode);
  const [rootElement] = rootElements;

  if (rootElements.length === 0) {
    throwFileTreeValidationError(
      "The `<FileTree>` component expects its content to be a single unordered list but found no child elements.",
    );
  }

  if (rootElements.length !== 1) {
    throwFileTreeValidationError(
      `The \`<FileTree>\` component expects its content to be a single unordered list but found multiple child elements: ${rootElements
        .map((element) => `\`<${element.tagName}>\``)
        .join(" - ")}.`,
    );
  }

  if (!rootElement || rootElement.tagName !== "ul") {
    throwFileTreeValidationError(
      `The \`<FileTree>\` component expects its content to be an unordered list but found the following element: \`<${rootElement?.tagName}>\`.`,
    );
  }

  const listItemElement = select("li", rootElement);

  if (!listItemElement) {
    throwFileTreeValidationError(
      "The `<FileTree>` component expects its content to be an unordered list with at least one list item.",
    );
  }
}

function isElementNode(node: ElementContent): node is Element {
  return node.type === "element";
}

/** Throw a validation error for a file tree linking to the documentation. */
function throwFileTreeValidationError(message: string): never {
  throw new AstroError(
    message,
    "To learn more about the `<FileTree>` component, see https://starlight.astro.build/components/file-tree/",
  );
}
