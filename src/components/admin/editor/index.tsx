import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

import { EditorContextProvider } from "./context";
import { Editor } from "./editor";
import { EditorMeta } from "./editor-meta";
import type { EditorMetaProps } from "./editor-meta";

type EditorContainerProps = EditorMetaProps;

export function EditorContainer(props: EditorContainerProps) {
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
  ]);

  return (
    <EditorContextProvider>
      <EditorMeta availableCategories={props.availableCategories} />
      <div class="mx-auto mt-8 flex flex-col-reverse gap-2 md:grid md:w-[95%] md:max-w-[1920px] md:grid-cols-[1fr_1fr] md:gap-6">
        <div class="font-mono">hello</div>
        <div class="bg-background border-border rounded-xl border p-2 shadow-sm">
          <Editor
            extensions={[
              markdown({
                base: markdownLanguage,
              }),
              syntaxHighlighting(markdownStyle),
            ]}
          />
        </div>
        <div></div>
      </div>
    </EditorContextProvider>
  );
}
