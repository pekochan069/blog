import type { FileTree } from "@pierre/trees";
import { createSignal, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";

export type FileTreeSelector<TSelected> = (model: FileTree) => TSelected;
export type FileTreeSelectorEquality<TSelected> = (previous: TSelected, next: TSelected) => boolean;

export function areArraysEqual<TValue>(
  previous: readonly TValue[],
  next: readonly TValue[]
): boolean {
  return (
    previous === next ||
    (previous.length === next.length &&
      previous.every((value, index) => Object.is(value, next[index])))
  );
}

export function createFileTreeSelector<TSelected>(
  model: FileTree,
  selector: FileTreeSelector<TSelected>,
  isEqual?: FileTreeSelectorEquality<TSelected>
): Accessor<TSelected> {
  const [selected, setSelected] = createSignal<TSelected>(() => selector(model), {
    equals: (previous, next) => Object.is(previous, next) || isEqual?.(previous, next) === true,
  });

  onCleanup(model.subscribe(() => setSelected(() => selector(model))));

  return selected;
}
