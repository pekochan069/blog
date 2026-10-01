import { debounce } from "@solid-primitives/scheduled";
import { createEffect, createMemo, createSignal, Loading } from "solid-js";

import { renderMarkdownPreview } from "#lib/markdown/render-preview";

export function EditorPreview(props: { text: string }) {
  const [debouncedText, setDebouncedText] = createSignal("");
  const trigger = debounce((value: string) => setDebouncedText(value), 700);
  const renderedHtml = createMemo(() => renderMarkdownPreview(debouncedText()));

  createEffect(
    () => props.text,
    (t) => {
      trigger(t);
    }
  );

  return (
    <Loading fallback={<div>Loading</div>}>
      <div class="prose editor-preview min-w-0" innerHTML={renderedHtml().html}></div>
    </Loading>
  );
}
