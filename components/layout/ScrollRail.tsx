"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const HIDE_DELAY = 900;

type Section = { ratio: number; id: string; title: string };

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function ScrollRail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState(-1);
  const pathname = usePathname();
  const toc = pathname.startsWith("/research-notes/");

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
    setSections([]);
    setActive(-1);

    let top = 0;
    let height = 0;
    let docMax = 1;
    let ratios: number[] = [];
    let lastValue = "";
    let lastActive = -1;
    let raf = 0;
    let measureRaf = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let observer: ResizeObserver | undefined;

    const measure = () => {
      const vh = window.innerHeight;
      docMax = Math.max(1, document.documentElement.scrollHeight - vh);

      if (!article) {
        top = 0;
        height = 0;
        ratios = [];
        setSections((prev) => (prev.length > 0 ? [] : prev));
        return;
      }

      const rect = article.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = article.offsetHeight;

      if (!toc) {
        ratios = [];
        setSections((prev) => (prev.length > 0 ? [] : prev));
        return;
      }

      const denom = Math.max(1, height - vh);

      const next = Array.from(
        article.querySelectorAll<HTMLElement>(".prose h2")
      ).map<Section>((heading) => {
        const headingTop =
          heading.getBoundingClientRect().top + window.scrollY;
        return {
          ratio: clamp01((headingTop - vh * 0.3 - top) / denom),
          id: heading.id,
          title: heading.textContent?.trim() || "",
        };
      });

      ratios = next.map((section) => section.ratio);
      setSections(next);
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

      const label = p.toFixed(1);
      if (label !== lastValue) {
        lastValue = label;
        if (valueRef.current) valueRef.current.textContent = label;
      }

      let index = ratios.length > 0 ? 0 : -1;
      for (let i = 0; i < ratios.length; i++) {
        if (p >= ratios[i]) index = i;
      }
      if (index !== lastActive) {
        lastActive = index;
        setActive(index);
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

    const show = () => {
      if (hideTimer) clearTimeout(hideTimer);
      root.dataset.visible = "true";
    };

    const scheduleHide = () => {
      if (toc) return;
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (root.matches(":hover") || root.contains(document.activeElement)) {
          return;
        }
        root.dataset.visible = "false";
      }, HIDE_DELAY);
    };

    const onScroll = () => {
      show();
      scheduleHide();
      if (mode === "js" && !raf) raf = requestAnimationFrame(tick);
    };

    const onFocusIn = () => show();
    const onFocusOut = () => scheduleHide();
    const onResize = () => scheduleMeasure();

    measure();
    tick();
    if (toc) show();

    if (document.fonts?.ready) document.fonts.ready.then(scheduleMeasure);
    window.addEventListener("load", scheduleMeasure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    root.addEventListener("pointerenter", show);
    root.addEventListener("pointerleave", scheduleHide);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);

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
      root.removeEventListener("pointerenter", show);
      root.removeEventListener("pointerleave", scheduleHide);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, [pathname, toc]);

  const track = (
    <div className="rail-track">
      <span className="rail-fill" />
      {toc &&
        sections.map((section, i) => (
          <a
            key={`${section.id}-${i}`}
            className="rail-tick"
            href={`#${section.id}`}
            style={{ "--sp": section.ratio } as React.CSSProperties}
            aria-label={section.title}
            aria-current={active === i ? "true" : undefined}
          >
            <span className="rail-tick-mark" />
            <span className="rail-tick-label" aria-hidden="true">
              {section.title}
            </span>
          </a>
        ))}
      <span className="rail-marker" />
      <span className="rail-value" ref={valueRef}>
        0.0
      </span>
    </div>
  );

  return (
    <div
      className="rail-root"
      ref={rootRef}
      data-kind={toc ? "toc" : "progress"}
      aria-hidden={toc ? undefined : "true"}
    >
      {toc ? (
        <nav className="rail" aria-label="Sections">
          {track}
        </nav>
      ) : (
        <div className="rail">{track}</div>
      )}
      <span className="rail-edge" />
    </div>
  );
}
