"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ReadingStat() {
  const ref = useRef<HTMLParagraphElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prose = document.querySelector(".prose");
    const text = (prose?.textContent ?? "").replace(/\s+/g, " ").trim();

    if (!text) {
      node.textContent = "";
      return;
    }

    const words = text.split(" ").filter(Boolean).length;
    const characters = Array.from(text).length;
    node.textContent = `${words.toLocaleString("en-US")} words · ${characters.toLocaleString("en-US")} characters`;
  }, [pathname]);

  return <p className="doc-stat" ref={ref} aria-hidden="true" />;
}
