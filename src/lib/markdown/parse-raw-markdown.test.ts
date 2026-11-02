import assert from "node:assert/strict";
import { test } from "node:test";

import { parseRawMarkdown } from "./parse-raw-markdown";

test("extracts post frontmatter and preserves the Markdown body", () => {
  const source = `---
title: nobpp
description: NoBuild C++
category: c++
draft: false
published: 2025-01-28T17:55:12.088Z
updated: 2025-01-28T17:55:12.088Z
tags: ["프로그래밍", "C++"]
---
## Body
`;

  const parsed = parseRawMarkdown(source);
  assert.ok(parsed);
  const { frontmatter, body } = parsed;

  assert.deepEqual(frontmatter, {
    category: "c++",
    description: "NoBuild C++",
    draft: false,
    published: new Date("2025-01-28T17:55:12.088Z"),
    tags: ["프로그래밍", "C++"],
    title: "nobpp",
    updated: new Date("2025-01-28T17:55:12.088Z"),
  });
  assert.equal(body, source.slice(source.indexOf("\n---\n") + 4));

  const minimal = parseRawMarkdown(
    "---\ntitle: Minimal\ndraft: false\npublished: 2025-01-28\nupdated: 2025-01-28\n---\n## Body\n"
  );

  assert.ok(minimal);
  assert.equal(minimal.frontmatter.category, "");
  assert.deepEqual(minimal.frontmatter.tags, []);
  assert.ok(minimal.frontmatter.published instanceof Date);
  assert.equal(minimal.body, "\n## Body\n");
  assert.throws(() => parseRawMarkdown("## Body\n"));
  assert.equal(parseRawMarkdown(""), undefined);
  assert.throws(() => parseRawMarkdown(source.replace("title: nobpp\n", "")));
  assert.throws(() =>
    parseRawMarkdown(source.replace('tags: ["프로그래밍", "C++"]', "tags: invalid"))
  );
  assert.throws(() => parseRawMarkdown(source.replace("2025-01-28T17:55:12.088Z", "invalid")));
  assert.throws(() => parseRawMarkdown("---\ntags: [\n---\nBody"));
});
