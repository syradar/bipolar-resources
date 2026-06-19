import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://syradar.github.io",
  base: "/bipolar-resources",
  output: "static",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "National Park",
      cssVariable: "--font-national-park",
      weights: ["200 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Verdana", "sans-serif"],
    },
  ],
});
