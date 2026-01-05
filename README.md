# Doclify.cloud - Site Web Marketing

Site web officiel de Doclify, une solution SaaS de transcription medicale par IA pour psychologues et medecins.

**URL Production** : https://doclify.cloud

## Architecture

```
recording-app-website/
├── doclify-astro/          # Site web Astro (ACTIF - deploye en production)
│   ├── src/
│   │   ├── components/     # Composants reutilisables (Header, Footer, BaseHead)
│   │   ├── content/        # Collections de contenu (blog en Markdown)
│   │   ├── layouts/        # Layouts de pages
│   │   └── pages/          # Routes (file-based routing)
│   ├── public/             # Assets statiques (images, PDFs, robots.txt)
│   ├── astro.config.mjs    # Configuration Astro
│   └── package.json        # Dependencies (Astro 5.16.6)
│
├── marketing/              # Plans et strategies marketing
├── logo/                   # Assets logo Doclify
├── specs/                  # Specifications techniques
└── PRD_*.md                # Product Requirements Document
```

## Stack Technique

- **Framework** : Astro 5.16.6 (Static Site Generator)
- **Node.js** : >= 20.0.0
- **Deploiement** : Coolify (Nixpacks + nginx:alpine)
- **Hebergement** : https://doclify.cloud

## Developpement Local

```bash
# Aller dans le dossier Astro
cd doclify-astro

# Installer les dependances
npm install

# Demarrer le serveur de developpement
npm run dev
# Le site est accessible sur http://localhost:4321

# Build de production
npm run build

# Preview du build de production
npm run preview
```

## Deploiement

Le deploiement est automatique via Coolify :

1. Push sur la branche `main`
2. GitHub webhook notifie Coolify
3. Coolify build avec Nixpacks (detecte Node.js)
4. Deploiement sur nginx:alpine
5. Site disponible sur https://doclify.cloud

### Configuration Coolify

| Parametre | Valeur |
|-----------|--------|
| Build Pack | Nixpacks |
| Base Directory | `/doclify-astro` |
| Publish Directory | `/dist` |
| Static Image | nginx:alpine |
| Domain | doclify.cloud |

## Pages du Site

### Pages Principales (9)
- `/` - Page d'accueil
- `/a-propos` - A propos
- `/application` - Application
- `/fonctionnalites` - Fonctionnalites
- `/materiel` - Materiel
- `/tarifs` - Tarifs
- `/contact` - Contact
- `/confidentialite` - Politique de confidentialite
- `/cgv` - Conditions generales de vente

### Blog (6)
- `/blog` - Index du blog
- `/blog/alternative-dragon-medical`
- `/blog/gain-temps-medecin`
- `/blog/mode-hors-ligne-medical`
- `/blog/souverainete-donnees-sante`
- `/blog/transcription-medicale-ia`

### Landing Pages (6)
- `/landing/alternative-dragon`
- `/landing/guide-productivite`
- `/landing/webinaire-productivite`
- `/landing/transcription-cardiologue`
- `/landing/transcription-generaliste`
- `/landing/transcription-psychologue`

## Ajouter du Contenu

### Nouveau Article de Blog

1. Creer un fichier Markdown dans `doclify-astro/src/content/blog/` :

```markdown
---
title: "Titre de l'article"
description: "Description pour le SEO"
pubDate: 2026-01-05
author: "Nom de l'auteur"
image: "/img/blog/image.jpg"
tags: ["tag1", "tag2"]
---

Contenu de l'article...
```

2. L'article sera automatiquement disponible sur `/blog/nom-du-fichier`

### Nouvelle Page

1. Creer un fichier `.astro` dans `doclify-astro/src/pages/`
2. La page sera disponible selon le nom du fichier

## SEO

- Sitemap automatique (`/sitemap-index.xml`)
- Meta tags (title, description, keywords)
- Open Graph tags (partage social)
- URLs canoniques
- robots.txt

## Performance

- Build time : ~3 secondes
- 21 pages generees
- Bundle total : ~48KB (CSS + JS)
- JavaScript minimal : ~6KB
- Core Web Vitals optimises

## Ressources

- [Documentation Astro](https://docs.astro.build)
- [PRD Doclify](./PRD_Medical_Recording_SaaS_v3_Consolidated.md)
- [Documentation detaillee Astro](./doclify-astro/README.md)

## Licence

ISC License

---

**Doclify** - Transcription medicale par IA
https://doclify.cloud
