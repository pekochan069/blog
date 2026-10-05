import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";

import { frontmatterSchema } from "#content.config";
import { savePost } from "#lib/server/admin/save-post";
import { authCookieName, isLoggedIn } from "#lib/server/auth/is-logged-in";

export const server = {
  savePost: defineAction({
    handler: (input, context) => {
      if (!isLoggedIn(context.cookies.get(authCookieName)?.value)) {
        throw new ActionError({ code: "UNAUTHORIZED", message: "로그인이 필요합니다" });
      }
      if (context.request.headers.get("Origin") !== context.url.origin) {
        throw new ActionError({ code: "FORBIDDEN", message: "허용되지 않은 요청입니다" });
      }
      return savePost(input);
    },
    input: z.object({
      body: z.string(),
      frontmatter: frontmatterSchema,
      id: z.string(),
      sha: z.string().optional(),
    }),
  }),
};
