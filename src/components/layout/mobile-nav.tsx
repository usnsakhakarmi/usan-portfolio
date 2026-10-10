"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/content";

type MobileNavProps = {
  items: NavItem[];
  /** Resume PDF; the menu entry is hidden until a resume is added. */
  resumeHref?: string;
};

/**
 * Full-screen menu built on the native modal <dialog>, which provides focus trapping,
 * Escape-to-close and an inert background without extra dependencies.
 */
export function MobileNav({ items, resumeHref }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex size-11 items-center justify-center rounded-md text-fg"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-fg backdrop:bg-transparent"
      >
        <div className="flex h-16 items-center justify-end px-4 sm:px-6">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-md"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="px-4 sm:px-6">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex min-h-14 items-baseline gap-4 py-3 text-2xl font-medium tracking-tight"
                >
                  <span aria-hidden="true" className="font-mono text-sm text-accent">
                    {String(item.index).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            {resumeHref && (
              <li>
                <a
                  href={resumeHref}
                  onClick={close}
                  className="flex min-h-14 items-center text-2xl font-medium tracking-tight"
                >
                  Resume
                </a>
              </li>
            )}
          </ul>
        </nav>
      </dialog>
    </div>
  );
}
