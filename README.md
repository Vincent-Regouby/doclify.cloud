# Doclify Website - Module Odoo 19

Site web officiel de Doclify, une solution SaaS de transcription médicale par IA pour psychologues et médecins.

## Apercu

Ce projet contient :
- Un **module Odoo 19** (`website_doclify`) pour le site web public
- Une configuration **Docker Compose** pour le développement et les tests
- Les pages de présentation, tarifs, contact et pages légales

## Architecture

```
recording-app-website/
├── docker-compose.yml          # Configuration Docker (Odoo 19 + PostgreSQL)
├── odoo.conf                   # Configuration Odoo (optionnel)
├── website_doclify/            # Module Odoo
│   ├── __init__.py
│   ├── __manifest__.py
│   ├── controllers/
│   │   ├── __init__.py
│   │   └── main.py             # Routes HTTP (8 endpoints)
│   ├── data/
│   │   ├── website_data.xml    # Configuration du site
│   │   └── menu_data.xml       # Menu de navigation
│   ├── models/
│   │   └── __init__.py
│   ├── security/
│   │   └── ir.model.access.csv # Droits d'accès
│   ├── static/src/
│   │   ├── scss/
│   │   │   ├── primary_variables.scss  # Variables de thème
│   │   │   └── doclify_theme.scss      # Styles CSS
│   │   ├── js/
│   │   │   └── doclify.js              # JavaScript frontend
│   │   └── img/
│   └── views/
│       ├── templates.xml               # Header/footer personnalisés
│       └── pages/
│           ├── homepage.xml            # Page d'accueil
│           ├── features.xml            # Fonctionnalités
│           ├── pricing.xml             # Tarifs
│           ├── about.xml               # À propos
│           ├── contact.xml             # Contact
│           ├── privacy.xml             # Confidentialité (RGPD)
│           └── terms.xml               # CGV
└── README.md
```

## Démarrage rapide

### Prérequis

- Docker et Docker Compose installés
- Ports 8079 et 5440 disponibles

### Lancement

```bash
# Cloner le projet
cd /path/to/recording-app-website

# Démarrer les containers
docker-compose up -d

# Attendre ~30 secondes pour l'initialisation
sleep 30

# Installer le module website_doclify
docker-compose exec odoo odoo --stop-after-init -d odoo -i website_doclify \
  --db_host=db --db_user=odoo --db_password=odoo_secret_2024

# Redémarrer Odoo
docker-compose restart odoo
```

### Accès

- **Site web** : http://localhost:8079/
- **Backend Odoo** : http://localhost:8079/web/login
- **Identifiants** : admin / admin (première connexion)

## Pages disponibles

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Hero, problème/solution, features, CTA |
| Fonctionnalités | `/fonctionnalites` | 6 fonctionnalités détaillées |
| Tarifs | `/tarifs` | 49€/mois + FAQ |
| À propos | `/a-propos` | Histoire, valeurs, équipe |
| Contact | `/contact` | Formulaire de contact |
| Confidentialité | `/confidentialite` | Politique RGPD |
| CGV | `/conditions-generales` | Conditions générales |
| Espace Médecin | `/web/login` | Connexion au backoffice |

## Commandes Docker

```bash
# Démarrer les containers
docker-compose up -d

# Arrêter les containers
docker-compose down

# Voir les logs Odoo
docker-compose logs -f odoo

# Redémarrer Odoo (après modifications)
docker-compose restart odoo

# Mettre à jour le module après modifications
docker-compose exec odoo odoo --stop-after-init -d odoo -u website_doclify \
  --db_host=db --db_user=odoo --db_password=odoo_secret_2024

# Accéder au shell Odoo
docker-compose exec odoo odoo shell -d odoo \
  --db_host=db --db_user=odoo --db_password=odoo_secret_2024

# Supprimer toutes les données (reset complet)
docker-compose down -v
```

## Configuration

### Ports

| Service | Port interne | Port externe |
|---------|--------------|--------------|
| Odoo HTTP | 8069 | 8079 |
| Odoo Longpolling | 8072 | 8082 |
| PostgreSQL | 5432 | 5440 |

### Variables d'environnement

```yaml
# PostgreSQL
POSTGRES_DB: odoo
POSTGRES_USER: odoo
POSTGRES_PASSWORD: odoo_secret_2024

# Odoo
HOST: db
USER: odoo
PASSWORD: odoo_secret_2024
```

## Développement

### Modifier le module

1. Éditez les fichiers dans `website_doclify/`
2. Mettez à jour le module :
   ```bash
   docker-compose exec odoo odoo --stop-after-init -d odoo -u website_doclify \
     --db_host=db --db_user=odoo --db_password=odoo_secret_2024
   docker-compose restart odoo
   ```

### Ajouter une nouvelle page

1. Créer le fichier XML dans `views/pages/nouvelle_page.xml`
2. Ajouter la route dans `controllers/main.py`
3. Ajouter le fichier au manifest `__manifest__.py`
4. Mettre à jour le module

### Personnaliser le thème

Les couleurs sont définies dans `static/src/scss/primary_variables.scss` :

```scss
$primary: #2563EB;      // Bleu médical
$secondary: #10B981;    // Vert succès
$accent: #8B5CF6;       // Violet IA/tech
$text-dark: #1F2937;    // Gris foncé
$bg-light: #F9FAFB;     // Gris clair
```

## Processus de création

### Ce qui a été fait

1. **Analyse du PRD et de l'analyse business** pour comprendre le positionnement de Doclify
2. **Consultation de la documentation Odoo 19** via Context7 MCP
3. **Création du module Odoo** avec :
   - Structure standard Odoo 19
   - Templates QWeb pour les pages
   - Contrôleurs Python pour les routes
   - Assets SCSS/JS pour le thème
4. **Configuration Docker** avec :
   - PostgreSQL 15 Alpine
   - Odoo 19 officiel
   - Volumes persistants
   - Mode développement activé

### Problèmes rencontrés et solutions

| Problème | Solution |
|----------|----------|
| Modèle `website.seo.metadata` inexistant | Utilisation de la fonction `write` sur le modèle `website` |
| Référence `website.footer_menu` inexistante | Simplification des menus (uniquement menu principal) |
| Snippets incompatibles Odoo 19 | Suppression des snippets du manifest (à refaire selon la doc v19) |
| Permissions fichiers | Correction avec `chmod 755` sur les dossiers |

### Améliorations futures

- [ ] Recréer les snippets compatibles Odoo 19
- [ ] Ajouter le formulaire de contact fonctionnel (CRM)
- [ ] Intégrer les traductions i18n
- [ ] Ajouter un blog
- [ ] Configurer le SSL/HTTPS pour la production
- [ ] Optimiser les performances (cache, CDN)

## Déploiement en production

### Checklist

1. [ ] Changer le mot de passe admin
2. [ ] Configurer un domaine DNS
3. [ ] Activer HTTPS (nginx/traefik)
4. [ ] Désactiver le mode développement
5. [ ] Configurer les sauvegardes
6. [ ] Configurer le serveur SMTP
7. [ ] Ajouter Google Analytics

### Variables de production

```yaml
# docker-compose.prod.yml
services:
  odoo:
    command: []  # Supprimer --dev
    environment:
      - PROXY_MODE=True
```

## Ressources

- [Documentation Odoo 19](https://www.odoo.com/documentation/19.0/)
- [PRD Doclify](./PRD_Medical_Recording_SaaS_v3_Consolidated.md)
- [Analyse Business](../recording-app/BUSINESS_ANALYSIS.md)

## Licence

LGPL-3.0 - Compatible avec la licence Odoo.

---

**Doclify** - Transcription médicale par IA
https://doclify.cloud
