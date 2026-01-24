import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://doclify.cloud',
  integrations: [sitemap()],
  output: 'static',
  compressHTML: true,
  redirects: {
    // Anciennes URLs legacy (vraies redirections historiques)
    '/contactus': '/contact/',
    '/contactus.html': '/contact/',
    '/web/login': '/application/',
    '/web/login.html': '/application/',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
