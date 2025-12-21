# Research: Plan Marketing Doclify 90 Jours

**Date**: 2025-12-20
**Status**: Complete

---

## 1. Odoo Social Marketing - Configuration LinkedIn

### Decision
Utiliser Odoo Social Marketing intégré à l'instance Odoo existante pour le scheduling et l'analytics LinkedIn.

### Rationale
- Déjà disponible dans la stack Odoo de Doclify
- Intégration native avec le CRM (suivi des leads)
- Interface unifiée pour le marketing

### Configuration requise
- Connecter les comptes LinkedIn (page entreprise + profil fondateur) via l'API LinkedIn
- Configurer les champs UTM pour le tracking (`social_linkedin`, `social_facebook`, etc.)
- Utiliser le module de planification pour le calendrier éditorial

### Alternatives évaluées
| Outil | Avantages | Inconvénients |
|-------|-----------|---------------|
| Buffer | Simple, UX excellente | Coût supplémentaire, pas d'intégration CRM |
| Hootsuite | Complet | Prix élevé, overkill pour 1-2 comptes |
| Later | Bon pour visuel | Pas adapté LinkedIn B2B |

### Sources
- [Odoo Documentation](https://www.odoo.com/documentation/19.0/)

---

## 2. AWS SES - Séquences Onboarding B2B

### Decision
Configurer 8 emails en séquence automatisée avec templates personnalisés et tracking.

### Rationale
- AWS SES offre automation marketing avec version gratuite généreuse (300 emails/jour)
- API complète pour intégration avec formulaires site
- Support français et conformité RGPD native

### Best Practices B2B SaaS Onboarding

**Structure recommandée (8 emails sur 14 jours):**

| Jour | Email | Objectif |
|------|-------|----------|
| J+0 | Bienvenue | Confirmation inscription, accès essai |
| J+1 | Quick Start | Guide démarrage rapide (3 étapes clés) |
| J+3 | Fonctionnalité #1 | Transcription vocale - avantage principal |
| J+5 | Fonctionnalité #2 | Mode hors-ligne - différenciateur |
| J+7 | Étude de cas | Témoignage médecin similaire |
| J+10 | Rappel essai | J-4 avant fin essai gratuit |
| J+13 | Offre conversion | Promotion limitée (-10% premier mois) |
| J+14 | Dernier rappel | Urgence, fin essai imminent |

**Paramètres techniques:**
```json
{
  "sender": {
    "email": "contact@doclify.cloud",
    "name": "Vincent de Doclify"
  },
  "templateId": 1,
  "scheduledAt": "ISO_DATE",
  "params": {
    "prenom": "{{contact.FIRSTNAME}}",
    "specialite": "{{contact.SPECIALITE}}"
  }
}
```

### Métriques cibles
- Taux d'ouverture: > 35%
- Taux de clic: > 5%
- Taux de désinscription: < 0.5%

### Sources
- [AWS SES API Documentation](https://developers.brevo.com/)

---

## 3. LinkedIn Ads - Ciblage Médecins France

### Decision
Ciblage multi-critères combinant titres de poste, compétences et localisation France.

### Rationale
LinkedIn est le réseau professionnel #1 pour les médecins français, avec des options de ciblage précises par spécialité.

### Stratégie de ciblage

**Audiences recommandées:**

| Segment | Ciblage | Taille estimée |
|---------|---------|----------------|
| Médecins généralistes | Titre: "Médecin généraliste" OU "General Practitioner" + France | 15-20K |
| Psychologues/Psychiatres | Titre: "Psychologue" OU "Psychiatre" + France | 10-15K |
| Cardiologues | Titre: "Cardiologue" + France | 2-5K |
| Spécialistes divers | Compétence: "Médecine" + Ancienneté > 5 ans + France | 30-50K |

**Paramètres campagne:**
- Budget: 500€ M2, 1000€ M3
- Objectif: Génération de leads (formulaire LinkedIn)
- Format: Carrousels sponsorisés + Single Image Ads
- CPL cible: < 50€

### Best Practices 2025

1. **Approche funnel-based:**
   - TOFU (Awareness): Carrousels éducatifs sur gain de temps
   - MOFU (Consideration): Études de cas, témoignages
   - BOFU (Conversion): Offre essai gratuit avec urgence

2. **Ciblage combiné:**
   - 2-3 paramètres max par campagne
   - Éviter le sur-ciblage (audience trop petite)
   - Taille idéale: 50K-300K membres

3. **Restrictions EEA:**
   - Reach limité pour Member Gender/Interests en France
   - Privilégier Job Title + Job Function + Location

### Formats recommandés
- **Carrousel**: 3-5 slides, CTA clair à chaque slide
- **Single Image**: Visuel médical professionnel, message court
- **Video**: 30-60 secondes, sous-titrée

### Sources
- [LinkedIn Healthcare Ads Policy](https://www.linkedin.com/help/lms/answer/a1320991)
- [LinkedIn Ad Targeting Best Practices](https://www.factors.ai/blog/linkedin-ads-targeting-best-practices)
- [Healthcare Marketing on LinkedIn](https://business.linkedin.com/marketing-solutions/healthcare)

---

## 4. Google Analytics 4 - Configuration SaaS

### Decision
Configurer GA4 avec événements personnalisés pour le funnel SaaS et intégration e-commerce pour le tracking revenus.

### Rationale
GA4 est gratuit, puissant et standard industrie. L'intégration e-commerce permet le suivi LTV/CAC.

### Événements à configurer

```javascript
// Inscription essai gratuit
gtag('event', 'sign_up', {
  method: 'email',
  source: 'landing_page'
});

// Conversion payante
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 75,
  currency: 'EUR',
  items: [{
    item_name: 'Doclify Pro',
    quantity: 1,
    price: 75
  }]
});

// Téléchargement lead magnet
gtag('event', 'generate_lead', {
  currency: 'EUR',
  value: 10
});

// Clic CTA
gtag('event', 'cta_click', {
  cta_name: 'essai_gratuit_hero',
  page_location: window.location.href
});

// Début webinaire
gtag('event', 'webinar_registration', {
  webinar_id: 'W001',
  webinar_name: 'Demo Doclify'
});
```

### Objectifs à définir
1. **Essai gratuit** (inscription)
2. **Client payant** (achat)
3. **Lead qualifié** (téléchargement PDF)
4. **Engagement** (inscription webinaire)

### Funnel à tracker
```
Visiteur → Lead (form) → Essai → Client → Parrain
   100%       5%          2%      0.5%     0.1%
```

### Conformité RGPD
- Consentement cookies requis AVANT tout tracking
- Utiliser Google Consent Mode v2
- Bannière cookie conforme RGAA

---

## 5. Postiz - Solution de secours

### Decision
Postiz comme solution de secours si Odoo Social Marketing ne répond pas aux besoins.

### Rationale
- Open-source et self-hostable (contrôle total des données)
- Supporte LinkedIn, Twitter/X, et 17+ plateformes
- Fonctionnalités IA intégrées pour génération de contenu
- Gratuit en self-hosting

### Évaluation

| Critère | Score | Notes |
|---------|-------|-------|
| Fonctionnalités | 4/5 | Complet, IA intégrée, multi-plateforme |
| Facilité d'installation | 3/5 | Docker requis, config technique |
| Intégration CRM | 2/5 | Pas d'intégration native Odoo |
| Support | 3/5 | Communauté active, pas de support commercial |
| Coût | 5/5 | Gratuit en self-hosting |

### Déploiement
- Docker Compose pour installation locale
- Railway pour déploiement cloud rapide
- 14K+ stars GitHub, projet actif

### Quand basculer vers Postiz
- Si Odoo Social Marketing manque de fonctionnalités clés
- Si l'interface n'est pas adaptée au workflow carrousels
- Si les analytics sont insuffisants

### Sources
- [Postiz Official](https://postiz.com/)
- [GitHub Repository](https://github.com/gitroomhq/postiz-app)
- [Postiz Blog](https://postiz.com/blog/open-source-social-media-scheduler)

---

## Résumé des décisions

| Domaine | Outil choisi | Alternative |
|---------|--------------|-------------|
| Social Scheduling | Odoo Social Marketing | Postiz |
| Email Automation | AWS SES | Mailchimp |
| LinkedIn Ads | LinkedIn Ads Manager | - |
| Analytics | Google Analytics 4 | - |
| CRM | Odoo CRM (existant) | - |

---

## Prochaines étapes

1. Configurer Odoo Social Marketing avec comptes LinkedIn
2. Créer les 8 templates email dans AWS SES
3. Installer GA4 et configurer les événements
4. Créer les audiences LinkedIn Ads
5. Préparer les visuels carrousels
