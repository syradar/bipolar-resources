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

## Lägg till en resurs

1. Skapa en Markdown-fil i `src/content/resources/sv/`.
2. Fyll i metadata enligt schemat i `src/content.config.ts`.
3. Alternativt: använd sidan `/sv/foresla-resurs/` för att generera en Markdown-fil som sedan kan skickas in för granskning.
