const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-02" → "Feb 2025", "2025" → "2025". Locale-independent, so server and client match. */
export function formatYearMonth(value: string) {
  const [year, month] = value.split("-");
  const monthName = month ? MONTHS[Number(month) - 1] : undefined;
  return monthName ? `${monthName} ${year}` : value;
}

/** "Feb 2025 – Jul 2026", or "Jul 2026 – Present" when `end` is null. */
export function formatDateRange(start: string, end: string | null) {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : "Present"}`;
}

/** "2025-02" → months since year 0, or null for a bare year. */
function toMonthIndex(value: string) {
  const [year, month] = value.split("-").map(Number);
  return year !== undefined && month ? year * 12 + month - 1 : null;
}

/**
 * Inclusive length of a date range, LinkedIn style: "2025-02" to "2026-04" → "1 yr 3 mos".
 * Returns null when either date has no month.
 */
export function formatDuration(start: string, end: string) {
  const from = toMonthIndex(start);
  const to = toMonthIndex(end);
  if (from === null || to === null || to < from) return null;

  const total = to - from + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [
    years > 0 && `${years} ${years === 1 ? "yr" : "yrs"}`,
    months > 0 && `${months} ${months === 1 ? "mo" : "mos"}`,
  ]
    .filter(Boolean)
    .join(" ");
}
