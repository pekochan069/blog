import { z } from "astro/zod";
import { defineAction } from "astro:actions";

import { renderMarkdown } from "#lib/markdown/render-markdown";

export const server = {
  renderMarkdown: defineAction({
    handler: (input) => renderMarkdown(input),
    input: z.string(),
  }),
};
