"""
Scrape bottle images using requests + BeautifulSoup.
Uses session cookies and proper headers to avoid blocks.

Usage:
  pip install requests beautifulsoup4 psycopg2-binary
  python scripts/scrape_bottles.py
"""

import os
import re
import time
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlencode, quote_plus

# --- Config ---
ENV_FILE = '.env.local'
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.environ.get('SUPABASE_SERVICE_KEY')

# Load DATABASE_URL from .env.local
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DATABASE_URL:
    with open(ENV_FILE, 'r') as f:
        for line in f:
            if line.startswith('DATABASE_URL='):
                DATABASE_URL = line.split('=', 1)[1].strip()
                break

if not all([DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_KEY]):
    print("Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars")
    exit(1)

# --- DB via Neon HTTP API (handles cold starts) ---
from urllib.parse import urlparse

parsed_db = urlparse(DATABASE_URL)
NEON_HOST = parsed_db.hostname
NEON_USER = parsed_db.username
NEON_PASS = parsed_db.password
NEON_DB = parsed_db.path.lstrip('/')

NEON_HTTP_URL = f"https://{NEON_HOST}/sql"


def db_query(sql, params=None):
    """Execute SQL via Neon serverless HTTP API."""
    # Convert %s params to $1, $2 style for Neon
    converted_sql = sql
    param_list = []
    if params:
        param_list = list(params)
        for i in range(len(param_list)):
            converted_sql = converted_sql.replace('%s', f'${i+1}', 1)
        # Convert Python types to JSON-safe
        param_list = [str(p) if not isinstance(p, (int, float, bool, type(None))) else p for p in param_list]

    body = {"query": converted_sql, "params": param_list}

    for attempt in range(3):
        try:
            resp = requests.post(
                NEON_HTTP_URL,
                json=body,
                headers={
                    'Neon-Connection-String': DATABASE_URL,
                    'Content-Type': 'application/json',
                },
                timeout=30,
            )
            if resp.status_code != 200:
                raise Exception(f"Neon HTTP {resp.status_code}: {resp.text[:200]}")

            data = resp.json()
            # Response is { results: [ { rows: [...], fields: [...] } ] }
            if 'results' in data and len(data['results']) > 0:
                result = data['results'][0]
                if 'rows' in result and 'fields' in result:
                    cols = [f['name'] for f in result['fields']]
                    return [dict(zip(cols, row)) for row in result['rows']]
            # Alternative response format
            if 'rows' in data and 'fields' in data:
                cols = [f['name'] for f in data['fields']]
                return [dict(zip(cols, row)) for row in data['rows']]
            return []
        except Exception as e:
            if attempt == 2:
                raise
            time.sleep(5)
    return []


def db_execute(sql, params=None):
    db_query(sql, params)


# --- Session setup ---
session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
})


# --- Upload to Supabase ---
def upload_to_supabase(image_url, file_name):
    """Download image and upload to Supabase Storage."""
    resp = session.get(image_url, timeout=20)
    if resp.status_code != 200:
        raise Exception(f"Download failed: {resp.status_code}")

    content_type = resp.headers.get('content-type', 'image/jpeg')
    if len(resp.content) < 3000:
        raise Exception("Image too small")

    upload_resp = requests.post(
        f"{SUPABASE_URL}/storage/v1/object/bottles/{file_name}",
        headers={
            'Authorization': f'Bearer {SUPABASE_SERVICE_KEY}',
            'Content-Type': content_type,
            'x-upsert': 'true',
        },
        data=resp.content,
        timeout=20,
    )
    if upload_resp.status_code not in (200, 201):
        raise Exception(f"Upload failed: {upload_resp.status_code}")

    return f"{SUPABASE_URL}/storage/v1/object/public/bottles/{file_name}"


# --- Clean name ---
def clean_name(name):
    """Remove HTML entities and common noise from expression names."""
    name = re.sub(r'&[a-z]+;', '', name)
    name = re.sub(r'\b\d+CL\b', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\b(whisky|whiskey|single malt|scotch|bourbon|blend|blended)\b', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\b(year old|years old|ans? d\'[aâ]ge)\b', '', name, flags=re.IGNORECASE)
    return re.sub(r'\s+', ' ', name).strip()


# --- Search: The Whisky Exchange ---
def search_twe(query_term):
    """Search TWE with session cookies for anti-block."""
    try:
        # First visit homepage to get cookies
        url = f"https://www.thewhiskyexchange.com/search?q={quote_plus(query_term)}"
        resp = session.get(url, timeout=15, allow_redirects=True)
        if resp.status_code != 200:
            return None

        soup = BeautifulSoup(resp.text, 'html.parser')

        # Find product images
        for img in soup.find_all('img'):
            src = img.get('src', '') or img.get('data-src', '') or img.get('data-lazy', '')
            if 'img.thewhiskyexchange.com' in src:
                # Skip non-product images
                if 'category' in src or 'banner' in src or 'brand' in src:
                    continue
                # Upgrade to 900px
                src = re.sub(r'/\d+/', '/900/', src)
                return src

        # Also check srcset
        for img in soup.find_all('img', srcset=True):
            srcset = img.get('srcset', '')
            match = re.search(r'(https://img\.thewhiskyexchange\.com/\d+/[^\s]+)', srcset)
            if match:
                src = re.sub(r'/\d+/', '/900/', match.group(1))
                return src

    except Exception:
        pass
    return None


# --- Search: Master of Malt ---
def search_mom(query_term):
    """Search Master of Malt."""
    try:
        url = f"https://www.masterofmalt.com/search/#!?q={quote_plus(query_term)}&type=whisky"
        # MoM's search is client-rendered, but their product pages might have images
        # Try their search API instead
        api_url = f"https://www.masterofmalt.com/api/search?q={quote_plus(query_term)}&type=whisky"
        resp = session.get(api_url, timeout=15)
        if resp.status_code == 200:
            try:
                data = resp.json()
                if data.get('products'):
                    for prod in data['products'][:3]:
                        img = prod.get('imageUrl') or prod.get('image')
                        if img:
                            if img.startswith('//'):
                                img = 'https:' + img
                            return img
            except (json.JSONDecodeError, KeyError):
                pass
    except Exception:
        pass
    return None


# --- Search: Wine Searcher ---
def search_winesearcher(query_term):
    """Search Wine-Searcher for whisky images."""
    try:
        url = f"https://www.wine-searcher.com/find/{quote_plus(query_term)}"
        resp = session.get(url, timeout=15)
        if resp.status_code != 200:
            return None

        soup = BeautifulSoup(resp.text, 'html.parser')

        # Wine-Searcher product images
        for img in soup.select('img[data-src], img[src]'):
            src = img.get('data-src') or img.get('src', '')
            if 'wine-searcher.com' in src or 'winesearcher' in src:
                if 'label' in src or 'bottle' in src or '/images/' in src:
                    if not ('icon' in src or 'logo' in src or 'flag' in src):
                        return src

    except Exception:
        pass
    return None


# --- Combined search ---
def find_bottle_image(expr_name, distillery_name):
    """Try multiple sources with multiple query variations."""
    dist_clean = clean_name(distillery_name)
    expr_clean = clean_name(expr_name)

    # Remove distillery from expression name to avoid duplication
    without_dist = re.sub(re.escape(dist_clean), '', expr_clean, flags=re.IGNORECASE).strip()

    # Build search queries
    queries = []
    if without_dist:
        queries.append(f"{dist_clean} {without_dist}")
    queries.append(expr_clean)

    # Age-based search
    age_match = re.search(r'(\d+)\s*(?:year|yr|yo|ans)', expr_name, re.IGNORECASE)
    if age_match:
        queries.append(f"{dist_clean} {age_match.group(1)}")

    # Just distillery
    queries.append(dist_clean)

    # Deduplicate
    seen = set()
    unique_queries = []
    for q in queries:
        q_lower = q.lower().strip()
        if q_lower not in seen and len(q_lower) > 3:
            seen.add(q_lower)
            unique_queries.append(q)

    # Try each source
    for q in unique_queries[:3]:
        img = search_twe(q)
        if img:
            return img
        time.sleep(2)

    for q in unique_queries[:2]:
        img = search_winesearcher(q)
        if img:
            return img
        time.sleep(2)

    return None


# --- Main ---
def main():
    print("Caskit — Python Bottle Scraper")
    print("=" * 40)
    print()

    # Warm up TWE session (get cookies)
    print("Warming up session...")
    session.get("https://www.thewhiskyexchange.com/", timeout=15)
    time.sleep(2)

    expressions = db_query("""
        SELECT e.id, e.slug, e.name, d.name as distillery_name, d.id as distillery_id
        FROM expressions e
        JOIN bottles b ON e.bottle_id = b.id
        JOIN distilleries d ON b.distillery_id = d.id
        WHERE e.image_url IS NULL
        ORDER BY d.name, e.name
    """)

    print(f"{len(expressions)} expressions need images\n")

    found = 0
    failed = 0
    distillery_fallbacks = {}

    for i, expr in enumerate(expressions):
        display = f"{expr['distillery_name']} — {clean_name(expr['name'])}"
        print(f"[{i+1}/{len(expressions)}] {display[:65]}... ", end='', flush=True)

        try:
            img_url = find_bottle_image(expr['name'], expr['distillery_name'])

            if img_url:
                public_url = upload_to_supabase(img_url, f"expressions/{expr['slug']}.jpg")
                db_execute("UPDATE expressions SET image_url = %s WHERE id = %s", (public_url, expr['id']))

                if expr['distillery_id'] not in distillery_fallbacks:
                    distillery_fallbacks[expr['distillery_id']] = public_url

                found += 1
                print("OK")
            elif expr['distillery_id'] in distillery_fallbacks:
                fb = distillery_fallbacks[expr['distillery_id']]
                db_execute("UPDATE expressions SET image_url = %s WHERE id = %s", (fb, expr['id']))
                found += 1
                print("= fallback")
            else:
                failed += 1
                print("- not found")

        except Exception as e:
            failed += 1
            print(f"! {str(e)[:40]}")

        time.sleep(2.5)

        if (i + 1) % 30 == 0:
            print(f"\n  --- Progress: {found} found, {failed} failed ---\n")

    # Final count
    remaining = db_query("SELECT COUNT(*) as count FROM expressions WHERE image_url IS NULL")
    print(f"\n{'=' * 40}")
    print(f"Found: {found} | Failed: {failed}")
    print(f"Still missing: {remaining[0]['count']}")


if __name__ == '__main__':
    main()
