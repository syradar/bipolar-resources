import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const audiences = ["egen-diagnos", "anhörig", "båda"] as const;
const categories = [
  "krisstöd",
  "vård-och-rättigheter",
  "om-bipolaritet",
  "vardag-och-återhämtning",
  "relationer-och-anhörigskap",
  "föreningar-och-gemenskap",
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
    tags: z.array(z.string().trim()
      .min(1)
      .refine(
        (value) => {
          const firstLetter = value.match(/\p{L}/u)?.[0];

          return !firstLetter || firstLetter === firstLetter.toLocaleUpperCase("sv-SE");
        },
        {
          message: "Must use sentence case",
        },
      )).default([]),
    featured: z.boolean().default(false),
    dateAdded: z.string(),
  }),
});

export const collections = { resources };
export { audiences, categories };
