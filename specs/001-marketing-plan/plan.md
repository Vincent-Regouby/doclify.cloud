# Implementation Plan: Plan Marketing Doclify 90 Jours

**Branch**: `001-marketing-plan` | **Date**: 2025-12-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-marketing-plan/spec.md`

## Summary

Plan d'exécution marketing sur 90 jours pour acquérir 40 clients payants et atteindre 3 000€ MRR (40 × 75€/mois). Le plan utilise une stack d'outils marketing (Odoo Social Marketing, AWS SES, LinkedIn Ads, GA4) intégrée au site vitrine doclify.cloud existant.

## Technical Context

**Type de projet**: Plan marketing / Exécution opérationnelle (pas de développement logiciel majeur)

**Stack Marketing**:
- **Analytics**: Google Analytics 4, Google Search Console
- **Emailing**: AWS SES (séquences automatisées)
- **Social Media**: Odoo Social Marketing (scheduling, analytics), Postiz (fallback open-source)
- **Publicité**: LinkedIn Ads Manager
- **CRM**: Odoo CRM (existant)
- **Site web**: doclify.cloud (HTML5/CSS3/JS vanilla - existant)

**Intégrations requises**:
- GA4 → Site doclify.cloud (tracking)
- AWS SES → Formulaires site (capture leads)
- Odoo Social Marketing → LinkedIn API
- LinkedIn Ads → Pixel tracking sur site

**Livrables par type**:
- Contenu: 12 articles blog, 4 landing pages, 24+ posts LinkedIn, 8 emails, 1 lead magnet PDF
- Campagnes: 3 campagnes LinkedIn Ads, 3 webinaires
- Relations: 5 journalistes, 3 podcasts, 3 ambassadeurs, 1 partenaire

**Contraintes**:
- Budget total: 3 200 - 5 200€
- Ressource humaine: 1 personne à 50% minimum
- Fenêtre d'opportunité: 12-18 mois avant saturation Doctolib

## Constitution Check

*GATE: Vérification conformité avec la constitution du projet*

| Principe | Impact | Statut |
|----------|--------|--------|
| I. Simplicité (Vanilla-First) | Landing pages en HTML/CSS vanilla | ✅ CONFORME |
| II. Performance | Nouvelles pages Lighthouse > 90 | ✅ À VÉRIFIER |
| III. Accessibilité WCAG 2.1 AA | Formulaires et CTAs accessibles | ✅ À VÉRIFIER |
| IV. Sécurité & RGPD | Consentement cookies avant tracking | ✅ REQUIS |
| V. SEO & Référencement | Meta tags, JSON-LD sur nouvelles pages | ✅ CONFORME |
| VI. Responsive Mobile-First | Toutes nouvelles pages responsive | ✅ REQUIS |
| VII. Maintenabilité | Structure plate /css, /js, /img | ✅ CONFORME |

**Résultat Gate**: ✅ PASS - Aucune violation des principes

## Project Structure

### Documentation (this feature)

```text
specs/001-marketing-plan/
├── plan.md              # Ce fichier
├── research.md          # Recherche outils et best practices
├── data-model.md        # Modèle de données marketing (leads, campagnes)
├── quickstart.md        # Guide de démarrage rapide
├── contracts/           # Templates et workflows
│   ├── email-sequences.md
│   ├── linkedin-workflow.md
│   └── reporting-template.md
└── tasks.md             # Tâches actionnables (généré par /speckit.tasks)
```

### Source Code (repository root)

```text
# Modifications au site existant
doclify-website/
├── landing/                    # Nouvelles landing pages
│   ├── alternative-dragon.html
│   ├── transcription-psychologue.html
│   ├── transcription-cardiologue.html
│   └── transcription-generaliste.html
├── blog/                       # Articles SEO
│   └── [12 articles à créer]
├── ressources/                 # Page ressources
│   └── index.html
├── css/
│   └── landing.css            # Styles landing pages
├── js/
│   └── tracking.js            # GA4 events
└── img/
    └── blog/                  # Images articles
```

**Structure Decision**: Extension du site vitrine existant avec nouvelles pages en vanilla HTML/CSS conformes à la constitution.

## Complexity Tracking

> Aucune violation à justifier - le plan respecte la constitution.

| Aspect | Complexité | Justification |
|--------|------------|---------------|
| Nombre d'outils | 5 outils marketing | Standard industrie, pas de sur-ingénierie |
| Intégrations | 4 intégrations | Toutes via APIs/scripts standards |
| Contenu | 50+ pièces | Réparti sur 90 jours, réaliste |

---

## Phase 0: Research Required

Les éléments suivants nécessitent une recherche avant implémentation:

1. **Odoo Social Marketing**: Configuration et connexion LinkedIn API
2. **AWS SES**: Meilleures pratiques séquences onboarding B2B
3. **LinkedIn Ads**: Ciblage médecins français, formats performants
4. **GA4**: Configuration e-commerce/SaaS pour tracking conversions
5. **Postiz**: Évaluation comme solution de secours

---

## Phase 1: Design Artifacts to Generate

1. **data-model.md**: Modèle de données pour leads, campagnes, contenu
2. **contracts/email-sequences.md**: Structure des 8 emails onboarding
3. **contracts/linkedin-workflow.md**: Workflow création → validation → publication
4. **contracts/reporting-template.md**: Templates rapports hebdo/mensuel
5. **quickstart.md**: Checklist jour 1 pour démarrer l'exécution
