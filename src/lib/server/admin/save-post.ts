import { postsDirectory } from "#constants";
import { serverEnv } from "#env";
import { createBearerToken } from "#lib/auth/bearer-token";
import { buildRawMarkdown } from "#lib/markdown/build-raw-markdown";
import type { BuildRawMarkdownParams } from "#lib/markdown/build-raw-markdown";

import { apiError, apiSuccess } from "../response";

export async function savePost(
  params: BuildRawMarkdownParams & {
    sha?: string;
  }
) {
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

  if (params.frontmatter.category === "") {
    params.frontmatter.category = "기본";
  }

  const rawMarkdown = buildRawMarkdown(params);
  const bodyString = {
    content: Buffer.from(rawMarkdown).toString("base64"),
    message: `post: ${params.sha ? "update" : "create"} ${params.id}.mdx at ${params.frontmatter.updated.toISOString()}`,
    sha: params.sha,
  };
  const body = JSON.stringify(bodyString);

  let res: Response;
  try {
    res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${postsDirectory}/${params.id}.mdx`,
      {
        body,
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: createBearerToken(token),
          "Content-Type": "application/json",
          "User-Agent": "Node.js-App",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        method: "PUT",
      }
    );
  } catch (error) {
    return apiError("savePost fetch 실패", error);
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch (error) {
    return apiError("savePost JSON 변환 실패", error, res.status);
  }

  if (!res.ok) {
    return apiError("GitHub 저장 실패", new Error(`HTTP ${res.status}`), data);
  }

  return apiSuccess(data);
}
