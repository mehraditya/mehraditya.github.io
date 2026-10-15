"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const LIFT_GAP = 14;

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

  useEffect(() => {
    const node = ref.current;
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!node || !footer) return;

    let raf = 0;
    const observers: ResizeObserver[] = [];

    const place = () => {
      raf = 0;
      const style = getComputedStyle(node);
      if (style.display === "none") {
        node.style.transform = "";
        return;
      }
      const bottom = parseFloat(style.bottom) || 22.4;
      const footerTop = footer.getBoundingClientRect().top;
      const lift = Math.max(
        0,
        window.innerHeight - bottom - footerTop + LIFT_GAP
      );
      node.style.transform = lift > 0 ? `translateY(-${Math.round(lift)}px)` : "";
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    if (document.fonts?.ready) document.fonts.ready.then(schedule);

    if (typeof ResizeObserver !== "undefined") {
      const article = document.querySelector(".article");
      for (const target of [footer, article]) {
        if (!target) continue;
        const observer = new ResizeObserver(schedule);
        observer.observe(target);
        observers.push(observer);
      }
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      for (const observer of observers) observer.disconnect();
      node.style.transform = "";
    };
  }, [pathname]);

  return <p className="doc-stat" ref={ref} aria-hidden="true" />;
}
