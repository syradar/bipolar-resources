import * as contentful from "contentful";
import type { ZodError } from "astro/zod";
import { resourceSchema } from "@/lib/resource-model";
import type { ResourceRecord } from "@/lib/resources";

type ContentfulResourceSkeleton = {
  contentTypeId: string;
  fields: {
    title: contentful.EntryFieldTypes.Text;
    description: contentful.EntryFieldTypes.Text;
    url?: contentful.EntryFieldTypes.Text;
    category: contentful.EntryFieldTypes.Symbol;
    audience: contentful.EntryFieldTypes.Symbol;
    language?: contentful.EntryFieldTypes.Symbol;
    format?: contentful.EntryFieldTypes.Symbol;
    source?: contentful.EntryFieldTypes.Text;
    creators?: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
    isbn?: contentful.EntryFieldTypes.Symbol;
    tags?: contentful.EntryFieldTypes.Array<contentful.EntryFieldTypes.Symbol>;
    featured?: contentful.EntryFieldTypes.Boolean;
    dateAdded: contentful.EntryFieldTypes.Date;
  };
};

type ContentfulConfig = {
  space: string;
  accessToken: string;
  host: "preview.contentful.com" | "cdn.contentful.com";
  resourceContentType: string;
};

function getContentfulConfig(): ContentfulConfig | null {
  const space = import.meta.env.CONTENTFUL_SPACE_ID;
  const deliveryToken = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;
  const previewToken = import.meta.env.CONTENTFUL_PREVIEW_TOKEN;
  const usePreview = import.meta.env.DEV && Boolean(previewToken);
  const accessToken = usePreview ? previewToken : deliveryToken;

  if (!space || !accessToken) {
    return null;
  }

  return {
    space,
    accessToken,
    host: usePreview ? "preview.contentful.com" : "cdn.contentful.com",
    resourceContentType:
      import.meta.env.CONTENTFUL_RESOURCE_CONTENT_TYPE ?? "contentSchema",
  };
}

export function hasContentfulCredentials(): boolean {
  return Boolean(getContentfulConfig());
}

export function createContentfulClient() {
  const config = getContentfulConfig();

  if (!config) {
    return null;
  }

  return contentful.createClient({
    space: config.space,
    accessToken: config.accessToken,
    host: config.host,
  });
}

export async function getContentfulResourceRecords(
  _locale: "sv" | "en",
): Promise<ResourceRecord[] | null> {
  const config = getContentfulConfig();
  const contentfulClient = createContentfulClient();

  if (!config || !contentfulClient) {
    return null;
  }

  const entries = await getResourceEntries(contentfulClient, config);

  return entries.items
    .map((entry) => toResourceRecord(entry))
    .filter((resource): resource is ResourceRecord => Boolean(resource));
}

function toResourceRecord(
  entry: contentful.Entry<ContentfulResourceSkeleton, undefined, string>,
): ResourceRecord | null {
  const parsed = resourceSchema.safeParse({
      title: entry.fields.title,
      description: entry.fields.description,
      url: entry.fields.url,
      category: entry.fields.category,
      audience: entry.fields.audience,
      language: entry.fields.language,
      format: entry.fields.format ?? "website",
      source: entry.fields.source,
      creators: entry.fields.creators ?? [],
      isbn: entry.fields.isbn,
      tags: entry.fields.tags ?? [],
      featured: entry.fields.featured ?? false,
      dateAdded: entry.sys.createdAt
    });

  if (!parsed.success) {
    const message = formatContentfulEntryError(entry.sys.id, parsed.error);

    if (import.meta.env.DEV) {
      console.warn(message);
      return null;
    }

    throw new Error(message, { cause: parsed.error });
  }

  const resource = parsed.data;
  const source = resource.source?.trim() || getSourceFromUrl(resource.url);

  return {
    ...resource,
    source,
    id: `contentful:${entry.sys.id}`,
    dateAddedTimestamp: new Date(resource.dateAdded).getTime(),
  };
}

async function getResourceEntries(
  contentfulClient: contentful.ContentfulClientApi<undefined>,
  config: ContentfulConfig,
) {
  try {
    return await contentfulClient.getEntries<ContentfulResourceSkeleton>({
      content_type: config.resourceContentType,
      limit: 1000,
    });
  } catch (error) {
    if (isUnknownContentTypeError(error)) {
      throw new Error(
        `Contentful content type "${config.resourceContentType}" does not exist. ` +
        "Create it in Contentful or set CONTENTFUL_RESOURCE_CONTENT_TYPE to the actual content type ID.",
        { cause: error },
      );
    }

    throw error;
  }
}

function getSourceFromUrl(url: string | undefined): string | undefined {
  if (!url) {
    return undefined;
  }

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

function formatContentfulEntryError(entryId: string, error: ZodError): string {
  const invalidFields = error.issues
    .map((issue) => {
      const field = issue.path.join(".") || "entry";

      return `${field}: ${issue.message}`;
    })
    .join("; ");

  return `Contentful resource entry "${entryId}" is missing or has invalid fields: ${invalidFields}.`;
}

function isUnknownContentTypeError(error: unknown): boolean {
  if (error instanceof Error && error.message.includes("unknownContentType")) {
    return true;
  }

  if (typeof error !== "object" || error === null) {
    return false;
  }

  try {
    return JSON.stringify(error).includes("unknownContentType");
  } catch {
    return false;
  }
}
