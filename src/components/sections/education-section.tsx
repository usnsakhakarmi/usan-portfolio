import Image from "next/image";
import { getEducation, type HomeSection } from "@/lib/content";
import { formatDateRange } from "@/lib/format";
import { cn, delay } from "@/lib/utils";
import { Section } from "@/components/ui/section";

/** "2022 — 2026": cards show years only; the full range is read out to screen readers. */
const yearRange = (start: string, end: string | null) =>
  `${start.slice(0, 4)} — ${end ? end.slice(0, 4) : "Present"}`;

export function EducationSection({ index, title, subtitle }: Omit<HomeSection, "id">) {
  return (
    <Section id="education" index={index} title={title} subtitle={subtitle}>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {getEducation().map((item, i) => {
          // The newest (highest) qualification is highlighted.
          const featured = i === 0;

          return (
            <li
              key={`${item.institution}-${item.start}`}
              data-reveal
              style={delay(110 * i, "reveal")}
            >
              <div
                className={cn(
                  "group flex h-full flex-col rounded-2xl border p-6 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_var(--accent)] md:p-7",
                  featured
                    ? "border-accent/70 bg-[linear-gradient(160deg,color-mix(in_oklch,var(--accent)_16%,var(--surface))_0%,var(--surface)_70%)]"
                    : "border-border bg-surface hover:border-accent/50",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  {item.logo ? (
                    // White tile: school logos are designed for a light background.
                    // Decorative (alt=""): the institution is named in the text below.
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_10px_28px_-14px_var(--accent)] ring-1 ring-border transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={item.logo}
                        alt=""
                        width={64}
                        height={64}
                        className="size-full object-contain"
                      />
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="pt-1 font-mono text-[0.625rem] tracking-widest text-muted uppercase">
                    <span aria-hidden="true">{yearRange(item.start, item.end)}</span>
                    <span className="sr-only">{formatDateRange(item.start, item.end)}</span>
                  </span>
                </div>

                <p className="mt-6 font-mono text-[0.625rem] tracking-widest text-accent uppercase">
                  {item.level}
                </p>
                <h3 className="mt-2 min-h-[2lh] font-display text-xl leading-snug font-bold">
                  {item.qualification}
                </h3>
                <p className="mt-5 border-b border-border pb-4 text-sm font-medium">
                  {item.institution}
                </p>

                <div className="mt-4 space-y-2 text-[0.8125rem] leading-relaxed text-muted">
                  {item.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
