import { z } from "astro/zod";

import { serverEnv } from "#env";

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

export function savePost(_params: SavePostParams) {
  if (!serverEnv.GITHUB_OWNER || !serverEnv.GITHUB_REPO || !serverEnv.GITHUB_TOKEN) {
    return {
      error: "깃허브 환경변수가 존재하지 않습니다.",
      ok: false,
    };
  }

  return {
    data: true,
    ok: true,
  };
}
