import { z } from "astro/zod";

import { postsDirectory } from "#constants";
import type { Frontmatter } from "#content.config";
import { serverEnv } from "#env";
import { contents as localContents } from "#lib/contents";
import { createBearerToken } from "#lib/server/auth/bearer-token";
import { apiError, apiSuccess } from "#lib/server/response";

const postListItemSchema = z.object({
  // download_url: z.string(),
  // git_url: z.string(),
  // html_url: z.string(),
  name: z.string(),
  // path: z.string(),
  sha: z.string(),
  // size: z.coerce.number(),
  // type: z.string(),
  // url: z.string(),
});

type PostListItem = z.infer<typeof postListItemSchema>;

type PostWithFrontmatter = PostListItem & {
  frontmatter: Frontmatter | undefined;
};

export async function getPostList(): Promise<
  | {
      error: string;
      ok: false;
      data?: never;
    }
  | {
      data: PostWithFrontmatter[];
      ok: true;
      error?: never;
    }
> {
  const owner = serverEnv.GITHUB_OWNER;
  const repo = serverEnv.GITHUB_REPO;
  const token = serverEnv.GITHUB_TOKEN;

  if (owner === undefined || repo === undefined || token === undefined) {
    const missingEnvs = [];
    if (!owner) {
      missingEnvs.push("owner");
    }
    if (!repo) {
      missingEnvs.push("repo");
    }
    if (!token) {
      missingEnvs.push("token");
    }

    return apiError(
      "깃허브 환경변수가 존재하지 않습니다.",
      new Error(`missing env: ${missingEnvs}`)
    );
  }

  let result: Response;
  try {
    result = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${postsDirectory}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: createBearerToken(token),
          "User-Agent": "Node.js-App",
        },
        method: "GET",
      }
    );
  } catch (error) {
    return apiError("fetch 실패", error);
  }

  let data: unknown;
  try {
    data = await result.json();
  } catch (error) {
    return apiError("JSON 변환 실패", error, result.status);
  }

  let parsedData: PostListItem[];
  try {
    parsedData = await z.array(postListItemSchema).parseAsync(data);
  } catch (error) {
    return apiError("스키마 변환 실패", error, data);
  }

  const postsWithMetadata: PostWithFrontmatter[] = [];
  for (const post of parsedData) {
    const postWithMetadata: PostWithFrontmatter = {
      frontmatter: undefined,
      name: post.name.slice(0, -4),
      sha: post.sha,
    };
    for (const localContent of localContents) {
      if (postWithMetadata.name === localContent.id) {
        postWithMetadata.frontmatter = localContent.data;
        break;
      }
    }
    postsWithMetadata.push(postWithMetadata);
  }

  return apiSuccess(
    postsWithMetadata.toSorted((a, b) => {
      if (a.frontmatter === undefined && b.frontmatter === undefined) {
        return -1;
      }
      if (a.frontmatter === undefined) {
        return 1;
      } else if (b.frontmatter === undefined) {
        return -1;
      }
      return b.frontmatter.published.getTime() - a.frontmatter.published.getTime();
    })
  );
}
