# Doclify.cloud - Medical Transcription SaaS

Marketing website for Doclify, a medical transcription SaaS platform powered by AI. Built with Astro for optimal performance and developer experience.

## About Doclify

Doclify helps healthcare professionals save time with AI-powered medical transcription. Features include:
- Real-time voice-to-text transcription
- Medical terminology support
- Offline mode
- Data sovereignty (French healthcare compliance)
- Integration with medical software

## Tech Stack

### Core
- **Astro v5.16.6** - Static site generator
- **Node.js** - JavaScript runtime (ES modules)

### Integrations
- **@astrojs/sitemap** - Automatic sitemap generation

### Development Tools
- **Playwright** - End-to-end testing
- **Puppeteer** - Browser automation

## Features

- 21 static pages (SSG - Static Site Generation)
- Blog with 5 articles (Markdown-based)
- 6 targeted landing pages
- Automatic sitemap generation
- SEO optimized (meta tags, Open Graph, canonical URLs)
- Minimal JavaScript (~6KB total)
- Fast builds (<3 seconds)
- Component-based architecture

## Installation

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd doclify-astro

# Install dependencies
npm install
```

## Development

### Start Development Server

```bash
npm run dev
# or
npm start
```

The development server will start at `http://localhost:4321` with hot module reload.

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Build and Deployment

### Build for Production

```bash
npm run build
```

**Build Output:**
- Location: `dist/` folder
- Pages: 21 HTML files
- Total size: ~64MB (including 61MB of PDFs/downloads)
- Bundle: 48KB CSS/JS
- Build time: ~3 seconds

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Deploy

The `dist/` folder contains a static site that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting provider

Simply upload or sync the `dist/` folder contents.

## Project Structure

```
doclify-astro/
├── src/
│   ├── components/          # Reusable components
│   │   ├── BaseHead.astro   # SEO, meta tags, favicons
│   │   ├── Header.astro     # Site navigation
│   │   └── Footer.astro     # Site footer
│   ├── content/             # Content collections
│   │   ├── blog/            # Blog posts (Markdown)
│   │   └── config.ts        # Content schema
│   ├── layouts/             # Page layouts
│   │   └── BaseLayout.astro # Main layout
│   └── pages/               # Routes (file-based routing)
│       ├── index.astro      # Homepage
│       ├── blog/            # Blog routes
│       ├── landing/         # Landing pages
│       └── *.astro          # Other pages
├── public/                  # Static assets
│   ├── img/                 # Images
│   ├── downloads/           # PDFs, lead magnets
│   └── robots.txt
├── dist/                    # Build output (generated)
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

## Pages

### Main Pages (9)
- `/` - Homepage
- `/a-propos` - About
- `/application` - Application
- `/fonctionnalites` - Features
- `/materiel` - Hardware
- `/tarifs` - Pricing
- `/contact` - Contact
- `/confidentialite` - Privacy Policy
- `/cgv` - Terms of Sale

### Blog (6)
- `/blog` - Blog index
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

## Adding Content

### Add a Blog Post

1. Create a new Markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Post description for SEO"
pubDate: 2026-01-02
author: "Author Name"
image: "/img/blog/your-image.jpg"
tags: ["tag1", "tag2"]
---

Your content here...
```

2. The post will be automatically available at `/blog/your-file-name`

### Add a New Page

1. Create a new `.astro` file in `src/pages/`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Title"
  description="Page description"
>
  <main>
    <h1>Page Content</h1>
  </main>
</BaseLayout>
```

2. The page will be available at `/your-file-name`

## Configuration

### Site Configuration

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://doclify.cloud',  // Your domain
  integrations: [sitemap()],
  output: 'static',
  compressHTML: true,
  // ... other options
});
```

### SEO Configuration

Meta tags are managed in `src/components/BaseHead.astro`.

Update per-page SEO in the page frontmatter:

```astro
---
const title = "Your Page Title";
const description = "Your page description";
---
```

## Performance

### Build Performance
- Build time: ~3 seconds
- 21 pages generated
- Total bundle: 48KB (CSS + JS)
- JavaScript: ~6KB total

### Runtime Performance
- Static HTML (no server required)
- Minimal JavaScript footprint
- Optimized CSS (per-page splitting)
- Fast page loads
- Excellent Core Web Vitals potential

## SEO Features

- Automatic sitemap generation
- Meta tags (title, description, keywords)
- Open Graph tags (social sharing)
- Canonical URLs
- robots.txt
- Search engine verification files
- Structured metadata

## Browser Support

Modern browsers (ES6+ support):
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Testing

Playwright tests can be run for E2E testing:

```bash
# Install Playwright browsers (first time)
npx playwright install

# Run tests (configure test files first)
npx playwright test
```

## Troubleshooting

### Port Already in Use

If port 4321 is in use:
```bash
# Astro will automatically use the next available port
npm run dev
# Check console output for actual port number
```

### Build Errors

Clear the cache and rebuild:
```bash
rm -rf dist/
rm -rf .astro/
npm run build
```

## Migration

This site was migrated from static HTML to Astro on 2026-01-02.

See [MIGRATION.md](./MIGRATION.md) for full migration details.

## Contributing

### Code Style
- Use Astro components for reusable UI
- Keep components in `src/components/`
- Use Markdown for blog content
- Follow existing naming conventions

### Commit Messages
- Use clear, descriptive commit messages
- Reference issue numbers when applicable

## License

ISC License

## Links

- **Live Site**: https://doclify.cloud
- **Astro Documentation**: https://docs.astro.build
- **Support**: Contact via website

## Changelog

### 2026-01-02
- Migrated from static HTML to Astro
- Implemented component-based architecture
- Added content collections for blog
- Optimized build pipeline
- Added automatic sitemap generation

---

Built with Astro. Fast, content-focused, and ready to scale.
