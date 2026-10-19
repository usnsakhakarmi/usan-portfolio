"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page. Elements with `data-reveal` get `.is-visible`
 * when they scroll into view and lose it once fully out of view, so reveals replay in both
 * scroll directions. The CSS in globals.css does the animating.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Show once a sliver is on screen; hide only when completely off screen,
          // so elements at the viewport edge never flicker.
          if (entry.intersectionRatio >= 0.08) entry.target.classList.add("is-visible");
          else if (!entry.isIntersecting) entry.target.classList.remove("is-visible");
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: [0, 0.08] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
