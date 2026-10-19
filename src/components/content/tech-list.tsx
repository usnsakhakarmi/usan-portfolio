import { cn } from "@/lib/utils";

export function TechList({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ul aria-label="Technologies" className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-fg/85 transition-[border-color,color] duration-200 hover:border-accent/60 hover:text-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
