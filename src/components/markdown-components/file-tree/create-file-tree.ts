import { FileTree } from "@pierre/trees";
import type { FileTreeOptions } from "@pierre/trees";
import { onCleanup } from "solid-js";

export interface CreateFileTreeResult {
  model: FileTree;
}

export function createFileTree(options: FileTreeOptions): CreateFileTreeResult {
  const model = new FileTree(options);

  onCleanup(() => model.cleanUp());

  return { model };
}
