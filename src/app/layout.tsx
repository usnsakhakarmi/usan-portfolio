import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import { site } from "@/content/site";
import { getProfile } from "@/lib/content";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MAIN_CONTENT_ID, SkipLink } from "@/components/layout/skip-link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const profile = getProfile();

export const metadata: Metadata = {
  // Absolute URLs (canonical, og:url) are only emitted once the real domain is configured,
  // so a build without NEXT_PUBLIC_SITE_URL never points search engines at the wrong host.
  ...(site.url && {
    metadataBase: new URL(site.url),
    alternates: { canonical: "/" },
  }),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro ?? `${profile.name} — ${profile.title}.`,
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: site.locale,
    ...(site.url && { url: "/" }),
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0a0e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      className={`${inter.variable} ${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body id="top" className="flex min-h-full flex-col">
        <SkipLink />
        <SiteHeader />
        <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
