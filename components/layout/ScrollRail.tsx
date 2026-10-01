"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const HIDE_DELAY = 900;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function ScrollRail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const [sections, setSections] = useState<number[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const article = document.querySelector<HTMLElement>(".article");
    const supportsCss =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: scroll()");
    const mode: "css" | "js" = supportsCss && !article ? "css" : "js";

    root.dataset.mode = mode;
    root.style.setProperty("--p", "0");
    root.removeAttribute("data-visible");

    let top = 0;
    let height = 0;
    let docMax = 1;
    let ratios: number[] = [];
    let lastPct = -1;
    let lastSection = -1;
    let raf = 0;
    let measureRaf = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let observer: ResizeObserver | undefined;

    const measure = () => {
      const doc = document.documentElement;
      const vh = window.innerHeight;
      docMax = Math.max(1, doc.scrollHeight - vh);

      if (!article) {
        ratios = [];
        setSections([]);
        return;
      }

      const rect = article.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = article.offsetHeight;
      const denom = Math.max(1, height - vh);
      ratios = Array.from(
        article.querySelectorAll<HTMLElement>(".prose h2")
      ).map((heading) => {
        const headingTop =
          heading.getBoundingClientRect().top + window.scrollY;
        return clamp01((headingTop - top) / denom);
      });
      setSections(ratios);
    };

    const progress = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (!article) return clamp01(y / docMax);
      if (height > vh + 4) return clamp01((y - top) / Math.max(1, height - vh));
      return clamp01((y + vh - top) / Math.max(1, height + vh));
    };

    const tick = () => {
      raf = 0;
      if (mode !== "js") return;

      const p = progress();
      root.style.setProperty("--p", p.toFixed(4));

      const pct = Math.round(p * 100);
      if (pct !== lastPct) {
        lastPct = pct;
        if (valueRef.current) valueRef.current.textContent = `${pct}%`;
      }

      if (ratios.length > 0) {
        let index = 0;
        for (let i = 0; i < ratios.length; i++) {
          if (p >= ratios[i]) index = i + 1;
        }
        if (index !== lastSection) {
          lastSection = index;
          const ticks = root.querySelectorAll<HTMLElement>(".rail-section");
          ticks.forEach((el, i) => {
            if (i === index - 1) el.setAttribute("data-active", "");
            else el.removeAttribute("data-active");
          });
        }
      }
    };

    const scheduleMeasure = () => {
      if (measureRaf) cancelAnimationFrame(measureRaf);
      measureRaf = requestAnimationFrame(() => {
        measureRaf = 0;
        measure();
        tick();
      });
    };

    const onScroll = () => {
      if (root.dataset.visible !== "true") root.dataset.visible = "true";
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        root.dataset.visible = "false";
      }, HIDE_DELAY);
      if (mode === "js" && !raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => scheduleMeasure();

    measure();
    tick();

    if (document.fonts?.ready) document.fonts.ready.then(scheduleMeasure);
    window.addEventListener("load", scheduleMeasure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    if (article && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(scheduleMeasure);
      observer.observe(article);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (measureRaf) cancelAnimationFrame(measureRaf);
      if (hideTimer) clearTimeout(hideTimer);
      observer?.disconnect();
      window.removeEventListener("load", scheduleMeasure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return (
    <div className="rail-root" ref={rootRef} aria-hidden="true">
      <div className="rail">
        <div className="rail-track">
          <span className="rail-fill" />
          {sections.map((ratio, i) => (
            <span
              key={i}
              className="rail-section"
              style={{ "--sp": ratio } as React.CSSProperties}
            />
          ))}
          <span className="rail-marker" />
          <span className="rail-value" ref={valueRef}>
            0%
          </span>
        </div>
      </div>
      <span className="rail-edge" />
    </div>
  );
}
