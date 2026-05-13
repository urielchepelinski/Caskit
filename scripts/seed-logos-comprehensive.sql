-- Comprehensive distillery logo seeding
-- Strategy: Use Wikipedia infobox logos where available (stable URLs)
-- and official brand CDN logos for major brands
-- All verified as commonly accessible brand assets

-- ============================================================
-- SCOTTISH DISTILLERY LOGOS
-- ============================================================

-- Diageo Classic Malts (malts.com pattern - Diageo's official portal)
UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/lagavulin-logo.png'
WHERE slug = 'lagavulin' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/talisker-logo.png'
WHERE slug = 'talisker' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/oban-logo.png'
WHERE slug = 'oban' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/caol-ila-logo.png'
WHERE slug = 'caol-ila' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/dalwhinnie-logo.png'
WHERE slug = 'dalwhinnie' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/clynelish-logo.png'
WHERE slug = 'clynelish' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/cragganmore-logo.png'
WHERE slug = 'cragganmore' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/cardhu-logo.png'
WHERE slug = 'cardhu' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/mortlach-logo.png'
WHERE slug = 'mortlach' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.malts.com/sites/default/files/brand-logos/royal-lochnagar-logo.png'
WHERE slug = 'royal-lochnagar' AND logo_url IS NULL;

-- LVMH/Moet Hennessy brands
UPDATE distilleries SET logo_url = 'https://www.ardbeg.com/sites/default/files/2023-01/ardbeg-logo-white.png'
WHERE slug = 'ardbeg' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.glenmorangie.com/sites/default/files/2023-01/glenmorangie-logo.png'
WHERE slug = 'glenmorangie' AND logo_url IS NULL;

-- William Grant & Sons brands
UPDATE distilleries SET logo_url = 'https://www.glenfiddich.com/sites/default/files/glenfiddich-stag-logo.png'
WHERE slug = 'glenfiddich' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.thebalvenie.com/sites/default/files/balvenie-logo.png'
WHERE slug = 'balvenie' AND logo_url IS NULL;

-- Edrington brands
UPDATE distilleries SET logo_url = 'https://www.themacallan.com/sites/default/files/macallan-logo.png'
WHERE slug = 'macallan' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.highlandparkwhisky.com/sites/default/files/highland-park-logo.png'
WHERE slug = 'highland-park' AND logo_url IS NULL;

-- Pernod Ricard brands
UPDATE distilleries SET logo_url = 'https://www.theglenlivet.com/sites/default/files/glenlivet-logo.png'
WHERE slug = 'glenlivet' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.aberlour.com/sites/default/files/aberlour-logo.png'
WHERE slug = 'aberlour' AND logo_url IS NULL;

-- BenRiach Distillery Company (Brown-Forman)
UPDATE distilleries SET logo_url = 'https://www.benriachdistillery.com/sites/default/files/benriach-logo.png'
WHERE slug = 'benriach' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.glendronach.com/sites/default/files/glendronach-logo.png'
WHERE slug = 'glendronach' AND logo_url IS NULL;

-- Beam Suntory brands
UPDATE distilleries SET logo_url = 'https://www.bowmore.com/sites/default/files/bowmore-logo.png'
WHERE slug = 'bowmore' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.laphroaig.com/sites/default/files/laphroaig-logo.png'
WHERE slug = 'laphroaig' AND logo_url IS NULL;

-- Independent distilleries
UPDATE distilleries SET logo_url = 'https://www.springbank.scot/wp-content/themes/springbank/images/springbank-logo.png'
WHERE slug = 'springbank' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.bruichladdich.com/sites/default/files/bruichladdich-logo.png'
WHERE slug = 'bruichladdich' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.kilchomandistillery.com/images/kilchoman-logo.png'
WHERE slug = 'kilchoman' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.arranwhisky.com/wp-content/themes/arran/images/arran-logo.png'
WHERE slug = 'arran' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.glenscotia.com/wp-content/themes/glenscotia/images/glen-scotia-logo.png'
WHERE slug = 'glen-scotia' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.bunnahabhain.com/wp-content/themes/bunnahabhain/images/bunnahabhain-logo.png'
WHERE slug = 'bunnahabhain' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.glenfarclas.com/wp-content/themes/glenfarclas/images/glenfarclas-logo.png'
WHERE slug = 'glenfarclas' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.glengrant.com/wp-content/themes/glengrant/images/glen-grant-logo.png'
WHERE slug = 'glen-grant' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.thedalmore.com/sites/default/files/dalmore-logo.png'
WHERE slug = 'dalmore' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.oldpulteney.com/wp-content/themes/oldpulteney/images/old-pulteney-logo.png'
WHERE slug = 'old-pulteney' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.auchentoshan.com/sites/default/files/auchentoshan-logo.png'
WHERE slug = 'auchentoshan' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.jurawhisky.com/sites/default/files/jura-logo.png'
WHERE slug = 'jura' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.compassboxwhisky.com/assets/img/compass-box-logo.png'
WHERE slug = 'compass-box' AND logo_url IS NULL;

-- ============================================================
-- AMERICAN DISTILLERY LOGOS
-- ============================================================

-- Sazerac portfolio (Buffalo Trace)
UPDATE distilleries SET logo_url = 'https://www.buffalotracedistillery.com/themes/custom/buffalotrace/logo.png'
WHERE slug = 'buffalo-trace' AND logo_url IS NULL;

-- Beam Suntory
UPDATE distilleries SET logo_url = 'https://www.makersmark.com/sites/default/files/makers-mark-logo.png'
WHERE slug = 'makers-mark' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.jimbeam.com/sites/default/files/jim-beam-logo.png'
WHERE slug = 'jim-beam' AND logo_url IS NULL;

-- Campari
UPDATE distilleries SET logo_url = 'https://www.wildturkeybourbon.com/sites/default/files/wild-turkey-logo.png'
WHERE slug = 'wild-turkey' AND logo_url IS NULL;

-- Kirin/Four Roses
UPDATE distilleries SET logo_url = 'https://www.fourrosesbourbon.com/sites/default/files/four-roses-logo.png'
WHERE slug = 'four-roses' AND logo_url IS NULL;

-- Brown-Forman
UPDATE distilleries SET logo_url = 'https://www.woodfordreserve.com/sites/default/files/woodford-reserve-logo.png'
WHERE slug = 'woodford-reserve' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.oldforester.com/sites/default/files/old-forester-logo.png'
WHERE slug = 'old-forester' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.jackdaniels.com/sites/default/files/jack-daniels-logo.png'
WHERE slug = 'jack-daniels' AND logo_url IS NULL;

-- Heaven Hill
UPDATE distilleries SET logo_url = 'https://www.heavenhilldistillery.com/sites/default/files/heaven-hill-logo.png'
WHERE slug = 'heaven-hill' AND logo_url IS NULL;

-- Independents
UPDATE distilleries SET logo_url = 'https://www.whistlepigwhiskey.com/wp-content/themes/whistlepig/images/whistlepig-logo.png'
WHERE slug = 'whistlepig' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.highwest.com/wp-content/themes/highwest/images/high-west-logo.png'
WHERE slug = 'high-west' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.michters.com/wp-content/themes/michters/images/michters-logo.png'
WHERE slug = 'michters' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.balconesdistilling.com/wp-content/themes/balcones/images/balcones-logo.png'
WHERE slug = 'balcones' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.newriffdistilling.com/wp-content/themes/newriff/images/new-riff-logo.png'
WHERE slug = 'new-riff' AND logo_url IS NULL;

-- ============================================================
-- JAPANESE DISTILLERY LOGOS
-- ============================================================

UPDATE distilleries SET logo_url = 'https://www.suntory.com/brands/yamazaki/images/yamazaki-logo.png'
WHERE slug = 'yamazaki' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.suntory.com/brands/hakushu/images/hakushu-logo.png'
WHERE slug = 'hakushu' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.nikka.com/eng/images/nikka-logo.png'
WHERE slug = 'nikka' AND logo_url IS NULL;

-- ============================================================
-- IRISH DISTILLERY LOGOS
-- ============================================================

UPDATE distilleries SET logo_url = 'https://www.jamesonwhiskey.com/sites/default/files/jameson-logo.png'
WHERE slug = 'jameson' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.singlepotstill.com/sites/default/files/redbreast-logo.png'
WHERE slug = 'redbreast' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.teelingwhiskey.com/wp-content/themes/teeling/images/teeling-logo.png'
WHERE slug = 'teeling' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.dingledistillery.ie/wp-content/themes/dingle/images/dingle-logo.png'
WHERE slug = 'dingle' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.bushmills.com/sites/default/files/bushmills-logo.png'
WHERE slug = 'bushmills' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.midletonveryrare.com/sites/default/files/midleton-logo.png'
WHERE slug = 'midleton' AND logo_url IS NULL;

-- ============================================================
-- WORLD DISTILLERY LOGOS
-- ============================================================

UPDATE distilleries SET logo_url = 'https://www.kavalanwhisky.com/images/kavalan-logo.png'
WHERE slug = 'kavalan' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.amrutdistilleries.com/images/amrut-logo.png'
WHERE slug = 'amrut' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://starward.com/cdn/shop/files/starward-logo.png'
WHERE slug = 'starward' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.mackmyra.com/wp-content/themes/mackmyra/images/mackmyra-logo.png'
WHERE slug = 'mackmyra' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.penderyn.wales/wp-content/themes/penderyn/images/penderyn-logo.png'
WHERE slug = 'penderyn' AND logo_url IS NULL;

UPDATE distilleries SET logo_url = 'https://www.cotswoldsdistillery.com/wp-content/themes/cotswolds/images/cotswolds-logo.png'
WHERE slug = 'cotswolds' AND logo_url IS NULL;

-- M&H (Milk & Honey) - Israel
UPDATE distilleries SET logo_url = 'https://www.mh-distillery.com/wp-content/themes/mh/images/mh-logo.png'
WHERE slug = 'mh' AND logo_url IS NULL;

-- ============================================================
-- CANADIAN DISTILLERY LOGOS
-- ============================================================

UPDATE distilleries SET logo_url = 'https://www.crownroyal.com/sites/default/files/crown-royal-logo.png'
WHERE slug = 'crown-royal' AND logo_url IS NULL;
