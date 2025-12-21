#!/usr/bin/env python3
"""
Push LinkedIn posts to Odoo Social Marketing
Usage: python push_to_odoo.py
"""

import xmlrpc.client
import os
from datetime import datetime, timedelta
from pathlib import Path


def load_env():
    """Load .env file manually"""
    env_path = Path(__file__).parent.parent.parent / '.env'
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()


# Load environment variables
load_env()

# Odoo connection settings
ODOO_URL = os.getenv('ODOO_URL', 'https://inetshore.odoo.com')
ODOO_DB = os.getenv('ODOO_DB', 'inetshore')  # Database name
ODOO_LOGIN = os.getenv('ODOO_LOGIN')
ODOO_API_KEY = os.getenv('ODOO_API_KEY')

# LinkedIn posts content
POSTS = [
    {
        "name": "Carrousel #1 - Gagner 2h/semaine",
        "message": """🩺 Médecin : vous perdez 2h par semaine en tâches admin.

Voici comment les récupérer 👇

Entre les comptes-rendus tapés à la va-vite, les notes papier des visites à domicile et les dossiers à compléter le soir...

La documentation médicale vous vole votre temps.

J'ai analysé le workflow de dizaines de médecins.
Résultat : 5 stratégies qui fonctionnent vraiment.

Swipe pour découvrir comment récupérer votre temps →

---

💬 Quelle est VOTRE plus grosse perte de temps admin ?
Dites-le en commentaire !

🔗 https://doclify.cloud/?utm_source=linkedin&utm_medium=organic&utm_campaign=carrousel_productivite_01

#médecin #productivité #santé #eSanté #Doclify""",
        "post_type": "carousel",
        "account_type": "page",
    },
    {
        "name": "Carrousel #2 - Souveraineté données",
        "message": """🔐 Vos données patients chez Google ou OpenAI ?

C'est probablement déjà le cas.

Beaucoup de médecins utilisent des outils de transcription "IA" sans savoir que leurs données transitent par des serveurs américains.

Cloud Act, Schrems II, RGPD...
Ce n'est pas que du jargon juridique.
C'est la protection de vos patients.

Swipe pour comprendre les enjeux et savoir quoi vérifier 👇

---

💬 Savez-vous où sont hébergées VOS données patients ?

🔗 https://doclify.cloud/?utm_source=linkedin&utm_medium=organic&utm_campaign=carrousel_souverainete_02

#RGPD #donnéesdesanté #souveraineténumérique #médecin #Doclify""",
        "post_type": "carousel",
        "account_type": "page",
    },
    {
        "name": "Post Fondateur - Lancement",
        "message": """J'ai passé 2 ans à observer des médecins travailler.

Ce que j'ai vu m'a choqué.

Des praticiens brillants, passionnés par leur métier, qui passent leurs soirées à taper des comptes-rendus.

Des généralistes qui notent sur papier en visite à domicile, puis ressaisissent tout au cabinet.

Des spécialistes qui dictent sur des apps américaines sans savoir où vont leurs données patients.

En 2024, on envoie des gens dans l'espace. Mais les médecins français tapent encore au clavier comme en 1995.

J'ai décidé de changer ça.

Doclify, c'est :
• Dictée → Compte-rendu structuré en 30 secondes
• IA 100% française (pas d'OpenAI, pas de Google)
• Mode hors-ligne pour les visites
• 75€/mois, sans engagement

On ne va pas révolutionner la médecine.
On va juste rendre aux médecins les 2 heures par semaine qu'ils méritent.

Si vous êtes médecin et que vous en avez marre de la paperasse, le lien est dans les commentaires.

---

💬 Combien de temps passez-vous chaque soir sur vos comptes-rendus ?

#médecin #startup #eSanté #Doclify #entrepreneuriat""",
        "post_type": "text",
        "account_type": "personal",
    },
    {
        "name": "Post Page - Lancement",
        "message": """🩺 Médecins : et si vous récupériez 2 heures par semaine ?

Doclify transforme vos dictées en comptes-rendus structurés.

En 30 secondes.

✅ Transcription IA ultra-précise (vocabulaire médical français)
✅ Résumés automatiques (motif, examen, diagnostic, traitement)
✅ Mode hors-ligne pour les visites à domicile
✅ 100% hébergé en France (RGPD, HDS)

75€/mois. Sans engagement. Essai gratuit 14 jours.

→ https://doclify.cloud/?utm_source=linkedin&utm_medium=organic&utm_campaign=page_lancement

---

💬 Quelle est votre plus grande frustration administrative au quotidien ?

#médecin #transcription #IA #productivité #Doclify""",
        "post_type": "text",
        "account_type": "page",
    },
]


def connect_to_odoo():
    """Connect to Odoo and return uid"""
    common = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/common')

    # Authenticate
    uid = common.authenticate(ODOO_DB, ODOO_LOGIN, ODOO_API_KEY, {})

    if not uid:
        raise Exception("Authentication failed. Check credentials.")

    print(f"✅ Connected to Odoo as user ID: {uid}")
    return uid


def get_models_proxy():
    """Get Odoo models proxy"""
    return xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/object')


def get_social_accounts(models, uid):
    """Get available social media accounts"""
    accounts = models.execute_kw(
        ODOO_DB, uid, ODOO_API_KEY,
        'social.account', 'search_read',
        [[]],
        {'fields': ['id', 'name', 'media_type']}
    )
    return accounts


def create_social_post(models, uid, post_data, account_ids):
    """Create a social media post in Odoo"""

    # Calculate scheduled date (next Tuesday or Thursday at 7:30)
    now = datetime.now()
    days_ahead = 1 - now.weekday()  # Tuesday = 1
    if days_ahead <= 0:
        days_ahead += 7
    scheduled_date = now + timedelta(days=days_ahead)
    scheduled_date = scheduled_date.replace(hour=7, minute=30, second=0, microsecond=0)

    post_values = {
        'message': post_data['message'],
        'account_ids': [(6, 0, account_ids)],  # Link to social accounts
        'state': 'draft',  # draft, scheduled, posted
        # 'scheduled_date': scheduled_date.strftime('%Y-%m-%d %H:%M:%S'),
    }

    post_id = models.execute_kw(
        ODOO_DB, uid, ODOO_API_KEY,
        'social.post', 'create',
        [post_values]
    )

    return post_id


def main():
    print("=" * 50)
    print("📤 Pushing LinkedIn posts to Odoo Social Marketing")
    print("=" * 50)

    if not ODOO_LOGIN or not ODOO_API_KEY:
        print("❌ Error: Missing ODOO_LOGIN or ODOO_API_KEY in .env")
        return

    try:
        # Connect to Odoo
        uid = connect_to_odoo()
        models = get_models_proxy()

        # Get available social accounts
        print("\n📱 Available social accounts:")
        accounts = get_social_accounts(models, uid)

        if not accounts:
            print("❌ No social accounts found. Please configure them in Odoo Social Marketing.")
            return

        for acc in accounts:
            print(f"  - [{acc['id']}] {acc['name']} ({acc['media_type']})")

        # Get LinkedIn accounts
        linkedin_accounts = [a for a in accounts if 'linkedin' in a.get('media_type', '').lower()]

        if not linkedin_accounts:
            print("\n⚠️ No LinkedIn accounts found. Posts will be created as drafts.")
            account_ids = [accounts[0]['id']] if accounts else []
        else:
            account_ids = [a['id'] for a in linkedin_accounts]

        # Create posts
        print(f"\n📝 Creating {len(POSTS)} posts...")

        for i, post in enumerate(POSTS, 1):
            try:
                post_id = create_social_post(models, uid, post, account_ids)
                print(f"  ✅ [{i}/{len(POSTS)}] Created: {post['name']} (ID: {post_id})")
            except Exception as e:
                print(f"  ❌ [{i}/{len(POSTS)}] Failed: {post['name']} - {e}")

        print("\n" + "=" * 50)
        print("✅ Done! Check Odoo Social Marketing to review and schedule posts.")
        print(f"   URL: {ODOO_URL}/web#action=social.social_post_action")
        print("=" * 50)

    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
