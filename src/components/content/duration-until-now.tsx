"use client";

import { useSyncExternalStore } from "react";
import { formatDuration } from "@/lib/format";

const subscribe = () => () => {};

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * " · 7 mos" for a role that is still ongoing. The site is prerendered, so "now" is only
 * known in the browser: the server renders nothing and the client fills it in.
 */
export function DurationUntilNow({ start }: { start: string }) {
  const now = useSyncExternalStore(subscribe, currentMonth, () => null);
  const duration = now ? formatDuration(start, now) : null;
  return duration ? <> · {duration}</> : null;
}
