import assert from "node:assert/strict";
import test from "node:test";
import { resourceSchema } from "./resource-model.ts";

const baseResource = {
  title: "En resurs",
  description: "Kort beskrivning.",
  category: "om-bipolaritet",
  audience: "egen-diagnos",
  language: "sv",
  featured: false,
  dateAdded: "2026-06-19",
} as const;

test("book resources do not require a URL", () => {
  const result = resourceSchema.safeParse({
    ...baseResource,
    format: "book",
  });

  assert.equal(result.success, true);
});

test("website resources require a URL", () => {
  const result = resourceSchema.safeParse({
    ...baseResource,
    format: "website",
  });

  assert.equal(result.success, false);
});

test("resources with no format default to website", () => {
  const result = resourceSchema.safeParse({
    ...baseResource,
    url: "https://example.com",
  });

  assert.equal(result.success, true);
  assert.ok(result.success);
  assert.equal(result.data.format, "website");
});

test("resources do not require a language", () => {
  const { language: _language, ...resourceWithoutLanguage } = baseResource;
  const result = resourceSchema.safeParse({
    ...resourceWithoutLanguage,
    url: "https://example.com",
  });

  assert.equal(result.success, true);
});
