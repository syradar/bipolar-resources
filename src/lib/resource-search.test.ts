import assert from "node:assert/strict";
import test from "node:test";
import {
  buildResourceIndexSnapshot,
  loadResourceIndex,
  searchResources,
} from "./resource-search.ts";
import type { ResourceRecord } from "./resources.ts";

const baseResource = {
  description: "Kort beskrivning.",
  category: "om-bipolaritet",
  audience: "egen-diagnos",
  creators: [],
  tags: [],
  featured: false,
  dateAdded: "2026-06-19",
  dateAddedTimestamp: new Date("2026-06-19").getTime(),
} satisfies Partial<ResourceRecord>;

test("resources can be filtered by format", async () => {
  const records: ResourceRecord[] = [
    {
      ...baseResource,
      id: "website-resource",
      title: "Webbresurs",
      url: "https://example.com",
      format: "website",
    },
    {
      ...baseResource,
      id: "book-resource",
      title: "Bokresurs",
      format: "book",
    },
  ] as ResourceRecord[];

  const snapshot = await buildResourceIndexSnapshot(records);
  const db = loadResourceIndex(snapshot);
  const result = await searchResources(db, records, {
    q: "",
    format: "book",
  });

  assert.deepEqual(
    result.records.map((record) => record.id),
    ["book-resource"],
  );
});
