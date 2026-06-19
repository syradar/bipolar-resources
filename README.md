# bipolar-resources

Fristående resursbank om bipolär sjukdom, byggd med Astro och avsedd för personer med diagnosen och deras anhöriga.

## Kom igång

```bash
pnpm install
pnpm dev
```

## Struktur

- `src/content/resources/` innehåller resurser som Markdown-filer.
- `src/pages/sv/` innehåller svenska sidor under språkprefixet `/sv/`.
- `src/lib/resource-search.ts` bygger och läser ett statiskt sökindex för resurser.
- `src/lib/contentful.ts` hämtar resurser från Contentful vid build när credentials finns.

## Contentful

Sajten kan bygga resurser från Contentful utan klient-JavaScript. Om Contentful-miljövariabler saknas används Markdown-filerna i `src/content/resources/` som fallback.

Content type ID är `contentSchema` som standard och kan ändras med `CONTENTFUL_RESOURCE_CONTENT_TYPE`.

Fält i Contentful:

- `title` text
- `description` text
- `url` text
- `category` text, ett av värdena i `src/content.config.ts`
- `audience` text, ett av värdena i `src/content.config.ts`
- `language` text, `sv` eller `en`
- `source` text, valfritt. Om det saknas används domänen från `url`.
- `tags` lista med text
- `featured` boolean
- `dateAdded` date

Lokalt:

```bash
cp .env.example .env
pnpm dev
```

GitHub Actions läser följande från repository secrets:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_TOKEN`
- `CONTENTFUL_PREVIEW_TOKEN`

Lägg eventuellt `CONTENTFUL_RESOURCE_CONTENT_TYPE` som repository variable om content type ID inte är `contentSchema`.

## Lägg till en resurs

1. Skapa en Markdown-fil i `src/content/resources/sv/`.
2. Fyll i metadata enligt schemat i `src/content.config.ts`.
3. Alternativt: använd sidan `/sv/foresla-resurs/` för att generera en Markdown-fil som sedan kan skickas in för granskning.
