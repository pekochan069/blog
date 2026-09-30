import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { createSignal, createStore } from "solid-js";

import { Editor } from "./editor";
import { EditorMeta } from "./editor-meta";
import { EditorPreview } from "./preview";

export interface EditorContextStore {
  category: string;
  description: string;
  draft: boolean;
  tags: string[];
  title: string;
}

type EditorContainerProps = EditorContextStore & {
  text: string;
  availableCategories: string[];
  availableTags: string[];
};

export function EditorContainer(props: EditorContainerProps) {
  const [editorContext, setEditorContext] = createStore<EditorContextStore>({
    // oxlint-disable-next-line solid/reactivity
    category: props.category,
    // oxlint-disable-next-line solid/reactivity
    description: props.description,
    // oxlint-disable-next-line solid/reactivity
    draft: props.draft,
    // oxlint-disable-next-line solid/reactivity
    tags: props.tags,
    // oxlint-disable-next-line solid/reactivity
    title: props.title,
  });
  // oxlint-disable-next-line solid/reactivity
  const [text, setText] = createSignal(props.text);

  const markdownStyle = HighlightStyle.define([
    {
      class: "font-bold underline text-xl",
      tag: tags.heading1,
    },
    {
      class: "font-bold underline text-xl",
      tag: tags.heading2,
    },
    {
      class: "font-bold underline text-lg",
      tag: tags.heading3,
    },
    {
      class: "font-bold underline text-lg",
      tag: tags.heading4,
    },
    {
      class: "font-bold underline text-base",
      tag: tags.heading5,
    },
    {
      class: "font-bold underline text-base",
      tag: tags.heading6,
    },
    {
      class: "line-through",
      tag: tags.strikethrough,
    },
    {
      class: "font-bold",
      tag: tags.strong,
    },
    {
      class: "italic",
      tag: tags.emphasis,
    },
    {
      class: "hover:underline font-semibold text-catppuccin-blue",
      tag: tags.link,
    },
    {
      class: "font-mono",
      tag: tags.monospace,
    },
    {
      class: "text-catppuccin-teal",
      tag: tags.angleBracket,
    },
    {
      class: "text-catppuccin-blue",
      tag: tags.tagName,
    },
    {
      class: "text-catppuccin-yellow",
      tag: tags.attributeName,
    },
    {
      class: "text-catppuccin-green",
      tag: tags.string,
    },
    {
      class: "text-catppuccin-peach",
      tag: tags.literal,
    },
  ]);

  return (
    <div>
      <EditorMeta
        availableCategories={props.availableCategories}
        availableTags={props.availableTags}
        editorContext={editorContext}
        setEditorContext={setEditorContext}
      />
      <div class="mx-auto mt-4 mb-9.25 flex flex-col gap-2 px-4 lg:grid lg:w-[95%] lg:max-w-[1920px] lg:grid-cols-[1fr_1fr] lg:gap-6">
        <div class="bg-background border-border w-full rounded-xl border p-2 shadow-sm">
          <Editor
            extensions={[
              markdown({
                base: markdownLanguage,
              }),
              syntaxHighlighting(markdownStyle),
            ]}
            value={text()}
            onChange={setText}
          />
        </div>
        <div class="bg-background border-border h-[90svh] w-full overflow-auto rounded-xl border p-2 shadow-sm">
          <EditorPreview text={text()} />
        </div>
      </div>
    </div>
  );
}
