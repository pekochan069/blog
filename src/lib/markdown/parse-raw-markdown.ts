import { parseFrontmatter } from "astro/markdown";

import { frontmatterSchema } from "../../content.config";

export function parseRawMarkdown(body: string | undefined) {
  if (!body) {
    return;
  }

  const { frontmatter, content } = parseFrontmatter(body);
  return { body: content, frontmatter: frontmatterSchema.parse(frontmatter) };
}
