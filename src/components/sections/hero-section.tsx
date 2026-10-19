import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { getHeroStats, getProfile, getSocials, type HomeSection } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { ProfileCodeCard } from "@/components/content/profile-code-card";
import { NowCard } from "@/components/content/now-card";
import { cn, delay } from "@/lib/utils";

const primaryButton =
  "group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-[0_0_0_0_transparent] transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_var(--accent)]";
const outlineButton =
  "group inline-flex min-h-12 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-semibold transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-fg";

/** Pill styles cycle through the roles: filled accent, neutral, pink outline. */
const rolePill = [
  "bg-accent text-accent-fg border-accent",
  "bg-surface-2 text-fg border-surface-2",
  "bg-transparent text-fg border-pink",
];

export function HeroSection({ title }: Omit<HomeSection, "id">) {
  const profile = getProfile();
  const socials = getSocials();
  const firstName = profile.name.split(" ")[0] ?? profile.name;
  const restOfName = profile.name.slice(firstName.length);

  const facts = [
    profile.location && { label: "Location", value: profile.location },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    profile.availability && { label: "Status", value: profile.availability.status, dot: true },
  ].filter(Boolean) as { label: string; value: string; href?: string; dot?: boolean }[];

  return (
    <section id="profile" aria-label={title} className="overflow-x-clip">
      <Container className="grid gap-16 pt-16 pb-8 md:pt-24 md:pb-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="load-in font-mono text-sm text-accent" style={delay(0)}>
            {"// hello world, I'm"}
          </p>
          <h1 className="mt-6 font-display text-hero font-bold">
            <span className="mask-line">
              <span className="mask-inner" style={delay(120)}>
                {firstName}
              </span>
            </span>
            {restOfName && (
              // Surname in outline on its own line, sized to fit the column.
              <span
                style={delay(520)}
                className="wipe-in mt-2 block text-[clamp(2.5rem,0.25rem+11vw,6.5rem)] leading-none font-semibold tracking-[-0.005em] text-bg [-webkit-text-stroke:3px_var(--accent)] [paint-order:stroke_fill] lg:text-[clamp(4rem,0.25rem+6.8vw,6.5rem)]"
              >
                {restOfName.trim()}
              </span>
            )}
          </h1>

          {profile.roles.length > 0 && (
            <ul aria-label="Roles" className="mt-10 flex flex-wrap gap-2">
              {profile.roles.map((role, i) => (
                <li
                  key={role}
                  style={delay(760 + 80 * i)}
                  className={cn(
                    "load-in rounded-full border px-3.5 py-1.5 text-sm font-medium",
                    rolePill[i % rolePill.length],
                  )}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}

          {profile.intro && (
            <p
              className="load-in mt-8 max-w-xl text-lg leading-relaxed text-muted"
              style={delay(980)}
            >
              {profile.intro}
            </p>
          )}

          <dl className="load-in mt-10 grid max-w-xl gap-6 sm:grid-cols-3" style={delay(1080)}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[0.6875rem] tracking-widest text-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 flex items-center gap-2 text-sm font-medium break-all">
                  {fact.dot && (
                    <span
                      aria-hidden="true"
                      className="pulse-ring relative size-1.5 shrink-0 rounded-full bg-accent text-accent"
                    />
                  )}
                  {fact.href ? (
                    <a href={fact.href} className="transition-colors hover:text-accent">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="load-in mt-10 flex flex-wrap items-center gap-3" style={delay(1180)}>
            <a href="#contact" className={primaryButton}>
              Get in touch
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            {profile.resume && (
              <a href={profile.resume} download className={outlineButton}>
                Resume
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            )}
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineButton}
              >
                {social.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-5 lg:pt-6">
          {/* Soft violet/pink glow behind the cards. */}
          <div
            aria-hidden="true"
            className="glow-breathe pointer-events-none absolute -inset-x-16 -top-24 bottom-0 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--pink)_45%,transparent),color-mix(in_oklch,var(--accent)_14%,transparent)_55%,transparent)] blur-2xl"
          />

          <div className="relative flex flex-col gap-5">
            <div className="card-in relative" style={delay(320)}>
              <div className="float-soft">
                <ProfileCodeCard profile={profile} />
              </div>
              {profile.availability?.badge && (
                <div
                  aria-hidden="true"
                  style={delay(900)}
                  className="card-in absolute -top-14 -right-2 flex size-24 -rotate-6 items-center justify-center rounded-full bg-accent p-3 text-center font-display text-sm leading-[1.05] font-extrabold text-accent-fg uppercase shadow-lg lg:-right-6"
                >
                  <span>
                    {profile.availability.badge.split(" ").map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
            <div className="card-in" style={delay(520)}>
              <NowCard items={profile.now} stats={getHeroStats()} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
