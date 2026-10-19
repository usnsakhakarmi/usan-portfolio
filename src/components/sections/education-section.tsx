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
                  "flex h-full flex-col rounded-2xl border p-6 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_var(--accent)] md:p-7",
                  featured
                    ? "border-accent/70 bg-[linear-gradient(160deg,color-mix(in_oklch,var(--accent)_16%,var(--surface))_0%,var(--surface)_70%)]"
                    : "border-border bg-surface hover:border-accent/50",
                )}
              >
                <div className="flex items-center justify-between gap-4 font-mono text-[0.625rem] tracking-widest uppercase">
                  <span className="text-accent">{item.level}</span>
                  <span className="text-muted">
                    <span aria-hidden="true">{yearRange(item.start, item.end)}</span>
                    <span className="sr-only">{formatDateRange(item.start, item.end)}</span>
                  </span>
                </div>

                <h3 className="mt-6 min-h-[2lh] font-display text-xl leading-snug font-bold">
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
