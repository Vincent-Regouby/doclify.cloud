# Quickstart: Plan Marketing Doclify 90 Jours

**Objectif**: Lancer l'exécution marketing en moins d'une journée.

---

## Checklist Jour 1

### 1. Analytics (30 min)

- [ ] Créer un compte Google Analytics 4 (si pas existant)
- [ ] Ajouter le tag GA4 sur doclify.cloud
- [ ] Configurer Google Search Console
- [ ] Vérifier la propriété du site
- [ ] Créer les 4 objectifs de conversion dans GA4:
  - Inscription essai
  - Conversion payante
  - Téléchargement lead magnet
  - Inscription webinaire

**Ressource**: [Guide GA4 pour SaaS](https://support.google.com/analytics/)

---

### 2. AWS SES Email (45 min)

- [ ] Créer un compte AWS SES (gratuit jusqu'à 300 emails/jour)
- [ ] Vérifier le domaine d'envoi `doclify.cloud`
- [ ] Créer la liste "Essai Gratuit"
- [ ] Configurer les attributs de contact:
  - `PRENOM` (texte)
  - `SPECIALITE` (liste)
  - `DATE_INSCRIPTION` (date)
- [ ] Créer le premier template email (Email 1: Bienvenue)
- [ ] Configurer le formulaire d'inscription sur le site

**Ressource**: [contracts/email-sequences.md](./contracts/email-sequences.md)

---

### 3. LinkedIn Page Entreprise (30 min)

- [ ] Accéder à la page LinkedIn Doclify
- [ ] Mettre à jour la bannière (1128×191 px)
- [ ] Optimiser la description (2000 caractères max):
  ```
  Doclify transforme vos consultations en comptes-rendus structurés grâce à l'IA.

  ✓ 100% hébergé en France
  ✓ Mode hors-ligne
  ✓ 75€/mois sans engagement

  Essai gratuit 14 jours sur doclify.cloud
  ```
- [ ] Ajouter le bouton CTA "S'inscrire" → doclify.cloud
- [ ] Inviter les contacts existants à suivre la page

---

### 4. LinkedIn Profil Fondateur (30 min)

- [ ] Optimiser le headline:
  ```
  Fondateur Doclify | L'IA qui libère les médecins des tâches admin | 2h/semaine économisées
  ```
- [ ] Mettre à jour la section "À propos" (storytelling)
- [ ] Ajouter le lien vers doclify.cloud
- [ ] Activer le mode créateur
- [ ] Publier un premier post de lancement

---

### 5. Odoo Social Marketing (30 min)

- [ ] Activer le module Social Marketing dans Odoo
- [ ] Connecter le compte LinkedIn page entreprise
- [ ] Connecter le compte LinkedIn profil fondateur
- [ ] Configurer les UTM par défaut:
  - `utm_source`: linkedin
  - `utm_medium`: organic
- [ ] Planifier le premier post pour la semaine prochaine

**Fallback**: Si Odoo ne convient pas → [Postiz](https://postiz.com/)

---

### 6. Contenu initial (1h)

- [ ] Créer le premier article de blog (1000 mots):
  - **Sujet**: "Alternative Dragon Medical : Pourquoi les médecins français migrent vers l'IA"
  - **Mots-clés**: dragon medical alternative, transcription médicale ia
- [ ] Créer le premier carrousel LinkedIn (5-7 slides):
  - **Sujet**: "Comment gagner 2h/semaine sur vos comptes-rendus"
- [ ] Préparer le lead magnet PDF:
  - **Titre**: "Guide: 10 astuces pour booster votre productivité de médecin"

**Ressource**: [contracts/linkedin-workflow.md](./contracts/linkedin-workflow.md)

---

### 7. Dashboard de suivi (15 min)

- [ ] Créer un document Notion/Google Sheets pour le suivi
- [ ] Configurer les métriques hebdomadaires
- [ ] Planifier le rappel vendredi pour le rapport

**Ressource**: [contracts/reporting-template.md](./contracts/reporting-template.md)

---

## Récapitulatif Jour 1

| Tâche | Durée | Statut |
|-------|-------|--------|
| Analytics GA4 | 30 min | [ ] |
| AWS SES setup | 45 min | [ ] |
| LinkedIn Page | 30 min | [ ] |
| LinkedIn Profil | 30 min | [ ] |
| Odoo Social | 30 min | [ ] |
| Contenu initial | 1h | [ ] |
| Dashboard | 15 min | [ ] |
| **Total** | **4h** | |

---

## Semaine 1: Objectifs

| Jour | Actions |
|------|---------|
| Lun | Setup complet (ce quickstart) |
| Mar | Publier article blog #1 |
| Mer | Publier carrousel LinkedIn #1 |
| Jeu | Configurer séquence email complète (8 emails) |
| Ven | Créer landing page "Alternative Dragon" |

---

## Checklist Semaine 1 complète

### Contenu
- [ ] 1 article de blog publié
- [ ] 2 posts LinkedIn publiés
- [ ] 1 landing page créée
- [ ] Lead magnet PDF créé

### Technique
- [ ] GA4 opérationnel avec événements
- [ ] Formulaires connectés à AWS SES
- [ ] Séquence onboarding 8 emails active
- [ ] Odoo Social Marketing configuré

### Organisation
- [ ] Calendrier éditorial M1 planifié
- [ ] Dashboard de suivi en place
- [ ] Premier rapport hebdomadaire vendredi

---

## Contacts utiles

| Ressource | Lien |
|-----------|------|
| Support AWS SES | support.brevo.com |
| LinkedIn Help | linkedin.com/help |
| Google Analytics | support.google.com/analytics |
| Documentation Odoo | odoo.com/documentation |

---

## Dépannage rapide

### "Le tag GA4 ne remonte pas de données"
→ Vérifier que le consentement cookies est donné
→ Attendre 24-48h pour les premières données

### "Les emails AWS SES arrivent en spam"
→ Vérifier la configuration SPF/DKIM du domaine
→ Envoyer un email test et le marquer "non spam"

### "LinkedIn refuse la connexion Odoo"
→ Révoquer les accès dans LinkedIn Settings
→ Reconnecter avec les droits admin de la page

---

**Prêt à lancer?** Cochez chaque item et vous aurez une base marketing solide en une journée!
