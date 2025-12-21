# KPIs & Métriques Marketing

## Dashboard principal

### Métriques business (North Star)

| Métrique | Définition | Objectif M3 | Objectif M6 | Objectif M12 |
|----------|------------|-------------|-------------|--------------|
| **MRR** | Revenu mensuel récurrent | 3 000€ | 10 000€ | 30 000€ |
| **Clients actifs** | Abonnements payants | 40 | 130 | 400 |
| **Churn mensuel** | % clients perdus/mois | <5% | <4% | <3% |
| **NPS** | Net Promoter Score | >40 | >50 | >60 |

---

## Métriques par canal

### SEO & Content

| Métrique | Source | Objectif M3 | Alerte si |
|----------|--------|-------------|-----------|
| Trafic organique | Google Analytics | +50% | Stagnant |
| Positions top 10 | Search Console | 20 mots-clés | <10 |
| Pages indexées | Search Console | 50+ | <30 |
| CTR moyen | Search Console | >3% | <1.5% |
| Temps sur page | Google Analytics | >2 min | <1 min |
| Taux de rebond | Google Analytics | <60% | >75% |
| Backlinks | Ahrefs/SEMrush | 30+ | <10 |

**Formules clés :**
```
Trafic organique qualifié = Trafic organique × Taux de conversion
Valeur SEO = Trafic × CPC équivalent
```

### LinkedIn

| Métrique | Source | Objectif M3 | Alerte si |
|----------|--------|-------------|-----------|
| Followers page | LinkedIn | 1 000 | <300 |
| Followers fondateur | LinkedIn | 2 000 | <500 |
| Impressions/mois | LinkedIn | 50 000 | <10 000 |
| Engagement rate | LinkedIn | >3% | <1% |
| Clics vers site | LinkedIn | 500/mois | <100 |
| Messages reçus | LinkedIn | 20/mois | <5 |

**Formules clés :**
```
Engagement rate = (Likes + Comments + Shares) / Impressions × 100
Conversion LinkedIn = Clics vers site / Impressions × 100
```

### LinkedIn Ads

| Métrique | Source | Objectif | Alerte si |
|----------|--------|----------|-----------|
| CTR | LinkedIn Ads | >0.5% | <0.3% |
| CPC | LinkedIn Ads | <5€ | >8€ |
| CPL (Coût par Lead) | LinkedIn Ads | <50€ | >80€ |
| Taux conversion LP | Google Analytics | >5% | <2% |
| ROAS | Calcul | >3x | <1.5x |

**Formules clés :**
```
CPL = Dépense totale / Nombre de leads
ROAS = Revenu généré / Dépense publicitaire
CAC Ads = Dépense totale / Clients acquis via Ads
```

### Emailing

| Métrique | Source | Objectif | Alerte si |
|----------|--------|----------|-----------|
| Taille liste | Brevo | 1 000 | <300 |
| Taux d'ouverture | Brevo | >35% | <20% |
| Taux de clic | Brevo | >5% | <2% |
| Taux de désinscription | Brevo | <0.5% | >1% |
| Taux de bounce | Brevo | <2% | >5% |
| Taux de spam | Brevo | <0.1% | >0.3% |

**Formules clés :**
```
Taux d'ouverture = Emails ouverts / Emails délivrés × 100
Taux de clic = Clics / Emails délivrés × 100
CTR sur ouvertures = Clics / Emails ouverts × 100
```

### PR & Communication

| Métrique | Source | Objectif M6 | Méthode |
|----------|--------|-------------|---------|
| Articles publiés | Veille | 15 | Google Alerts |
| Mentions presse | Veille | 50 | Mention.com |
| Backlinks presse | Ahrefs | 20 | Outil SEO |
| Interviews réalisées | Manuel | 10 | Tracking |
| Podcasts | Manuel | 5 | Tracking |

---

## Métriques de conversion (Funnel)

### Funnel global

```
Visiteurs → Leads → Essais → Clients → Ambassadeurs
   |          |        |        |          |
  100%       5%       2%      0.5%       0.1%
```

| Étape | Métrique | Objectif | Calcul |
|-------|----------|----------|--------|
| Awareness | Visiteurs uniques | 5 000/mois | GA4 |
| Interest | Leads (email capturé) | 250/mois | CRM |
| Consideration | Inscriptions essai | 100/mois | App |
| Decision | Conversions payantes | 20/mois | App |
| Loyalty | Parrainages actifs | 5/mois | App |

### Taux de conversion par étape

| Transition | Objectif | Alerte si |
|------------|----------|-----------|
| Visiteur → Lead | 5% | <2% |
| Lead → Essai | 40% | <20% |
| Essai → Client | 20% | <10% |
| Client → Parrain | 25% | <10% |

---

## Métriques financières

### Coûts d'acquisition

| Métrique | Formule | Objectif |
|----------|---------|----------|
| **CAC global** | Dépenses marketing / Nouveaux clients | <150€ |
| **CAC payant** | Dépenses ads / Clients via ads | <200€ |
| **CAC organique** | (Salaires + outils) / Clients organiques | <50€ |

### Valeur client

| Métrique | Formule | Valeur cible |
|----------|---------|--------------|
| **ARPU** | MRR / Clients actifs | 75€ |
| **LTV** | ARPU × Durée vie moyenne | 900€ (12 mois) |
| **Ratio LTV/CAC** | LTV / CAC | >6x |

### Rentabilité marketing

| Métrique | Formule | Objectif |
|----------|---------|----------|
| **ROI Marketing** | (Revenu - Coût) / Coût × 100 | >300% |
| **Payback period** | CAC / ARPU | <3 mois |
| **Marketing % of revenue** | Dépenses marketing / Revenu | <30% |

---

## Tableaux de bord

### Dashboard hebdomadaire

| Métrique | Lundi | Mardi | Merc. | Jeudi | Vend. | Total |
|----------|-------|-------|-------|-------|-------|-------|
| Visiteurs site | | | | | | |
| Leads capturés | | | | | | |
| Inscriptions essai | | | | | | |
| Conversions | | | | | | |
| Impressions LinkedIn | | | | | | |
| Dépenses ads | | | | | | |

### Dashboard mensuel

| Métrique | M1 | M2 | M3 | Δ M/M | Objectif |
|----------|----|----|----|----|----------|
| Visiteurs | | | | | |
| Leads | | | | | |
| Essais | | | | | |
| Clients | | | | | |
| MRR | | | | | |
| CAC | | | | | |
| Churn | | | | | |

---

## Outils de tracking

### Stack recommandée

| Outil | Usage | Prix |
|-------|-------|------|
| **Google Analytics 4** | Trafic, conversions web | Gratuit |
| **Google Search Console** | SEO, positions | Gratuit |
| **LinkedIn Analytics** | Réseaux sociaux | Gratuit |
| **Brevo** | Emailing | Freemium |
| **Notion/Airtable** | Dashboard custom | Freemium |
| **Ubersuggest** | SEO avancé | 29€/mois |
| **Shield** | LinkedIn analytics | 8€/mois |

### Configuration GA4

**Événements à tracker :**
```javascript
// Inscription essai
gtag('event', 'sign_up', {
  method: 'email'
});

// Conversion payante
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 75,
  currency: 'EUR'
});

// Téléchargement lead magnet
gtag('event', 'generate_lead', {
  currency: 'EUR',
  value: 10
});

// Clic CTA
gtag('event', 'cta_click', {
  cta_name: 'essai_gratuit_hero'
});
```

---

## Rapports

### Rapport hebdomadaire (5 min)

```markdown
## Semaine du [Date]

### Highlights
- [Métrique clé 1] : [Valeur] ([Δ vs semaine précédente])
- [Métrique clé 2] : [Valeur] ([Δ])
- [Métrique clé 3] : [Valeur] ([Δ])

### Actions réalisées
- [Action 1]
- [Action 2]

### Alertes
- [Alerte si applicable]

### Priorités semaine prochaine
- [Priorité 1]
- [Priorité 2]
```

### Rapport mensuel (30 min)

```markdown
## Rapport Marketing - [Mois]

### Résumé exécutif
[3-4 phrases sur la performance globale]

### Métriques clés vs objectifs
| Métrique | Objectif | Réalisé | Statut |
|----------|----------|---------|--------|
| ... | ... | ... | ✅/⚠️/❌ |

### Performance par canal
#### SEO
[Analyse]

#### LinkedIn
[Analyse]

#### Emailing
[Analyse]

### Wins du mois
1. [Win 1]
2. [Win 2]

### Challenges
1. [Challenge 1]
2. [Challenge 2]

### Plan mois prochain
1. [Priorité 1]
2. [Priorité 2]
3. [Priorité 3]

### Budget
| Poste | Prévu | Réel | Δ |
|-------|-------|------|---|
| ... | ... | ... | ... |
```

---

## Alertes automatiques

### Configurer des alertes pour

| Événement | Seuil | Action |
|-----------|-------|--------|
| Trafic en baisse | -20% vs sem. précédente | Investiguer SEO |
| Taux conversion chute | <10% essai→client | Revoir onboarding |
| CAC explose | >200€ | Pause ads, analyser |
| Churn spike | >10% mensuel | Contacter churns |
| Bounce rate élevé | >80% | Optimiser landing |

**Outils d'alertes :**
- Google Analytics : Alertes personnalisées
- Databox : Alertes multi-sources
- Zapier : Alertes sur trigger
