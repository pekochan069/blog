import { getCollection } from "astro:content";
import { POST_PER_PAGE } from "~/constants";
import { env } from "~/env";

export const contents = (
  await getCollection("posts", (entry) => {
    if (env.NODE_ENV === "production") {
      return entry.data.draft === false;
    }

    return true;
  })
).sort((a, b) => new Date(b.data.published).getTime() - new Date(a.data.published).getTime());

export const totalPages = Math.ceil(contents.length / POST_PER_PAGE);

export function getCategories() {
  const categoryMap = new Map<string, number>();

  for (const content of contents) {
    const category = content.data.category;
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  }

  const sorted = new Map(Array.from(categoryMap.entries()).toSorted((a, b) => b[1] - a[1]));

  return sorted;
}

export function getTags() {
  const tagMap = new Map<string, number>();

  for (const content of contents) {
    for (const tag of content.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  const sorted = new Map(Array.from(tagMap.entries()).toSorted((a, b) => b[1] - a[1]));

  return sorted;
}

export const tags = getTags().keys().toArray();

export type EntryWithTags = {
  title: string;
  url: string;
  tags: string[];
};

export const entriesWithTags = contents.map((content) => ({
  title: content.data.title,
  url: `/posts/${content.id}`,
  tags: content.data.tags,
}));
