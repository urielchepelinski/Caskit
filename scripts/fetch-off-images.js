// Fetch missing expression images from Open Food Facts API
// Run on Cloud Run with: node scripts/fetch-off-images.js

const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

// Search Open Food Facts for a whisky by name
async function searchOFF(query) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5&fields=product_name,image_url,image_front_url,brands`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.products && data.products.length > 0) {
      for (const p of data.products) {
        const imgUrl = p.image_front_url || p.image_url;
        if (imgUrl && imgUrl.includes('openfoodfacts')) {
          return imgUrl;
        }
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

// Build search queries from expression name
function buildSearchTerms(name, distilleryName) {
  const terms = [];
  // Try full name first
  terms.push(name);
  // Try distillery + short name
  const shortName = name.replace(distilleryName, '').trim();
  if (shortName.length > 3) {
    terms.push(`${distilleryName} ${shortName}`);
  }
  // Try just the brand + year
  const yearMatch = name.match(/(\d+)\s*(?:year|yr)/i);
  if (yearMatch) {
    terms.push(`${distilleryName} ${yearMatch[1]}`);
  }
  return terms;
}

async function main() {
  console.log('Fetching expressions without images...');

  const missing = await sql`
    SELECT e.id, e.name, e.slug, d.name as distillery_name
    FROM expressions e
    JOIN distilleries d ON e.distillery_id = d.id
    WHERE e.image_url IS NULL
    ORDER BY d.name, e.name
  `;

  console.log(`Found ${missing.length} expressions without images`);

  let found = 0;
  let failed = 0;
  const updates = [];

  for (const expr of missing) {
    const terms = buildSearchTerms(expr.name, expr.distillery_name);
    let imageUrl = null;

    for (const term of terms) {
      imageUrl = await searchOFF(term);
      if (imageUrl) break;
      // Rate limit: 100ms between requests
      await new Promise(r => setTimeout(r, 100));
    }

    if (imageUrl) {
      found++;
      updates.push({ id: expr.id, url: imageUrl });
      console.log(`✓ ${expr.name} -> ${imageUrl.substring(0, 80)}...`);
    } else {
      failed++;
      console.log(`✗ ${expr.name} (no image found)`);
    }

    // Rate limit between expressions
    await new Promise(r => setTimeout(r, 200));
  }

  // Apply updates in batches
  console.log(`\nApplying ${updates.length} image updates...`);
  for (const u of updates) {
    await sql`UPDATE expressions SET image_url = ${u.url} WHERE id = ${u.id} AND image_url IS NULL`;
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Found images: ${found}`);
  console.log(`No image found: ${failed}`);
  console.log(`Total processed: ${missing.length}`);

  // Final count
  const stats = await sql`
    SELECT COUNT(*) as total, COUNT(image_url) as with_images
    FROM expressions
  `;
  console.log(`\nFinal coverage: ${stats[0].with_images}/${stats[0].total} expressions have images`);
}

main().catch(console.error);
