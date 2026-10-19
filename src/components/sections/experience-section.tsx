import { ArrowRight } from "lucide-react";
import { getExperience, getProfile, type HomeSection } from "@/lib/content";
import { formatDateRange, formatDuration, formatYearMonth } from "@/lib/format";
import type { Experience } from "@/lib/schema";
import { cn, delay } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { TechList } from "@/components/content/tech-list";
import { DurationUntilNow } from "@/components/content/duration-until-now";

/** The home page shows the first few highlights per role; the resume shows all of them. */
const HOME_HIGHLIGHTS = 3;

/*
 * Timeline geometry. Desktop rows are a [card | rail | year] grid that alternates sides; the
 * node sits on the rail next to its card. Each row draws the line from its own node to the next
 * row's node: it leaves sideways, sweeps down, then drops straight into the next node. The
 * curve takes a fixed share of the run, so it keeps its shape whatever the card heights are.
 * Mobile collapses to a straight rail on the left.
 */
const RAIL_WIDTH = 176; // lg:grid-cols-[1fr_11rem_1fr]
const NODE_SIZE = 56; // size-14 halo; the coloured disc inside is size-10
/** Node centre measured from the top of its row on desktop (lg:pt-6 + half the node). */
const NODE_TOP = 24 + NODE_SIZE / 2;
/** Horizontal distance between the left and right node centres. */
const SPREAD = RAIL_WIDTH - NODE_SIZE;
/** Share of the run spent curving before the line drops straight into the next node. */
const BEND = "62%";
/** A bright dashed stroke over a soft glow band. */
const LINE = { width: 2, glow: 7, dash: 8, gap: 5 } as const;

type Side = "left" | "right";

/** Card side for the n-th row: newest on the left, then alternating. */
const cardSide = (i: number): Side => (i % 2 === 0 ? "left" : "right");
/** The node hugs its card, so it sits on the same side of the rail. */
const nodeSide = cardSide;

const layout = {
  left: {
    card: "lg:col-start-1",
    meta: "lg:col-start-3 lg:pl-8",
    node: "lg:justify-start",
  },
  right: {
    card: "lg:col-start-3",
    meta: "lg:col-start-1 lg:pr-8 lg:text-right",
    node: "lg:justify-end",
  },
} as const;

const rowGrid =
  "relative grid grid-cols-[2.75rem_1fr] gap-x-3 lg:grid-cols-[1fr_11rem_1fr] lg:gap-x-0";

function Connector({ from, accent = "violet" }: { from: Side; accent?: "violet" | "pink" }) {
  const gradientId = `timeline-bend-${accent}`;
  const startColor = accent === "pink" ? "var(--pink)" : "var(--accent)";
  const dashes = `repeating-linear-gradient(to bottom, currentColor 0 ${LINE.dash}px, transparent ${LINE.dash}px ${LINE.dash + LINE.gap}px)`;

  return (
    <>
      {/* Desktop. Drawn left → right and mirrored when the line starts on the right. */}
      <div
        aria-hidden="true"
        style={{
          top: NODE_TOP,
          left: `calc(50% - ${RAIL_WIDTH / 2}px + ${NODE_SIZE / 2}px)`,
          width: SPREAD,
        }}
        className={cn(
          "pointer-events-none absolute hidden h-full text-accent lg:block",
          "[filter:drop-shadow(0_0_3px_var(--accent))_drop-shadow(0_0_10px_color-mix(in_oklch,var(--accent)_60%,transparent))]",
          from === "right" && "-scale-x-100",
        )}
      >
        {/* Drawn top-to-bottom as the row scrolls into view (CSS scroll-driven animation). */}
        <div className="tl-draw absolute inset-0">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ height: BEND }}
            className="absolute top-0 left-0 w-full overflow-visible"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={startColor} />
                <stop offset="1" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            {[
              { width: LINE.glow, opacity: 0.12, dash: undefined },
              { width: LINE.width, opacity: 1, dash: `${LINE.dash} ${LINE.gap}` },
            ].map((line) => (
              <path
                key={line.width}
                d="M 0 0 C 45 6, 100 30, 100 100"
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={line.width}
                strokeOpacity={line.opacity}
                strokeDasharray={line.dash}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <span
            className="absolute bottom-0 bg-current opacity-[0.12]"
            style={{ top: BEND, right: -LINE.glow / 2, width: LINE.glow }}
          />
          <span
            className="absolute bottom-0"
            style={{
              top: BEND,
              right: -LINE.width / 2,
              width: LINE.width,
              backgroundImage: dashes,
            }}
          />
        </div>
        {/* Travelling light: rides the drawing edge, visible along the straight drop. */}
        <span
          className="absolute inset-y-0 w-4"
          style={{ right: -8, clipPath: `inset(${BEND} 0 0 0)` }}
        >
          <span className="tl-travel absolute inset-0 block">
            <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-fg shadow-[0_0_10px_3px_var(--accent)]" />
          </span>
        </span>
      </div>
      {/* Mobile: a straight dashed rail. */}
      <span
        aria-hidden="true"
        className={cn(
          "tl-draw absolute top-[1.375rem] left-[1.375rem] h-full -translate-x-px border-l-2 border-dashed lg:hidden",
          accent === "pink" ? "border-pink/70" : "border-accent/70",
        )}
      />
    </>
  );
}

/** A coloured disc inside a dark halo ring. */
function Node({
  children,
  variant = "solid",
  live = false,
}: {
  children: React.ReactNode;
  variant?: "solid" | "next";
  /** The current role: a slow pulse marks it as ongoing. */
  live?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      data-reveal="scale"
      className="relative z-10 flex size-11 items-center justify-center rounded-full border border-border bg-surface lg:size-14"
    >
      {live && <span className="pulse-ring absolute inset-1.5 rounded-full text-accent/60" />}
      {variant === "solid" ? (
        <span className="relative flex size-8 items-center justify-center rounded-full bg-accent font-mono text-[0.625rem] font-medium text-accent-fg shadow-[0_0_18px_-2px_var(--accent)] lg:size-10 lg:text-xs">
          {children}
        </span>
      ) : (
        <span className="flex size-7 items-center justify-center rounded-full border-[1.5px] border-dashed border-pink font-mono text-sm text-pink lg:size-9">
          {children}
        </span>
      )}
    </span>
  );
}

function OutlinedYear({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-display text-5xl leading-none font-bold tracking-tight text-bg [-webkit-text-stroke:3px_var(--accent)] [paint-order:stroke_fill]">
      {children}
    </span>
  );
}

const cardClass =
  "rounded-2xl border border-border bg-surface p-5 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_50px_-28px_var(--accent)] lg:p-7";
/** Accent bar on the card's left edge, beside the heading. */
const cardHeading =
  "relative font-display text-xl font-bold before:absolute before:inset-y-0.5 before:-left-5 before:w-0.5 before:rounded-full before:bg-accent lg:text-2xl lg:before:-left-7";

function JobCard({ job }: { job: Experience }) {
  return job.roles.length > 1 ? <PromotionCard job={job} /> : <SingleRoleCard job={job} />;
}

function SingleRoleCard({ job }: { job: Experience }) {
  const role = job.roles[0];
  if (!role) return null;

  return (
    <article className={cardClass}>
      <h3 className={cardHeading}>{role.title}</h3>
      <p className="mt-1 text-xs text-muted">
        <span className="text-sm font-medium text-accent">@ {job.company}</span>
        {[job.type, job.workMode, job.location].filter(Boolean).map((part) => (
          <span key={part}> · {part}</span>
        ))}
      </p>
      <ul className="mt-5 space-y-2.5 text-sm text-muted">
        {role.highlights.slice(0, HOME_HIGHLIGHTS).map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <ArrowRight aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <TechList items={job.tech} className="mt-6" />
    </article>
  );
}

/** Highlights shown per role on a promotion card, which lists several roles. */
const PROMOTION_HIGHLIGHTS = 2;

/** One company, several titles: a small inner timeline, newest role first. */
function PromotionCard({ job }: { job: Experience }) {
  return (
    <article className={cardClass}>
      <h3 className={cardHeading}>{job.company}</h3>
      <p className="mt-1.5 text-sm text-muted">
        {[job.type, job.workMode, job.location].filter(Boolean).join(" · ")}
      </p>

      <ol className="mt-6">
        {job.roles.map((role, i) => {
          const isCurrent = i === 0;
          const isLast = i === job.roles.length - 1;

          return (
            <li
              key={`${role.title}-${role.start}`}
              className={cn("relative grid grid-cols-[1.25rem_1fr] gap-x-4", !isLast && "pb-8")}
            >
              {/* Rail from this role's dot down to the next one. */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-[calc(0.625rem-0.75px)] h-full w-[1.5px] bg-accent/50"
                />
              )}
              <span aria-hidden="true" className="relative flex justify-center pt-2">
                {isCurrent ? (
                  <span className="size-3 rounded-full bg-accent ring-4 ring-accent/25" />
                ) : (
                  <span className="size-3 rounded-full border-2 border-muted bg-surface" />
                )}
              </span>

              <div>
                <h4 className="font-display text-lg leading-snug font-bold">{role.title}</h4>
                <p
                  className={cn("mt-1 font-mono text-xs", isCurrent ? "text-accent" : "text-muted")}
                >
                  {formatYearMonth(role.start)} — {role.end ? formatYearMonth(role.end) : "Present"}
                  {role.end ? (
                    formatDuration(role.start, role.end) && (
                      <> · {formatDuration(role.start, role.end)}</>
                    )
                  ) : (
                    <DurationUntilNow start={role.start} />
                  )}
                </p>
                <div className="mt-3 space-y-2 text-sm text-muted">
                  {role.highlights.slice(0, PROMOTION_HIGHLIGHTS).map((highlight) => (
                    <p key={highlight}>{highlight}</p>
                  ))}
                </div>
                {role.skills.length > 0 && (
                  <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium"
                      >
                        <span aria-hidden="true" className="text-[0.625rem]">
                          ◆
                        </span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </article>
  );
}

export function ExperienceSection({ index, title, subtitle }: Omit<HomeSection, "id">) {
  const jobs = getExperience();
  const { availability } = getProfile();
  const firstSide = nodeSide(0);
  const nextSide: Side = firstSide === "left" ? "right" : "left";

  return (
    <Section id="experience" index={index} title={title} subtitle={subtitle}>
      {/* "What's next" invitation above the newest role, only while open to new work. */}
      {availability && (
        <div className={cn(rowGrid, "pb-12 lg:pb-16")}>
          <div
            className={cn(
              "col-start-1 row-start-1 flex lg:col-start-2 lg:pt-6",
              layout[nextSide].node,
            )}
          >
            <Node variant="next">?</Node>
          </div>
          <div
            data-reveal="fade"
            style={delay(200, "reveal")}
            className={cn(
              "col-start-2 row-start-1 self-center lg:self-start lg:pt-[2.125rem]",
              nextSide === "right"
                ? "lg:col-start-3 lg:pl-5"
                : "lg:col-start-1 lg:pr-5 lg:text-right",
            )}
          >
            <p className="font-mono text-[0.625rem] tracking-widest text-pink uppercase">Next</p>
            <a
              href="#contact"
              className="group font-display font-semibold transition-colors hover:text-pink"
            >
              Your project? Let&apos;s build it together
              <ArrowRight
                aria-hidden="true"
                className="ml-1.5 inline size-4 align-[-0.125em] transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
          <Connector from={nextSide} accent="pink" />
        </div>
      )}

      <ol>
        {jobs.map((job, i) => {
          const side = cardSide(i);
          const isLast = i === jobs.length - 1;

          return (
            <li
              key={`${job.company}-${job.start}`}
              className={cn(rowGrid, !isLast && "pb-12 lg:pb-16")}
            >
              <div
                className={cn(
                  "relative col-start-1 row-start-1 flex lg:col-start-2 lg:pt-6",
                  layout[side].node,
                )}
              >
                <Node live={i === 0 && job.end === null}>{String(i + 1).padStart(2, "0")}</Node>
                {isLast && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-[5.25rem] hidden font-mono text-[0.625rem] whitespace-nowrap text-muted lg:block",
                      side === "left" ? "left-1" : "right-1",
                    )}
                  >
                    {"// where it all started"}
                  </span>
                )}
              </div>

              <div
                data-reveal
                style={delay(180, "reveal")}
                className={cn("col-start-2 row-start-1 lg:pt-7", layout[side].meta)}
              >
                <p>
                  <span className="sr-only">{formatDateRange(job.start, job.end)}</span>
                  <span aria-hidden="true">
                    <OutlinedYear>{job.start.slice(0, 4)}</OutlinedYear>
                    <span className="mt-2 block font-mono text-xs">
                      → {job.end ? formatYearMonth(job.end) : "Present"}
                    </span>
                  </span>
                </p>
                {job.type && (
                  <p className="mt-1 font-mono text-[0.625rem] tracking-widest text-muted uppercase">
                    {job.type}
                  </p>
                )}
                {isLast && (
                  <p
                    aria-hidden="true"
                    className="mt-3 font-mono text-[0.625rem] text-muted lg:hidden"
                  >
                    {"// where it all started"}
                  </p>
                )}
              </div>

              <div
                // Cards slide in from their own side of the timeline.
                data-reveal={side}
                style={delay(80, "reveal")}
                className={cn(
                  "col-start-2 row-start-2 mt-5 lg:row-start-1 lg:mt-0",
                  layout[side].card,
                )}
              >
                <JobCard job={job} />
              </div>

              {!isLast && <Connector from={side} />}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
