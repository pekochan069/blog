import { markdownToHtml } from "satteri";

import { satteriOptions } from "./satteri-optjons";

export function renderMarkdown(text: string) {
  return markdownToHtml(text, satteriOptions);
}
