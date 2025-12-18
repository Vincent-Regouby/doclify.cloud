# -*- coding: utf-8 -*-
{
    'name': 'Doclify Website',
    'version': '19.0.1.0.0',
    'category': 'Website/Theme',
    'summary': 'Site web officiel de Doclify - Transcription médicale IA',
    'description': '''
        Module de site web pour Doclify.cloud
        =====================================

        Présentation du service SaaS de transcription médicale par IA pour médecins et psychologues.

        Fonctionnalités:
        - Page d'accueil avec présentation du service
        - Page des fonctionnalités détaillées
        - Page des tarifs
        - Page à propos
        - Page de contact
        - Pages légales (confidentialité, CGV)
        - Portail de connexion pour les médecins
        - Design responsive et moderne
        - Optimisé SEO
    ''',
    'author': 'Doclify',
    'website': 'https://doclify.cloud',
    'license': 'LGPL-3',
    'depends': [
        'website',
        'portal',
    ],
    'data': [
        'security/ir.model.access.csv',
        'data/website_data.xml',
        'data/menu_data.xml',
        'views/templates.xml',
        'views/pages/homepage.xml',
        'views/pages/features.xml',
        'views/pages/pricing.xml',
        'views/pages/about.xml',
        'views/pages/contact.xml',
        'views/pages/privacy.xml',
        'views/pages/terms.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'website_doclify/static/src/scss/doclify_theme.scss',
            'website_doclify/static/src/js/doclify.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}
