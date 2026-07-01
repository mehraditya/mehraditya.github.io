import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Geist({subsets:["latin"], variable:"--font-sans"});
const serif = Newsreader({subsets:["latin"], variable:"--font-serif"});

export const metadata: Metadata = {
  metadataBase: new URL("https://mehraditya.github.io"),

  title: {
    default: "Research Notebook",
    template: "%s · Research Notebook",
  },

  description:
    "Notes from papers I'm reading, questions I'm exploring, and systems I'm building.",

  keywords: [
    "Machine Learning",
    "Mechanistic Interpretability",
    "Computer Vision",
    "Embodied AI",
    "Robotics",
    "Research",
    "Diffusion Models",
  ],

  authors: [
    {
      name: "Aditya Mehra",
    },
  ],

  creator: "Aditya Mehra",

  openGraph: {
    title: "Research Notebook",
    description:
      "Notes from papers I'm reading, questions I'm exploring, and systems I'm building.",
    url: "https://mehraditya.github.io",
    siteName: "Research Notebook",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Research Notebook",
    description:
      "Notes from papers I'm reading, questions I'm exploring, and systems I'm building.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#F7F3EA",
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        {children}
      </body>
    </html>
  );
}