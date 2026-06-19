import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { getContentfulResourceRecords } from "@/lib/contentful";

export type ResourceEntry = CollectionEntry<"resources">;

export type ResourceRecord = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceEntry["data"]["category"];
  audience: ResourceEntry["data"]["audience"];
  language: ResourceEntry["data"]["language"];
  source: string;
  tags: string[];
  featured: boolean;
  dateAdded: string;
  dateAddedTimestamp: number;
};

export async function getResourcesByLocale(locale: "sv" | "en"): Promise<ResourceRecord[]> {
  const contentfulResources = await getContentfulResourceRecords(locale);

  if (contentfulResources) {
    return sortResources(contentfulResources);
  }

  const entries = await getCollection("resources", ({ id }) => id.startsWith(`${locale}/`));

  return sortResources(entries.map((entry) => toResourceRecord(entry)));
}

function sortResources(resources: ResourceRecord[]): ResourceRecord[] {
  return resources.sort((a, b) => {
    const dateOrder = b.dateAddedTimestamp - a.dateAddedTimestamp;

    if (dateOrder !== 0) {
      return dateOrder;
    }

    return a.title.localeCompare(b.title, "sv");
  });
}

function toResourceRecord(entry: ResourceEntry): ResourceRecord {
  return {
    id: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    url: entry.data.url,
    category: entry.data.category,
    audience: entry.data.audience,
    language: entry.data.language,
    source: entry.data.source,
    tags: entry.data.tags,
    featured: entry.data.featured,
    dateAdded: entry.data.dateAdded,
    dateAddedTimestamp: new Date(entry.data.dateAdded).getTime(),
  };
}
