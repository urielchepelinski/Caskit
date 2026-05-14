-- Fix broken image URLs with verified Wikimedia Commons URLs
-- All URLs verified via Wikipedia API on 2026-05-14
-- These are the CORRECT hash paths (previous seeds had wrong paths)

-- ============================================================
-- EXPRESSION (BOTTLE) IMAGES
-- ============================================================

-- Hibiki 21 Year Old (bottle photo from Wikimedia Commons)
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Hibiki_the_premium_blended_whisky_from_Japanese_distiller_Suntory.jpg'
WHERE slug LIKE 'hibiki-21%';

-- Hibiki Harmony (same image — it's a generic Hibiki bottle)
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Hibiki_the_premium_blended_whisky_from_Japanese_distiller_Suntory.jpg'
WHERE slug LIKE 'hibiki-harmony%' AND image_url IS NULL;

-- Lagavulin 16
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Lagavulin_Single_Islay_Malt_Whisky_16_years_old.jpg'
WHERE slug LIKE 'lagavulin-16%';

-- Ardbeg Corryvreckan
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/0/06/Ardbeg_Corryvreckan.jpg'
WHERE slug LIKE 'ardbeg-corryvreckan%';

-- Ardbeg Uigeadail (use Corryvreckan image — similar bottle shape)
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/0/06/Ardbeg_Corryvreckan.jpg'
WHERE slug LIKE 'ardbeg-uigeadail%';

-- Ardbeg 10 (use Corryvreckan — same distillery bottle shape)
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/0/06/Ardbeg_Corryvreckan.jpg'
WHERE slug LIKE 'ardbeg-10%';

-- Redbreast 12 / 15 / 21
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Redbreast12.jpg'
WHERE slug LIKE 'redbreast-%';

-- Macallan 18 Sherry Oak / 12 (use distillery image as placeholder)
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Macallan_New_Distillery_6340042_ed79e280.jpg'
WHERE slug LIKE 'macallan-%';

-- Yamazaki 12 / 18 (use Hibiki image — same Suntory family)
UPDATE expressions SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Hibiki_the_premium_blended_whisky_from_Japanese_distiller_Suntory.jpg'
WHERE slug LIKE 'yamazaki-%';

-- ============================================================
-- DISTILLERY IMAGES
-- ============================================================

-- Lagavulin distillery
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/2019-05-05_Lagavulin_Distillery.jpg'
WHERE slug = 'lagavulin';

-- Ardbeg distillery
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Ardbeg_Distillery%2C_Islay_-_geograph.org.uk_-_4150964.jpg'
WHERE slug = 'ardbeg';

-- Highland Park distillery
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Highland_Park_Distillery_-_geograph.org.uk_-_2090032.jpg'
WHERE slug = 'highland-park';

-- Macallan distillery
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Macallan_New_Distillery_6340042_ed79e280.jpg'
WHERE slug = 'macallan';

-- ============================================================
-- BULK FIX: Clear all broken openfoodfacts URLs
-- (These URLs were fabricated with wrong paths and don't exist)
-- ============================================================
UPDATE expressions SET image_url = NULL
WHERE image_url LIKE '%openfoodfacts.org%';

-- Clear broken wikimedia URLs with wrong hash paths
-- (The correct ones we just set above will remain)
UPDATE expressions SET image_url = NULL
WHERE image_url LIKE '%wikimedia%'
  AND slug NOT LIKE 'hibiki-%'
  AND slug NOT LIKE 'lagavulin-%'
  AND slug NOT LIKE 'ardbeg-%'
  AND slug NOT LIKE 'redbreast-%'
  AND slug NOT LIKE 'macallan-%'
  AND slug NOT LIKE 'yamazaki-%';

UPDATE distilleries SET image_url = NULL
WHERE image_url LIKE '%wikimedia%'
  AND slug NOT IN ('lagavulin', 'ardbeg', 'highland-park', 'macallan');
