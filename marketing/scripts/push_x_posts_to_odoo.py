#!/usr/bin/env python3
"""
Push short X (Twitter) posts to Odoo Social Marketing
Usage: python push_x_posts_to_odoo.py
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
ODOO_DB = os.getenv('ODOO_DB', 'inetshore')
ODOO_LOGIN = os.getenv('ODOO_LOGIN')
ODOO_API_KEY = os.getenv('ODOO_API_KEY')

# X (Twitter) posts - SHORT versions (280 characters max)
X_POSTS = [
    {
        "name": "X - Productivité médecin",
        "message": """🩺 Médecins : vous perdez 2h/semaine en tâches admin.

5 stratégies pour les récupérer :
1. Dictée vocale (3x plus rapide)
2. Templates intelligents
3. Batch processing
4. Mode hors-ligne
5. Automatisation IA

→ doclify.cloud

#médecin #productivité #eSanté""",
        "scheduled_days": 3,  # Days from now
    },
    {
        "name": "X - Souveraineté données",
        "message": """🔐 Vos données patients chez Google ou OpenAI ?

Beaucoup d'outils "IA" envoient vos dictées sur des serveurs US (Cloud Act).

Doclify = IA 100% française
✓ Hébergé en France
✓ Certifié HDS
✓ Conforme RGPD

→ doclify.cloud

#RGPD #eSanté""",
        "scheduled_days": 5,
    },
    {
        "name": "X - Post Fondateur",
        "message": """J'ai observé des médecins travailler pendant 2 ans.

Ce que j'ai vu : des praticiens brillants qui passent leurs soirées à taper des comptes-rendus.

J'ai créé Doclify : dictée → compte-rendu en 30 sec.
IA française, mode hors-ligne, 75€/mois.

→ doclify.cloud""",
        "scheduled_days": 10,
    },
    {
        "name": "X - Lancement Doclify",
        "message": """🩺 Médecins : et si vous récupériez 2h par semaine ?

Doclify transforme vos dictées en comptes-rendus structurés en 30 secondes.

✅ IA française (pas OpenAI/Google)
✅ Mode hors-ligne
✅ 75€/mois sans engagement

Essai gratuit 14 jours →
doclify.cloud""",
        "scheduled_days": 12,
    },
]


def connect_to_odoo():
    """Connect to Odoo and return uid"""
    common = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/common')
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


def create_social_post(models, uid, post_data, account_ids, scheduled_date=None):
    """Create a social media post in Odoo"""

    post_values = {
        'message': post_data['message'],
        'account_ids': [(6, 0, account_ids)],
        'state': 'draft',
    }

    # Add scheduled date if provided
    if scheduled_date:
        post_values['scheduled_date'] = scheduled_date.strftime('%Y-%m-%d %H:%M:%S')
        post_values['state'] = 'scheduled'

    post_id = models.execute_kw(
        ODOO_DB, uid, ODOO_API_KEY,
        'social.post', 'create',
        [post_values]
    )

    return post_id


def main():
    print("=" * 50)
    print("📤 Pushing X (Twitter) posts to Odoo Social Marketing")
    print("=" * 50)

    if not ODOO_LOGIN or not ODOO_API_KEY:
        print("❌ Error: Missing ODOO_LOGIN or ODOO_API_KEY in .env")
        return

    try:
        uid = connect_to_odoo()
        models = get_models_proxy()

        # Get available social accounts
        print("\n📱 Available social accounts:")
        accounts = get_social_accounts(models, uid)

        if not accounts:
            print("❌ No social accounts found.")
            return

        for acc in accounts:
            print(f"  - [{acc['id']}] {acc['name']} ({acc['media_type']})")

        # Find X/Twitter account
        x_accounts = [a for a in accounts if 'twitter' in a.get('media_type', '').lower()]

        if not x_accounts:
            print("\n⚠️ No X/Twitter account found. Looking for account named 'Vincent' or 'X'...")
            # Try to find by name
            x_accounts = [a for a in accounts if 'vincent' in a.get('name', '').lower() or 'x' in a.get('name', '').lower()]

        if not x_accounts:
            print("❌ No X/Twitter account found. Please configure it in Odoo.")
            print("   Posts will be created as drafts with first available account.")
            account_ids = [accounts[0]['id']] if accounts else []
        else:
            account_ids = [x_accounts[0]['id']]
            print(f"\n✅ Using X account: {x_accounts[0]['name']}")

        # Create posts
        print(f"\n📝 Creating {len(X_POSTS)} X posts...")

        now = datetime.now()

        for i, post in enumerate(X_POSTS, 1):
            try:
                # Calculate scheduled date (7:30 AM on the scheduled day)
                scheduled_date = now + timedelta(days=post.get('scheduled_days', i * 2))
                scheduled_date = scheduled_date.replace(hour=7, minute=30, second=0, microsecond=0)

                # Verify character count
                char_count = len(post['message'])
                if char_count > 280:
                    print(f"  ⚠️ [{i}/{len(X_POSTS)}] Warning: {post['name']} has {char_count} chars (max 280)")

                post_id = create_social_post(models, uid, post, account_ids, scheduled_date)
                print(f"  ✅ [{i}/{len(X_POSTS)}] Created: {post['name']} (ID: {post_id}) - {char_count} chars")
                print(f"      Scheduled: {scheduled_date.strftime('%Y-%m-%d %H:%M')}")
            except Exception as e:
                print(f"  ❌ [{i}/{len(X_POSTS)}] Failed: {post['name']} - {e}")

        print("\n" + "=" * 50)
        print("✅ Done! Check Odoo Social Marketing to review posts.")
        print(f"   URL: {ODOO_URL}/web#action=social.social_post_action")
        print("=" * 50)

    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
