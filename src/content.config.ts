import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const audiences = ["egen-diagnos", "anhorig", "bada"] as const;
const categories = [
  "krisstod",
  "vard-och-rattigheter",
  "om-bipolaritet",
  "vardag-och-aterhamtning",
  "relationer-och-anhorigskap",
  "foreningar-och-gemenskap",
] as const;

const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.url(),
    category: z.enum(categories),
    audience: z.enum(audiences),
    language: z.enum(["sv", "en"]),
    source: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    dateAdded: z.string(),
  }),
});

export const collections = { resources };
export { audiences, categories };
