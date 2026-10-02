import { z } from "astro/zod";
import { defineAction } from "astro:actions";

import { frontmatterSchema } from "#content.config";
import { savePost } from "#lib/server/admin/save-post";

export const server = {
  savePost: defineAction({
    handler: savePost,
    input: z.object({
      body: z.string(),
      frontmatter: frontmatterSchema,
      id: z.string(),
      sha: z.string().optional(),
    }),
  }),
};
