import { expect, test } from "bun:test";

import { FileTree } from "@pierre/trees";
import { createRoot, flush } from "solid-js";

import { createFileTreeSearch } from "./create-file-tree-search";
import { createFileTreeSelection } from "./create-file-tree-selection";
import { areArraysEqual } from "./create-file-tree-selector";
import { parseFileTree } from "./parse-file-tree";

test("builds sibling paths from markdown indentation", () => {
  const tree = parseFileTree(`- src/
  - components/
    - Header.astro
  - content/
    - posts/
      - post.md
- package.json`);

  expect(tree.map(({ name }) => name)).toEqual([
    "src/",
    "src/components/",
    "src/components/Header.astro",
    "src/content/",
    "src/content/posts/",
    "src/content/posts/post.md",
    "package.json",
  ]);
});

test("compares selector arrays by identity and values", () => {
  expect(areArraysEqual(["src/"], ["src/"])).toBe(true);
  expect(areArraysEqual(["src/"], ["README.md"])).toBe(false);
});

test("updates selection and search state from model changes", () => {
  const model = new FileTree({ paths: ["README.md", "src/index.ts"], search: true });

  createRoot((dispose) => {
    const search = createFileTreeSearch(model);
    const selection = createFileTreeSelection(model);

    model.getItem("README.md")?.select();
    search.open("read");
    flush();

    expect(selection()).toEqual(["README.md"]);
    expect(search.isOpen).toBe(true);
    expect(search.value).toBe("read");
    expect(search.matchingPaths).toEqual(["README.md"]);

    dispose();
  });

  model.cleanUp();
});
