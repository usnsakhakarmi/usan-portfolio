import type { Profile } from "@/lib/schema";

const str = (value: string) => <span className="text-accent">&quot;{value}&quot;</span>;

function list(values: string[]) {
  return (
    <>
      [
      {values.map((value, i) => (
        <span key={value}>
          {i > 0 && ", "}
          {str(value)}
        </span>
      ))}
      ]
    </>
  );
}

/** The profile rendered as a small TypeScript object in an editor window. Built from content. */
export function ProfileCodeCard({ profile }: { profile: Profile }) {
  const variable = (profile.name.split(" ")[0] ?? "me").toLowerCase();
  const rows: [key: string, value: React.ReactNode][] = [];

  if (profile.roles.length > 0) rows.push(["role", list(profile.roles)]);
  if (profile.location) rows.push(["based", str(profile.location)]);
  if (profile.interests.length > 0) rows.push(["loves", list(profile.interests)]);
  if (profile.availability) {
    rows.push(["status", str(profile.availability.status.toLowerCase().replaceAll(" ", "_"))]);
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
      <div className="relative flex h-10 items-center border-b border-border px-4">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <figcaption className="absolute inset-x-0 text-center font-mono text-xs text-muted">
          profile.ts
        </figcaption>
      </div>
      <pre className="p-5 font-mono text-[0.8125rem] leading-6 whitespace-pre-wrap">
        <code>
          <span className="text-pink">const</span> {variable} = {"{"}
          {rows.map(([key, value]) => (
            <span key={key} className="block pl-8 -indent-4">
              {key}: {value},
            </span>
          ))}
          {"};"}
        </code>
      </pre>
    </figure>
  );
}
