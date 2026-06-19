import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { audiences, categories, resourceFormats, resourceSchema } from "@/lib/resource-model";

const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: resourceSchema,
});

export const collections = { resources };
export { audiences, categories, resourceFormats, resourceSchema };
