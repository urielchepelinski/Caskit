-- Batch 3: Additional bottle images for expressions not yet covered
-- Sources: Official brand sites, Buffalo Trace portfolio, TWE patterns

-- ============================================================
-- JAPANESE WHISKY (Official sites + TWE)
-- ============================================================

-- Yamazaki 12
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/yamob.12yov3.jpg'
WHERE slug = 'yamazaki-12-standard' AND image_url IS NULL;

-- Yamazaki 18
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/yamob.18yov2.jpg'
WHERE slug = 'yamazaki-18-standard' AND image_url IS NULL;

-- Nikka From The Barrel
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/nikob.ftbv4.jpg'
WHERE slug = 'nikka-ftb-standard' AND image_url IS NULL;

-- Nikka Coffey Grain
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/nikob.cogv3.jpg'
WHERE slug = 'nikka-coffey-grain-standard' AND image_url IS NULL;

-- ============================================================
-- IRISH WHISKEY
-- ============================================================

-- Green Spot
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/grsob.gspv3.jpg'
WHERE slug = 'green-spot-standard' AND image_url IS NULL;

-- Yellow Spot
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/grsob.yspv3.jpg'
WHERE slug = 'yellow-spot-standard' AND image_url IS NULL;

-- Teeling Small Batch
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/teeob.smbv3.jpg'
WHERE slug = 'teeling-small-batch-standard' AND image_url IS NULL;

-- Teeling Single Grain
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/teeob.sgrv2.jpg'
WHERE slug = 'teeling-single-grain-standard' AND image_url IS NULL;

-- Powers John's Lane
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/powob.jlrv3.jpg'
WHERE slug = 'powers-johns-lane-standard' AND image_url IS NULL;

-- Dingle Single Malt
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/dglob.smav2.jpg'
WHERE slug = 'dingle-single-malt-standard' AND image_url IS NULL;

-- ============================================================
-- BOURBON / AMERICAN - BUFFALO TRACE PORTFOLIO
-- ============================================================

-- Pappy Van Winkle 15
UPDATE expressions SET image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2021-04/pvw-15-year-bottle.png'
WHERE slug = 'pappy-15-standard' AND image_url IS NULL;

-- Pappy Van Winkle 20
UPDATE expressions SET image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2021-04/pvw-20-year-bottle.png'
WHERE slug = 'pappy-20-standard' AND image_url IS NULL;

-- Pappy Van Winkle 23
UPDATE expressions SET image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2021-04/pvw-23-year-bottle.png'
WHERE slug = 'pappy-23-standard' AND image_url IS NULL;

-- Weller Special Reserve
UPDATE expressions SET image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2021-04/weller-special-reserve.png'
WHERE slug = 'weller-special-reserve-standard' AND image_url IS NULL;

-- Weller Antique 107
UPDATE expressions SET image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2021-04/weller-antique-107.png'
WHERE slug = 'weller-antique-107-standard' AND image_url IS NULL;

-- Weller 12
UPDATE expressions SET image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2021-04/weller-12-year.png'
WHERE slug = 'weller-12-standard' AND image_url IS NULL;

-- Weller Full Proof
UPDATE expressions SET image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2021-04/weller-full-proof.png'
WHERE slug = 'weller-full-proof-standard' AND image_url IS NULL;

-- WhistlePig 15
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/whlob.15yov2.jpg'
WHERE slug = 'whistlepig-15-standard' AND image_url IS NULL;

-- ============================================================
-- WORLD WHISKY (Official brand sites)
-- ============================================================

-- Kavalan Classic
UPDATE expressions SET image_url = 'https://www.kavalanwhisky.com/en/product/upload/images/20210804165845_28.png'
WHERE slug = 'kavalan-classic-standard' AND image_url IS NULL;

-- Kavalan Solist Vinho (official - higher quality)
UPDATE expressions SET image_url = 'https://www.kavalanwhisky.com/en/product/upload/images/20210804170813_88.png'
WHERE slug = 'kavalan-solist-vinho-standard' AND image_url IS NULL;

-- Amrut Fusion (official)
UPDATE expressions SET image_url = 'https://amrutdistilleries.com/wp-content/uploads/2020/08/Amrut-Fusion-Single-Malt-Whisky.png'
WHERE slug = 'amrut-fusion-standard' AND image_url IS NULL;

-- Amrut Peated
UPDATE expressions SET image_url = 'https://amrutdistilleries.com/wp-content/uploads/2020/08/Amrut-Peated-Single-Malt.png'
WHERE slug = 'amrut-peated-standard' AND image_url IS NULL;

-- Amrut Cask Strength
UPDATE expressions SET image_url = 'https://amrutdistilleries.com/wp-content/uploads/2020/08/Amrut-Cask-Strength-Single-Malt.png'
WHERE slug = 'amrut-cask-strength-standard' AND image_url IS NULL;

-- Starward Nova (official)
UPDATE expressions SET image_url = 'https://starward.com/cdn/shop/products/Nova_700ml_Bottle.png'
WHERE slug = 'starward-nova-standard' AND image_url IS NULL;

-- Penderyn Madeira (official)
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/penob.madv2.jpg'
WHERE slug = 'penderyn-madeira-standard' AND image_url IS NULL;

-- Mackmyra Brukswhisky
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/macob.brkv2.jpg'
WHERE slug = 'mackmyra-brukswhisky-standard' AND image_url IS NULL;

-- Balcones Texas Pot Still
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/blcob.tpsv2.jpg'
WHERE slug = 'balcones-texas-pot-still-standard' AND image_url IS NULL;

-- Balcones True Blue
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/blcob.trbv2.jpg'
WHERE slug = 'balcones-true-blue-standard' AND image_url IS NULL;

-- Cotswolds Signature
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/ctsob.sigv2.jpg'
WHERE slug = 'cotswolds-signature-standard' AND image_url IS NULL;

-- M&H Classic
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/mahob.clsv2.jpg'
WHERE slug = 'mh-classic-standard' AND image_url IS NULL;

-- ============================================================
-- CANADIAN
-- ============================================================

-- Crown Royal Deluxe
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/crnob.dlxv3.jpg'
WHERE slug = 'crown-royal-deluxe-standard' AND image_url IS NULL;

-- Crown Royal Northern Harvest Rye
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/crnob.nhrv2.jpg'
WHERE slug = 'crown-royal-harvest-rye-standard' AND image_url IS NULL;

-- Lot No. 40
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/lt4ob.ryev3.jpg'
WHERE slug = 'lot-40-rye-standard' AND image_url IS NULL;

-- ============================================================
-- AMERICAN CRAFT
-- ============================================================

-- New Riff BiB
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/nwrob.bibv2.jpg'
WHERE slug = 'new-riff-bourbon-bib-standard' AND image_url IS NULL;

-- Barrell Seagrass
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/brlob.seav2.jpg'
WHERE slug = 'barrell-seagrass-standard' AND image_url IS NULL;

-- High West Bourye
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/hwsob.bvev2.jpg'
WHERE slug = 'high-west-bourye-standard' AND image_url IS NULL;

-- High West Rendezvous Rye
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/hwsob.rdvv2.jpg'
WHERE slug = 'high-west-rendezvous-rye-standard' AND image_url IS NULL;

-- ============================================================
-- ADDITIONAL SCOTCH (not in verified.sql)
-- ============================================================

-- Glen Grant 10
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/glgob.10yov3.jpg'
WHERE slug = 'glen-grant-10-standard' AND image_url IS NULL;

-- Glen Grant 18
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/glgob.18yov2.jpg'
WHERE slug = 'glen-grant-18-standard' AND image_url IS NULL;

-- Scapa Skiren
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/scpob.sklv2.jpg'
WHERE slug = 'scapa-skiren-standard' AND image_url IS NULL;

-- Fettercairn 12
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/fetob.12yov2.jpg'
WHERE slug = 'fettercairn-12-standard' AND image_url IS NULL;

-- Tullibardine 225
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/tulob.225v3.jpg'
WHERE slug = 'tullibardine-225-standard' AND image_url IS NULL;

-- Aberfeldy 12
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/abeob.12yov3.jpg'
WHERE slug = 'aberfeldy-12-standard' AND image_url IS NULL;

-- Springbank 10
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/spbob.10yov4.jpg'
WHERE slug = 'springbank-10-standard' AND image_url IS NULL;

-- Springbank 15
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/spbob.15yov3.jpg'
WHERE slug = 'springbank-15-standard' AND image_url IS NULL;

-- Bruichladdich Classic Laddie
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/bruob.claladv3.jpg'
WHERE slug = 'bruichladdich-classic-laddie-standard' AND image_url IS NULL;

-- Jura 10
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/jurob.10yov3.jpg'
WHERE slug = 'jura-10-standard' AND image_url IS NULL;

-- Glenrothes 10
UPDATE expressions SET image_url = 'https://img.thewhiskyexchange.com/900/gnrob.10yov2.jpg'
WHERE slug = 'glenrothes-10-standard' AND image_url IS NULL;
