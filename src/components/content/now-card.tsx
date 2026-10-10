import type { Stat } from "@/lib/content";
import type { Profile } from "@/lib/schema";
import { cn } from "@/lib/utils";

type NowCardProps = {
  items: Profile["now"];
  stats: Stat[];
};

/** "What I'm doing now" plus counted stats. Renders nothing when both are empty. */
export function NowCard({ items, stats }: NowCardProps) {
  if (items.length === 0 && stats.length === 0) return null;

  return (
    <section
      aria-labelledby={items.length > 0 ? "now-heading" : undefined}
      aria-label={items.length > 0 ? undefined : "At a glance"}
      className="rounded-2xl border border-border bg-surface p-6 shadow-2xl shadow-black/40"
    >
      {items.length > 0 && (
        <>
          <h2
            id="now-heading"
            className="font-mono text-[0.6875rem] font-normal tracking-widest text-accent uppercase"
          >
            What I&apos;m doing now
          </h2>
          <ul className="mt-5 space-y-4">
            {items.map((item, i) => (
              <li key={item.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-[0.4rem] size-2 shrink-0 rounded-full border-[1.5px] border-accent",
                    i === 0 && "bg-accent",
                  )}
                />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {stats.length > 0 && (
        <dl
          className={cn(
            "grid grid-cols-3 gap-4",
            items.length > 0 && "mt-6 border-t border-border pt-6",
          )}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
