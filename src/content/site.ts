/** Site-wide configuration. Personal details live in profile.ts and socials.ts. */
export const site = {
  /**
   * Public address of the live site, e.g. "https://usan.com.np". Set it in `.env.production`
   * (NEXT_PUBLIC_SITE_URL) before building; canonical and share URLs are left out until then.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined,
  locale: "en",
} as const;
