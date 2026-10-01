import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import { bundledLanguages } from "shiki/langs";

import { codeThemes } from "../code-themes";
import { renderMarkdown } from "./render-markdown";

const highlighter = createHighlighterCore({
  engine: createOnigurumaEngine(import("shiki/wasm")),
  langs: [],
  themes: codeThemes,
});

export async function renderMarkdownPreview(text: string) {
  const result = await renderMarkdown(text);
  const template = document.createElement("template");
  template.innerHTML = result.html;

  await Promise.all(
    [...template.content.querySelectorAll("pre")].map(async (pre) => {
      const code = pre.querySelector(":scope > code");
      if (!code) {
        return;
      }
      const languageName =
        code.className
          .split(/\s+/u)
          .find((name) => name.startsWith("language-"))
          ?.slice("language-".length)
          .toLowerCase() ?? "text";
      const language = Object.entries(bundledLanguages).find(
        ([name]) => name === languageName
      )?.[1];
      if (!language) {
        return;
      }

      const instance = await highlighter;
      await instance.loadLanguage(language);
      pre.outerHTML = instance.codeToHtml(code.textContent ?? "", {
        lang: languageName,
        themes: { dark: "catppuccin-macchiato", light: "catppuccin-latte" },
      });
    })
  );

  return { ...result, html: template.innerHTML };
}
