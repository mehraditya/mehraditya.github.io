import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import ScrollRail from "@/components/layout/ScrollRail";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mehraditya.github.io"),

  title: {
    default: "Aditya Mehra",
    template: "%s · Aditya Mehra",
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
    title: "Aditya Mehra",
    description:
      "Notes from papers I'm reading, questions I'm exploring, and systems I'm building.",
    url: "https://mehraditya.github.io",
    siteName: "Aditya Mehra",
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
    title: "Aditya Mehra",
    description:
      "Notes from papers I'm reading, questions I'm exploring, and systems I'm building.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F8F6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <ScrollRail />
        <div className="page">
          <main className="page-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
