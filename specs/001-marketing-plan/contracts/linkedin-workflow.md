# LinkedIn Workflow: Création et Publication

**Outil**: Odoo Social Marketing (Postiz en backup)
**Fréquence**: 2 posts/semaine minimum (8/mois)
**Comptes**: Page entreprise + Profil fondateur

---

## Vue d'ensemble

```
Idéation → Création → Review → Scheduling → Publication → Analytics
   │          │         │          │            │           │
   J-7       J-5       J-3        J-2          J0         J+7
```

---

## 1. Idéation (J-7)

### Sources de contenu
- Questions fréquentes des prospects
- Témoignages clients
- Actualités santé numérique
- Comparatifs concurrents
- Conseils productivité médecin

### Types de posts (ratio mensuel)

| Type | Fréquence | Objectif |
|------|-----------|----------|
| Carrousel éducatif | 4/mois | Engagement, autorité |
| Témoignage client | 2/mois | Preuve sociale |
| Post personnel (fondateur) | 4/mois | Personal branding |
| Actualité produit | 2/mois | Awareness |
| Repost/Engagement | 4/mois | Visibilité |

### Template idéation

```markdown
## Idée de post

**Type**: [Carrousel / Témoignage / Personnel / Produit]
**Compte**: [Page entreprise / Fondateur]
**Sujet**:
**Angle**:
**Hook (accroche)**:
**CTA final**:
**Date publication souhaitée**:
```

---

## 2. Création (J-5)

### Structure carrousel (5-7 slides)

```
Slide 1: HOOK (question/affirmation choc)
Slide 2: Problème/Contexte
Slide 3-5: Solution/Conseils (1 par slide)
Slide 6: Résumé/Takeaway
Slide 7: CTA + Call to comment
```

### Template carrousel

**Slide 1 - Hook**
```
[Chiffre choc ou question]

"90% des médecins perdent
2h par jour en tâches admin"

→ Swipe pour changer ça
```

**Slides 2-5 - Contenu**
```
[Titre court]

• Point 1
• Point 2
• Point 3

[Illustration simple]
```

**Slide finale - CTA**
```
Récap:
✓ Point 1
✓ Point 2
✓ Point 3

Testez Doclify gratuitement
→ doclify.cloud

[Like si utile,
Commente ta question,
Partage à un confrère]
```

### Specs visuels

| Élément | Spécification |
|---------|---------------|
| Format | 1080×1350 px (4:5) |
| Fond | Dégradé bleu Doclify (#0066CC → #003366) |
| Police titre | Inter Bold 48px |
| Police corps | Inter Regular 32px |
| Couleur texte | Blanc #FFFFFF |
| Accents | Vert Doclify #00CC66 |

### Outils de création
1. **Canva** - Templates carrousels
2. **Figma** - Design custom
3. **Remove.bg** - Détourage photos
4. **Unsplash** - Photos libres de droits

---

## 3. Review (J-3)

### Checklist validation

```markdown
## Checklist Review

- [ ] Hook captivant (question ou chiffre)
- [ ] Texte lisible (pas plus de 50 mots/slide)
- [ ] CTA clair et actionnable
- [ ] Hashtags pertinents (3-5)
- [ ] Mention compte entreprise si post fondateur
- [ ] Pas de jargon technique excessif
- [ ] Accessible (contraste, lisibilité)
- [ ] Aligné avec valeurs Doclify
- [ ] Pas de claims non vérifiables
```

### Niveaux d'approbation

| Type de post | Approbateur |
|--------------|-------------|
| Carrousel éducatif | Auto-publication |
| Témoignage client | Validation client + juridique |
| Annonce produit | Fondateur |
| Post polémique | Fondateur + conseiller |

---

## 4. Scheduling (J-2)

### Horaires optimaux (médecins France)

| Jour | Horaire optimal | Backup |
|------|-----------------|--------|
| Mardi | 7h30 | 12h30 |
| Mercredi | 7h30 | 18h00 |
| Jeudi | 7h30 | 12h30 |
| Vendredi | 7h30 | - |

**Éviter**: Lundi matin, week-end

### Configuration Odoo Social Marketing

```python
# Paramètres de publication
{
    "account": "page_doclify",  # ou "vincent_fondateur"
    "scheduled_date": "2025-01-15 07:30:00",
    "content": "...",
    "media_ids": [attachment_id],
    "utm_source": "linkedin",
    "utm_medium": "organic",
    "utm_campaign": "carrousel_productivite"
}
```

### Calendrier éditorial (template semaine)

| Semaine | Mardi | Jeudi |
|---------|-------|-------|
| S1 | Carrousel (Page) | Post personnel (Fondateur) |
| S2 | Témoignage (Page) | Carrousel (Page) |
| S3 | Carrousel (Page) | Actualité produit (Page) |
| S4 | Post personnel (Fondateur) | Carrousel (Page) |

---

## 5. Publication (J0)

### Actions post-publication

**Dans les 30 minutes:**
- [ ] Répondre aux premiers commentaires
- [ ] Liker les commentaires pertinents
- [ ] Partager depuis le profil fondateur (si post page)

**Dans les 2 heures:**
- [ ] Répondre à tous les commentaires
- [ ] Envoyer en MP aux prospects intéressés
- [ ] Taguer des personnes pertinentes (avec parcimonie)

### Gestion des commentaires

| Type de commentaire | Action |
|--------------------|--------|
| Question sur le produit | Réponse détaillée + lien |
| Témoignage positif | Remerciement + like |
| Critique constructive | Réponse empathique + amélioration |
| Spam/Hors-sujet | Masquer |
| Concurrent | Ignorer ou réponse factuelle |

---

## 6. Analytics (J+7)

### Métriques à tracker

| Métrique | Calcul | Objectif |
|----------|--------|----------|
| Impressions | Vues totales | >5000/post |
| Engagement rate | (Likes+Comments+Shares)/Impressions | >3% |
| Clics profil | Visites profil après post | >50/post |
| Clics lien | Clics vers site | >20/post |
| Followers gagnés | Δ followers après post | >10/post |

### Rapport hebdomadaire

```markdown
## Rapport LinkedIn - Semaine du [DATE]

### Posts publiés
1. [Titre] - [Date] - [Compte]
   - Impressions: X
   - Engagement: X%
   - Clics: X

### Performance globale
- Followers: +X (total: Y)
- Impressions totales: X
- Engagement moyen: X%
- Meilleur post: [Titre]

### Learnings
- Ce qui a marché:
- À améliorer:

### Actions semaine prochaine
- [ ] Action 1
- [ ] Action 2
```

---

## Hashtags recommandés

### Généraux
`#médecin` `#santé` `#eHealth` `#eSanté` `#médecine`

### Spécifiques
`#transcriptionmédicale` `#IAsanté` `#productivitémédecin` `#médecingénéraliste`

### Marque
`#Doclify`

**Règle**: 3-5 hashtags par post, mélange général + spécifique
