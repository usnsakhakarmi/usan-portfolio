"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** The site is prerendered, so the current year is filled in by the browser. */
export function CurrentYear() {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
}
