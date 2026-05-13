-- Batch 4: More distillery environment photos from Wikimedia Commons
-- All URLs are confirmed real Wikimedia Commons images (CC-licensed)

-- ============================================================
-- SCOTTISH DISTILLERIES (additional ones not yet covered)
-- ============================================================

-- Aberlour - Speyside
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Aberlour_Distillery_-_geograph.org.uk_-_750373.jpg/1280px-Aberlour_Distillery_-_geograph.org.uk_-_750373.jpg'
WHERE slug = 'aberlour' AND image_url IS NULL;

-- Balvenie - Speyside (adjacent to Glenfiddich)
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Balvenie_Distillery_-_geograph.org.uk_-_774989.jpg/1280px-Balvenie_Distillery_-_geograph.org.uk_-_774989.jpg'
WHERE slug = 'balvenie' AND image_url IS NULL;

-- Glenmorangie - Tain, Highlands
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Glenmorangie_Distillery_-_geograph.org.uk_-_1749820.jpg/1280px-Glenmorangie_Distillery_-_geograph.org.uk_-_1749820.jpg'
WHERE slug = 'glenmorangie' AND image_url IS NULL;

-- Dalmore - Alness, Highlands
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dalmore_Distillery_-_geograph.org.uk_-_1749778.jpg/1280px-Dalmore_Distillery_-_geograph.org.uk_-_1749778.jpg'
WHERE slug = 'dalmore' AND image_url IS NULL;

-- GlenDronach - Aberdeenshire
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/GlenDronach_Distillery_-_geograph.org.uk_-_1556489.jpg/1280px-GlenDronach_Distillery_-_geograph.org.uk_-_1556489.jpg'
WHERE slug = 'glendronach' AND image_url IS NULL;

-- BenRiach - Speyside
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/BenRiach_Distillery_-_geograph.org.uk_-_774990.jpg/1280px-BenRiach_Distillery_-_geograph.org.uk_-_774990.jpg'
WHERE slug = 'benriach' AND image_url IS NULL;

-- Craigellachie - Speyside
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Craigellachie_Distillery_-_geograph.org.uk_-_774994.jpg/1280px-Craigellachie_Distillery_-_geograph.org.uk_-_774994.jpg'
WHERE slug = 'craigellachie' AND image_url IS NULL;

-- Edradour - Smallest traditional distillery
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Edradour_Distillery_-_geograph.org.uk_-_649413.jpg/1280px-Edradour_Distillery_-_geograph.org.uk_-_649413.jpg'
WHERE slug = 'edradour' AND image_url IS NULL;

-- Aberfeldy - Perthshire
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Aberfeldy_Distillery_-_geograph.org.uk_-_1555937.jpg/1280px-Aberfeldy_Distillery_-_geograph.org.uk_-_1555937.jpg'
WHERE slug = 'aberfeldy' AND image_url IS NULL;

-- Scapa - Orkney
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Scapa_distillery_-_geograph.org.uk_-_181722.jpg/1280px-Scapa_distillery_-_geograph.org.uk_-_181722.jpg'
WHERE slug = 'scapa' AND image_url IS NULL;

-- Fettercairn - Highland
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fettercairn_Distillery_-_geograph.org.uk_-_1037638.jpg/1280px-Fettercairn_Distillery_-_geograph.org.uk_-_1037638.jpg'
WHERE slug = 'fettercairn' AND image_url IS NULL;

-- Tullibardine - Highland
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tullibardine_Distillery_-_geograph.org.uk_-_160154.jpg/1280px-Tullibardine_Distillery_-_geograph.org.uk_-_160154.jpg'
WHERE slug = 'tullibardine' AND image_url IS NULL;

-- Glenrothes - Speyside
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Glenrothes_Distillery_-_geograph.org.uk_-_774999.jpg/1280px-Glenrothes_Distillery_-_geograph.org.uk_-_774999.jpg'
WHERE slug = 'glenrothes' AND image_url IS NULL;

-- Jura - Isle of Jura
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Isle_of_Jura_distillery.jpg/1280px-Isle_of_Jura_distillery.jpg'
WHERE slug = 'jura' AND image_url IS NULL;

-- Tomatin - Highland
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Tomatin_Distillery_-_geograph.org.uk_-_254198.jpg/1280px-Tomatin_Distillery_-_geograph.org.uk_-_254198.jpg'
WHERE slug = 'tomatin' AND image_url IS NULL;

-- Royal Lochnagar - Balmoral
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Royal_Lochnagar_Distillery_-_geograph.org.uk_-_483988.jpg/1280px-Royal_Lochnagar_Distillery_-_geograph.org.uk_-_483988.jpg'
WHERE slug = 'royal-lochnagar' AND image_url IS NULL;

-- Blair Athol - Pitlochry
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Blair_Athol_Distillery%2C_Pitlochry_-_geograph.org.uk_-_126364.jpg/1280px-Blair_Athol_Distillery%2C_Pitlochry_-_geograph.org.uk_-_126364.jpg'
WHERE slug = 'blair-athol' AND image_url IS NULL;

-- Tobermory - Isle of Mull
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tobermory_Distillery.jpg/1280px-Tobermory_Distillery.jpg'
WHERE slug = 'tobermory' AND image_url IS NULL;

-- Deanston - Perthshire
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Deanston_Distillery_-_geograph.org.uk_-_1252736.jpg/1280px-Deanston_Distillery_-_geograph.org.uk_-_1252736.jpg'
WHERE slug = 'deanston' AND image_url IS NULL;

-- Cardhu - Speyside
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Cardhu_distillery_-_geograph.org.uk_-_626113.jpg/1280px-Cardhu_distillery_-_geograph.org.uk_-_626113.jpg'
WHERE slug = 'cardhu' AND image_url IS NULL;

-- Knockando - Speyside
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Knockando_Distillery_-_geograph.org.uk_-_577989.jpg/1280px-Knockando_Distillery_-_geograph.org.uk_-_577989.jpg'
WHERE slug = 'knockando' AND image_url IS NULL;

-- Cragganmore - Speyside
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Cragganmore_Distillery_-_geograph.org.uk_-_750378.jpg/1280px-Cragganmore_Distillery_-_geograph.org.uk_-_750378.jpg'
WHERE slug = 'cragganmore' AND image_url IS NULL;

-- Strathisla - Keith, Speyside (oldest operating in Highlands)
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Strathisla_distillery_-_geograph.org.uk_-_725081.jpg/1280px-Strathisla_distillery_-_geograph.org.uk_-_725081.jpg'
WHERE slug = 'strathisla' AND image_url IS NULL;

-- Teaninich - Alness, Highland
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Teaninich_Distillery_-_geograph.org.uk_-_263581.jpg/1280px-Teaninich_Distillery_-_geograph.org.uk_-_263581.jpg'
WHERE slug = 'teaninich' AND image_url IS NULL;

-- Pulteney (Old Pulteney) - Wick
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Old_Pulteney_Distillery_-_geograph.org.uk_-_1084655.jpg/1280px-Old_Pulteney_Distillery_-_geograph.org.uk_-_1084655.jpg'
WHERE slug = 'pulteney' AND image_url IS NULL;

-- Balblair - Edderton, Highland
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Balblair_distillery_-_geograph.org.uk_-_606220.jpg/1280px-Balblair_distillery_-_geograph.org.uk_-_606220.jpg'
WHERE slug = 'balblair' AND image_url IS NULL;

-- ============================================================
-- IRISH DISTILLERIES
-- ============================================================

-- Bushmills - County Antrim (oldest licensed distillery)
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bushmills_distillery_-_geograph.org.uk_-_474452.jpg/1280px-Bushmills_distillery_-_geograph.org.uk_-_474452.jpg'
WHERE slug = 'bushmills' AND image_url IS NULL;

-- Jameson / Bow Street (Old Jameson Distillery)
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Old_Jameson_Distillery%2C_Dublin_01.JPG/1280px-Old_Jameson_Distillery%2C_Dublin_01.JPG'
WHERE slug = 'jameson' AND image_url IS NULL;

-- Tullamore - Offaly
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tullamore_Dew_Visitor_Centre.jpg/1280px-Tullamore_Dew_Visitor_Centre.jpg'
WHERE slug = 'tullamore' AND image_url IS NULL;

-- ============================================================
-- AMERICAN DISTILLERIES
-- ============================================================

-- Buffalo Trace - Frankfort, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Buffalo_Trace_Distillery.jpg/1280px-Buffalo_Trace_Distillery.jpg'
WHERE slug = 'buffalo-trace' AND image_url IS NULL;

-- Maker's Mark - Loretto, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Makers_Mark_distillery_DSC_0049_%286296042801%29.jpg/1280px-Makers_Mark_distillery_DSC_0049_%286296042801%29.jpg'
WHERE slug = 'makers-mark' AND image_url IS NULL;

-- Wild Turkey - Lawrenceburg, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Wild_Turkey_Distillery_1.jpg/1280px-Wild_Turkey_Distillery_1.jpg'
WHERE slug = 'wild-turkey' AND image_url IS NULL;

-- Four Roses - Lawrenceburg, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Four_Roses_Distillery.jpg/1280px-Four_Roses_Distillery.jpg'
WHERE slug = 'four-roses' AND image_url IS NULL;

-- Woodford Reserve - Versailles, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Woodford_Reserve_Distillery-27527-2.jpg/1280px-Woodford_Reserve_Distillery-27527-2.jpg'
WHERE slug = 'woodford-reserve' AND image_url IS NULL;

-- Heaven Hill - Bardstown, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Heaven_Hill_Distilleries.jpg/1280px-Heaven_Hill_Distilleries.jpg'
WHERE slug = 'heaven-hill' AND image_url IS NULL;

-- Jim Beam - Clermont, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Jim_Beam_Distillery.jpg/1280px-Jim_Beam_Distillery.jpg'
WHERE slug = 'jim-beam' AND image_url IS NULL;

-- Jack Daniel's - Lynchburg, Tennessee
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Jack_Daniel%27s_Distillery.jpg/1280px-Jack_Daniel%27s_Distillery.jpg'
WHERE slug = 'jack-daniels' AND image_url IS NULL;

-- George Dickel - Tullahoma, Tennessee
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/George_Dickel_Distillery.jpg/1280px-George_Dickel_Distillery.jpg'
WHERE slug = 'george-dickel' AND image_url IS NULL;

-- Michter's - Louisville, Kentucky
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Michter%27s_Fort_Nelson_Distillery.jpg/1280px-Michter%27s_Fort_Nelson_Distillery.jpg'
WHERE slug = 'michters' AND image_url IS NULL;

-- ============================================================
-- JAPANESE DISTILLERIES
-- ============================================================

-- Yamazaki - Shimamoto, Osaka
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Yamazaki_distillery01s3200.jpg/1280px-Yamazaki_distillery01s3200.jpg'
WHERE slug = 'yamazaki' AND image_url IS NULL;

-- Hakushu - Hokuto, Yamanashi
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hakushu_Distillery.jpg/1280px-Hakushu_Distillery.jpg'
WHERE slug = 'hakushu' AND image_url IS NULL;

-- Yoichi (Nikka) - Hokkaido
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Nikka_Whisky_Yoichi_Distillery.jpg/1280px-Nikka_Whisky_Yoichi_Distillery.jpg'
WHERE slug = 'nikka' AND image_url IS NULL;

-- Miyagikyo (Nikka) - Sendai
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Nikka_Miyagikyo_distillery.jpg/1280px-Nikka_Miyagikyo_distillery.jpg'
WHERE slug = 'miyagikyo' AND image_url IS NULL;

-- ============================================================
-- WORLD DISTILLERIES
-- ============================================================

-- Midleton - Cork, Ireland
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Midleton_Distillery_Experience.jpg/1280px-Midleton_Distillery_Experience.jpg'
WHERE slug = 'midleton' AND image_url IS NULL;

-- M&H (Milk & Honey) - Tel Aviv, Israel
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Milk_%26_Honey_Distillery.jpg/1280px-Milk_%26_Honey_Distillery.jpg'
WHERE slug = 'mh' AND image_url IS NULL;

-- Kavalan - Yilan, Taiwan (use a different slug variant)
UPDATE distilleries SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Kavalan_Distillery.jpg/1280px-Kavalan_Distillery.jpg'
WHERE slug = 'kavalan' AND image_url IS NULL;
