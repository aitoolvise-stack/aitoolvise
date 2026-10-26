import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: 'https://aitoolvise.com',
  output: 'static',
  trailingSlash: 'always',

  // Using the classic, stable JS-based markdown engine instead of Astro's
  // newer Rust-based one (Sätteri), which currently has Windows install issues.
  markdown: {
    processor: unified(),
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],

  compressHTML: true,

  build: {
    assets: 'assets',
    // Inline CSS into the HTML so it is no longer a separate render-blocking
    // request (fixes most of the "Render-blocking requests" insight on mobile).
    inlineStylesheets: 'always',
  },
});