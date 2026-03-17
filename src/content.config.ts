import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    images: z.array(z.string()).optional(), // Array of paths relative to /public/projects/
    tags: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    github: z.string().url().optional(),
    featured: z.boolean().default(false),
    date: z.date(),
    lang: z.enum(["en", "es"]).default("en"),
  }),
});

export const collections = { projects };
