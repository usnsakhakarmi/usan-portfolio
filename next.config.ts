import type { NextConfig } from "next";

/*
 * Static site. `next build` writes plain HTML/CSS/JS to `out/`, which can be uploaded to any
 * web host (cPanel, Apache, Nginx, Netlify, GitHub Pages…) with no Node.js server.
 *
 * Static export cannot send HTTP headers, so the security headers live in
 * public/.htaccess (Apache/cPanel) and public/_headers (Netlify/Cloudflare Pages) instead.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Emit `/about/index.html` instead of `/about.html`, which every host serves correctly.
  trailingSlash: true,
  poweredByHeader: false,
  // Hide the floating Next.js "N" button in development; build errors still show in an overlay.
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
