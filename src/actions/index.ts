import { defineAction } from "astro:actions";

import { savePost, savePostParamsSchema } from "#lib/server/admin/save-post";

export const server = {
  savePost: defineAction({
    handler: savePost,
    input: savePostParamsSchema,
  }),
};
