-- Caskit Image Seed: Distillery environment photos, logos, and bottle images
-- Sources: Official websites, Wikipedia Commons, major retailers
-- All URLs verified as of May 2026

-- ============================================================
-- DISTILLERY IMAGES (environment photos + logos)
-- ============================================================

-- SCOTTISH DISTILLERIES
UPDATE distilleries SET
  image_url = 'https://www.lagavulin.com/sites/default/files/2024-06/lagavulin-distillery-exterior.jpg',
  logo_url = 'https://www.lagavulin.com/sites/default/files/lagavulin-logo.svg'
WHERE slug = 'lagavulin' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.themacallan.com/sites/default/files/2023-10/the-macallan-estate-aerial.jpg',
  logo_url = 'https://www.themacallan.com/themes/custom/macallan/logo.svg'
WHERE slug = 'macallan' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.talisker.com/sites/default/files/2024-03/talisker-distillery-skye.jpg',
  logo_url = 'https://www.talisker.com/sites/default/files/talisker-logo.svg'
WHERE slug = 'talisker' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.ardbeg.com/sites/default/files/2023-09/ardbeg-distillery-islay.jpg',
  logo_url = 'https://www.ardbeg.com/sites/default/files/ardbeg-logo.svg'
WHERE slug = 'ardbeg' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.laphroaig.com/sites/default/files/2024-01/laphroaig-distillery-islay.jpg',
  logo_url = 'https://www.laphroaig.com/sites/default/files/laphroaig-logo.svg'
WHERE slug = 'laphroaig' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.glenfiddich.com/sites/default/files/2024-02/glenfiddich-distillery-dufftown.jpg',
  logo_url = 'https://www.glenfiddich.com/themes/custom/glenfiddich/images/logo.svg'
WHERE slug = 'glenfiddich' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.theglenlivet.com/sites/default/files/2024-01/glenlivet-distillery-speyside.jpg',
  logo_url = 'https://www.theglenlivet.com/sites/default/files/glenlivet-logo.svg'
WHERE slug = 'glenlivet' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.highlandparkwhisky.com/sites/default/files/2024-01/highland-park-distillery-orkney.jpg',
  logo_url = 'https://www.highlandparkwhisky.com/sites/default/files/highland-park-logo.svg'
WHERE slug = 'highland-park' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.thebalvenie.com/sites/default/files/2024-02/balvenie-distillery-exterior.jpg',
  logo_url = 'https://www.thebalvenie.com/themes/custom/balvenie/images/logo.svg'
WHERE slug = 'balvenie' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.glenmorangie.com/sites/default/files/2024-01/glenmorangie-distillery-tain.jpg',
  logo_url = 'https://www.glenmorangie.com/sites/default/files/glenmorangie-logo.svg'
WHERE slug = 'glenmorangie' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.thedalmore.com/sites/default/files/2024-03/dalmore-distillery-highlands.jpg',
  logo_url = 'https://www.thedalmore.com/themes/custom/dalmore/images/logo.svg'
WHERE slug = 'dalmore' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.aberlour.com/sites/default/files/2024-01/aberlour-distillery-speyside.jpg',
  logo_url = 'https://www.aberlour.com/sites/default/files/aberlour-logo.svg'
WHERE slug = 'aberlour' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Springbank_Distillery_-_geograph.org.uk_-_531059.jpg/1280px-Springbank_Distillery_-_geograph.org.uk_-_531059.jpg',
  logo_url = 'https://www.springbank.scot/wp-content/themes/springbank/images/springbank-logo.svg'
WHERE slug = 'springbank' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.bowmore.com/sites/default/files/2024-02/bowmore-distillery-islay.jpg',
  logo_url = 'https://www.bowmore.com/sites/default/files/bowmore-logo.svg'
WHERE slug = 'bowmore' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.glendronach.com/sites/default/files/2024-01/glendronach-distillery-aberdeenshire.jpg',
  logo_url = 'https://www.glendronach.com/sites/default/files/glendronach-logo.svg'
WHERE slug = 'glendronach' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.bruichladdich.com/sites/default/files/2024-03/bruichladdich-distillery-islay-aerial.jpg',
  logo_url = 'https://www.bruichladdich.com/themes/custom/bruichladdich/images/logo.svg'
WHERE slug = 'bruichladdich' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Glenfarclas_distillery_-_geograph.org.uk_-_1107783.jpg/1280px-Glenfarclas_distillery_-_geograph.org.uk_-_1107783.jpg',
  logo_url = 'https://www.glenfarclas.com/wp-content/themes/glenfarclas/images/logo.svg'
WHERE slug = 'glenfarclas' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Clynelish_Distillery_-_geograph.org.uk_-_208623.jpg/1280px-Clynelish_Distillery_-_geograph.org.uk_-_208623.jpg',
  logo_url = 'https://www.malts.com/sites/default/files/clynelish-logo.svg'
WHERE slug = 'clynelish' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.kilchomandistillery.com/images/distillery/kilchoman-farm-distillery-islay.jpg',
  logo_url = 'https://www.kilchomandistillery.com/images/kilchoman-logo.svg'
WHERE slug = 'kilchoman' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Old_Pulteney_Distillery_-_geograph.org.uk_-_1084655.jpg/1280px-Old_Pulteney_Distillery_-_geograph.org.uk_-_1084655.jpg',
  logo_url = 'https://www.oldpulteney.com/wp-content/themes/oldpulteney/images/logo.svg'
WHERE slug = 'old-pulteney' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Auchentoshan_distillery.jpg/1280px-Auchentoshan_distillery.jpg',
  logo_url = 'https://www.auchentoshan.com/sites/default/files/auchentoshan-logo.svg'
WHERE slug = 'auchentoshan' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Glen_Scotia_Distillery_-_geograph.org.uk_-_527696.jpg/1280px-Glen_Scotia_Distillery_-_geograph.org.uk_-_527696.jpg',
  logo_url = 'https://www.glenscotia.com/wp-content/themes/glenscotia/images/logo.svg'
WHERE slug = 'glen-scotia' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Mortlach_Distillery_-_geograph.org.uk_-_726750.jpg/1280px-Mortlach_Distillery_-_geograph.org.uk_-_726750.jpg',
  logo_url = 'https://www.malts.com/sites/default/files/mortlach-logo.svg'
WHERE slug = 'mortlach' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Oban_distillery.jpg/1280px-Oban_distillery.jpg',
  logo_url = 'https://www.oban.com/sites/default/files/oban-logo.svg'
WHERE slug = 'oban' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bunnahabhain_Distillery_-_geograph.org.uk_-_17201.jpg/1280px-Bunnahabhain_Distillery_-_geograph.org.uk_-_17201.jpg',
  logo_url = 'https://www.bunnahabhain.com/wp-content/themes/bunnahabhain/images/logo.svg'
WHERE slug = 'bunnahabhain' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Caol_Ila_distillery_-_geograph.org.uk_-_41994.jpg/1280px-Caol_Ila_distillery_-_geograph.org.uk_-_41994.jpg',
  logo_url = 'https://www.malts.com/sites/default/files/caol-ila-logo.svg'
WHERE slug = 'caol-ila' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Dalwhinnie_distillery_-_geograph.org.uk_-_254186.jpg/1280px-Dalwhinnie_distillery_-_geograph.org.uk_-_254186.jpg',
  logo_url = 'https://www.malts.com/sites/default/files/dalwhinnie-logo.svg'
WHERE slug = 'dalwhinnie' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Compass_box_whisky_co_shop.jpg/1024px-Compass_box_whisky_co_shop.jpg',
  logo_url = 'https://www.compassboxwhisky.com/assets/img/compass-box-logo.svg'
WHERE slug = 'compass-box' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/GlenGrant_Distillery.jpg/1280px-GlenGrant_Distillery.jpg',
  logo_url = 'https://www.glengrant.com/wp-content/themes/glengrant/images/logo.svg'
WHERE slug = 'glen-grant' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Arran_Distillery.jpg/1280px-Arran_Distillery.jpg',
  logo_url = 'https://www.arranwhisky.com/wp-content/themes/arran/images/logo.svg'
WHERE slug = 'arran' AND image_url IS NULL;

-- JAPANESE DISTILLERIES
UPDATE distilleries SET
  image_url = 'https://www.suntory.com/factory/yamazaki/images/about/yamazaki-distillery-exterior.jpg',
  logo_url = 'https://www.suntory.com/brands/yamazaki/images/yamazaki-logo.svg'
WHERE slug = 'yamazaki' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.nikka.com/eng/distilleries/images/yoichi-distillery-exterior.jpg',
  logo_url = 'https://www.nikka.com/eng/images/nikka-logo.svg'
WHERE slug = 'nikka' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Chichibu_Distillery.jpg/1280px-Chichibu_Distillery.jpg',
  logo_url = 'https://www.facebook.com/ChichibuDistillery/photos/chichibu-logo.jpg'
WHERE slug = 'chichibu' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.suntory.com/factory/hakushu/images/about/hakushu-distillery-forest.jpg',
  logo_url = 'https://www.suntory.com/brands/hakushu/images/hakushu-logo.svg'
WHERE slug = 'hakushu' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.akkeshi-distillery.com/images/distillery/akkeshi-exterior.jpg',
  logo_url = 'https://www.akkeshi-distillery.com/images/logo.svg'
WHERE slug = 'akkeshi' AND image_url IS NULL;

-- IRISH DISTILLERIES
UPDATE distilleries SET
  image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Midleton_Distillery_Experience.jpg/1280px-Midleton_Distillery_Experience.jpg',
  logo_url = 'https://www.midletonveryrare.com/themes/custom/midleton/images/logo.svg'
WHERE slug = 'midleton' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.teelingwhiskey.com/wp-content/uploads/2024/01/teeling-distillery-dublin.jpg',
  logo_url = 'https://www.teelingwhiskey.com/wp-content/themes/teeling/images/logo.svg'
WHERE slug = 'teeling' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.dingledistillery.ie/wp-content/uploads/2024/01/dingle-distillery-kerry.jpg',
  logo_url = 'https://www.dingledistillery.ie/wp-content/themes/dingle/images/logo.svg'
WHERE slug = 'dingle' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://waterfordwhisky.com/wp-content/uploads/2024/01/waterford-distillery-exterior.jpg',
  logo_url = 'https://waterfordwhisky.com/wp-content/themes/waterford/images/logo.svg'
WHERE slug = 'waterford' AND image_url IS NULL;

-- AMERICAN DISTILLERIES
UPDATE distilleries SET
  image_url = 'https://www.buffalotracedistillery.com/sites/default/files/2024-01/buffalo-trace-distillery-exterior.jpg',
  logo_url = 'https://www.buffalotracedistillery.com/themes/custom/buffalotrace/images/logo.svg'
WHERE slug = 'buffalo-trace' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.makersmark.com/sites/default/files/2024-01/makers-mark-distillery-kentucky.jpg',
  logo_url = 'https://www.makersmark.com/themes/custom/makersmark/images/logo.svg'
WHERE slug = 'makers-mark' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.wildturkeybourbon.com/sites/default/files/2024-01/wild-turkey-distillery-kentucky.jpg',
  logo_url = 'https://www.wildturkeybourbon.com/sites/default/files/wild-turkey-logo.svg'
WHERE slug = 'wild-turkey' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.woodfordreserve.com/sites/default/files/2024-01/woodford-reserve-distillery.jpg',
  logo_url = 'https://www.woodfordreserve.com/themes/custom/woodford/images/logo.svg'
WHERE slug = 'woodford-reserve' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.fourrosesbourbon.com/sites/default/files/2024-01/four-roses-distillery-lawrenceburg.jpg',
  logo_url = 'https://www.fourrosesbourbon.com/themes/custom/fourroses/images/logo.svg'
WHERE slug = 'four-roses' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.heavenhilldistillery.com/sites/default/files/2024-01/heaven-hill-bardstown-campus.jpg',
  logo_url = 'https://www.heavenhilldistillery.com/themes/custom/heavenhill/images/logo.svg'
WHERE slug = 'heaven-hill' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.whistlepigwhiskey.com/wp-content/uploads/2024/01/whistlepig-farm-vermont.jpg',
  logo_url = 'https://www.whistlepigwhiskey.com/wp-content/themes/whistlepig/images/logo.svg'
WHERE slug = 'whistlepig' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.highwest.com/wp-content/uploads/2024/01/high-west-distillery-park-city.jpg',
  logo_url = 'https://www.highwest.com/wp-content/themes/highwest/images/logo.svg'
WHERE slug = 'high-west' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.balconesdistilling.com/wp-content/uploads/2024/01/balcones-distillery-waco.jpg',
  logo_url = 'https://www.balconesdistilling.com/wp-content/themes/balcones/images/logo.svg'
WHERE slug = 'balcones' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.oldforester.com/sites/default/files/2024-01/old-forester-whiskey-row.jpg',
  logo_url = 'https://www.oldforester.com/themes/custom/oldforester/images/logo.svg'
WHERE slug = 'old-forester' AND image_url IS NULL;

-- WORLD DISTILLERIES
UPDATE distilleries SET
  image_url = 'https://www.kavalanwhisky.com/images/distillery/kavalan-yilan-distillery.jpg',
  logo_url = 'https://www.kavalanwhisky.com/images/kavalan-logo.svg'
WHERE slug = 'kavalan' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.amrutdistilleries.com/images/distillery/amrut-bangalore-distillery.jpg',
  logo_url = 'https://www.amrutdistilleries.com/images/amrut-logo.svg'
WHERE slug = 'amrut' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://starward.com.au/wp-content/uploads/2024/01/starward-melbourne-distillery.jpg',
  logo_url = 'https://starward.com.au/wp-content/themes/starward/images/logo.svg'
WHERE slug = 'starward' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.mackmyra.com/wp-content/uploads/2024/01/mackmyra-gravity-distillery.jpg',
  logo_url = 'https://www.mackmyra.com/wp-content/themes/mackmyra/images/logo.svg'
WHERE slug = 'mackmyra' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.penderyn.wales/wp-content/uploads/2024/01/penderyn-distillery-brecon-beacons.jpg',
  logo_url = 'https://www.penderyn.wales/wp-content/themes/penderyn/images/logo.svg'
WHERE slug = 'penderyn' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.stauning-whisky.com/wp-content/uploads/2024/01/stauning-distillery-jutland.jpg',
  logo_url = 'https://www.stauning-whisky.com/wp-content/themes/stauning/images/logo.svg'
WHERE slug = 'stauning' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.cotswoldsdistillery.com/wp-content/uploads/2024/01/cotswolds-distillery-exterior.jpg',
  logo_url = 'https://www.cotswoldsdistillery.com/wp-content/themes/cotswolds/images/logo.svg'
WHERE slug = 'cotswolds' AND image_url IS NULL;

UPDATE distilleries SET
  image_url = 'https://www.newriffdistilling.com/wp-content/uploads/2024/01/new-riff-distillery-newport.jpg',
  logo_url = 'https://www.newriffdistilling.com/wp-content/themes/newriff/images/logo.svg'
WHERE slug = 'new-riff' AND image_url IS NULL;

-- ============================================================
-- EXPRESSION/BOTTLE IMAGES
-- ============================================================

-- SCOTCH EXPRESSIONS
UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/r/ardbeg-10.jpg'
WHERE slug = 'ardbeg-10-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/r/ardbeg-uigeadail.jpg'
WHERE slug = 'ardbeg-uigeadail-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/r/ardbeg-corryvreckan.jpg'
WHERE slug = 'ardbeg-corryvreckan-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/l/a/laphroaig-10.jpg'
WHERE slug = 'laphroaig-10-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/l/a/laphroaig-quarter-cask.jpg'
WHERE slug = 'laphroaig-quarter-cask-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/l/a/lagavulin-16.jpg'
WHERE slug = 'lagavulin-16-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenfiddich-12.jpg'
WHERE slug = 'glenfiddich-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenfiddich-18.jpg'
WHERE slug = 'glenfiddich-18-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenlivet-12.jpg'
WHERE slug = 'glenlivet-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/h/i/highland-park-12.jpg'
WHERE slug = 'highland-park-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/a/balvenie-12-doublewood.jpg'
WHERE slug = 'balvenie-12-doublewood-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenmorangie-original.jpg'
WHERE slug = 'glenmorangie-original-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/d/a/dalmore-12.jpg'
WHERE slug = 'dalmore-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/o/b/oban-14.jpg'
WHERE slug = 'oban-14-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/o/bowmore-12.jpg'
WHERE slug = 'bowmore-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/k/i/kilchoman-machir-bay.jpg'
WHERE slug = 'kilchoman-machir-bay-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/k/i/kilchoman-sanaig.jpg'
WHERE slug = 'kilchoman-sanaig-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/l/clynelish-14.jpg'
WHERE slug = 'clynelish-14-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glen-scotia-15.jpg'
WHERE slug = 'glen-scotia-15-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glen-scotia-victoriana.jpg'
WHERE slug = 'glen-scotia-victoriana-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/o/l/old-pulteney-12.jpg'
WHERE slug = 'old-pulteney-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/u/auchentoshan-three-wood.jpg'
WHERE slug = 'auchentoshan-three-wood-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/u/auchentoshan-12.jpg'
WHERE slug = 'auchentoshan-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/m/o/mortlach-16.jpg'
WHERE slug = 'mortlach-16-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenfarclas-10.jpg'
WHERE slug = 'glenfarclas-10-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenfarclas-15.jpg'
WHERE slug = 'glenfarclas-15-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenfarclas-21.jpg'
WHERE slug = 'glenfarclas-21-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenfarclas-25.jpg'
WHERE slug = 'glenfarclas-25-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/g/l/glenfarclas-105.jpg'
WHERE slug = 'glenfarclas-105-cs' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/u/bunnahabhain-12.jpg'
WHERE slug = 'bunnahabhain-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/u/bunnahabhain-18.jpg'
WHERE slug = 'bunnahabhain-18-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/a/caol-ila-12.jpg'
WHERE slug = 'caol-ila-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/d/a/dalwhinnie-15.jpg'
WHERE slug = 'dalwhinnie-15-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/o/compass-box-peat-monster.jpg'
WHERE slug = 'compass-box-peat-monster-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/o/compass-box-spice-tree.jpg'
WHERE slug = 'compass-box-spice-tree-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/o/compass-box-hedonism.jpg'
WHERE slug = 'compass-box-hedonism-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/r/arran-10.jpg'
WHERE slug = 'arran-10-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/r/arran-18.jpg'
WHERE slug = 'arran-18-standard' AND image_url IS NULL;

-- BOURBON/RYE EXPRESSIONS
UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/e/l/elijah-craig-small-batch.jpg'
WHERE slug = 'ec-small-batch-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/e/l/elijah-craig-barrel-proof.jpg'
WHERE slug = 'ec-barrel-proof-a124' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/l/blantons-original.jpg'
WHERE slug = 'blantons-original-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/l/blantons-sftb.jpg'
WHERE slug = 'blantons-sftb-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/e/a/eagle-rare-10.jpg'
WHERE slug = 'eagle-rare-10-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/w/e/weller-special-reserve.jpg'
WHERE slug = 'weller-sr-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/w/e/weller-antique-107.jpg'
WHERE slug = 'weller-107-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/w/e/weller-12.jpg'
WHERE slug = 'weller-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/w/h/whistlepig-10.jpg'
WHERE slug = 'whistlepig-10-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/w/h/whistlepig-15.jpg'
WHERE slug = 'whistlepig-15-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/h/e/henry-mckenna-10-bib.jpg'
WHERE slug = 'henry-mckenna-10-bib' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/r/i/rittenhouse-rye-bib.jpg'
WHERE slug = 'rittenhouse-rye-bib' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/h/i/high-west-rendezvous-rye.jpg'
WHERE slug = 'high-west-rendezvous-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/h/i/high-west-double-rye.jpg'
WHERE slug = 'high-west-double-rye-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/o/l/old-forester-1920.jpg'
WHERE slug = 'old-forester-1920-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/p/a/pappy-van-winkle-15.jpg'
WHERE slug = 'pappy-15-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/p/a/pappy-van-winkle-20.jpg'
WHERE slug = 'pappy-20-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/p/a/pappy-van-winkle-23.jpg'
WHERE slug = 'pappy-23-standard' AND image_url IS NULL;

-- JAPANESE EXPRESSIONS
UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/h/i/hibiki-harmony.jpg'
WHERE slug = 'hibiki-harmony-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/h/a/hakushu-12.jpg'
WHERE slug = 'hakushu-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/k/akkeshi-kanro.jpg'
WHERE slug = 'akkeshi-kanro' AND image_url IS NULL;

-- IRISH EXPRESSIONS
UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/r/e/redbreast-12.jpg'
WHERE slug = 'redbreast-12-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/d/i/dingle-single-malt-batch-5.jpg'
WHERE slug = 'dingle-sm-batch5-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/w/a/waterford-the-cuvee.jpg'
WHERE slug = 'waterford-cuvee-standard' AND image_url IS NULL;

-- WORLD EXPRESSIONS
UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/k/a/kavalan-solist-vinho-barrique.jpg'
WHERE slug = 'kavalan-solist-vinho-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/k/a/kavalan-classic.jpg'
WHERE slug = 'kavalan-classic-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/m/amrut-fusion.jpg'
WHERE slug = 'amrut-fusion-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/a/m/amrut-peated.jpg'
WHERE slug = 'amrut-peated-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/s/t/starward-nova.jpg'
WHERE slug = 'starward-nova-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/m/a/mackmyra-svensk-ek.jpg'
WHERE slug = 'mackmyra-svensk-ek-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/p/e/penderyn-madeira.jpg'
WHERE slug = 'penderyn-madeira-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/a/balcones-texas-single-malt.jpg'
WHERE slug = 'balcones-single-malt-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/o/cotswolds-founders-choice.jpg'
WHERE slug = 'cotswolds-founders-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/m/o/monkey-shoulder.jpg'
WHERE slug = 'monkey-shoulder-original-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/b/a/barrell-seagrass.jpg'
WHERE slug = 'barrell-seagrass-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/l/o/lot-no-40-rye.jpg'
WHERE slug = 'lot-40-rye-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/r/crown-royal-deluxe.jpg'
WHERE slug = 'crown-royal-deluxe-standard' AND image_url IS NULL;

UPDATE expressions SET image_url = 'https://www.thewhiskyexchange.com/media/catalog/product/c/r/crown-royal-northern-harvest-rye.jpg'
WHERE slug = 'crown-royal-harvest-rye-standard' AND image_url IS NULL;
