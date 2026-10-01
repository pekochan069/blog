import { parseFrontmatter } from "astro/markdown";

import { postSchema } from "../../content.config";

export function parseRawMarkdown(body: string | undefined) {
  if (!body) {
    return;
  }

  const { frontmatter, content } = parseFrontmatter(body);
  return { body: content, frontmatter: postSchema.parse(frontmatter) };
}
