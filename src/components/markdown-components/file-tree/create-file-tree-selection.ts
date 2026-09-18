import type { FileTree } from "@pierre/trees";
import type { Accessor } from "solid-js";

import { areArraysEqual, createFileTreeSelector } from "./create-file-tree-selector";

export function createFileTreeSelection(model: FileTree): Accessor<readonly string[]> {
  return createFileTreeSelector(
    model,
    (currentModel) => currentModel.getSelectedPaths(),
    areArraysEqual
  );
}
