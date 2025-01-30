import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().default(""),
  tags: z.array(z.string()).default([]),
  published: z.date(),
  draft: z.boolean(),
});

const posts = defineCollection({
  loader: glob({ pattern: ["**/*.mdoc", "**/*.mdx"], base: "./src/content/posts" }),
  schema: postSchema,
});

export const collections = { posts };
