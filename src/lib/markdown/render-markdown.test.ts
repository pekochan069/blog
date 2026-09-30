import assert from "node:assert/strict";
import { test } from "node:test";

import { mdxToJs } from "satteri";

import { renderMarkdown } from "./render-markdown";
import { satteriOptions } from "./satteri-optjons";

test("inline math stays in the surrounding paragraph", async () => {
  const { html } = await renderMarkdown("Before $x^2$ after");

  assert.ok(html.startsWith("<p>Before <math>"));
  assert.ok(html.endsWith("</math> after</p>\n"));
  assert.equal(html.match(/<p>/gu)?.length, 1);
});

test("display math remains a block without a paragraph wrapper", async () => {
  const { html } = await renderMarkdown("$$\nx^2\n$$");

  assert.ok(html.startsWith('<math display="block"'));
  assert.ok(!html.includes("<p>"));
});

test("math errors stay inline and escape their source", async () => {
  const { html } = await renderMarkdown("Before $\\unknown{<script>}$ after");

  assert.ok(!html.includes("<script>"));
  assert.equal(html.match(/<p>/gu)?.length, 1);
  assert.ok(html.endsWith(" after</p>\n"));
});

test("the shared math plugin still compiles MDX", async () => {
  const { code } = await mdxToJs("Before $x^2$ after\n\n$$\nx^2\n$$", satteriOptions);

  assert.ok(code.includes('math: "math"'));
  assert.ok(code.includes('display: "block"'));
});
