import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      images: z.array(image()).optional(),
      tags: z.array(z.string()).optional(),
      url: z.url().optional(),
      github: z.url().optional(),
      featured: z.boolean().default(false),
      date: z.date(),
      lang: z.enum(["en", "es"]).default("en"),
    }),
});

export const collections = { projects };
