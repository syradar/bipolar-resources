import { create, load, save, search, upsert } from "@orama/orama";
import type { RawData } from "@orama/orama";
import type { ResourceRecord } from "@/lib/resources";

export type ResourceFilters = {
  q: string;
  audience: "" | ResourceRecord["audience"];
  category: "" | ResourceRecord["category"];
  format: "" | ResourceRecord["format"];
};

export type SearchResourcesResult = {
  records: ResourceRecord[];
  total: number;
};

const resourceSchema = {
  id: "string",
  title: "string",
  description: "string",
  url: "string",
  category: "string",
  audience: "string",
  language: "string",
  source: "string",
  format: "string",
  creators: "string[]",
  isbn: "string",
  tags: "string[]",
  dateAddedTimestamp: "number",
} as const;

function createEmptyResourcesDb() {
  return create({ schema: resourceSchema });
}

export function normalizeFilters(input: Partial<ResourceFilters>): ResourceFilters {
  return {
    q: (input.q ?? "").trim(),
    audience: (input.audience ?? "") as ResourceFilters["audience"],
    category: (input.category ?? "") as ResourceFilters["category"],
    format: (input.format ?? "") as ResourceFilters["format"],
  };
}

export async function buildResourceIndexSnapshot(records: ResourceRecord[]): Promise<RawData> {
  const db = createEmptyResourcesDb();

  for (const record of records) {
    await upsert(db, {
      ...record,
      url: record.url ?? "",
      source: record.source ?? "",
      language: record.language ?? "",
      isbn: record.isbn ?? "",
    });
  }

  return save(db);
}

export function loadResourceIndex(snapshot: RawData) {
  const db = createEmptyResourcesDb();
  load(db, snapshot);
  return db;
}

function matchesFacet(record: ResourceRecord, filters: ResourceFilters): boolean {
  if (filters.audience && record.audience !== filters.audience) {
    return false;
  }

  if (filters.category && record.category !== filters.category) {
    return false;
  }

  if (filters.format && record.format !== filters.format) {
    return false;
  }

  return true;
}

export async function searchResources(
  db: ReturnType<typeof loadResourceIndex>,
  records: ResourceRecord[],
  rawFilters: Partial<ResourceFilters>,
): Promise<SearchResourcesResult> {
  const filters = normalizeFilters(rawFilters);

  if (filters.q) {
    const textResult = (await search(db, {
      term: filters.q,
      properties: [
        "title",
        "description",
        "category",
        "audience",
        "source",
        "format",
        "creators",
        "isbn",
        "tags",
      ],
      tolerance: 1,
      limit: records.length,
    })) as { hits: Array<{ id: string | number }> };

    const byId = new Map(records.map((record) => [record.id, record]));
    const filtered = textResult.hits
      .map((hit) => byId.get(String(hit.id)))
      .filter((record): record is ResourceRecord => Boolean(record))
      .filter((record) => matchesFacet(record, filters));

    return {
      records: filtered,
      total: filtered.length,
    };
  }

  const filtered = records.filter((record) => matchesFacet(record, filters));

  return {
    records: filtered,
    total: filtered.length,
  };
}
