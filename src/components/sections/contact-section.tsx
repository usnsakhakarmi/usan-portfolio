import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getProfile, getSocials, type HomeSection } from "@/lib/content";
import { delay } from "@/lib/utils";
import { Container } from "@/components/ui/container";

/** "https://www.linkedin.com/in/name/" → "linkedin.com/in/name". */
const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Closing call to action. Unlike other sections it has no number heading. */
export function ContactSection({ title }: Omit<HomeSection, "id">) {
  const profile = getProfile();
  const socials = getSocials();

  return (
    <section id="contact" aria-label={title} className="pt-8 pb-20 md:pb-28">
      <Container>
        <div className="grid gap-12 border-t border-border pt-20 md:pt-28 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3.25rem,1.5rem+6.5vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.025em]">
              {/* Two-stage reveal: each line rises from behind its own baseline. */}
              <span data-reveal="mask" className="block">
                <span>Let&rsquo;s work</span>
              </span>{" "}
              <span data-reveal="mask" style={delay(220, "reveal")} className="block">
                <span className="tint-in text-accent">together.</span>
              </span>
            </h2>

            <div
              data-reveal
              style={delay(420, "reveal")}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex min-h-14 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold break-all text-accent-fg shadow-[0_10px_40px_-14px_var(--accent)] transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-10px_var(--accent)]"
              >
                {profile.email}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              {profile.bookingUrl && (
                <a
                  href={profile.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center rounded-full border border-border px-6 text-sm font-semibold transition-colors hover:border-fg"
                >
                  Book a call
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>

          {socials.length > 0 && (
            <ul className="space-y-3 lg:col-span-5">
              {socials.map((social, i) => (
                <li key={social.id} data-reveal="right" style={delay(300 + 120 * i, "reveal")}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_var(--accent)]"
                  >
                    <span>
                      <span className="block font-display font-semibold">{social.label}</span>
                      <span className="mt-0.5 block font-mono text-[0.6875rem] text-muted">
                        {displayUrl(social.url)}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
