import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names, letting later Tailwind utilities override earlier conflicting ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Inline style for the motion CSS: `--d` delays first-load animations, `--reveal-delay`
 * staggers scroll reveals. Usage: `style={delay(120)}` or `style={delay(80 * i, "reveal")}`.
 */
export function delay(ms: number, kind: "load" | "reveal" = "load"): React.CSSProperties {
  return { [kind === "load" ? "--d" : "--reveal-delay"]: `${ms}ms` } as React.CSSProperties;
}
