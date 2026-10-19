"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Maximum tilt in degrees. Kept small so text stays easy to read. */
const MAX_TILT = 4;

type TiltCardProps = React.ComponentProps<"div">;

/**
 * Adds a restrained perspective tilt and a pointer-following highlight to its child card.
 * Only active for a fine pointer (mouse/trackpad) and when motion is allowed; on touch devices
 * and with reduced motion it renders a plain wrapper. Updates CSS variables directly in a
 * requestAnimationFrame, so pointer movement never re-renders React.
 */
export function TiltCard({ className, children, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canTilt = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;

    let frame = 0;
    const update = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        if (canTilt) {
          el.style.setProperty("--tilt-x", `${(0.5 - y) * MAX_TILT}deg`);
          el.style.setProperty("--tilt-y", `${(x - 0.5) * MAX_TILT}deg`);
          el.style.setProperty("--lift", "-4px");
          el.dataset.active = "";
        }
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
      el.style.removeProperty("--lift");
      delete el.dataset.active;
    };

    el.addEventListener("pointermove", update);
    el.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", update);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={ref} className={cn("tilt", className)} {...props}>
      {children}
    </div>
  );
}
