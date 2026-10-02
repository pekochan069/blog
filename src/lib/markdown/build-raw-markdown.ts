import type { Frontmatter } from "#content.config";

export interface BuildRawMarkdownParams {
  body: string;
  frontmatter: Frontmatter;
  id: string;
}

function buildFrontmatter(frontmatter: Frontmatter) {
  const array = ["---"];
  array.push(
    `title: "${frontmatter.title}"`,
    `description: "${frontmatter.description}"`,
    `category: "${frontmatter.category}"`,
    `tags: [${frontmatter.tags.map((tag) => `"${tag}"`).join(", ")}]`,
    `draft: ${frontmatter.draft}`,
    `published: ${frontmatter.published.toISOString()}`,
    `updated: ${frontmatter.updated.toISOString()}`,
    "---"
  );

  return array.join("\n");
}

export function buildRawMarkdown(params: BuildRawMarkdownParams) {
  const frontmatter = buildFrontmatter(params.frontmatter);
  const array = [frontmatter, params.body];

  return array.join("\n");
}
