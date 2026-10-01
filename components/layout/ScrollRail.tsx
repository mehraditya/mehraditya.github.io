"use client";

import { useEffect, useState } from "react";

export default function ScrollRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <span className="rail-value">{progress.toFixed(2)}</span>
      <div
        className="rail-track"
        style={{ "--rail-progress": progress } as React.CSSProperties}
      >
        <span className="rail-fill" />
        <span className="rail-tick" />
        <span className="rail-tick" />
        <span className="rail-tick" />
        <span className="rail-tick" />
        <span className="rail-tick" />
      </div>
    </div>
  );
}
