import assert from "node:assert/strict";
import { test } from "node:test";

import { serverEnv } from "#env";

const params = {
  body: "Post body",
  frontmatter: {
    category: "test",
    description: "Test post",
    draft: true,
    published: new Date("2026-01-01"),
    tags: [],
    title: "Test",
    updated: new Date("2026-01-02"),
  },
  id: "test-post",
};

test("savePost sends SHA for updates, omits it for creation, and reports failures", async (context) => {
  const env = {
    GITHUB_OWNER: "test-owner",
    GITHUB_REPO: "test-repo",
    GITHUB_TOKEN: "test-token",
  };
  const previousEnv = { ...serverEnv };
  Object.assign(serverEnv, env);

  let response: Response | Error = Response.json({ commit: { sha: "new-sha" } });
  const bodies: string[] = [];
  context.mock.method(
    globalThis,
    "fetch",
    (input: Parameters<typeof fetch>[0], init?: RequestInit) => {
      assert.equal(
        input,
        "https://api.github.com/repos/test-owner/test-repo/contents/src/content/posts/test-post.mdx"
      );
      assert.equal(init?.method, "PUT");
      bodies.push(String(init?.body));
      return response instanceof Error ? Promise.reject(response) : Promise.resolve(response);
    }
  );

  try {
    const { savePost } = await import("./save-post");
    const updated = await savePost({ ...params, sha: "existing-sha" });
    assert.equal(updated.ok, true);
    const [updateBody] = bodies;
    assert.match(updateBody, /"sha":"existing-sha"/u);
    assert.match(updateBody, /post: update test-post/u);

    response = Response.json({ commit: { sha: "created-sha" } }, { status: 201 });
    const created = await savePost(params);
    assert.equal(created.ok, true);
    const [, createBody] = bodies;
    assert.doesNotMatch(createBody, /"sha":/u);
    assert.match(createBody, /post: create test-post/u);

    for (const status of [401, 403, 409, 422]) {
      response = Response.json({ message: "GitHub rejected save" }, { status });
      // The response mock is shared; each status must finish before advancing.
      // oxlint-disable-next-line no-await-in-loop
      const rejected = await savePost(params);
      assert.equal(rejected.ok, false);
      if (!rejected.ok) {
        assert.match(rejected.error, new RegExp(`HTTP ${status}`, "u"));
        assert.match(rejected.error, /GitHub rejected save/u);
      }
    }

    response = new Error("Network unavailable");
    const networkFailure = await savePost(params);
    assert.equal(networkFailure.ok, false);
    response = new Response("Invalid JSON", { status: 502 });
    const invalidJson = await savePost(params);
    assert.equal(invalidJson.ok, false);
  } finally {
    Object.assign(serverEnv, previousEnv);
  }
});
