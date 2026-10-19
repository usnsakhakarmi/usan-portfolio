import { ArrowUpRight } from "lucide-react";
import { getProjects, type HomeSection } from "@/lib/content";
import type { Project, ProjectCategory } from "@/lib/schema";
import { cn, delay } from "@/lib/utils";
import { TiltCard } from "@/components/motion/tilt-card";
import { Section } from "@/components/ui/section";
import { TechList } from "@/components/content/tech-list";

const categoryLabels: Record<ProjectCategory, string> = {
  professional: "Professional",
  freelance: "Freelance",
  personal: "Personal",
  "open-source": "Open source",
};

/** Preview backgrounds, cycled per card. Decorative only. */
const tints = [
  "oklch(0.42 0.16 300)", // violet
  "oklch(0.4 0.11 135)", // green
  "oklch(0.4 0.07 210)", // teal
  "oklch(0.45 0.11 55)", // orange
];

/**
 * Bento layout on large screens: rows alternate wide|narrow and narrow|wide.
 * A last card left alone on its row spans the full width.
 */
function spanFor(i: number, total: number) {
  const isLast = i === total - 1;
  // Two columns on tablets: a lone last card fills the row there too.
  const md = isLast && total % 2 === 1 ? "md:col-span-2" : "";
  if (i % 2 === 0 && isLast) return { className: cn(md, "lg:col-span-3"), wide: true };
  const wide = i % 4 === 0 || i % 4 === 3;
  return { className: cn(md, wide ? "lg:col-span-2" : "lg:col-span-1"), wide };
}

/** Editor window with a small Playwright test named after the project. */
function CodePreview({ project }: { project: Project }) {
  const name = project.title.split(" (")[0] ?? project.title;
  const firstStep = (project.highlights[0] ?? "")
    .split(/[,.(]/)[0]
    ?.split(" ")
    .slice(0, 4)
    .join(" ")
    .toLowerCase();

  return (
    <pre className="overflow-hidden px-5 py-4 font-mono text-[0.6875rem] leading-6 text-fg/80">
      <code>
        describe(<span className="text-fg">&quot;{name}&quot;</span>, () =&gt; {"{"}
        {"\n"}
        {"  "}test(<span className="text-fg">&quot;{firstStep}&quot;</span>, async () =&gt; {"{"}
        {"\n"}
        {"    "}await page.goto(&quot;/{project.slug}&quot;);
        {"\n"}
        {"    "}
        <span className="text-accent">expect(response.ok()).toBeTruthy();</span>
      </code>
    </pre>
  );
}

/** Dashboard mock: a header bar over three columns with one highlighted item. */
function BoardPreview() {
  return (
    <div className="p-4">
      <div className="h-2.5 w-1/3 rounded-full bg-surface-2" />
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[0, 1, 2].map((column) => (
          <div key={column} className="space-y-2 rounded-md border border-border p-2">
            <div className={cn("h-4 rounded", column === 1 ? "bg-accent" : "bg-surface-2")} />
            <div className="h-4 rounded bg-surface-2" />
            {column !== 1 && <div className="h-4 rounded bg-surface-2/60" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  const href = project.links?.live ?? project.links?.repo;
  const tint = tints[index % tints.length];
  const headingId = `project-${project.slug}`;

  return (
    <TiltCard className="h-full">
      <article
        aria-labelledby={headingId}
        className="group relative isolate flex h-full flex-col rounded-2xl border border-border bg-surface p-2 transition-[border-color,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-accent/60 hover:border-accent/50 hover:shadow-[0_30px_60px_-30px_var(--accent)]"
      >
        {/* Highlight that follows the pointer (position set by TiltCard). */}
        <div
          aria-hidden="true"
          className="tilt-glow pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        />
        {/* Decorative preview. */}
        <div
          aria-hidden="true"
          className="relative h-44 overflow-hidden rounded-xl md:h-48"
          style={{ background: `linear-gradient(160deg, ${tint} 0%, var(--surface) 95%)` }}
        >
          <span className="absolute top-3 left-4 font-mono text-[0.625rem] text-fg/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div
            className={cn(
              "absolute bottom-0 h-[78%] overflow-hidden rounded-t-lg border border-b-0 border-border bg-bg/95 shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]",
              wide ? "inset-x-[16%]" : "inset-x-[9%]",
            )}
          >
            <div className="flex gap-1 px-3 pt-2.5">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="size-1.5 rounded-full bg-muted/50" />
              ))}
            </div>
            {index % 2 === 0 ? <CodePreview project={project} /> : <BoardPreview />}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pt-5 pb-4 md:px-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[0.625rem] tracking-widest text-accent uppercase">
                {project.label ?? categoryLabels[project.category]}
              </p>
              <h3 id={headingId} className="mt-1.5 font-display text-xl font-bold">
                {project.title}
              </h3>
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-[scale,box-shadow] duration-300 hover:scale-110 hover:shadow-[0_0_20px_-4px_var(--accent)]"
              >
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">Open {project.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
          {project.summary && <p className="mt-2 text-sm text-muted">{project.summary}</p>}
          {project.company && (
            <p className="mt-2 text-xs text-muted">
              <span className="text-accent">@ {project.company}</span>
            </p>
          )}
          <TechList items={project.tech} className="mt-auto pt-6" />
        </div>
      </article>
    </TiltCard>
  );
}

export function ProjectsSection({ index, title, subtitle }: Omit<HomeSection, "id">) {
  const projects = getProjects();

  return (
    <Section id="work" index={index} title={title} subtitle={subtitle}>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const span = spanFor(i, projects.length);
          return (
            <li
              key={project.slug}
              data-reveal
              style={delay(100 * (i % 3), "reveal")}
              className={span.className}
            >
              <ProjectCard project={project} index={i} wide={span.wide} />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
