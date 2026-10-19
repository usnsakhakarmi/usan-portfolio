"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavItem } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Numbered section nav. Highlights the section currently crossing the upper part of the viewport. */
export function MainNav({ items }: { items: NavItem[] }) {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.split("#")[1] ?? ""))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`/#${entry.target.id}`);
        }
      },
      // A thin band 30–40% down the viewport: whichever section crosses it is "current".
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1 lg:gap-3">
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "nav-link rounded-md px-2 py-2 font-mono text-xs transition-colors hover:text-fg",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <span aria-hidden="true">{String(item.index).padStart(2, "0")}</span>
                <span className="ml-2">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
