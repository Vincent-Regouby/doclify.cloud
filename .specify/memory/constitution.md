<!--
Sync Impact Report
==================
Version change: 0.0.0 → 1.0.0 (Initial creation)

Modified principles: N/A (initial version)

Added sections:
- Core Principles (7 principles)
- Technology Stack
- Development Workflow
- Governance

Removed sections: N/A

Templates requiring updates:
- .specify/templates/plan-template.md: ✅ No changes needed (generic template)
- .specify/templates/spec-template.md: ✅ No changes needed (generic template)
- .specify/templates/tasks-template.md: ✅ No changes needed (generic template)

Follow-up TODOs: None
-->

# Doclify Website Constitution

## Core Principles

### I. Simplicité (Vanilla-First)

Le site web DOIT rester en HTML5/CSS3/JavaScript vanilla sans framework frontend.

- Aucun framework JS (React, Vue, Angular) n'est autorisé
- Aucun framework CSS (Bootstrap, Tailwind) n'est autorisé sauf utilitaires minimalistes
- Les dépendances externes DOIVENT être limitées au strict nécessaire (fonts, animations)
- Tout nouveau code DOIT pouvoir fonctionner sans étape de build

**Rationale**: Un site vitrine médical n'a pas besoin de complexité. La simplicité garantit
la maintenabilité à long terme et des temps de chargement optimaux.

### II. Performance

Chaque page DOIT atteindre un score Lighthouse Performance > 90.

- Les images DOIVENT être optimisées (WebP, lazy loading)
- Le CSS critique DOIT être inline ou chargé en priorité
- Le JavaScript DOIT être chargé en defer/async quand possible
- Le temps de First Contentful Paint (FCP) DOIT être < 1.5s sur mobile 4G
- Les animations Three.js/Vanta DOIVENT avoir un fallback statique

**Rationale**: Les médecins consultent souvent sur mobile entre deux patients.
Un site lent = un prospect perdu.

### III. Accessibilité (WCAG 2.1 AA)

Le site DOIT être conforme WCAG 2.1 niveau AA minimum.

- Contraste des couleurs DOIT respecter un ratio minimum de 4.5:1
- Navigation clavier DOIT être fonctionnelle sur toutes les pages
- Images DOIVENT avoir des attributs alt descriptifs
- Formulaires DOIVENT avoir des labels associés et messages d'erreur accessibles
- Structure HTML DOIT utiliser les landmarks sémantiques (header, main, nav, footer)

**Rationale**: Accessibilité légale (RGAA) et inclusion des utilisateurs en situation
de handicap, notamment médecins avec déficiences visuelles.

### IV. Sécurité & Conformité RGPD

Les données utilisateur DOIVENT être traitées conformément au RGPD.

- Aucune donnée personnelle ne DOIT être stockée côté client (localStorage, cookies)
  sauf consentement explicite
- Les formulaires DOIVENT valider les entrées côté client ET serveur
- Les tokens/clés API ne DOIVENT JAMAIS être exposés dans le code source public
- Les communications avec l'API Odoo DOIVENT utiliser HTTPS exclusivement
- Le consentement cookies DOIT être obtenu avant tout tracking

**Rationale**: Données médicales = données sensibles. La conformité RGPD est non-négociable
pour un produit destiné aux professionnels de santé français.

### V. SEO & Référencement

Chaque page DOIT être optimisée pour le référencement naturel.

- Chaque page DOIT avoir une balise title unique et descriptive (< 60 caractères)
- Chaque page DOIT avoir une meta description unique (< 160 caractères)
- Les données structurées JSON-LD DOIVENT être présentes (Organization, SoftwareApplication)
- Les URLs DOIVENT être descriptives et en français (ex: /fonctionnalites, /tarifs)
- Les images DOIVENT avoir des noms de fichiers descriptifs

**Rationale**: Le site vitrine est le principal canal d'acquisition. Un bon SEO réduit
le coût d'acquisition client.

### VI. Responsive Design (Mobile-First)

Le site DOIT être fonctionnel et esthétique sur tous les écrans.

- Le design DOIT suivre l'approche mobile-first
- Les breakpoints standards DOIVENT être utilisés: 320px, 768px, 1024px, 1440px
- Les éléments interactifs DOIVENT avoir une zone de tap minimum de 44x44px sur mobile
- Le menu hamburger DOIT être accessible et fonctionnel sur mobile
- Aucun scroll horizontal ne DOIT apparaître

**Rationale**: 60%+ du trafic médical provient du mobile. L'expérience mobile
est critique pour la conversion.

### VII. Maintenabilité & Structure

Le code DOIT être organisé de manière claire et documentée.

- Une page = un fichier HTML
- Le CSS DOIT utiliser des variables CSS pour les couleurs et espacements
- Le JavaScript DOIT être commenté pour les fonctions non-triviales
- La structure des dossiers DOIT rester plate: /css, /js, /img, /*.html
- Les modifications DOIVENT être commitées avec des messages descriptifs en français

**Rationale**: Le site sera maintenu par différents développeurs. La clarté du code
réduit le temps d'onboarding et les bugs.

## Technology Stack

**Frontend (Site Vitrine)**:
- HTML5 sémantique
- CSS3 vanilla avec variables CSS
- JavaScript ES6+ vanilla
- Google Fonts (Inter)
- Three.js + Vanta.js (animations hero uniquement)

**Backend (Interface)**:
- Communication via JSON-RPC avec backoffice Odoo
- Webhooks n8n pour formulaires de contact
- Hébergement statique (pas de serveur Node/PHP côté site)

**Outils de Développement**:
- Git pour versioning
- Lighthouse pour audits performance
- WAVE pour audits accessibilité

## Development Workflow

### Avant chaque modification

1. Créer une branche depuis `main` avec un nom descriptif
2. Vérifier que les modifications respectent les 7 principes
3. Tester sur mobile (Chrome DevTools ou appareil réel)

### Avant chaque merge

1. Audit Lighthouse Performance > 90
2. Vérification visuelle sur 3 breakpoints (mobile, tablet, desktop)
3. Test des formulaires et liens
4. Validation W3C HTML/CSS si modifications structurelles

### Intégration API Odoo

- Les appels JSON-RPC DOIVENT être encapsulés dans des fonctions dédiées
- Les erreurs API DOIVENT afficher un message utilisateur clair
- Un mode dégradé DOIT être prévu si l'API est indisponible

## Governance

Cette constitution définit les règles non-négociables du projet Doclify Website.

**Amendements**:
- Toute modification de principe requiert une justification écrite
- Les changements de stack technique majeurs requièrent une nouvelle version MAJOR
- Les clarifications et ajouts mineurs incrémentent la version MINOR ou PATCH

**Versioning**:
- MAJOR: Changement de stack, suppression/modification de principe
- MINOR: Nouveau principe ajouté, extension significative d'un principe
- PATCH: Clarifications, corrections de formulation

**Compliance**:
- Chaque PR DOIT mentionner les principes impactés
- Les violations temporaires DOIVENT être documentées avec un plan de remédiation

**Version**: 1.0.0 | **Ratified**: 2025-12-19 | **Last Amended**: 2025-12-19
