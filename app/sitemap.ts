import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mehraditya.github.io",
      priority: 1,
    },
  ];
}