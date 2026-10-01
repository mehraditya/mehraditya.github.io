import { MetadataRoute } from "next";
import { getNotes, getWritings } from "@/lib/content";

export const dynamic = "force-static";

const BASE = "https://mehraditya.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      priority: 1,
    },
    {
      url: `${BASE}/research-notes`,
    },
    {
      url: `${BASE}/writings`,
    },
    {
      url: `${BASE}/about`,
    },
    ...getNotes().map((note) => ({
      url: `${BASE}/research-notes/${note.slug}`,
    })),
    ...getWritings().map((writing) => ({
      url: `${BASE}/writings/${writing.slug}`,
    })),
  ];
}
