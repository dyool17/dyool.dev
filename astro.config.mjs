// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public URL of the deployed site. Override at build time with
// `SITE=https://your-domain.example npm run build` when you wire up
// GitHub Pages and the custom domain.
const SITE = process.env.SITE ?? 'https://dyool.dev';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  vite: {
    server: {
      // GitHub Pages project sites live under /<repo>; we keep the dev
      // server consistent so links work the same locally and in production.
    },
  },
});
