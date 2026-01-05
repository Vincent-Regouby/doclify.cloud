---
title: "Souveraineté des données de santé : pourquoi c'est crucial en 2025"
description: "Souveraineté des données de santé : pourquoi l'hébergement en France et la conformité RGPD sont essentiels pour les médecins. Guide complet 2025."
pubDate: "2025-09-15"
author: "Doclify"
category: "Sécurité"
readingTime: "9 min de lecture"
tags: ["RGPD", "sécurité", "souveraineté", "HDS", "données de santé"]
---

Les données médicales sont parmi les plus sensibles qui existent. Leur protection n'est pas seulement une question de conformité réglementaire, c'est une question de confiance entre le médecin et ses patients. En 2025, la souveraineté des données de santé est devenue un critère incontournable.

## Le contexte : des données ultra-sensibles

Les données de santé sont classées par le RGPD comme des "données sensibles" bénéficiant d'une protection renforcée. Et pour cause : elles révèlent l'état de santé physique et mental d'une personne, ses pathologies, ses traitements, parfois ses addictions ou ses fragilités.

Une fuite de données médicales peut avoir des conséquences graves :

- **Discrimination à l'emploi** : un employeur apprenant une maladie chronique
- **Discrimination à l'assurance** : des primes majorées ou des refus de couverture
- **Atteinte à la vie privée** : révélation de pathologies stigmatisées
- **Chantage** : des données de santé monnayées sur le dark web

> **Le prix des données de santé**
>
> Sur le dark web, un dossier médical complet se vend entre 250€ et 1000€, soit 10 à 40 fois plus qu'un numéro de carte bancaire. Les données de santé sont les plus recherchées car elles sont permanentes (on ne peut pas "changer" son historique médical comme on change de carte bancaire).

## Le cadre réglementaire français

La France dispose d'un cadre réglementaire parmi les plus stricts au monde pour la protection des données de santé.

### Le RGPD et les données de santé

Le Règlement Général sur la Protection des Données (RGPD) classe les données de santé dans la catégorie des "données sensibles" (article 9). Leur traitement est interdit par défaut, sauf exceptions limitées :

- Consentement explicite de la personne
- Nécessité pour les soins de santé
- Intérêt public dans le domaine de la santé

### La certification HDS

En France, tout hébergeur de données de santé doit être certifié HDS (Hébergeur de Données de Santé). Cette certification, délivrée par des organismes accrédités, garantit :

- **Sécurité physique** : datacenters sécurisés, accès contrôlés
- **Sécurité logique** : chiffrement, gestion des accès, traçabilité
- **Disponibilité** : redondance, plans de continuité
- **Réversibilité** : possibilité de récupérer ses données

### Le secret médical

Au-delà du RGPD, le secret médical est protégé par le Code de la santé publique (article L.1110-4) et le Code pénal (article 226-13). Sa violation est passible de sanctions pénales.

## Le problème des solutions américaines

De nombreux outils de transcription médicale, dont Dragon Medical, utilisent des serveurs américains ou des API américaines (OpenAI, Google, Microsoft). Cela pose plusieurs problèmes majeurs.

### Le Cloud Act

Le Cloud Act américain (2018) permet aux autorités américaines d'accéder aux données stockées par des entreprises américaines, même si ces données sont hébergées en dehors des États-Unis. Concrètement :

- Microsoft, Google, Amazon (AWS) sont soumis au Cloud Act
- Les données de patients français peuvent être consultées par les autorités US
- Aucune notification n'est obligatoire envers les personnes concernées

### L'arrêt Schrems II

En juillet 2020, la Cour de Justice de l'Union Européenne a invalidé le Privacy Shield, l'accord qui permettait le transfert de données vers les États-Unis. Cet arrêt a confirmé l'incompatibilité entre le droit américain et la protection des données européennes.

> "Le niveau de protection des libertés et droits fondamentaux garanti dans l'ordre juridique de l'Union européenne ne peut pas être compromis par le transfert de données à caractère personnel vers un pays tiers."
>
> — Cour de Justice de l'Union Européenne, arrêt Schrems II

### Les API externes : un risque caché

Même si un service affiche "hébergement en France", il faut vérifier où sont traitées les données. Beaucoup de solutions utilisent des API externes pour l'IA :

- **OpenAI (ChatGPT)** : serveurs américains, soumis au Cloud Act
- **Google Cloud AI** : idem
- **Microsoft Azure AI** : idem

Si votre outil de transcription envoie vos dictées à l'API OpenAI pour le traitement, vos données de patients transitent par des serveurs américains, même si l'interface est française.

## Les critères d'une solution souveraine

Pour garantir la souveraineté des données de santé, une solution doit répondre à plusieurs critères :

| Critère | Ce qu'il faut vérifier |
|---------|----------------------|
| Hébergement | Serveurs physiquement situés en France |
| Hébergeur | Certification HDS valide et à jour |
| Traitement IA | IA exécutée localement, sans API externe |
| Entreprise | Société de droit français ou européen |
| Chiffrement | Données chiffrées au repos et en transit |
| Sous-traitants | Aucun sous-traitant extra-européen |

## L'approche Doclify : souveraineté totale

Chez Doclify, nous avons fait le choix d'une souveraineté totale des données de santé :

### Hébergement 100% français

Tous nos serveurs sont situés en France, chez des hébergeurs certifiés HDS. Aucune donnée ne transite par des serveurs étrangers.

### IA locale

Nos modèles d'IA (Whisper pour la transcription, Llama pour les résumés) tournent sur nos propres serveurs. Aucun appel aux API OpenAI, Google ou autres fournisseurs américains. Vos données de patients ne quittent jamais notre infrastructure française.

### Entreprise française

Doclify est une société de droit français, non soumise au Cloud Act ni à aucune juridiction extra-européenne.

### Transparence

Nous documentons clairement notre architecture et nos sous-traitants. Vous savez exactement où vont vos données.

> **Notre engagement**
>
> Nous nous engageons contractuellement à ne jamais transférer vos données hors de l'Union Européenne et à ne jamais utiliser d'API de fournisseurs américains pour le traitement de vos données de patients.

## Ce que vous pouvez faire

En tant que médecin, vous êtes responsable des données de vos patients. Voici les questions à poser à vos fournisseurs :

1. **Où sont hébergées les données ?** (pays, ville, datacenter)
2. **L'hébergeur est-il certifié HDS ?** (demander le certificat)
3. **Quelles API externes sont utilisées ?** (notamment pour l'IA)
4. **Quelle est la nationalité de l'entreprise ?** (droit applicable)
5. **Existe-t-il des sous-traitants extra-européens ?**

Si votre fournisseur ne peut pas répondre clairement à ces questions, c'est un signal d'alarme.

## Conclusion

La souveraineté des données de santé n'est pas une option, c'est une nécessité. Face au durcissement réglementaire et aux risques d'accès non autorisé par des juridictions étrangères, les médecins doivent choisir des solutions qui garantissent la protection de leurs patients.

En 2025, "hébergé en France" ne suffit plus. Il faut vérifier l'ensemble de la chaîne : hébergement, traitement IA, sous-traitants. Seule une approche de souveraineté totale peut garantir la confidentialité des données de santé.
