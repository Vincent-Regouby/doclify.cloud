import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://doclify.cloud',
  integrations: [sitemap()],
  output: 'static',
  compressHTML: true,
  redirects: {
    // Redirections des anciennes URLs .html vers les nouvelles URLs clean
    '/index.html': '/',
    '/fonctionnalites.html': '/fonctionnalites',
    '/tarifs.html': '/tarifs',
    '/a-propos.html': '/a-propos',
    '/contact.html': '/contact',
    '/confidentialite.html': '/confidentialite',
    '/cgv.html': '/cgv',
    '/application.html': '/application',
    '/materiel.html': '/materiel',
    '/blog/index.html': '/blog',
    '/blog/alternative-dragon-medical.html': '/blog/alternative-dragon-medical',
    '/blog/gain-temps-medecin.html': '/blog/gain-temps-medecin',
    '/blog/mode-hors-ligne-medical.html': '/blog/mode-hors-ligne-medical',
    '/blog/souverainete-donnees-sante.html': '/blog/souverainete-donnees-sante',
    '/blog/transcription-medicale-ia.html': '/blog/transcription-medicale-ia',
    '/landing/alternative-dragon.html': '/landing/alternative-dragon',
    '/landing/guide-productivite.html': '/landing/guide-productivite',
    '/landing/webinaire-productivite.html': '/landing/webinaire-productivite',
    '/landing/transcription-cardiologue.html': '/landing/transcription-cardiologue',
    '/landing/transcription-generaliste.html': '/landing/transcription-generaliste',
    '/landing/transcription-psychologue.html': '/landing/transcription-psychologue',
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
