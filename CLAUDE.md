# recording-app-website Development Guidelines

Site web marketing Doclify - Transcription medicale par IA

## Architecture Actuelle

Le site de production utilise **Astro** (dossier `doclify-astro/`).

```
recording-app-website/
├── doclify-astro/          # SITE ACTIF (Astro 5.16.6)
├── marketing/              # Plans marketing
└── specs/                  # Specifications
```

## Technologies

- **Framework** : Astro 5.16.6
- **Node.js** : >= 20.0.0
- **Deploiement** : Coolify (Nixpacks)
- **Production** : https://doclify.cloud

## Commandes

```bash
# Developpement
cd doclify-astro && npm run dev

# Build production
cd doclify-astro && npm run build

# Preview
cd doclify-astro && npm run preview
```

## Deploiement

Push sur `main` → Coolify deploie automatiquement depuis `/doclify-astro`

## Code Style

- Composants Astro dans `src/components/`
- Pages dans `src/pages/`
- Blog en Markdown dans `src/content/blog/`
- Suivre les conventions Astro existantes

## Important

- **TOUJOURS** travailler dans `doclify-astro/`
- Node.js >= 20.0.0 requis pour Astro 5.16.6

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
