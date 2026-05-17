/**
 * Build bottles-viewer.html with ALL bottles embedded as JSON.
 * Usage: node scripts/build-viewer.mjs
 */

import { neon } from '@neondatabase/serverless'
import { readFileSync, writeFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const dbUrlMatch = envFile.match(/DATABASE_URL=(.+)/)
const DATABASE_URL = process.env.DATABASE_URL || dbUrlMatch?.[1]

if (!DATABASE_URL) { console.error('Missing DATABASE_URL'); process.exit(1) }

const sql = neon(DATABASE_URL)

async function main() {
  const rows = await sql`
    SELECT e.slug, d.name as distillery, e.name, e.image_url
    FROM expressions e
    JOIN bottles b ON e.bottle_id = b.id
    JOIN distilleries d ON b.distillery_id = d.id
    ORDER BY d.name, e.name
  `

  const json = JSON.stringify(rows.map(r => ({
    s: r.slug,
    d: r.distillery,
    n: r.name,
    i: r.image_url || ''
  })))

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Caskit Bottles \u2014 Image Viewer</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #1a1a2e; color: #eee; padding: 20px; }
h1 { text-align: center; margin-bottom: 8px; font-size: 1.8rem; }
.stats { text-align: center; margin-bottom: 20px; color: #aaa; font-size: 0.9rem; }
.stats span { font-weight: bold; color: #4ecdc4; }
.filters { text-align: center; margin-bottom: 20px; }
.filters button { padding: 8px 16px; margin: 0 4px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
.filters .active { background: #4ecdc4; color: #1a1a2e; }
.filters .inactive { background: #333; color: #aaa; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.card { background: #16213e; border-radius: 10px; overflow: hidden; transition: transform 0.2s; }
.card:hover { transform: translateY(-3px); }
.card.missing { border: 2px solid #ff6b6b; }
.card.has-image { border: 2px solid #4ecdc4; }
.img-wrap { height: 220px; display: flex; align-items: center; justify-content: center; background: #0f0f23; }
.img-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }
.img-wrap .no-img { color: #ff6b6b; font-size: 2.5rem; }
.info { padding: 10px; }
.info .distillery { font-size: 0.7rem; color: #4ecdc4; text-transform: uppercase; letter-spacing: 0.5px; }
.info .name { font-size: 0.85rem; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.info .slug { font-size: 0.65rem; color: #666; margin-top: 3px; font-family: monospace; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.search { display: block; width: 100%; max-width: 400px; margin: 0 auto 20px; padding: 10px 16px; border-radius: 8px; border: 1px solid #333; background: #16213e; color: #eee; font-size: 0.9rem; }
.search:focus { outline: none; border-color: #4ecdc4; }
.hidden { display: none !important; }
</style>
</head>
<body>
<h1>Caskit Bottles</h1>
<div class="stats">
  <span id="total">0</span> total &nbsp;|&nbsp;
  <span id="has-img">0</span> with images &nbsp;|&nbsp;
  <span id="missing" style="color:#ff6b6b">0</span> missing
</div>
<input class="search" type="text" placeholder="Search by name or distillery..." id="search">
<div class="filters">
  <button class="active" data-filter="all">All</button>
  <button class="inactive" data-filter="missing">Missing Only</button>
  <button class="inactive" data-filter="has-image">Has Image</button>
</div>
<div class="grid" id="grid"></div>
<script>
const bottles = ${json};

function render() {
  const grid = document.getElementById('grid');
  const withImg = bottles.filter(b => b.i);
  document.getElementById('total').textContent = bottles.length;
  document.getElementById('has-img').textContent = withImg.length;
  document.getElementById('missing').textContent = bottles.length - withImg.length;

  bottles.forEach(b => {
    const card = document.createElement('div');
    card.className = 'card ' + (b.i ? 'has-image' : 'missing');
    card.dataset.distillery = b.d.toLowerCase();
    card.dataset.name = b.n.toLowerCase();
    card.dataset.slug = b.s;
    card.dataset.hasImage = b.i ? '1' : '0';
    card.innerHTML =
      '<div class="img-wrap">' +
        (b.i ? '<img src="' + b.i + '" loading="lazy" alt="' + b.n.replace(/"/g,'') + '">' : '<div class="no-img">?</div>') +
      '</div><div class="info">' +
        '<div class="distillery">' + b.d + '</div>' +
        '<div class="name" title="' + b.n.replace(/"/g,'') + '">' + b.n + '</div>' +
        '<div class="slug" title="' + b.s + '">' + b.s + '</div>' +
      '</div>';
    grid.appendChild(card);
  });

  document.getElementById('search').addEventListener('input', applyFilters);
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filters button').forEach(b => { b.className = 'inactive'; });
      btn.className = 'active';
      applyFilters();
    });
  });
}

function applyFilters() {
  const query = document.getElementById('search').value.toLowerCase();
  const filter = document.querySelector('.filters .active').dataset.filter;
  document.querySelectorAll('.card').forEach(card => {
    const matchesSearch = !query ||
      card.dataset.name.includes(query) ||
      card.dataset.distillery.includes(query) ||
      card.dataset.slug.includes(query);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'missing' && card.dataset.hasImage === '0') ||
      (filter === 'has-image' && card.dataset.hasImage === '1');
    card.classList.toggle('hidden', !(matchesSearch && matchesFilter));
  });
}
render();
<\/script>
</body>
</html>`

  writeFileSync('scripts/bottles-viewer.html', html, 'utf-8')
  console.log(`Built viewer with ${rows.length} bottles (${rows.filter(r => !r.image_url).length} missing images)`)
}

main().catch(console.error)
