import { getProfile } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { CurrentYear } from "@/components/content/current-year";

export function SiteFooter() {
  const profile = getProfile();
  const firstName = profile.name.split(" ")[0] ?? profile.name;
  const tagline = profile.roles.length > 1 ? profile.roles.slice(0, 2).join(" & ") : profile.title;

  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-3 border-t border-border py-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © <CurrentYear /> {firstName} — {tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
