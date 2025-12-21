#!/usr/bin/env python3
"""
Schedule existing LinkedIn posts in Odoo Social Marketing
Usage: python schedule_linkedin_posts.py
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


load_env()

ODOO_URL = os.getenv('ODOO_URL', 'https://inetshore.odoo.com')
ODOO_DB = os.getenv('ODOO_DB', 'inetshore')
ODOO_LOGIN = os.getenv('ODOO_LOGIN')
ODOO_API_KEY = os.getenv('ODOO_API_KEY')

# LinkedIn post IDs and their scheduled dates
# Posts créés précédemment : IDs 6, 7, 8, 9
LINKEDIN_SCHEDULE = [
    {"post_id": 6, "name": "Carrousel #1 - Productivité", "days_from_now": 3},   # Mardi 24/12
    {"post_id": 7, "name": "Carrousel #2 - Souveraineté", "days_from_now": 5},   # Jeudi 26/12
    {"post_id": 8, "name": "Post Fondateur", "days_from_now": 10},               # Mardi 31/12
    {"post_id": 9, "name": "Post Page Lancement", "days_from_now": 12},          # Jeudi 02/01
]


def connect_to_odoo():
    common = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/common')
    uid = common.authenticate(ODOO_DB, ODOO_LOGIN, ODOO_API_KEY, {})
    if not uid:
        raise Exception("Authentication failed.")
    print(f"✅ Connected to Odoo as user ID: {uid}")
    return uid


def get_models_proxy():
    return xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/object')


def schedule_post(models, uid, post_id, scheduled_date):
    """Update a post to scheduled state"""
    result = models.execute_kw(
        ODOO_DB, uid, ODOO_API_KEY,
        'social.post', 'write',
        [[post_id], {
            'scheduled_date': scheduled_date.strftime('%Y-%m-%d %H:%M:%S'),
            'state': 'scheduled'
        }]
    )
    return result


def main():
    print("=" * 50)
    print("📅 Scheduling LinkedIn posts in Odoo")
    print("=" * 50)

    if not ODOO_LOGIN or not ODOO_API_KEY:
        print("❌ Error: Missing ODOO_LOGIN or ODOO_API_KEY in .env")
        return

    try:
        uid = connect_to_odoo()
        models = get_models_proxy()

        now = datetime.now()

        print(f"\n📝 Scheduling {len(LINKEDIN_SCHEDULE)} LinkedIn posts...")

        for item in LINKEDIN_SCHEDULE:
            try:
                scheduled_date = now + timedelta(days=item['days_from_now'])
                scheduled_date = scheduled_date.replace(hour=7, minute=30, second=0, microsecond=0)

                result = schedule_post(models, uid, item['post_id'], scheduled_date)

                if result:
                    print(f"  ✅ Post ID {item['post_id']}: {item['name']}")
                    print(f"      Scheduled: {scheduled_date.strftime('%Y-%m-%d %H:%M')}")
                else:
                    print(f"  ⚠️ Post ID {item['post_id']}: No update (may not exist)")

            except Exception as e:
                print(f"  ❌ Post ID {item['post_id']}: {e}")

        print("\n" + "=" * 50)
        print("✅ Done! LinkedIn posts are now scheduled.")
        print(f"   URL: {ODOO_URL}/web#action=social.social_post_action")
        print("=" * 50)

    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
