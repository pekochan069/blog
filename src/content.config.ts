import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const postSchema = z.object({
  category: z.string().default(""),
  description: z.string().optional(),
  draft: z.coerce.boolean(),
  published: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  title: z.string(),
});

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.mdx" }),
  schema: postSchema,
});

export const collections = { posts };
