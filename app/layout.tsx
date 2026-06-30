import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Research Notebook",
  description: "Notes from papers I'm reading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}