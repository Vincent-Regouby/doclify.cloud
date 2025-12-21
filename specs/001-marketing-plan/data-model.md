# Data Model: Plan Marketing Doclify

**Date**: 2025-12-20
**Status**: Complete

---

## Vue d'ensemble

Ce modèle de données définit les entités marketing à tracker dans Odoo CRM et les outils associés.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Lead     │────▶│   Client    │────▶│ Ambassadeur │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  Campagne   │     │  Contenu    │
└─────────────┘     └─────────────┘
```

---

## Entités

### 1. Lead (Prospect)

**Localisation**: Odoo CRM (`crm.lead`)

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `name` | Char | Nom complet | Oui |
| `email` | Email | Adresse email | Oui |
| `phone` | Phone | Téléphone | Non |
| `specialite` | Selection | Spécialité médicale | Non |
| `source_id` | Many2one | Source d'acquisition | Oui |
| `campaign_id` | Many2one | Campagne d'origine | Non |
| `date_capture` | Date | Date de création | Auto |
| `stage_id` | Many2one | Étape funnel | Oui |
| `score` | Integer | Score de qualification | Auto |

**Spécialités (selection):**
- `generaliste` - Médecin généraliste
- `psychologue` - Psychologue/Psychiatre
- `cardiologue` - Cardiologue
- `pediatre` - Pédiatre
- `autre` - Autre spécialité

**Sources d'acquisition:**
- `linkedin_organic` - LinkedIn organique
- `linkedin_ads` - LinkedIn Ads
- `seo` - Référencement naturel
- `webinaire` - Inscription webinaire
- `parrainage` - Programme parrainage
- `presse` - Retombées presse
- `direct` - Accès direct

**Étapes funnel (stages):**
1. Nouveau lead
2. Qualifié
3. Essai démarré
4. Essai actif
5. Converti (client)
6. Perdu

---

### 2. Client

**Localisation**: Odoo CRM (`res.partner` + `sale.subscription`)

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `partner_id` | Many2one | Contact Odoo | Oui |
| `plan` | Selection | Plan souscrit | Oui |
| `date_debut` | Date | Date de conversion | Oui |
| `mrr` | Float | Revenu mensuel | Auto |
| `source_origine` | Char | Source du lead initial | Oui |
| `parrain_id` | Many2one | Client parrain | Non |
| `nps_score` | Integer | Score NPS (1-10) | Non |
| `churned` | Boolean | Client perdu | Non |
| `date_churn` | Date | Date de résiliation | Non |

**Plans (selection):**
- `essai` - Essai gratuit (14 jours)
- `pro` - Pro (75€/mois)
- `enterprise` - Enterprise (sur devis)

---

### 3. Ambassadeur

**Localisation**: Odoo CRM (extension `res.partner`)

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `partner_id` | Many2one | Client partenaire | Oui |
| `is_ambassadeur` | Boolean | Statut ambassadeur | Oui |
| `code_parrainage` | Char | Code unique parrainage | Auto |
| `filleuls_count` | Integer | Nombre de filleuls | Auto |
| `mois_offerts` | Integer | Mois gratuits gagnés | Auto |
| `date_activation` | Date | Date activation ambassadeur | Oui |
| `niveau` | Selection | Niveau ambassadeur | Auto |

**Niveaux ambassadeur:**
- `bronze` - 1-2 filleuls (1 mois offert/filleul)
- `silver` - 3-5 filleuls (1.5 mois offert/filleul)
- `gold` - 6+ filleuls (2 mois offert/filleul)

---

### 4. Campagne Marketing

**Localisation**: Odoo Marketing Automation (`utm.campaign`)

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `name` | Char | Nom campagne | Oui |
| `type` | Selection | Type de campagne | Oui |
| `canal` | Selection | Canal principal | Oui |
| `date_debut` | Date | Date de lancement | Oui |
| `date_fin` | Date | Date de fin | Non |
| `budget` | Float | Budget alloué (€) | Oui |
| `depense` | Float | Dépense réelle (€) | Auto |
| `leads_generes` | Integer | Nombre de leads | Auto |
| `clients_generes` | Integer | Nombre de clients | Auto |
| `cpl` | Float | Coût par lead | Auto |
| `cac` | Float | Coût d'acquisition | Auto |
| `roas` | Float | Return on Ad Spend | Auto |

**Types de campagne:**
- `ads` - Publicité payante
- `content` - Marketing de contenu
- `email` - Campagne email
- `event` - Événement/Webinaire
- `pr` - Relations presse
- `partnership` - Partenariat

**Canaux:**
- `linkedin` - LinkedIn (organique + ads)
- `google` - Google (SEO + Ads)
- `email` - Emailing
- `webinaire` - Webinaire
- `presse` - Presse/PR
- `partenaire` - Partenariat

---

### 5. Contenu Marketing

**Localisation**: Fichiers + Tracking

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `titre` | Char | Titre du contenu | Oui |
| `type` | Selection | Type de contenu | Oui |
| `statut` | Selection | Statut publication | Oui |
| `url` | Char | URL du contenu | Non |
| `date_creation` | Date | Date de création | Auto |
| `date_publication` | Date | Date de publication | Non |
| `auteur` | Char | Auteur/Créateur | Oui |
| `vues` | Integer | Nombre de vues | Auto |
| `clics` | Integer | Clics vers site | Auto |
| `leads_generes` | Integer | Leads attribués | Auto |

**Types de contenu:**
- `article_blog` - Article de blog
- `landing_page` - Landing page
- `post_linkedin` - Post LinkedIn
- `carrousel` - Carrousel LinkedIn
- `video` - Vidéo
- `webinaire` - Webinaire
- `etude_cas` - Étude de cas
- `lead_magnet` - PDF/Guide téléchargeable

**Statuts:**
- `brouillon` - En cours de rédaction
- `review` - En attente de validation
- `planifie` - Planifié pour publication
- `publie` - Publié
- `archive` - Archivé

---

## Relations entre entités

```
Lead ──────┬──── source_id ──── Campagne
           │
           └──── devient ───── Client ──── parrain_id ──── Ambassadeur
                                  │
                                  └──── mesure ───── Campagne (cac, roas)

Contenu ──── genere ──── Lead
        │
        └──── appartient_a ──── Campagne
```

---

## Métriques calculées

### Par Lead
- **Score** = Points source (10-50) + Points engagement (0-50)
- **Temps conversion** = date_client - date_capture

### Par Client
- **LTV** = MRR × Durée moyenne (mois)
- **Mois actif** = Date actuelle - date_debut

### Par Campagne
- **CPL** = depense / leads_generes
- **CAC** = depense / clients_generes
- **ROAS** = (clients_generes × 75 × 12) / depense

### Globaux
- **MRR Total** = SUM(clients.mrr)
- **Churn Rate** = clients_churned / clients_total × 100
- **Conversion Rate** = clients / leads × 100

---

## Intégrations

| Système | Données synchronisées | Direction |
|---------|----------------------|-----------|
| Google Analytics 4 | Événements, conversions | GA4 → Odoo |
| AWS SES | Contacts, campagnes email | Bidirectionnel |
| LinkedIn Ads | Leads formulaires | LinkedIn → Odoo |
| Odoo Social | Posts, analytics | Odoo interne |
