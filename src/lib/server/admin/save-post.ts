import { z } from "astro/zod";

export const savePostParamsSchema = z.object({
  body: z.string(),
  category: z.string().default(""),
  description: z.string().optional(),
  draft: z.coerce.boolean(),
  id: z.string(),
  tags: z.array(z.string()).default([]),
  title: z.string(),
});

type SavePostParams = z.infer<typeof savePostParamsSchema>;

export async function savePost(_params: SavePostParams) {
  //
}
