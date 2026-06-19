import { categories, resourceFormats } from "@/lib/resource-model";

export const locales = ["sv", "en"] as const;
export type Locale = (typeof locales)[number];
export type Category = (typeof categories)[number];
export type ResourceFormat = (typeof resourceFormats)[number];
export type Audience = "egen-diagnos" | "anhörig" | "båda";

type Messages = {
  siteTitle: string;
  siteDescription: string;
  nav: {
    home: string;
    about: string;
    disclaimer: string;
    submit: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  audiences: Record<Audience, string>;
  categories: Record<Category, string>;
  resourceFormats: Record<ResourceFormat, string>;
  filters: {
    searchLabel: string;
    searchPlaceholder: string;
    audienceLabel: string;
    categoryLabel: string;
    formatLabel: string;
    reset: string;
    resultCount: string;
    noResults: string;
  };
  sections: {
    featured: string;
    allResources: string;
    forWho: string;
  };
  cards: {
    source: string;
    language: string;
    audience: string;
    dateAdded: string;
  };
  about: {
    title: string;
    intro: string;
  };
  disclaimerPage: {
    title: string;
    intro: string;
  };
  submitPage: {
    title: string;
    intro: string;
    formTitle: string;
    download: string;
    helper: string;
  };
  footer: {
    disclaimer: string;
    independence: string;
  };
};

export const messages: Record<Locale, Messages> = {
  sv: {
    siteTitle: "Bipolar Resources",
    siteDescription: "En fristående svensk resursbank om bipolär sjukdom för personer med diagnosen och deras närstående.",
    nav: {
      home: "Resurser",
      about: "Om sajten",
      disclaimer: "Ansvarsfriskrivning",
      submit: "Föreslå en resurs",
    },
    hero: {
      eyebrow: "Fristående resursbank",
      title: "Hitta rätt stöd och kunskap om bipolär sjukdom",
      intro: "Svenska resurser för personer som lever med bipolär sjukdom och för närstående, samlade och tydligt sorterade för att vara enkla att hitta och använda.",
    },
    audiences: {
      "egen-diagnos": "Egen diagnos",
      "anhörig": "Anhörig",
      "båda": "Alla",
    },
    categories: {
      "krisstöd": "Krisstöd",
      "vård-och-rättigheter": "Vård och rättigheter",
      "om-bipolaritet": "Om bipolaritet",
      "vardag-och-återhämtning": "Vardag och återhämtning",
      "relationer-och-anhörigskap": "Relationer och anhörigskap",
      "föreningar-och-gemenskap": "Föreningar och gemenskap",
    },
    resourceFormats: {
      website: "Webbplats",
      book: "Bok",
      video: "Video",
      podcast: "Podd",
      place: "Plats",
    },
    filters: {
      searchLabel: "Sök bland resurser",
      searchPlaceholder: "Sök på titel, beskrivning, kategori eller tagg",
      audienceLabel: "Målgrupp",
      categoryLabel: "Kategori",
      formatLabel: "Format",
      reset: "Rensa filter",
      resultCount: "träffar",
      noResults: "Inga resurser matchade din sökning eller filtrering.",
    },
    sections: {
      featured: "Utvalda resurser",
      allResources: "Alla resurser",
      forWho: "Hitta snabbare efter målgrupp",
    },
    cards: {
      source: "Källa",
      language: "Språk",
      audience: "Målgrupp",
      dateAdded: "Tillagd",
    },
    about: {
      title: "Om sajten",
      intro: "Bipolar-resurser är en fristående, liten resursbank. Syftet är att göra det enklare att hitta relevanta svenska källor utan att ge intryck av att representera en vårdgivare eller organisation.",
    },
    disclaimerPage: {
      title: "Ansvarsfriskrivning",
      intro: "Informationen på den här sajten är endast vägledande och ersätter inte professionell bedömning, behandling eller krisstöd.",
    },
    submitPage: {
      title: "Föreslå en resurs",
      intro: "Här kan du fylla i en resurs och ladda ned en Markdown-fil som sedan kan skickas vidare för granskning och eventuell publicering.",
      formTitle: "Skapa en resursfil",
      download: "Ladda ned Markdown-fil",
      helper: "Filen genereras lokalt i din webbläsare. Inget skickas automatiskt.",
    },
    footer: {
      disclaimer: "Sajten ersätter inte professionell vård, akut psykiatrisk bedömning eller individuell medicinsk rådgivning.",
      independence: "Fristående projekt. Ingen vårdgivare eller organisation står bakom innehållet på sajten.",
    },
  },
  en: {
    siteTitle: "Bipolar Resources",
    siteDescription: "An independent resource library about bipolar disorder.",
    nav: {
      home: "Resources",
      about: "About",
      disclaimer: "Disclaimer",
      submit: "Suggest a resource",
    },
    hero: {
      eyebrow: "Independent resource library",
      title: "Calmly collected bipolar resources",
      intro: "English content is not available yet.",
    },
    audiences: {
      "egen-diagnos": "Diagnosis",
      "anhörig": "Relative",
      "båda": "All",
    },
    categories: {
      "krisstöd": "Crisis support",
      "vård-och-rättigheter": "Care and rights",
      "om-bipolaritet": "About bipolar disorder",
      "vardag-och-återhämtning": "Daily life and recovery",
      "relationer-och-anhörigskap": "Relationships and relatives",
      "föreningar-och-gemenskap": "Associations and community",
    },
    resourceFormats: {
      website: "Website",
      book: "Book",
      video: "Video",
      podcast: "Podcast",
      place: "Place",
    },
    filters: {
      searchLabel: "Search resources",
      searchPlaceholder: "Search title, description, category or tags",
      audienceLabel: "Audience",
      categoryLabel: "Category",
      formatLabel: "Format",
      reset: "Reset filters",
      resultCount: "results",
      noResults: "No resources matched your search or filters.",
    },
    sections: {
      featured: "Featured resources",
      allResources: "All resources",
      forWho: "Browse by audience",
    },
    cards: {
      source: "Source",
      language: "Language",
      audience: "Audience",
      dateAdded: "Added",
    },
    about: {
      title: "About",
      intro: "English content is not available yet.",
    },
    disclaimerPage: {
      title: "Disclaimer",
      intro: "English content is not available yet.",
    },
    submitPage: {
      title: "Suggest a resource",
      intro: "English content is not available yet.",
      formTitle: "Create a resource file",
      download: "Download Markdown file",
      helper: "The file is generated locally in your browser.",
    },
    footer: {
      disclaimer: "This site does not replace professional care, crisis assessment, or individual medical advice.",
      independence: "Independent project. No healthcare provider or organization is behind the site content.",
    },
  },
};

export function t(locale: Locale) {
  return messages[locale];
}
