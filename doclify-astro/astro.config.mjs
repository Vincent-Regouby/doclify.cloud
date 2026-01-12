import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://doclify.cloud',
  integrations: [sitemap()],
  output: 'static',
  compressHTML: true,
  redirects: {
    // Anciennes URLs avec .html vers nouvelles URLs propres
    // Note: /index.html ne peut pas être redirigé ici (conflit avec page d'accueil)
    '/fonctionnalites.html': '/fonctionnalites/',
    '/tarifs.html': '/tarifs/',
    '/application.html': '/application/',
    '/materiel.html': '/materiel/',
    '/a-propos.html': '/a-propos/',
    '/contact.html': '/contact/',
    '/confidentialite.html': '/confidentialite/',
    '/cgv.html': '/cgv/',
    // Blog
    '/blog/alternative-dragon-medical.html': '/blog/alternative-dragon-medical/',
    '/blog/transcription-medicale-ia.html': '/blog/transcription-medicale-ia/',
    '/blog/gain-temps-medecin.html': '/blog/gain-temps-medecin/',
    '/blog/souverainete-donnees-sante.html': '/blog/souverainete-donnees-sante/',
    '/blog/mode-hors-ligne-medical.html': '/blog/mode-hors-ligne-medical/',
    // Landing pages
    '/landing/alternative-dragon.html': '/landing/alternative-dragon/',
    '/landing/transcription-generaliste.html': '/landing/transcription-generaliste/',
    '/landing/transcription-cardiologue.html': '/landing/transcription-cardiologue/',
    '/landing/transcription-psychologue.html': '/landing/transcription-psychologue/',
    '/landing/guide-productivite.html': '/landing/guide-productivite/',
    '/landing/webinaire-productivite.html': '/landing/webinaire-productivite/',
    // Anciennes URLs legacy
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
