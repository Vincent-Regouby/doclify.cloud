# Email Sequences: Onboarding Doclify

**Outil**: AWS SES
**Trigger**: Inscription essai gratuit
**Durée**: 14 jours (8 emails)

---

## Séquence Onboarding

### Email 1: Bienvenue (J+0)

**Sujet**: Bienvenue chez Doclify, {{prenom}} !

**Timing**: Immédiat après inscription

**Contenu**:
```
Bonjour {{prenom}},

Bienvenue chez Doclify ! Votre essai gratuit de 14 jours commence maintenant.

Voici vos accès :
- Application web : https://app.doclify.cloud
- Application mobile : [Lien App Store] | [Lien Google Play]

Pour démarrer en 2 minutes :
1. Connectez-vous à l'application
2. Lancez votre première transcription
3. Découvrez le résumé généré par l'IA

[BOUTON: Commencer maintenant →]

Des questions ? Répondez à cet email, je vous réponds personnellement.

Vincent
Fondateur de Doclify
```

**CTA**: Connexion à l'app

---

### Email 2: Quick Start (J+1)

**Sujet**: 3 étapes pour gagner 2h/semaine

**Timing**: J+1 à 10h

**Contenu**:
```
Bonjour {{prenom}},

Voici comment les médecins qui utilisent Doclify gagnent en moyenne 2h par semaine :

ÉTAPE 1 : Lancez une transcription
→ Appuyez sur le bouton rouge et parlez naturellement

ÉTAPE 2 : Laissez l'IA travailler
→ En 30 secondes, votre compte-rendu est prêt

ÉTAPE 3 : Exportez ou copiez
→ Format compatible avec tous les logiciels médicaux

[BOUTON: Voir la démo en vidéo (2 min) →]

Astuce : Doclify fonctionne aussi hors-ligne. Parfait pour les visites à domicile.

À demain,
Vincent
```

**CTA**: Vidéo démo

---

### Email 3: Fonctionnalité #1 - Transcription (J+3)

**Sujet**: Le secret des comptes-rendus en 30 secondes

**Timing**: J+3 à 10h

**Contenu**:
```
Bonjour {{prenom}},

Saviez-vous que Doclify transcrit vos consultations avec une précision de 98% ?

Notre IA est spécialement entraînée sur le vocabulaire médical français :
✓ Termes anatomiques
✓ Noms de médicaments
✓ Abréviations médicales

Et le meilleur : elle génère automatiquement un résumé structuré.

[IMAGE: Exemple de transcription avant/après]

[BOUTON: Tester avec ma prochaine consultation →]

Dr Martin, {{specialite}} à Lyon :
"Je dictais mes comptes-rendus en 5 minutes.
Avec Doclify, c'est 30 secondes."

Vincent
```

**CTA**: Ouvrir l'app

---

### Email 4: Fonctionnalité #2 - Mode hors-ligne (J+5)

**Sujet**: Pas de wifi ? Pas de problème.

**Timing**: J+5 à 10h

**Contenu**:
```
Bonjour {{prenom}},

Ce qui rend Doclify unique : le mode hors-ligne.

Lors de vos visites à domicile ou dans les zones blanches,
Doclify continue de fonctionner. Les transcriptions se synchronisent
automatiquement dès que vous retrouvez une connexion.

[ILLUSTRATION: Mode hors-ligne → Synchronisation automatique]

Aucun autre outil de transcription médicale ne propose ça en France.

[BOUTON: Activer le mode hors-ligne →]

Vous faites des visites à domicile ? Dites-le moi, j'ai des astuces pour vous.

Vincent
```

**CTA**: Paramètres mode hors-ligne

---

### Email 5: Étude de cas (J+7)

**Sujet**: Comment Dr Dubois a transformé son cabinet

**Timing**: J+7 à 10h

**Contenu**:
```
Bonjour {{prenom}},

Je voulais vous partager l'histoire du Dr Dubois, psychologue à Bordeaux.

Avant Doclify :
❌ 45 min de notes après chaque patient
❌ Retard systématique le soir
❌ Fatigue et frustration

Après Doclify :
✓ Notes complètes en temps réel
✓ Fin de journée à l'heure
✓ Plus de temps pour ses patients

"Doclify a changé ma pratique. Je recommande à tous mes confrères."

[BOUTON: Lire l'étude de cas complète →]

Et vous, {{prenom}}, comment se passe votre essai ?

Vincent
```

**CTA**: Étude de cas

---

### Email 6: Rappel essai J-4 (J+10)

**Sujet**: Plus que 4 jours d'essai gratuit

**Timing**: J+10 à 10h

**Contenu**:
```
Bonjour {{prenom}},

Votre essai gratuit se termine dans 4 jours.

Voici ce que vous avez accompli :
📊 {{nb_transcriptions}} transcriptions réalisées
⏱️ {{temps_economise}} minutes économisées

Pour continuer à gagner du temps, passez à Doclify Pro :
→ 75€/mois (sans engagement)
→ Transcriptions illimitées
→ Mode hors-ligne inclus
→ Support prioritaire

[BOUTON: Passer à Pro →]

Des questions avant de vous décider ? Répondez à cet email.

Vincent
```

**CTA**: Upgrade vers Pro

---

### Email 7: Offre spéciale (J+13)

**Sujet**: [Offre spéciale] -10% sur votre premier mois

**Timing**: J+13 à 10h

**Contenu**:
```
Bonjour {{prenom}},

Votre essai se termine demain.

Pour vous remercier d'avoir testé Doclify, je vous offre
10% de réduction sur votre premier mois :

Prix normal : 75€/mois
Votre prix : 67,50€/mois

[BOUTON: Activer mon offre →]

Cette offre expire dans 48h.

Si vous avez la moindre question, je suis disponible :
→ Répondez à cet email
→ Ou appelez-moi au 06 XX XX XX XX

Vincent
```

**CTA**: Conversion avec réduction

---

### Email 8: Dernier rappel (J+14)

**Sujet**: Votre essai Doclify expire aujourd'hui

**Timing**: J+14 à 8h

**Contenu**:
```
Bonjour {{prenom}},

C'est le dernier jour de votre essai gratuit.

Vous avez réalisé {{nb_transcriptions}} transcriptions.
Ne perdez pas votre historique.

[BOUTON: Continuer avec Doclify Pro →]

Si Doclify ne vous convient pas, j'aimerais comprendre pourquoi.
Un simple email me suffit.

Merci d'avoir essayé Doclify,
Vincent
```

**CTA**: Conversion finale

---

## Paramètres AWS SES

### Liste de contacts
- Nom: `Essai Gratuit`
- Attributs requis: `prenom`, `email`, `specialite`, `date_inscription`

### Automation workflow
```
Trigger: Contact ajouté à liste "Essai Gratuit"
    ↓
Wait 0 jours → Email 1 (Bienvenue)
    ↓
Wait 1 jour → Email 2 (Quick Start)
    ↓
Wait 2 jours → Email 3 (Transcription)
    ↓
Wait 2 jours → Email 4 (Hors-ligne)
    ↓
Wait 2 jours → Email 5 (Étude de cas)
    ↓
Wait 3 jours → Email 6 (Rappel J-4)
    ↓
Wait 3 jours → Email 7 (Offre -10%)
    ↓
Wait 1 jour → Email 8 (Dernier rappel)
    ↓
End workflow
```

### Conditions de sortie
- Contact passe à l'état "Client" → Arrêt immédiat
- Contact se désinscrit → Arrêt immédiat

### Métriques à suivre
| Email | Objectif ouverture | Objectif clic |
|-------|-------------------|---------------|
| 1 | 60% | 40% |
| 2 | 45% | 25% |
| 3 | 40% | 20% |
| 4 | 35% | 15% |
| 5 | 35% | 20% |
| 6 | 45% | 25% |
| 7 | 50% | 30% |
| 8 | 55% | 35% |
