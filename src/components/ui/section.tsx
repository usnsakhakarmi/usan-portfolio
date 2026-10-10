import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  id: string;
  /** 1-based position on the page, rendered as the large outlined "02". */
  index: number;
  title: string;
  /** Short mono line under the title, e.g. "where I've been breaking & building things". */
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

/** A home-page section: an outlined index number beside the heading, a rule, then content. */
export function Section({ id, index, title, subtitle, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-16 md:py-20", className)}>
      <Container>
        <header className="flex items-center gap-5 border-b border-border pb-8 md:gap-16 md:pb-10">
          <p
            aria-hidden="true"
            className="font-display text-[clamp(3.25rem,2.25rem+6vw,6.5rem)] leading-none font-medium tracking-tight text-bg [-webkit-text-stroke:3px_var(--accent)] [paint-order:stroke_fill]"
          >
            {String(index).padStart(2, "0")}
          </p>
          <div>
            <h2 id={headingId} className="font-display text-h1 font-bold tracking-[-0.01em]">
              {title}
            </h2>
            {subtitle && <p className="mt-2 font-mono text-xs text-muted">{subtitle}</p>}
          </div>
        </header>
        <div className="mt-10 md:mt-14">{children}</div>
      </Container>
    </section>
  );
}
