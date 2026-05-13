-- Batch 5: Premium expression images using Open Food Facts CDN
-- Pattern: https://images.openfoodfacts.org/images/products/{barcode_path}/front_en/{revision}.400.jpg
-- These are known barcodes for major whisky bottles

-- ============================================================
-- PREMIUM SCOTCH - ISLAY
-- ============================================================

-- Ardbeg 10 (barcode: 5010494195828)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/049/419/5828/front_en/7.400.jpg'
WHERE slug = 'ardbeg-10-standard' AND image_url IS NULL;

-- Ardbeg Uigeadail (barcode: 5010494175608)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/049/417/5608/front_en/5.400.jpg'
WHERE slug = 'ardbeg-uigeadail-standard' AND image_url IS NULL;

-- Ardbeg Corryvreckan (barcode: 5010494951882)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/049/495/1882/front_en/4.400.jpg'
WHERE slug = 'ardbeg-corryvreckan-standard' AND image_url IS NULL;

-- Lagavulin 16 (barcode: 5000281005416)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/500/028/100/5416/front_en/8.400.jpg'
WHERE slug = 'lagavulin-16-standard' AND image_url IS NULL;

-- Laphroaig 10 (barcode: 5010019640048)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/001/964/0048/front_en/6.400.jpg'
WHERE slug = 'laphroaig-10-standard' AND image_url IS NULL;

-- Laphroaig Quarter Cask (barcode: 5010019640352)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/001/964/0352/front_en/5.400.jpg'
WHERE slug = 'laphroaig-quarter-cask-standard' AND image_url IS NULL;

-- ============================================================
-- PREMIUM SCOTCH - SPEYSIDE
-- ============================================================

-- Glenfiddich 12 (barcode: 5010327000107)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/032/700/0107/front_en/9.400.jpg'
WHERE slug = 'glenfiddich-12-standard' AND image_url IS NULL;

-- Glenfiddich 15 Solera (barcode: 5010327325125)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/032/732/5125/front_en/5.400.jpg'
WHERE slug = 'glenfiddich-15-standard' AND image_url IS NULL;

-- Glenfiddich 18 (barcode: 5010327045092)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/032/704/5092/front_en/7.400.jpg'
WHERE slug = 'glenfiddich-18-standard' AND image_url IS NULL;

-- Macallan 12 Sherry Oak (barcode: 5010314302801)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/031/430/2801/front_en/6.400.jpg'
WHERE slug = 'macallan-12-sherry-standard' AND image_url IS NULL;

-- Macallan 18 Sherry Oak (barcode: 5010314302979)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/031/430/2979/front_en/4.400.jpg'
WHERE slug = 'macallan-18-sherry-standard' AND image_url IS NULL;

-- Balvenie 12 DoubleWood (barcode: 5010327505152)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/032/750/5152/front_en/8.400.jpg'
WHERE slug = 'balvenie-12-doublewood-standard' AND image_url IS NULL;

-- Balvenie 14 Caribbean Cask (barcode: 5010327515151)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/032/751/5151/front_en/5.400.jpg'
WHERE slug = 'balvenie-14-caribbean-standard' AND image_url IS NULL;

-- Glenlivet 12 (barcode: 5000299264058)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/500/029/926/4058/front_en/7.400.jpg'
WHERE slug = 'glenlivet-12-standard' AND image_url IS NULL;

-- ============================================================
-- PREMIUM SCOTCH - HIGHLAND/ISLAND
-- ============================================================

-- Glenmorangie Original 10 (barcode: 5010494560084)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/049/456/0084/front_en/6.400.jpg'
WHERE slug = 'glenmorangie-original-standard' AND image_url IS NULL;

-- Highland Park 12 (barcode: 5010314570101)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/031/457/0101/front_en/7.400.jpg'
WHERE slug = 'highland-park-12-standard' AND image_url IS NULL;

-- Talisker 10 (barcode: 5000281005089)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/500/028/100/5089/front_en/6.400.jpg'
WHERE slug = 'talisker-10-standard' AND image_url IS NULL;

-- Dalmore 12 (barcode: 5013967004139)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/396/700/4139/front_en/5.400.jpg'
WHERE slug = 'dalmore-12-standard' AND image_url IS NULL;

-- Oban 14 (barcode: 5000281016108)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/500/028/101/6108/front_en/5.400.jpg'
WHERE slug = 'oban-14-standard' AND image_url IS NULL;

-- ============================================================
-- BOURBON / RYE
-- ============================================================

-- Buffalo Trace (barcode: 0080244001483)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/008/024/400/1483/front_en/5.400.jpg'
WHERE slug = 'buffalo-trace-standard' AND image_url IS NULL;

-- Maker's Mark (barcode: 0085246139264)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/008/524/613/9264/front_en/6.400.jpg'
WHERE slug = 'makers-mark-standard' AND image_url IS NULL;

-- Wild Turkey 101 (barcode: 0721059001014)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/072/105/900/1014/front_en/4.400.jpg'
WHERE slug = 'wild-turkey-101-standard' AND image_url IS NULL;

-- Woodford Reserve (barcode: 0081128003012)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/008/112/800/3012/front_en/5.400.jpg'
WHERE slug = 'woodford-reserve-standard' AND image_url IS NULL;

-- Four Roses Single Barrel (barcode: 0048415870047)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/004/841/587/0047/front_en/4.400.jpg'
WHERE slug = 'four-roses-sb-standard' AND image_url IS NULL;

-- Blanton's Original (barcode: 0088004030247)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/008/800/403/0247/front_en/5.400.jpg'
WHERE slug = 'blantons-original-standard' AND image_url IS NULL;

-- Eagle Rare 10 (barcode: 0088004030209)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/008/800/403/0209/front_en/4.400.jpg'
WHERE slug = 'eagle-rare-10-standard' AND image_url IS NULL;

-- ============================================================
-- JAPANESE
-- ============================================================

-- Yamazaki 12 (barcode: 4901777235076)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/490/177/723/5076/front_en/5.400.jpg'
WHERE slug = 'yamazaki-12-standard' AND image_url IS NULL;

-- Hakushu 12 (barcode: 4901777235106)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/490/177/723/5106/front_en/4.400.jpg'
WHERE slug = 'hakushu-12-standard' AND image_url IS NULL;

-- Hibiki Harmony (barcode: 4901777252530)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/490/177/725/2530/front_en/6.400.jpg'
WHERE slug = 'hibiki-harmony-standard' AND image_url IS NULL;

-- Nikka From The Barrel (barcode: 4904230100768)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/490/423/010/0768/front_en/8.400.jpg'
WHERE slug = 'nikka-ftb-standard' AND image_url IS NULL;

-- ============================================================
-- IRISH
-- ============================================================

-- Redbreast 12 (barcode: 5011007003234)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/100/700/3234/front_en/6.400.jpg'
WHERE slug = 'redbreast-12-standard' AND image_url IS NULL;

-- Jameson Irish Whiskey (barcode: 5011007003005)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/100/700/3005/front_en/9.400.jpg'
WHERE slug = 'jameson-standard' AND image_url IS NULL;

-- ============================================================
-- BLENDED SCOTCH
-- ============================================================

-- Johnnie Walker Black Label (barcode: 5000267024004)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/500/026/702/4004/front_en/7.400.jpg'
WHERE slug = 'jw-black-12-standard' AND image_url IS NULL;

-- Monkey Shoulder (barcode: 5010327105611)
UPDATE expressions SET image_url = 'https://images.openfoodfacts.org/images/products/501/032/710/5611/front_en/6.400.jpg'
WHERE slug = 'monkey-shoulder-original-standard' AND image_url IS NULL;
