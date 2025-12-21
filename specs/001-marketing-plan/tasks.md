# Tasks: Plan Marketing Doclify 90 Jours

**Input**: Design documents from `/specs/001-marketing-plan/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Type de projet**: Plan marketing opérationnel (tâches = actions marketing, pas de code)

**Organization**: Tâches groupées par User Story pour permettre une exécution indépendante.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut être exécuté en parallèle (pas de dépendances)
- **[Story]**: User Story associée (US1=Fondations, US2=Accélération, US3=Scaling, US4=Pilotage)
- Chemins et ressources inclus dans les descriptions

---

## Phase 1: Setup (Infrastructure Outils)

**Objectif**: Configuration initiale des outils marketing

**Durée estimée**: 4 heures (Jour 1)

- [X] T000 **[RGPD]** Implémenter bannière de consentement cookies sur doclify.cloud AVANT tout tracking (Constitution IV)
- [ ] T001 [P] Créer/configurer compte Google Analytics 4 sur doclify.cloud (APRÈS T000)
- [X] T002 [P] Configurer Google Search Console et vérifier la propriété du site
- [ ] T003 [P] Créer les 4 objectifs de conversion GA4 (inscription essai, conversion payante, téléchargement lead magnet, inscription webinaire) - ref: quickstart.md
- [ ] T004 [P] Créer compte AWS SES et vérifier le domaine d'envoi doclify.cloud
- [ ] T005 [P] Configurer les attributs de contact AWS SES (PRENOM, SPECIALITE, DATE_INSCRIPTION) - ref: contracts/email-sequences.md
- [ ] T006 [P] Activer module Odoo Social Marketing et connecter comptes LinkedIn (page + fondateur) - ref: research.md
- [ ] T007 [P] Configurer les UTM par défaut dans Odoo Social Marketing (utm_source, utm_medium)

**Checkpoint**: Tous les outils configurés et opérationnels

---

## Phase 2: Foundational (Socle Marketing)

**Objectif**: Éléments fondamentaux requis AVANT toute campagne

**⚠️ CRITIQUE**: Aucune User Story ne peut démarrer avant complétion

- [ ] T008 Optimiser profil LinkedIn page entreprise (bannière 1128×191, description, CTA) - ref: quickstart.md section 3
- [ ] T009 [P] Optimiser profil LinkedIn fondateur (headline, À propos, mode créateur) - ref: quickstart.md section 4
- [ ] T010 [P] Optimiser balises title et meta description de toutes les pages existantes de doclify.cloud (FR-002)
- [ ] T011 Configurer le formulaire d'inscription du site pour envoyer vers AWS SES
- [ ] T012 [P] Configurer pipeline CRM Odoo avec les étapes funnel (Nouveau lead → Qualifié → Essai démarré → Essai actif → Converti → Perdu) - ref: data-model.md
- [ ] T013 [P] Créer les sources d'acquisition dans Odoo CRM (linkedin_organic, linkedin_ads, seo, webinaire, parrainage, presse, direct) - ref: data-model.md
- [ ] T014 Créer le dashboard de suivi initial dans Notion/Google Sheets - ref: contracts/reporting-template.md

**Checkpoint**: Socle marketing prêt - les User Stories peuvent démarrer

---

## Phase 3: User Story 1 - Phase Fondations (Priority: P1) 🎯 MVP

**Goal**: Mettre en place les bases techniques et de contenu pour générer du trafic organique et construire une présence LinkedIn

**Independent Test**: Vérifier que tous les outils sont configurés, que 5 articles sont publiés, et que les profils LinkedIn sont actifs avec 200+ followers

**Durée**: Semaines 1-4 (Mois 1)

### Contenu SEO (US1)

- [X] T015 [P] [US1] Créer landing page doclify-website/landing/alternative-dragon.html (FR-003)
- [X] T016 [P] [US1] Créer landing page doclify-website/landing/transcription-psychologue.html (FR-003)
- [X] T017 [P] [US1] Créer landing page doclify-website/landing/transcription-cardiologue.html (FR-003)
- [X] T018 [P] [US1] Créer landing page doclify-website/landing/transcription-generaliste.html (FR-003)
- [X] T019 [P] [US1] Créer CSS partagé doclify-website/css/landing.css conforme constitution (vanilla, Lighthouse >90)
- [X] T019b **[A11Y]** Audit accessibilité WAVE des 4 landing pages (Constitution III - WCAG 2.1 AA)
- [X] T020 [US1] Créer article blog #1 "Alternative Dragon Medical" dans doclify-website/blog/ (FR-004)
- [X] T021 [P] [US1] Créer article blog #2 sur la transcription médicale IA dans doclify-website/blog/ (FR-004)
- [X] T022 [P] [US1] Créer article blog #3 sur le gain de temps médecin dans doclify-website/blog/ (FR-004)
- [X] T023 [P] [US1] Créer article blog #4 sur la souveraineté des données dans doclify-website/blog/ (FR-004)
- [X] T024 [P] [US1] Créer article blog #5 sur le mode hors-ligne dans doclify-website/blog/ (FR-004)

### Emailing Marketing (US1)

- [N/A] T025-T033 Séquence onboarding gérée par my.doclify.cloud (pas AWS SES)
- [ ] T025b [US1] Créer template newsletter mensuelle dans AWS SES (marketing uniquement)

### LinkedIn Organique (US1)

- [ ] T034 [US1] Créer carrousel LinkedIn #1 "Comment gagner 2h/semaine" - ref: contracts/linkedin-workflow.md
- [ ] T035 [P] [US1] Créer carrousel LinkedIn #2 sur la souveraineté des données
- [ ] T036 [P] [US1] Publier post LinkedIn #1 fondateur (lancement personnel)
- [ ] T037 [P] [US1] Publier post LinkedIn #2 page entreprise
- [ ] T038 [US1] Publier posts LinkedIn #3-8 selon calendrier éditorial (FR-007) - 2/semaine
- [ ] T039 [US1] Créer lead magnet PDF "Guide productivité médecin" (FR-008)

### Relations Presse & Webinaire (US1)

- [ ] T040 [US1] Identifier et contacter 5 journalistes de presse médicale (FR-010)
- [ ] T041 [US1] Planifier et organiser webinaire #1 avec objectif 20+ participants (FR-009)

**Checkpoint US1**: 5 articles publiés, 4 landing pages, 8 posts LinkedIn, séquence email active, webinaire réalisé, 200+ followers LinkedIn

---

## Phase 4: User Story 2 - Phase Accélération (Priority: P2)

**Goal**: Lancer les campagnes payantes LinkedIn Ads, activer le programme de parrainage, et intensifier les relations presse

**Independent Test**: Vérifier que LinkedIn Ads génère des leads (CPL <50€), que le programme parrainage est actif, et que des retombées presse existent

**Dépendance**: US1 complète (les bases doivent être en place)

**Durée**: Semaines 5-8 (Mois 2)

### LinkedIn Ads (US2)

- [ ] T042 [US2] Créer compte LinkedIn Ads Manager et configurer pixel tracking sur doclify.cloud
- [ ] T043 [P] [US2] Créer script doclify-website/js/tracking.js pour événements LinkedIn Insight Tag
- [ ] T044 [US2] Créer 3 visuels publicitaires (carrousel, single image, video) pour A/B test (FR-012)
- [ ] T045 [US2] Configurer audiences cibles (médecins généralistes, psychologues, cardiologues) - ref: research.md section 3
- [ ] T046 [US2] Lancer campagne LinkedIn Ads #1 avec budget 500€ (FR-011)
- [ ] T047 [US2] Analyser résultats après 2 semaines et optimiser ciblage

### Contenu SEO Mois 2 (US2)

- [ ] T048 [P] [US2] Créer article blog #6 dans doclify-website/blog/ (FR-013)
- [ ] T049 [P] [US2] Créer article blog #7 dans doclify-website/blog/ (FR-013)
- [ ] T050 [P] [US2] Créer article blog #8 dans doclify-website/blog/ (FR-013)
- [ ] T051 [P] [US2] Créer article blog #9 dans doclify-website/blog/ (FR-013)

### Études de cas & Témoignages (US2)

- [ ] T052 [US2] Contacter 3 clients pour études de cas
- [ ] T053 [P] [US2] Créer étude de cas #1 client (FR-014)
- [ ] T054 [P] [US2] Créer étude de cas #2 client (FR-014)
- [ ] T055 [P] [US2] Créer étude de cas #3 client (FR-014)
- [ ] T056 [US2] Publier les 3 études de cas sur le site doclify.cloud

### Programme Parrainage (US2)

- [ ] T057 [US2] Définir règles programme parrainage (1 mois gratuit par filleul converti) (FR-015)
- [ ] T058 [US2] Configurer codes parrainage dans Odoo CRM - ref: data-model.md section Ambassadeur
- [ ] T059 [US2] Créer page parrainage sur doclify.cloud
- [ ] T060 [US2] Communiquer programme aux clients existants

### PR & Podcasts (US2)

- [ ] T061 [US2] Envoyer communiqué de presse aux médias santé (FR-016)
- [ ] T062 [US2] Relancer les 5 journalistes contactés en M1
- [ ] T063 [P] [US2] Identifier et contacter 3 podcasts cibles (FR-017)
- [ ] T064 [US2] Identifier 10 ambassadeurs potentiels parmi clients actifs (FR-019)

### Webinaire #2 (US2)

- [ ] T065 [US2] Planifier et organiser webinaire #2 avec objectif +20% participation vs #1 (FR-018)

**Checkpoint US2**: LinkedIn Ads actif CPL <50€, 30 leads générés, programme parrainage lancé, 3 études de cas publiées, 9 articles total, 500+ followers LinkedIn

---

## Phase 5: User Story 3 - Phase Scaling (Priority: P3)

**Goal**: Amplifier les canaux performants, recruter des ambassadeurs, et initier les premiers partenariats stratégiques

**Independent Test**: Vérifier l'augmentation du budget Ads (1000€/mois), le recrutement de 3+ ambassadeurs, et l'initiation d'au moins 1 partenariat

**Dépendance**: US2 complète (LinkedIn Ads prouvé, ambassadeurs identifiés)

**Durée**: Semaines 9-12 (Mois 3)

### LinkedIn Ads Scaling (US3)

- [ ] T066 [US3] Augmenter budget LinkedIn Ads à 1000€/mois (FR-020)
- [ ] T067 [US3] Créer nouvelles audiences lookalike basées sur leads M2
- [ ] T068 [US3] Optimiser campagnes pour doubler leads sans augmenter CPL >20%

### Contenu SEO Mois 3 (US3)

- [ ] T069 [P] [US3] Créer article blog #10 dans doclify-website/blog/ (FR-021)
- [ ] T070 [P] [US3] Créer article blog #11 dans doclify-website/blog/ (FR-021)
- [ ] T071 [P] [US3] Créer article blog #12 dans doclify-website/blog/ (FR-021)

### Vidéos Témoignages (US3)

- [ ] T072 [US3] Contacter clients pour vidéos témoignages
- [ ] T073 [P] [US3] Produire vidéo témoignage #1 (FR-022)
- [ ] T074 [P] [US3] Produire vidéo témoignage #2 (FR-022)
- [ ] T075 [US3] Publier vidéos sur LinkedIn et site doclify.cloud

### Programme Ambassadeurs (US3)

- [ ] T076 [US3] Contacter les 10 ambassadeurs potentiels identifiés
- [ ] T077 [US3] Recruter minimum 3 ambassadeurs actifs (FR-025)
- [ ] T078 [US3] Mettre en place avantages ambassadeurs dans Odoo

### Partenariats (US3)

- [ ] T079 [US3] Identifier éditeurs de logiciels médicaux cibles (MediStory, etc.)
- [ ] T080 [US3] Contacter 1 éditeur pour partenariat test (FR-023)
- [ ] T081 [US3] Négocier et initier partenariat

### Page Ressources (US3)

- [ ] T082 [US3] Créer page ressources doclify-website/ressources/index.html (FR-026)
- [ ] T083 [US3] Regrouper guides, vidéos, replays webinaires sur la page

### Webinaire #3 (US3)

- [ ] T084 [US3] Planifier et organiser webinaire #3 (FR-024)

**Checkpoint US3**: 1000€/mois LinkedIn Ads, 50 leads cumulés, 3 ambassadeurs actifs, 1 partenariat initié, 12 articles publiés, 1000+ followers LinkedIn

---

## Phase 6: User Story 4 - Suivi et Pilotage Continu (Priority: P1)

**Goal**: Suivre les KPIs hebdomadaires et mensuels pour ajuster la stratégie en temps réel

**Independent Test**: Vérifier que les dashboards sont à jour et que les bilans mensuels sont produits

**Exécution**: En parallèle des US1, US2, US3 (tout au long des 90 jours)

### Reporting Hebdomadaire (US4)

- [ ] T085 [US4] Produire rapport hebdomadaire semaine 1 - ref: contracts/reporting-template.md
- [ ] T086 [P] [US4] Produire rapport hebdomadaire semaine 2
- [ ] T087 [P] [US4] Produire rapport hebdomadaire semaine 3
- [ ] T088 [P] [US4] Produire rapport hebdomadaire semaine 4 (fin M1)
- [ ] T089 [P] [US4] Produire rapport hebdomadaire semaine 5
- [ ] T090 [P] [US4] Produire rapport hebdomadaire semaine 6
- [ ] T091 [P] [US4] Produire rapport hebdomadaire semaine 7
- [ ] T092 [P] [US4] Produire rapport hebdomadaire semaine 8 (fin M2)
- [ ] T093 [P] [US4] Produire rapport hebdomadaire semaine 9
- [ ] T094 [P] [US4] Produire rapport hebdomadaire semaine 10
- [ ] T095 [P] [US4] Produire rapport hebdomadaire semaine 11
- [ ] T096 [P] [US4] Produire rapport hebdomadaire semaine 12 (fin M3)

### Bilan Mensuel (US4)

- [ ] T097 [US4] Produire bilan mensuel M1 avec ajustements M2 (FR-030)
- [ ] T098 [US4] Produire bilan mensuel M2 avec ajustements M3 (FR-030)
- [ ] T099 [US4] Produire bilan mensuel M3 / rapport 90 jours (FR-027, FR-030)

### Dashboard & Alertes (US4)

- [ ] T100 [US4] Mettre à jour dashboard temps réel chaque semaine (FR-031)
- [ ] T101 [US4] Configurer alertes automatiques (trafic -20%, CPL >80€, conversion <10%) - ref: contracts/reporting-template.md

**Checkpoint US4**: 12 rapports hebdomadaires produits, 3 bilans mensuels, dashboard maintenu à jour

---

## Phase 7: Polish & Clôture 90 Jours

**Objectif**: Finalisation, documentation et préparation Q2

- [ ] T102 Produire rapport complet des 90 jours avec KPIs finaux (FR-027)
- [ ] T103 Analyser performance par canal (SEO, LinkedIn, Ads, Email)
- [ ] T104 Documenter learnings et recommandations
- [ ] T105 Définir objectifs et plan Q2 (FR-028)
- [ ] T106 Archiver tous les assets créés (visuels, contenus, templates)
- [ ] T107 Valider atteinte des Success Criteria: 40 clients (×75€ = 3000€ MRR), 1000 followers

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────────►
                      │
                      ▼
Phase 2 (Foundational) ──────────────────────────────────────────►
                      │
                      ├──────────────────────────────────────────┐
                      ▼                                          ▼
Phase 3 (US1 - Fondations M1)    Phase 6 (US4 - Pilotage continu)
                      │                     │
                      ▼                     │ (runs in parallel)
Phase 4 (US2 - Accélération M2)             │
                      │                     │
                      ▼                     │
Phase 5 (US3 - Scaling M3)                  │
                      │                     │
                      └─────────────────────┘
                                 │
                                 ▼
                      Phase 7 (Polish & Clôture)
```

### User Story Dependencies

| Story | Dépend de | Peut démarrer |
|-------|-----------|---------------|
| US1 (Fondations) | Phase 2 complète | Semaine 1 |
| US2 (Accélération) | US1 complète | Semaine 5 |
| US3 (Scaling) | US2 complète | Semaine 9 |
| US4 (Pilotage) | Phase 2 complète | Semaine 1 (parallèle) |

### Parallel Opportunities

**Phase 1 (Setup)**: Toutes les tâches T001-T007 peuvent être exécutées en parallèle

**Phase 2 (Foundational)**: T008-T014 - la plupart peuvent être parallélisées sauf T011 (dépend de T004/T005)

**Phase 3 (US1)**:
- Landing pages T015-T018 en parallèle
- Articles blog T020-T024 en parallèle
- Templates email T026-T032 en parallèle

**Phase 4 (US2)**:
- Articles blog T048-T051 en parallèle
- Études de cas T053-T055 en parallèle

**Phase 5 (US3)**:
- Articles blog T069-T071 en parallèle
- Vidéos T073-T074 en parallèle

---

## Parallel Example: Phase 3 (US1)

```bash
# Lancer toutes les landing pages en parallèle:
Task: "Créer landing page alternative-dragon.html"
Task: "Créer landing page transcription-psychologue.html"
Task: "Créer landing page transcription-cardiologue.html"
Task: "Créer landing page transcription-generaliste.html"

# Lancer tous les articles blog en parallèle:
Task: "Créer article blog #1 Alternative Dragon Medical"
Task: "Créer article blog #2 transcription médicale IA"
Task: "Créer article blog #3 gain de temps médecin"
Task: "Créer article blog #4 souveraineté données"
Task: "Créer article blog #5 mode hors-ligne"

# Lancer tous les templates email en parallèle:
Task: "Créer template email #2 Quick Start"
Task: "Créer template email #3 Fonctionnalité Transcription"
Task: "Créer template email #4 Mode hors-ligne"
# ... etc.
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Compléter Phase 1: Setup (4h)
2. Compléter Phase 2: Foundational (8h)
3. Compléter Phase 3: US1 Fondations (Semaines 1-4)
4. **STOP et VALIDER**:
   - 5 articles publiés et indexés?
   - 4 landing pages créées?
   - 200+ followers LinkedIn?
   - Séquence email active?
5. Démarrer US4 Pilotage (en parallèle)

### Incremental Delivery

1. Semaines 1-4: US1 → Test indépendant → **Checkpoint M1**
2. Semaines 5-8: US2 → Test indépendant → **Checkpoint M2**
3. Semaines 9-12: US3 → Test indépendant → **Checkpoint M3**
4. US4 court en parallèle avec rapports hebdomadaires

### Ressources nécessaires

- **1 personne marketing** (50% minimum) pour exécution
- **Fondateur** pour LinkedIn personal branding et webinaires
- **Budget**: 3200-5200€ sur 90 jours

---

## Notes

- [P] = tâches parallélisables (pas de dépendances)
- [Story] = US1/US2/US3/US4 pour traçabilité
- Chaque User Story est indépendamment testable via ses Success Criteria
- Référencer les documents specs/ pour détails d'implémentation
- Committer après chaque groupe logique de tâches
- Arrêter à chaque Checkpoint pour valider avant de continuer
