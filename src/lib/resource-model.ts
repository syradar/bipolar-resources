import { z } from "zod";

export const audiences = ["egen-diagnos", "anhörig", "båda"] as const;
export const categories = [
  "krisstöd",
  "vård-och-rättigheter",
  "om-bipolaritet",
  "vardag-och-återhämtning",
  "relationer-och-anhörigskap",
  "föreningar-och-gemenskap",
] as const;
export const resourceFormats = [
  "website",
  "book",
  "video",
  "podcast",
  "place",
] as const;

export const resourceSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.url().optional(),
  category: z.enum(categories),
  audience: z.enum(audiences),
  language: z.enum(["sv", "en"]).optional(),
  format: z.enum(resourceFormats).default("website"),
  source: z.string().optional(),
  creators: z.array(z.string().trim().min(1)).default([]),
  isbn: z.string().optional(),
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
}).refine((resource) => resource.format !== "website" || Boolean(resource.url), {
  message: "Website resources must have a URL",
  path: ["url"],
});
