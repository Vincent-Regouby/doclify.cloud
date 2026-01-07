import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://doclify.cloud',
  integrations: [sitemap()],
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  compressHTML: true,
  // Redirections gérées via public/_redirects pour compatibilité serveur statique
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
