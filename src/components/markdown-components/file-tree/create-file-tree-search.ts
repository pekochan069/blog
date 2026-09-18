import type { FileTree } from "@pierre/trees";

import { areArraysEqual, createFileTreeSelector } from "./create-file-tree-selector";

interface FileTreeSearchSnapshot {
  isOpen: boolean;
  matchingPaths: readonly string[];
  value: string;
}

export interface FileTreeSearchState extends FileTreeSearchSnapshot {
  close: () => void;
  focusNextMatch: () => void;
  focusPreviousMatch: () => void;
  open: (initialValue?: string) => void;
  setValue: (value: string | null) => void;
}

function areSearchSnapshotsEqual(
  previous: FileTreeSearchSnapshot,
  next: FileTreeSearchSnapshot
): boolean {
  return (
    previous.isOpen === next.isOpen &&
    previous.value === next.value &&
    areArraysEqual(previous.matchingPaths, next.matchingPaths)
  );
}

export function createFileTreeSearch(model: FileTree): FileTreeSearchState {
  const snapshot = createFileTreeSelector(
    model,
    (currentModel): FileTreeSearchSnapshot => ({
      isOpen: currentModel.isSearchOpen(),
      matchingPaths: currentModel.getSearchMatchingPaths(),
      value: currentModel.getSearchValue(),
    }),
    areSearchSnapshotsEqual
  );

  return {
    close: () => model.closeSearch(),
    focusNextMatch: () => model.focusNextSearchMatch(),
    focusPreviousMatch: () => model.focusPreviousSearchMatch(),
    get isOpen() {
      return snapshot().isOpen;
    },
    get matchingPaths() {
      return snapshot().matchingPaths;
    },
    open: (initialValue) => model.openSearch(initialValue),
    setValue: (value) => model.setSearch(value),
    get value() {
      return snapshot().value;
    },
  };
}
