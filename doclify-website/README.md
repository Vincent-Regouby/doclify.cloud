# Doclify - Site Web Statique

Site web marketing pour Doclify, l'application SaaS de transcription médicale par IA.

## Description

Site web professionnel présentant Doclify, une solution de transcription médicale par intelligence artificielle destinée aux professionnels de santé français.

### Caractéristiques

- **Design Dark** : Thème sombre (#0a0a0a) pour un look moderne et professionnel
- **Accents Orange Glowing** : Couleur primaire orange (#ff6b35) avec effets lumineux
- **100% Responsive** : Compatible mobile, tablette et desktop
- **Optimisé SEO** : Meta tags et structure sémantique
- **RGPD Compliant** : Pages légales complètes (confidentialité, CGV)

## Structure du site

```
doclify-website/
├── index.html              # Page d'accueil
├── fonctionnalites.html    # Détail des fonctionnalités
├── tarifs.html             # Plans et tarification
├── a-propos.html           # À propos de l'entreprise
├── contact.html            # Formulaire de contact et FAQ
├── confidentialite.html    # Politique de confidentialité RGPD
├── cgv.html                # Conditions générales de vente
├── css/
│   └── style.css           # Styles CSS (thème dark + orange)
├── js/
│   └── main.js             # JavaScript (navigation, FAQ, formulaire)
└── images/                 # Images (à ajouter selon besoins)
```

## Pages

### 1. Page d'accueil (index.html)
- Hero avec proposition de valeur
- Section fonctionnalités clés (6 features)
- Comment ça marche (3 étapes)
- Témoignages clients (3 médecins)
- Avantages business (4 points)
- CTA pour essai gratuit

### 2. Fonctionnalités (fonctionnalites.html)
- Enregistrement audio professionnel
- Transcription IA automatique (Whisper)
- Résumés intelligents (Llama 3.1)
- Mode offline
- Sécurité et RGPD
- Interface web intuitive
- Upload résilient S3 Multipart

### 3. Tarifs (tarifs.html)
- Plan Essentiel : 75€/mois
- Plan Pro : 65€/mois (min 3 médecins) - POPULAIRE
- Plan Clinique : Sur devis
- FAQ tarification
- Comparaison concurrents
- Calcul ROI

### 4. À propos (a-propos.html)
- Mission et vision
- Valeurs (6 piliers)
- Équipe (3 profils)
- Engagement RGPD
- Stack technique
- Roadmap 2025-2026

### 5. Contact (contact.html)
- Formulaire de contact complet
- Coordonnées (email, téléphone, adresse)
- FAQ (8 questions)
- Moyens de contact alternatifs (DPO, partenariats, presse)

### 6. Confidentialité (confidentialite.html)
- Politique RGPD complète
- Hébergement France
- Droits des utilisateurs
- Sécurité et chiffrement
- Durée de conservation
- Contact DPO

### 7. CGV (cgv.html)
- Conditions générales de vente
- Tarifs et paiement
- Durée et résiliation
- Obligations des parties
- Responsabilité
- Juridiction

## Lancer le site en local

### Avec Python 3 (recommandé)

```bash
cd /home/vincent/github/recording-app-website/doclify-website
python3 -m http.server 3000
```

Puis ouvrir : http://localhost:3000

### Avec Node.js

```bash
npx http-server -p 3000
```

### Avec PHP

```bash
php -S localhost:3000
```

## Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** :
  - Variables CSS pour le thème
  - Flexbox et Grid pour le layout
  - Media queries pour le responsive
  - Animations et transitions
- **JavaScript Vanilla** :
  - Navigation mobile
  - FAQ accordion
  - Smooth scrolling
  - Validation formulaire
  - Intersection Observer pour animations
  - Back to top button

## Fonctionnalités JavaScript

- Menu mobile hamburger avec overlay
- Navigation smooth scroll vers ancres
- FAQ accordion (expand/collapse)
- Validation formulaire contact
- Système de notifications
- Header sticky avec effet scroll
- Animations au scroll (Intersection Observer)
- Bouton "retour en haut"
- Highlight page active dans navigation

## Personnalisation

### Couleurs (dans css/style.css)

```css
:root {
  --dark-bg: #0a0a0a;           /* Fond principal */
  --dark-card: #151515;         /* Fond cartes */
  --orange-primary: #ff6b35;    /* Orange principal */
  --orange-glow: #ff8555;       /* Orange clair */
  --text-primary: #ffffff;      /* Texte blanc */
  --text-secondary: #b0b0b0;    /* Texte gris clair */
}
```

### Typographie

Police principale : **Inter** (Google Fonts)
Fallback : System fonts (-apple-system, Segoe UI, Roboto, etc.)

## SEO

Chaque page contient :
- Meta description pertinente
- Titre unique et descriptif
- Structure sémantique (h1, h2, h3)
- Liens internes cohérents
- Attributs alt sur images (à ajouter quand images présentes)

## Accessibilité

- Contraste texte/fond conforme WCAG AA
- Navigation au clavier possible
- Tailles de police relatives (rem)
- Labels explicites sur formulaires
- Structure sémantique HTML5

## Performance

- CSS et JS inline (pas de dépendances externes hors Google Fonts)
- Images optimisées (à ajouter)
- Code minifié en production (TODO)
- Lazy loading images (à implémenter si besoin)

## Déploiement production

### Option 1 : Hébergement statique

- **Netlify** : `netlify deploy --dir=. --prod`
- **Vercel** : `vercel --prod`
- **GitHub Pages** : Push sur branche gh-pages
- **OVH** : Upload FTP vers /www

### Option 2 : Serveur web

Avec Nginx :

```nginx
server {
    listen 80;
    server_name doclify.fr www.doclify.fr;
    root /var/www/doclify-website;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## TODO pour production

- [ ] Ajouter logo Doclify (remplacer texte "DOCLIFY")
- [ ] Ajouter images/screenshots de l'application
- [ ] Ajouter photos équipe (ou avatars pro)
- [ ] Configurer formulaire de contact avec backend (actuellement frontend only)
- [ ] Ajouter Google Analytics ou Matomo (respect RGPD)
- [ ] Minifier CSS et JS
- [ ] Optimiser images (WebP, compression)
- [ ] Ajouter sitemap.xml
- [ ] Ajouter robots.txt
- [ ] Configurer SSL/TLS (Let's Encrypt)
- [ ] Tester accessibilité avec WAVE ou axe
- [ ] Tester performances avec Lighthouse

## Maintenance

### Mettre à jour les tarifs

Éditer `tarifs.html`, section pricing-grid.

### Ajouter un témoignage

Éditer `index.html`, section testimonials-grid.

### Modifier les CGV/Confidentialité

Éditer `cgv.html` ou `confidentialite.html` et mettre à jour la date de version.

## Support

Pour toute question sur le site web :
- Email : contact@doclify.fr
- Documentation technique : Voir PRD_Medical_Recording_SaaS_v3_Consolidated.md

## License

Copyright © 2025 Doclify SAS. Tous droits réservés.

---

**Site créé le :** 30 novembre 2025
**Version :** 1.0.0
**Statut :** Production Ready
