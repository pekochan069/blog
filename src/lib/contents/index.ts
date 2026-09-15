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

export const totalPages = Math.ceil(contents.length / postsPerPage);

export function getCurrentPagePosts(page: number) {
  console.log(page);
  if (page < 1 || page > totalPages) {
    return;
  }

  return contents.slice((page - 1) * postsPerPage, page * postsPerPage);
}

export function getPostContents(id: string) {
  return contents.find((content) => content.id === id);
}
