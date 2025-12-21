# Feature Specification: Plan Marketing Doclify 90 Jours

**Feature Branch**: `001-marketing-plan`
**Created**: 2025-12-20
**Status**: Draft
**Input**: User description: "Plan marketing à mettre en place basé sur l'étude dans le dossier ./marketing. L'objectif est bien de spécifier chaque phase, chaque action, et d'avoir un vrai plan marketing à mettre en place"

## Contexte

Doclify est une plateforme SaaS de transcription médicale par IA pour les professionnels de santé français. Le plan marketing vise à acquérir des clients dans un contexte concurrentiel avec Nabla (30 000 utilisateurs), Doctolib (en déploiement), Loquii et Dragon Medical.

**Différenciateurs clés de Doclify :**

- 100% hébergé en France (souveraineté)
- Mode hors-ligne + application mobile native
- Indépendant de tout logiciel médical
- Prix compétitif : 75€/mois

**Fenêtre d'opportunité :** 12-18 mois avant que Doctolib ne couvre toutes les spécialités.

---

## Clarifications

### Session 2025-12-20

- Q: Quel type de contenu LinkedIn doit être prioritaire ? → A: Carrousels éducatifs (guides visuels, comparatifs, tutoriels)
- Q: Quel niveau d'automatisation pour LinkedIn ? → A: Automatisation avancée (génération IA + scheduling + analytics) via Odoo Social Marketing, Postiz (open source) en fallback

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Exécution Phase Fondations (Mois 1) (Priority: P1)

L'équipe marketing met en place les bases techniques et de contenu pour générer du trafic organique et construire une présence LinkedIn.

**Why this priority**: Sans les fondations (SEO, emailing, LinkedIn), aucune campagne payante ne peut être efficace. C'est le socle indispensable.

**Independent Test**: Peut être testé en vérifiant que tous les outils sont configurés, que 5 articles sont publiés, et que les profils LinkedIn sont actifs.

**Acceptance Scenarios**:

1. **Given** le site doclify.cloud existe, **When** l'équipe configure Google Analytics et Search Console, **Then** les données de trafic sont collectées et accessibles
2. **Given** aucun article de blog n'existe, **When** 5 articles sont publiés sur 4 semaines, **Then** chaque article est indexé par Google sous 7 jours
3. **Given** le profil LinkedIn entreprise est basique, **When** il est optimisé avec bannière, description et CTA, **Then** il atteint 200 followers en fin de mois
4. **Given** aucun système d'emailing n'existe, **When** AWS SES est configuré avec séquence onboarding de 8 emails, **Then** les nouveaux inscrits reçoivent automatiquement la séquence
5. **Given** aucun webinaire n'a eu lieu, **When** le premier webinaire est organisé, **Then** minimum 20 participants sont présents

---

### User Story 2 - Exécution Phase Accélération (Mois 2) (Priority: P2)

L'équipe lance les campagnes payantes LinkedIn Ads, active le programme de parrainage, et intensifie les relations presse.

**Why this priority**: Une fois les fondations posées, l'accélération permet de générer des leads qualifiés rapidement.

**Independent Test**: Peut être testé en vérifiant que LinkedIn Ads génère des leads, que le programme parrainage est actif, et que des retours presse existent.

**Acceptance Scenarios**:

1. **Given** les profils LinkedIn sont optimisés, **When** une campagne LinkedIn Ads de 500€ est lancée, **Then** elle génère minimum 10 leads qualifiés (CPL < 50€)
2. **Given** des clients payants existent, **When** le programme parrainage est lancé, **Then** chaque parrain reçoit 1 mois gratuit par filleul converti
3. **Given** des journalistes ont été contactés en M1, **When** les relances sont effectuées, **Then** minimum 1 article presse est publié
4. **Given** 3 études de cas sont créées, **When** elles sont publiées sur le site, **Then** elles génèrent du trafic organique mesurable
5. **Given** le webinaire #1 a eu lieu, **When** le webinaire #2 est organisé, **Then** le taux de participation augmente de 20%

---

### User Story 3 - Exécution Phase Scaling (Mois 3) (Priority: P3)

L'équipe amplifie les canaux performants, recrute des ambassadeurs, et initie les premiers partenariats stratégiques.

**Why this priority**: Le scaling permet de démultiplier les résultats des phases précédentes et prépare la croissance Q2.

**Independent Test**: Peut être testé en vérifiant l'augmentation du budget Ads, le recrutement d'ambassadeurs, et l'initiation d'un partenariat.

**Acceptance Scenarios**:

1. **Given** LinkedIn Ads a prouvé son efficacité en M2, **When** le budget passe à 1000€/mois, **Then** le nombre de leads double sans augmenter le CPL de plus de 20%
2. **Given** 10 ambassadeurs potentiels ont été identifiés, **When** ils sont contactés, **Then** minimum 3 acceptent le programme ambassadeur
3. **Given** un éditeur de logiciel médical a été contacté, **When** les discussions avancent, **Then** un partenariat test est signé ou en négociation finale
4. **Given** 2 vidéos témoignages sont produites, **When** elles sont publiées sur LinkedIn et le site, **Then** chacune génère minimum 1000 vues
5. **Given** les 90 jours sont écoulés, **When** l'audit complet est réalisé, **Then** un rapport avec KPIs et recommandations Q2 est produit

---

### User Story 4 - Suivi et Pilotage Continu (Priority: P1)

L'équipe suit les KPIs hebdomadaires et mensuels pour ajuster la stratégie en temps réel.

**Why this priority**: Sans suivi, impossible de savoir si les actions fonctionnent et d'ajuster rapidement.

**Independent Test**: Peut être testé en vérifiant que les dashboards sont à jour et que les bilans mensuels sont produits.

**Acceptance Scenarios**:

1. **Given** Google Analytics est configuré, **When** chaque semaine se termine, **Then** un rapport hebdomadaire de 5 min est produit
2. **Given** des KPIs sont définis, **When** une métrique passe en zone d'alerte, **Then** une action corrective est décidée sous 48h
3. **Given** un mois est écoulé, **When** le bilan mensuel est rédigé, **Then** il inclut performance vs objectifs et ajustements pour le mois suivant

---

### Edge Cases

- Que se passe-t-il si LinkedIn Ads ne génère aucun lead après 2 semaines ? → Pause, analyse, pivot vers autre ciblage ou canal
- Que se passe-t-il si aucun journaliste ne répond ? → Basculer vers stratégie podcast et guest posting
- Que se passe-t-il si le webinaire n'a que 5 participants ? → Reprogrammer avec nouvelle promotion et partenariat avec influenceur médical
- Que se passe-t-il si le budget marketing est réduit en cours de route ? → Prioriser SEO organique et LinkedIn organique (coût minimal)

---

## Requirements *(mandatory)*

### Functional Requirements

#### Phase 1 - Fondations (Semaines 1-4)

- **FR-001**: L'équipe DOIT configurer Google Analytics 4 et Google Search Console sur doclify.cloud
- **FR-002**: L'équipe DOIT optimiser les balises title et meta description de toutes les pages existantes
- **FR-003**: L'équipe DOIT créer 4 landing pages par spécialité (Alternative Dragon Medical, Transcription Psychologue, Cardiologue, Généraliste)
- **FR-004**: L'équipe DOIT publier 5 articles de blog optimisés SEO sur le mois
- **FR-005**: L'équipe DOIT configurer AWS SES avec une séquence d'onboarding de 8 emails
- **FR-006**: L'équipe DOIT optimiser les profils LinkedIn entreprise et fondateur (bannière, description, CTA)
- **FR-007**: L'équipe DOIT publier minimum 8 posts LinkedIn sur le mois (mix fondateur + entreprise), en privilégiant les carrousels éducatifs (guides visuels, comparatifs, tutoriels)
- **FR-008**: L'équipe DOIT créer un lead magnet PDF "Guide productivité médecin"
- **FR-009**: L'équipe DOIT organiser 1 webinaire avec minimum 20 participants
- **FR-010**: L'équipe DOIT contacter minimum 5 journalistes de presse médicale

#### Phase 2 - Accélération (Semaines 5-8)

- **FR-011**: L'équipe DOIT lancer une campagne LinkedIn Ads avec budget de 500€
- **FR-012**: L'équipe DOIT créer 3 visuels publicitaires et configurer A/B tests
- **FR-013**: L'équipe DOIT publier 4 articles de blog supplémentaires (total 9)
- **FR-014**: L'équipe DOIT créer et publier 3 études de cas clients
- **FR-015**: L'équipe DOIT lancer le programme de parrainage (1 mois gratuit par filleul)
- **FR-016**: L'équipe DOIT envoyer un communiqué de presse
- **FR-017**: L'équipe DOIT contacter 3 podcasts cibles
- **FR-018**: L'équipe DOIT organiser le webinaire #2
- **FR-019**: L'équipe DOIT identifier 10 ambassadeurs potentiels

#### Phase 3 - Scaling (Semaines 9-12)

- **FR-020**: L'équipe DOIT augmenter le budget LinkedIn Ads à 1000€/mois
- **FR-021**: L'équipe DOIT publier 3 articles de blog supplémentaires (total 12)
- **FR-022**: L'équipe DOIT produire 2 vidéos témoignages clients
- **FR-023**: L'équipe DOIT contacter 1 éditeur de logiciel médical pour partenariat
- **FR-024**: L'équipe DOIT organiser le webinaire #3
- **FR-025**: L'équipe DOIT recruter minimum 3 ambassadeurs actifs
- **FR-026**: L'équipe DOIT créer une page ressources (guides, vidéos, webinaires)
- **FR-027**: L'équipe DOIT produire le rapport complet des 90 jours
- **FR-028**: L'équipe DOIT définir les objectifs et le plan Q2

#### Pilotage Continu

- **FR-029**: L'équipe DOIT produire un rapport hebdomadaire de suivi des KPIs
- **FR-030**: L'équipe DOIT produire un bilan mensuel avec ajustements
- **FR-031**: L'équipe DOIT maintenir un dashboard de suivi accessible en temps réel

#### Automatisation LinkedIn

- **FR-032**: L'équipe DOIT configurer Odoo Social Marketing pour le scheduling et analytics des posts LinkedIn (Postiz en solution de secours si nécessaire)
- **FR-033**: L'équipe DOIT mettre en place un workflow de génération de contenu assisté par IA pour les carrousels éducatifs
- **FR-034**: L'équipe DOIT définir un calendrier éditorial hebdomadaire avec publication automatisée

### Key Entities

- **Lead** : Prospect ayant laissé ses coordonnées (email minimum), avec source d'acquisition et date
- **Client** : Utilisateur payant avec date de conversion, plan souscrit, et source d'origine
- **Contenu** : Article de blog, landing page, étude de cas, vidéo - avec date de publication et performance
- **Campagne** : Action marketing avec budget, dates, canal, et métriques de performance
- **Ambassadeur** : Client actif qui promeut Doclify en échange d'avantages

---

## Success Criteria *(mandatory)*

### Measurable Outcomes - Fin Mois 1

- **SC-001**: 5 articles de blog publiés et indexés
- **SC-002**: 4 landing pages par spécialité créées
- **SC-003**: 50 abonnés à la newsletter
- **SC-004**: 200 followers sur la page LinkedIn entreprise
- **SC-005**: 1 webinaire réalisé avec 20+ participants
- **SC-006**: Séquence emailing onboarding active (8 emails)

### Measurable Outcomes - Fin Mois 2

- **SC-007**: 9 articles de blog publiés (cumul)
- **SC-008**: 30 leads générés (tous canaux)
- **SC-009**: 20 inscriptions à l'essai gratuit
- **SC-010**: 500 followers LinkedIn
- **SC-011**: LinkedIn Ads actif avec CPL < 50€
- **SC-012**: Programme parrainage lancé
- **SC-013**: 5 ambassadeurs potentiels identifiés
- **SC-014**: 3 études de cas publiées

### Measurable Outcomes - Fin Mois 3 (90 jours)

- **SC-015**: 12 articles de blog publiés (cumul)
- **SC-016**: 50 leads générés (cumul)
- **SC-017**: 15 nouveaux clients payants
- **SC-018**: 1000 followers LinkedIn
- **SC-019**: 3 webinaires réalisés
- **SC-020**: Taux de conversion essai → payant ≥ 20%
- **SC-021**: CAC moyen < 100€
- **SC-022**: 3 ambassadeurs recrutés et actifs
- **SC-023**: 1 partenariat initié avec éditeur logiciel
- **SC-024**: MRR atteint 3 000€ (40 clients à 75€/mois)

### Métriques Business (North Star)

- **SC-025**: MRR de 3 000€ à M3, 10 000€ à M6, 30 000€ à M12
- **SC-026**: 40 clients actifs à M3, 130 à M6, 400 à M12
- **SC-027**: Churn mensuel < 5%
- **SC-028**: NPS > 40

---

## Budget Estimé

| Poste              | Budget 90 jours    |
| ------------------ | ------------------ |
| LinkedIn Ads       | 2 000€             |
| Outils (AWS SES...)  | 200€               |
| Création contenu   | 1 000€             |
| Événements/Salon   | 2 000€ (optionnel) |
| **Total**          | **3 200 - 5 200€** |

---

## Assumptions

- L'équipe dispose d'au moins 1 personne dédiée au marketing (temps partiel minimum 50%)
- Le site doclify.cloud est fonctionnel et permet les inscriptions
- Des clients existants peuvent fournir des témoignages
- Le fondateur est disponible pour le personal branding LinkedIn
- Un budget de 3 200€ minimum est disponible sur 90 jours
- Les outils mentionnés (AWS SES, LinkedIn Ads) sont accessibles
