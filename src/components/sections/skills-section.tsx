import { getSkills, getStrengths, type HomeSection } from "@/lib/content";
import { Section } from "@/components/ui/section";

export function SkillsSection({ index, title, subtitle }: Omit<HomeSection, "id">) {
  const strengths = getStrengths();
  const groups = getSkills();

  return (
    <Section id="skills" index={index} title={title} subtitle={subtitle}>
      {strengths.length > 0 && (
        <ul aria-label="Core strengths" className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {strengths.map((strength) => (
            <li key={strength.name}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium">{strength.name}</span>
                <span className="font-mono text-xs text-accent">{strength.level}%</span>
              </div>
              <div aria-hidden="true" className="mt-3 h-1.5 rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-accent shadow-[0_0_12px_-2px_var(--accent)]"
                  style={{ width: `${strength.level}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {groups.length > 0 && (
        <>
          <h3 className="mt-16 font-mono text-[0.625rem] tracking-widest text-accent uppercase">
            Tech stack
          </h3>
          <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group, i) => (
              <li
                key={group.group}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <p aria-hidden="true" className="font-mono text-[0.625rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-2 font-display text-xl font-bold">{group.group}</h4>
                <ul aria-label={group.group} className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
