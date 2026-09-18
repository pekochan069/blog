import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

import { postsPerPage } from "#constants";
import { serverEnv } from "#env";

const _contents = await getCollection("posts", (entry) => {
  if (serverEnv.NODE_ENV === "production") {
    return entry.data.draft === false;
  }
  return true;
});

export const contents = _contents.toSorted(
  (a, b) => b.data.published.getTime() - a.data.published.getTime()
);

function getContents(category: string | null = null, tags: string[] = []) {
  return contents.filter((content) => {
    if (category !== null && category.length > 0 && content.data.category !== category) {
      return false;
    }

    for (const tag of tags) {
      if (!content.data.tags.some((contentTag) => contentTag === tag)) {
        return false;
      }
    }

    return true;
  });
}

export function getTotalPages(category: string | null = null, tags: string[] = []) {
  return Math.ceil(getContents(category, tags).length / postsPerPage);
}

export function getCurrentPagePosts(
  page: number,
  category: string | null = null,
  tags: string[] = []
) {
  const allContents = getContents(category, tags);
  const totalPages = Math.ceil(allContents.length / postsPerPage);

  if (page < 1 || page > totalPages) {
    return [];
  }

  return allContents.slice((page - 1) * postsPerPage, page * postsPerPage);
}

export function getPostContents(id: string) {
  return contents.find((content) => content.id === id);
}

export type PostEntry = CollectionEntry<"posts">;

export interface PostListItemType {
  id: PostEntry["id"];
  category: PostEntry["data"]["category"];
  draft: PostEntry["data"]["draft"];
  description: PostEntry["data"]["description"];
  published: PostEntry["data"]["published"];
  tags: PostEntry["data"]["tags"];
  title: PostEntry["data"]["title"];
}

const { availableYears, availableCategories, availableTags } = (() => {
  const availableYearsList: { year: number; posts: number }[] = [];
  const availableCategoriesList: { category: string; posts: number }[] = [];
  const _availableTags = new Set<string>();
  for (const content of contents) {
    const year = content.data.published.getFullYear();
    const yearIndex = availableYearsList.findIndex((a) => a.year === year);
    if (yearIndex === -1) {
      availableYearsList.push({ posts: 1, year });
    } else {
      availableYearsList[yearIndex].posts += 1;
    }

    const { category, tags } = content.data;
    if (category !== "") {
      const categoryIndex = availableCategoriesList.findIndex((a) => a.category === category);
      if (categoryIndex === -1) {
        availableCategoriesList.push({ category, posts: 1 });
      } else {
        availableCategoriesList[categoryIndex].posts += 1;
      }
    }

    for (const tag of tags) {
      _availableTags.add(tag);
    }
  }
  const availableTagsList = [..._availableTags];

  return {
    availableCategories: availableCategoriesList,
    availableTags: availableTagsList,
    availableYears: availableYearsList,
  };
})();
export { availableYears, availableCategories, availableTags };

export function getPostsInYear(year: number) {
  const postsInYear = contents.filter((content) => content.data.published.getFullYear() === year);

  const result = new Map<number, PostEntry[]>();
  for (const post of postsInYear) {
    result.getOrInsert(post.data.published.getMonth(), []).push(post);
  }

  return result;
}
