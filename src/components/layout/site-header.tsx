import Link from "next/link";
import { getNavItems, getProfile } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const profile = getProfile();
  const navItems = getNavItems();
  const initials = profile.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3 rounded-md">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-accent-fg"
            >
              {initials}
            </span>
            <span className="hidden font-display font-semibold tracking-normal whitespace-nowrap min-[400px]:inline">
              {profile.name}
            </span>
            <span className="sr-only min-[400px]:hidden">{profile.name}</span>
            <span className="sr-only">, home</span>
          </Link>

          <MainNav items={navItems} />

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="inline-flex min-h-10 items-center rounded-full bg-fg px-5 text-sm font-semibold whitespace-nowrap text-bg transition-opacity hover:opacity-85"
            >
              Hire me
            </Link>
            <MobileNav items={navItems} resumeHref={profile.resume} />
          </div>
        </div>
      </Container>
    </header>
  );
}
