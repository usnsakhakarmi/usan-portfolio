"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page. Every element with `data-reveal` gets
 * `.is-visible` the first time it scrolls into view; the CSS in globals.css does the rest.
 * Elements reveal once and are then unobserved, so nothing re-animates on scroll back.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.08 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
