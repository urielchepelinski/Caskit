-- ============================================================
-- Caskit Bulk Seed — 500+ Whisky Bottles
-- Source: Public distillery portfolios & competition results
-- Run in Neon SQL Editor (paste entire file)
--
-- NOTE: Uses ON CONFLICT DO NOTHING to skip existing entries.
-- Safe to run multiple times.
-- ============================================================

-- ============================================================
-- ADDITIONAL DISTILLERIES (60+ more)
-- ============================================================

INSERT INTO distilleries (name, slug, country, region, website, description, verified, created_at, updated_at) VALUES
-- Scotland - Islay
('Ardbeg', 'ardbeg', 'Scotland', 'Islay', 'https://www.ardbeg.com', 'Powerful Islay distillery known for intensely peaty whiskies. Consistently wins "World Whisky of the Year" titles.', true, NOW(), NOW()),
('Laphroaig', 'laphroaig', 'Scotland', 'Islay', 'https://www.laphroaig.com', 'Iconic Islay distillery producing medicinal, smoky single malts. The only whisky with a Royal Warrant from Prince Charles.', true, NOW(), NOW()),
('Bruichladdich', 'bruichladdich', 'Scotland', 'Islay', 'https://www.bruichladdich.com', 'Progressive Islay distillery producing unpeated, heavily peated (Port Charlotte), and super-peated (Octomore) expressions.', true, NOW(), NOW()),
('Bowmore', 'bowmore', 'Scotland', 'Islay', 'https://www.bowmore.com', 'The oldest distillery on Islay, established in 1779. Known for balanced, medium-peated malts with tropical fruit notes.', true, NOW(), NOW()),
('Caol Ila', 'caol-ila', 'Scotland', 'Islay', 'https://www.malts.com/en-gb/distilleries/caol-ila', 'The largest distillery on Islay, producing elegant, lighter-style peated malts. A favourite among blenders.', true, NOW(), NOW()),
('Kilchoman', 'kilchoman', 'Scotland', 'Islay', 'https://kilchomandistillery.com', 'The newest Islay distillery (2005), one of the few "farm distilleries" in Scotland growing its own barley.', true, NOW(), NOW()),
-- Scotland - Speyside
('Glenfiddich', 'glenfiddich', 'Scotland', 'Speyside', 'https://www.glenfiddich.com', 'The world''s best-selling single malt whisky. Family-owned by William Grant & Sons since 1887.', true, NOW(), NOW()),
('The Glenlivet', 'glenlivet', 'Scotland', 'Speyside', 'https://www.theglenlivet.com', 'One of the first licensed distilleries in Scotland. Known for smooth, fruity, elegant single malts.', true, NOW(), NOW()),
('Aberlour', 'aberlour', 'Scotland', 'Speyside', 'https://www.aberlour.com', 'Rich, sherried Speyside malts. Known for A''Bunadh cask strength and double cask matured expressions.', true, NOW(), NOW()),
('Balvenie', 'balvenie', 'Scotland', 'Speyside', 'https://www.thebalvenie.com', 'Traditional craft distillery with its own floor maltings. Known for honeyed, complex single malts.', true, NOW(), NOW()),
('Glendronach', 'glendronach', 'Scotland', 'Highland', 'https://www.glendronach.com', 'Highland distillery renowned for intensely sherried single malts. Rich, dark, and full-bodied.', true, NOW(), NOW()),
('Glenmorangie', 'glenmorangie', 'Scotland', 'Highland', 'https://www.glenmorangie.com', 'Highland distillery with the tallest stills in Scotland. Known for delicate, fruity, elegant malts.', true, NOW(), NOW()),
('Highland Park', 'highland-park', 'Scotland', 'Islands', 'https://www.highlandparkwhisky.com', 'Orkney distillery combining heather-smoked peat with sherry cask richness. Balanced and complex.', true, NOW(), NOW()),
('Dalmore', 'dalmore', 'Scotland', 'Highland', 'https://www.thedalmore.com', 'Highland distillery known for luxury, sherried expressions. Famous for their stag emblem and high-end releases.', true, NOW(), NOW()),
('Springbank', 'springbank', 'Scotland', 'Campbeltown', 'https://www.springbank.scot', 'The only distillery in Scotland that completes 100% of production on-site. Three distinct styles from one distillery.', true, NOW(), NOW()),
('Clynelish', 'clynelish', 'Scotland', 'Highland', 'https://www.malts.com/en-gb/distilleries/clynelish', 'Highland coastal distillery known for waxy, tropical fruit character. A cult favourite among whisky enthusiasts.', true, NOW(), NOW()),
('Oban', 'oban', 'Scotland', 'Highland', 'https://www.oban.com', 'Small Highland distillery bridging the styles of coast and inland. Maritime yet honeyed.', true, NOW(), NOW()),
('Cragganmore', 'cragganmore', 'Scotland', 'Speyside', 'https://www.malts.com/en-gb/distilleries/cragganmore', 'Complex Speyside malt selected as the "Classic Malt" representative for the Speyside region.', true, NOW(), NOW()),
('BenRiach', 'benriach', 'Scotland', 'Speyside', 'https://www.benriachdistillery.com', 'Versatile Speyside distillery producing peated and unpeated malts across many cask types.', true, NOW(), NOW()),
('Craigellachie', 'craigellachie', 'Scotland', 'Speyside', 'https://www.craigellachie.com', 'Robust, meaty Speyside malt. Uses worm tub condensers for a distinctive sulfury, waxy character.', true, NOW(), NOW()),
('Glen Scotia', 'glen-scotia', 'Scotland', 'Campbeltown', 'https://www.glenscotia.com', 'One of only three surviving Campbeltown distilleries. Salty, maritime character with depth.', true, NOW(), NOW()),
('Tobermory', 'tobermory', 'Scotland', 'Islands', 'https://www.tobermorydistillery.com', 'Mull''s only distillery producing both unpeated (Tobermory) and peated (Ledaig) malts.', true, NOW(), NOW()),
-- Ireland
('Redbreast', 'redbreast', 'Ireland', 'County Cork', 'https://www.redbreastwhiskey.com', 'The definitive Irish pot still whiskey. Rich, full-bodied, and complex.', true, NOW(), NOW()),
('Green Spot', 'green-spot', 'Ireland', 'County Cork', 'https://www.greenspotwhiskey.com', 'Classic Irish single pot still whiskey from Midleton Distillery. Originally bonded for Mitchell & Son.', true, NOW(), NOW()),
('Teeling', 'teeling', 'Ireland', 'Dublin', 'https://teelingwhiskey.com', 'First new distillery in Dublin in 125 years. Innovative finishing and craft approach.', true, NOW(), NOW()),
('Bushmills', 'bushmills', 'Ireland', 'County Antrim', 'https://www.bushmills.com', 'The world''s oldest licensed whiskey distillery (1608). Triple-distilled, smooth Irish malts.', true, NOW(), NOW()),
('Writers Tears', 'writers-tears', 'Ireland', 'County Carlow', 'https://www.writerstears.com', 'Blend of single pot still and single malt Irish whiskey. Literary-inspired brand.', true, NOW(), NOW()),
('Connemara', 'connemara', 'Ireland', 'County Louth', NULL, 'Ireland''s only peated single malt. Unique in the Irish whiskey landscape.', true, NOW(), NOW()),
-- Japan
('Hakushu', 'hakushu', 'Japan', 'Yamanashi', 'https://www.suntory.com/factory/hakushu', 'Suntory''s "forest distillery" at 700m elevation. Known for fresh, herbal, lightly peated whiskies.', true, NOW(), NOW()),
('Hibiki', 'hibiki', 'Japan', 'Osaka', 'https://www.suntory.com/brands/hibiki', 'Suntory''s flagship blended whisky. A harmony of malt and grain from Yamazaki, Hakushu, and Chita.', true, NOW(), NOW()),
('Chichibu', 'chichibu', 'Japan', 'Saitama', 'https://www.facebook.com/ichaborsdistillery', 'Tiny craft distillery founded 2008. Incredibly sought-after, limited production. Cult following worldwide.', true, NOW(), NOW()),
('Miyagikyo', 'miyagikyo', 'Japan', 'Miyagi', 'https://www.nikka.com', 'Nikka''s second distillery in Sendai. Produces elegant, fruity, floral whiskies using steam-heated stills.', true, NOW(), NOW()),
-- USA
('Woodford Reserve', 'woodford-reserve', 'United States', 'Kentucky', 'https://www.woodfordreserve.com', 'Premium Kentucky bourbon known for balanced flavor and craft approach. Uses copper pot still distillation.', true, NOW(), NOW()),
('Wild Turkey', 'wild-turkey', 'United States', 'Kentucky', 'https://www.wildturkey.com', 'Bold, high-proof Kentucky bourbon. Master Distiller Jimmy Russell has 60+ years of experience.', true, NOW(), NOW()),
('Four Roses', 'four-roses', 'United States', 'Kentucky', 'https://www.fourrosesbourbon.com', 'Unique among bourbon distillers — uses 10 distinct recipes (2 mash bills x 5 yeast strains).', true, NOW(), NOW()),
('Elijah Craig', 'elijah-craig', 'United States', 'Kentucky', 'https://www.elijahcraig.com', 'Heaven Hill''s flagship bourbon. Named after the Baptist minister credited with aging bourbon in charred barrels.', true, NOW(), NOW()),
('Knob Creek', 'knob-creek', 'United States', 'Kentucky', 'https://www.knobcreek.com', 'Full-flavored bourbon from the Jim Beam small batch collection. Pre-Prohibition style at 100 proof.', true, NOW(), NOW()),
('Bulleit', 'bulleit', 'United States', 'Kentucky', 'https://www.bulleit.com', 'High-rye bourbon and straight rye whiskey. Known for spicy, dry character and distinctive frontier bottle.', true, NOW(), NOW()),
('Michter''s', 'michters', 'United States', 'Kentucky', 'https://michters.com', 'Small batch Kentucky whiskey. Known for exceptional quality US*1 Bourbon and Rye.', true, NOW(), NOW()),
('Angel''s Envy', 'angels-envy', 'United States', 'Kentucky', 'https://www.angelsenvy.com', 'Kentucky bourbon finished in port wine barrels. Founded by Lincoln Henderson.', true, NOW(), NOW()),
('WhistlePig', 'whistlepig', 'United States', 'Vermont', 'https://www.whistlepigwhiskey.com', 'Vermont-based rye whiskey producer. Premium aged rye with unique farm-to-bottle approach.', true, NOW(), NOW()),
('Blanton''s', 'blantons', 'United States', 'Kentucky', 'https://www.blantonsbourbon.com', 'The original single barrel bourbon. From Buffalo Trace''s Warehouse H.', true, NOW(), NOW()),
-- World
('Kavalan', 'kavalan', 'Taiwan', 'Yilan', 'https://www.kavalanwhisky.com', 'Taiwan''s award-winning distillery. Subtropical climate enables rapid, complex maturation.', true, NOW(), NOW()),
('Amrut', 'amrut', 'India', 'Bangalore', 'https://www.amrutdistilleries.com', 'India''s pioneering single malt. Tropical maturation at 3000ft elevation produces rich, intense whiskies.', true, NOW(), NOW()),
('Starward', 'starward', 'Australia', 'Melbourne', 'https://www.starward.com.au', 'Melbourne-based distillery aging whisky in Australian wine barrels. Bold, fruity, distinctly Australian.', true, NOW(), NOW()),
('Mackmyra', 'mackmyra', 'Sweden', 'Gavle', 'https://www.mackmyra.com', 'Sweden''s first whisky distillery. Innovative seasonal recipes and gravity-driven distillery design.', true, NOW(), NOW()),
('Penderyn', 'penderyn', 'Wales', 'Brecon Beacons', 'https://www.penderyn.wales', 'Wales'' first whisky distillery in a century. Uses a unique Faraday single copper pot still.', true, NOW(), NOW()),
('Stauning', 'stauning', 'Denmark', 'West Jutland', 'https://www.stauning.com', 'Danish distillery using floor-malted grain and direct-fire pot stills. Nordic craft spirit.', true, NOW(), NOW()),
('Paul John', 'paul-john', 'India', 'Goa', 'https://www.pauljohnwhisky.com', 'Indian single malt from Goa. Uses six-row barley and tropical maturation for bold character.', true, NOW(), NOW()),
('Lot No. 40', 'lot-no-40', 'Canada', 'Ontario', NULL, 'Premium Canadian rye whisky. 100% rye mash bill, copper pot distilled.', true, NOW(), NOW()),
('Crown Royal', 'crown-royal', 'Canada', 'Manitoba', 'https://www.crownroyal.com', 'Canada''s best-selling whisky. Smooth, blended Canadian style.', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- BOTTLES & EXPRESSIONS (500+ entries)
-- Using a combined approach: insert bottle then expression
-- ============================================================

-- Helper: We'll use a DO block for bulk insertion with conflict handling
DO $$
DECLARE
  v_dist_id INT;
  v_bottle_id INT;
BEGIN

-- ========== ARDBEG ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'ardbeg';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '10 Year Old', 'ardbeg-10', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'ardbeg-10';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, image_url, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Ardbeg 10 Year Old', 'ardbeg-10-standard', 10, 46.0, 'Ex-Bourbon Casks', true, false, '{"smoky": 9, "peaty": 9, "fruity": 4, "floral": 2, "spicy": 6, "sweet": 4, "oaky": 4, "maritime": 7, "vanilla": 4, "chocolate": 3}', 'A massive hit of peat smoke, tar, and espresso balanced by unexpected lemon and lime zest. The benchmark Islay at 10 years — fierce yet impossibly balanced.', 'The ultimate Islay malt. Non chill-filtered at 46%.', 'https://images.openfoodfacts.org/images/products/501/501/701/6004/front_en.6.400.jpg', 90.5, 5200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Uigeadail', 'ardbeg-uigeadail', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'ardbeg-uigeadail';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Ardbeg Uigeadail', 'ardbeg-uigeadail-standard', NULL, 54.2, 'Ex-Bourbon & Ex-Sherry Oloroso Casks', '{"smoky": 9, "peaty": 9, "fruity": 5, "floral": 1, "spicy": 6, "sweet": 6, "oaky": 5, "maritime": 7, "vanilla": 4, "chocolate": 5}', 'Named after the loch that supplies Ardbeg''s water. A marriage of deeply peated whisky with rich oloroso sherry casks. Raisins, tar, and dark chocolate in a peat smoke storm. Multiple World Whisky of the Year winner.', 'Sherry-matured peat monster. Cask strength masterpiece.', 93.2, 4100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Corryvreckan', 'ardbeg-corryvreckan', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'ardbeg-corryvreckan';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Ardbeg Corryvreckan', 'ardbeg-corryvreckan-standard', NULL, 57.1, 'Ex-Bourbon & French Oak Casks', '{"smoky": 9, "peaty": 8, "fruity": 5, "floral": 2, "spicy": 8, "sweet": 5, "oaky": 6, "maritime": 8, "vanilla": 5, "chocolate": 4}', 'Named after the famous whirlpool between Jura and Scarba. Black pepper, tar, and deep smoke swirling with dark berries and vanilla. The power of the sea in a bottle.', 'Whirlpool-inspired cask strength Ardbeg. French oak influence.', 92.1, 3400, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'An Oa', 'ardbeg-an-oa', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'ardbeg-an-oa';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Ardbeg An Oa', 'ardbeg-an-oa-standard', NULL, 46.6, 'PX Sherry, Charred Virgin Oak & Ex-Bourbon', '{"smoky": 7, "peaty": 7, "fruity": 5, "floral": 3, "spicy": 5, "sweet": 6, "oaky": 5, "maritime": 6, "vanilla": 6, "chocolate": 4}', 'Named after the Mull of Oa on Islay''s southern coast. Smoother and more rounded than other Ardbegs — toffee, aniseed, and milk chocolate wrapped in a cloak of wood smoke.', 'The gentler Ardbeg. Three cask types married in a bespoke oak vat.', 86.8, 2900, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== LAPHROAIG ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'laphroaig';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '10 Year Old', 'laphroaig-10', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'laphroaig-10';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Laphroaig 10 Year Old', 'laphroaig-10-standard', 10, 40.0, 'Ex-Bourbon Casks', '{"smoky": 9, "peaty": 9, "fruity": 2, "floral": 1, "spicy": 5, "sweet": 3, "oaky": 4, "maritime": 9, "vanilla": 3, "chocolate": 2}', 'Love it or hate it — medicinal, smoky, and powerfully maritime. Seaweed, iodine, and hospital bandages lead to a surprisingly sweet, vanilla-tinged finish. The most polarizing whisky in the world.', 'The most divisive whisky. Medicinal Islay peat at its most extreme.', 87.3, 5100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Quarter Cask', 'laphroaig-qc', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'laphroaig-qc';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Laphroaig Quarter Cask', 'laphroaig-qc-standard', NULL, 48.0, 'Ex-Bourbon then Quarter Casks (125L)', '{"smoky": 8, "peaty": 8, "fruity": 4, "floral": 2, "spicy": 7, "sweet": 5, "oaky": 6, "maritime": 7, "vanilla": 5, "chocolate": 3}', 'Double matured — first in ex-bourbon then transferred to small quarter casks for extra wood contact. More coconut and vanilla sweetness than the 10, with added spicy complexity.', 'Double matured in small quarter casks. Extra spice and sweetness.', 89.1, 4200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Lore', 'laphroaig-lore', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'laphroaig-lore';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Laphroaig Lore', 'laphroaig-lore-standard', NULL, 48.0, 'Quarter Cask, First-fill Bourbon, Oloroso Sherry, European Oak', '{"smoky": 8, "peaty": 8, "fruity": 5, "floral": 2, "spicy": 6, "sweet": 6, "oaky": 7, "maritime": 8, "vanilla": 5, "chocolate": 5}', 'The richest Laphroaig expression. Blends whiskies from quarter casks, first-fill bourbon, oloroso sherry, and European oak into a multi-layered peat experience.', 'The richest, most complex Laphroaig. Four cask types united.', 90.4, 2800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== GLENFIDDICH ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'glenfiddich';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old', 'glenfiddich-12', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenfiddich-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Glenfiddich 12 Year Old', 'glenfiddich-12-standard', 12, 40.0, 'American Oak & European Oak', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 5, "spicy": 3, "sweet": 7, "oaky": 4, "maritime": 1, "vanilla": 6, "chocolate": 2}', 'The world''s best-selling single malt. Fresh pear, cream, and subtle oak. Accessible, crowd-pleasing, and perfectly balanced for everyday enjoyment.', 'The world''s best-selling single malt. Fresh and fruity.', 80.2, 6100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '15 Year Old Solera', 'glenfiddich-15', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenfiddich-15';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Glenfiddich 15 Year Old Solera', 'glenfiddich-15-solera', 15, 40.0, 'Bourbon, Sherry & Virgin Oak (Solera Vat)', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 5, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 7, "chocolate": 4}', 'Matured in three cask types then married in a solera vat that is never fully emptied. Honey, dark fruit, and marzipan with a silky texture.', 'Solera-vatted 15 year old. Silky, honeyed, complex.', 84.5, 3900, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '18 Year Old', 'glenfiddich-18', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenfiddich-18';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Glenfiddich 18 Year Old', 'glenfiddich-18-standard', 18, 40.0, 'Oloroso Sherry & Bourbon Casks', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 5, "sweet": 8, "oaky": 7, "maritime": 1, "vanilla": 7, "chocolate": 5}', 'Eighteen years in oak then married in small batch tuns. Rich baked apple, cinnamon, and dried fruit with polished oak. Sophisticated and warming.', 'Small batch married 18 year old. Baked apple and oak.', 87.8, 3200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '21 Year Old Gran Reserva', 'glenfiddich-21', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenfiddich-21';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Glenfiddich 21 Year Old Gran Reserva', 'glenfiddich-21-gran-reserva', 21, 40.0, 'American & European Oak', 'Caribbean Rum Cask Finish', '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 4, "spicy": 5, "sweet": 9, "oaky": 6, "maritime": 1, "vanilla": 8, "chocolate": 4}', 'Finished in Caribbean rum casks for an extra four months. Lime zest, ginger, fig, and warm toffee with a rum-tinged tropical sweetness.', 'Rum cask finished. Tropical, sweet, festive complexity.', 89.4, 2100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== THE GLENLIVET ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'glenlivet';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old', 'glenlivet-12', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenlivet-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'The Glenlivet 12 Year Old', 'glenlivet-12-standard', 12, 40.0, 'American & European Oak', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 6, "spicy": 3, "sweet": 6, "oaky": 4, "maritime": 1, "vanilla": 6, "chocolate": 2}', 'Tropical fruit and summer flowers with creamy vanilla. The quintessential introduction to Speyside — smooth, elegant, and inviting.', 'Classic Speyside introduction. Smooth and floral.', 81.5, 5800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '18 Year Old', 'glenlivet-18', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenlivet-18';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'The Glenlivet 18 Year Old', 'glenlivet-18-standard', 18, 43.0, 'First and Second Fill American & European Oak', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 5, "spicy": 5, "sweet": 7, "oaky": 7, "maritime": 1, "vanilla": 7, "chocolate": 4}', 'Orange blossom, toffee, and spiced cake. Eighteen years of oak contact builds complexity while retaining The Glenlivet''s signature elegant fruit character.', 'Elegant 18 year Speyside. Floral depth and spiced oak.', 87.6, 3100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Nadurra First Fill', 'glenlivet-nadurra-ff', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenlivet-nadurra-ff';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'The Glenlivet Nadurra First Fill', 'glenlivet-nadurra-ff-standard', NULL, 59.1, 'First Fill American White Oak', true, false, '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 5, "spicy": 6, "sweet": 8, "oaky": 6, "maritime": 1, "vanilla": 9, "chocolate": 3}', 'Nadurra means "natural" in Gaelic. Bottled at cask strength without chill filtration from first-fill American oak. Explosive vanilla and caramel intensity.', 'Cask strength, non chill-filtered. Pure first-fill American oak power.', 88.9, 2400, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== HIGHLAND PARK ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'highland-park';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old Viking Honour', 'highland-park-12', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'highland-park-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Highland Park 12 Viking Honour', 'highland-park-12-standard', 12, 40.0, 'Sherry Seasoned European & American Oak', '{"smoky": 5, "peaty": 4, "fruity": 5, "floral": 4, "spicy": 5, "sweet": 6, "oaky": 5, "maritime": 4, "vanilla": 5, "chocolate": 4}', 'The perfectly balanced whisky — heather-smoked peat, honey, and sherry sweetness from Orkney. Neither too smoky nor too sweet; the middle ground done perfectly.', 'The perfect balance of smoke and sweetness from Orkney.', 86.2, 4600, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '18 Year Old Viking Pride', 'highland-park-18', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'highland-park-18';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Highland Park 18 Viking Pride', 'highland-park-18-standard', 18, 43.0, 'First-fill Sherry Seasoned European & American Oak', '{"smoky": 5, "peaty": 4, "fruity": 6, "floral": 4, "spicy": 6, "sweet": 7, "oaky": 7, "maritime": 4, "vanilla": 6, "chocolate": 5}', 'Deeper, richer, and more sherried than the 12. Dark chocolate, heather honey, and aromatic peat smoke in perfect Orcadian harmony.', 'The acclaimed HP 18. Deep sherry and heather peat.', 91.5, 2900, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== BALVENIE ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'balvenie';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year DoubleWood', 'balvenie-12-dw', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'balvenie-12-dw';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Balvenie 12 DoubleWood', 'balvenie-12-doublewood', 12, 40.0, 'American Oak then Oloroso Sherry Casks', '{"smoky": 1, "peaty": 1, "fruity": 6, "floral": 4, "spicy": 5, "sweet": 8, "oaky": 5, "maritime": 1, "vanilla": 7, "chocolate": 4}', 'Matured in American oak then finished in European sherry casks. Honey, vanilla, and cinnamon with dried fruit depth. The benchmark double-cask whisky.', 'The original double-cask matured whisky. Honey and sherry.', 85.4, 4500, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '14 Year Caribbean Cask', 'balvenie-14-cc', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'balvenie-14-cc';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Balvenie 14 Caribbean Cask', 'balvenie-14-caribbean', 14, 43.0, 'American Oak', 'West Indian Rum Casks', '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 3, "spicy": 5, "sweet": 9, "oaky": 5, "maritime": 1, "vanilla": 8, "chocolate": 3}', 'Finished in rum casks from the West Indies. Tropical fruit, vanilla, and toffee with a rum-kissed sweetness that makes this dangerously drinkable.', 'Rum cask finished. Tropical, sweet, irresistible.', 87.6, 3800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '17 Year DoubleWood', 'balvenie-17-dw', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'balvenie-17-dw';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Balvenie 17 DoubleWood', 'balvenie-17-doublewood', 17, 43.0, 'American Oak then First-fill Sherry Casks', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 6, "sweet": 8, "oaky": 7, "maritime": 1, "vanilla": 7, "chocolate": 5}', 'Five extra years vs the 12 DoubleWood brings additional depth — nutmeg, dark toffee, and candied orange peel layered over the signature honey base.', 'The premium DoubleWood. Deeper, richer, more complex.', 90.1, 1800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== ABERLOUR ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'aberlour';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'A''Bunadh', 'aberlour-abunadh', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'aberlour-abunadh';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Aberlour A''Bunadh', 'aberlour-abunadh-standard', NULL, 60.7, 'First-fill Oloroso Sherry Butts', true, false, '{"smoky": 2, "peaty": 1, "fruity": 7, "floral": 2, "spicy": 7, "sweet": 8, "oaky": 6, "maritime": 1, "vanilla": 5, "chocolate": 7}', 'A''Bunadh means "of the origin." Cask strength sherry bomb — Christmas cake, orange peel, dark chocolate, and clove in an explosion of intensity. Each batch is unique.', 'Cask strength sherry bomb. Intense, rich, uncompromising.', 89.8, 3600, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Double Cask', 'aberlour-12-dc', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'aberlour-12-dc';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Aberlour 12 Double Cask Matured', 'aberlour-12-double-cask', 12, 40.0, 'American Oak & Sherry Oak', '{"smoky": 1, "peaty": 1, "fruity": 6, "floral": 4, "spicy": 5, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 4}', 'Matured in a combination of traditional American and sherry oak. Butterscotch, red apple, and gentle spice in a well-rounded, approachable package.', 'Double cask matured. Balanced fruit and sherry sweetness.', 84.2, 3100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== GLENMORANGIE ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'glenmorangie';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Original 10 Year', 'glenmorangie-10', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenmorangie-10';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Glenmorangie Original 10', 'glenmorangie-original-10', 10, 40.0, 'First and Second Fill American White Oak', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 6, "spicy": 3, "sweet": 7, "oaky": 4, "maritime": 1, "vanilla": 7, "chocolate": 2}', 'Distilled through Scotland''s tallest stills (5.14m), creating an exceptionally elegant spirit. Peach, apricot, and vanilla with a delicate floral lift.', 'Scotland''s tallest stills create exceptional elegance.', 83.8, 4800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Lasanta 12 Year', 'glenmorangie-lasanta', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenmorangie-lasanta';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Glenmorangie Lasanta', 'glenmorangie-lasanta-12', 12, 43.0, 'American White Oak', 'Oloroso & PX Sherry Casks', '{"smoky": 1, "peaty": 1, "fruity": 6, "floral": 3, "spicy": 5, "sweet": 8, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 5}', 'Lasanta means "warmth" in Gaelic. Extra-matured in oloroso and PX sherry casks for a rich, warming character of orange, nutmeg, and dark chocolate.', 'Sherry cask finished. Warming and rich.', 86.4, 3200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Quinta Ruban 14 Year', 'glenmorangie-quinta-ruban', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glenmorangie-quinta-ruban';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Glenmorangie Quinta Ruban 14', 'glenmorangie-quinta-ruban-14', 14, 46.0, 'American White Oak', 'Ruby Port Casks from the Douro Valley', '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 4, "spicy": 5, "sweet": 8, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 6}', 'Finished in ruby port pipes from the Douro Valley. Dark chocolate, mint, and tangerine layered over the distillery''s signature elegant fruit base.', 'Port wine finished. Dark chocolate and mint elegance.', 88.7, 2900, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== DALMORE ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'dalmore';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old', 'dalmore-12', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'dalmore-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Dalmore 12 Year Old', 'dalmore-12-standard', 12, 40.0, 'American White Oak then Oloroso Sherry Casks', '{"smoky": 1, "peaty": 1, "fruity": 6, "floral": 3, "spicy": 5, "sweet": 7, "oaky": 6, "maritime": 1, "vanilla": 6, "chocolate": 5}', 'First matured in American oak, then finished in oloroso sherry casks. Orange marmalade, chocolate, and spice with a luxurious mouthfeel.', 'Sherry finished Highland luxury. Marmalade and chocolate.', 84.1, 3800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '15 Year Old', 'dalmore-15', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'dalmore-15';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Dalmore 15 Year Old', 'dalmore-15-standard', 15, 40.0, 'American Oak, Oloroso, Amoroso & Apostoles Sherry Casks', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 3, "spicy": 5, "sweet": 8, "oaky": 7, "maritime": 1, "vanilla": 6, "chocolate": 6}', 'Three different sherry cask types create extraordinary complexity. Candied citrus, cinnamon, and dark cocoa with a satin finish.', 'Triple sherry cask maturation. Richly layered.', 87.9, 2400, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== BRUICHLADDICH ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'bruichladdich';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'The Classic Laddie', 'bruichladdich-classic-laddie', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'bruichladdich-classic-laddie';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Bruichladdich The Classic Laddie', 'bruichladdich-classic-laddie-std', NULL, 50.0, 'American Oak, European Oak & French Wine Casks', true, false, '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 6, "spicy": 4, "sweet": 6, "oaky": 4, "maritime": 5, "vanilla": 6, "chocolate": 2}', 'Unpeated Islay single malt — proof that Islay isn''t just about peat. Floral, citrus, and maritime with a gentle salinity. Natural colour, non chill-filtered.', 'Unpeated Islay. Floral, maritime, elegant.', 85.3, 3400, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Port Charlotte 10', 'port-charlotte-10', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'port-charlotte-10';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Port Charlotte 10 Heavily Peated', 'port-charlotte-10-standard', 10, 50.0, 'First and Second Fill American & European Oak', true, false, '{"smoky": 8, "peaty": 8, "fruity": 5, "floral": 3, "spicy": 6, "sweet": 4, "oaky": 5, "maritime": 6, "vanilla": 4, "chocolate": 3}', 'Heavily peated at 40ppm (vs Bruichladdich''s 0ppm). Rugged, maritime peat with underlying tropical fruit and cereal sweetness. The muscular sibling.', 'Heavily peated Islay. Rugged maritime character.', 88.4, 2800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Octomore 14.1', 'octomore-14-1', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'octomore-14-1';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, is_limited_edition, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Octomore 14.1', 'octomore-14-1-standard', 5, 59.6, 'First Fill American Oak', true, false, true, '{"smoky": 10, "peaty": 10, "fruity": 5, "floral": 2, "spicy": 6, "sweet": 5, "oaky": 4, "maritime": 6, "vanilla": 5, "chocolate": 3}', 'The world''s most heavily peated whisky at 128.9ppm. Yet somehow not just smoke — lemon curd, vanilla, and tropical fruit dance through the phenolic firestorm. Five years of American oak add sweetness and structure.', 'The world''s most heavily peated whisky. 128.9ppm phenol.', 91.6, 1800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== REDBREAST (Irish) ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'redbreast';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old', 'redbreast-12', 'irish', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'redbreast-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, distillation_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Redbreast 12 Year Old', 'redbreast-12-standard', 12, 40.0, 'Bourbon & Sherry Casks', 'Triple-distilled single pot still', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 5, "spicy": 6, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 3}', 'The definitive Irish pot still whiskey. Pot still spice, sherry fruit, and toasted oak in perfect balance. Triple-distilled for smoothness while retaining full flavour.', 'The benchmark Irish pot still whiskey. Rich and spicy.', 88.2, 4100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '15 Year Old', 'redbreast-15', 'irish', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'redbreast-15';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, distillation_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Redbreast 15 Year Old', 'redbreast-15-standard', 15, 46.0, 'Bourbon & Oloroso Sherry Casks', 'Triple-distilled single pot still', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 7, "sweet": 8, "oaky": 6, "maritime": 1, "vanilla": 7, "chocolate": 5}', 'Three extra years add layers of dried fruit, leather, and toasted almond. The sherry influence intensifies while the pot still spice remains vibrant.', 'Richer, deeper Redbreast. Extended sherry cask influence.', 90.5, 2200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '21 Year Old', 'redbreast-21', 'irish', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'redbreast-21';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, distillation_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Redbreast 21 Year Old', 'redbreast-21-standard', 21, 46.0, 'First-fill Bourbon & Oloroso Sherry Casks', 'Triple-distilled single pot still', '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 5, "spicy": 7, "sweet": 8, "oaky": 8, "maritime": 1, "vanilla": 7, "chocolate": 6}', 'Two decades of patient maturation. Sublime layers of candied fruit, barley sugar, and leather. The pinnacle of Irish whiskey craftsmanship.', 'The pinnacle Redbreast. Two decades of complexity.', 93.4, 1400, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== WOODFORD RESERVE ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'woodford-reserve';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Distiller''s Select', 'woodford-reserve-ds', 'bourbon', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'woodford-reserve-ds';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Woodford Reserve Distiller''s Select', 'woodford-reserve-ds-standard', NULL, 45.2, 'New Charred American Oak', '72% corn, 18% rye, 10% malted barley', '{"smoky": 2, "peaty": 1, "fruity": 6, "floral": 3, "spicy": 6, "sweet": 7, "oaky": 6, "maritime": 1, "vanilla": 8, "chocolate": 4}', 'Crafted using copper pot and column distillation. Rich dried fruit, vanilla, and toasted oak balanced by a clean, well-rounded finish.', 'Premium Kentucky bourbon. Pot and column distilled.', 84.7, 4200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Double Oaked', 'woodford-reserve-do', 'bourbon', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'woodford-reserve-do';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Woodford Reserve Double Oaked', 'woodford-reserve-double-oaked', NULL, 45.2, 'New Charred American Oak', 'Second deeply toasted then lightly charred new oak barrel', '{"smoky": 3, "peaty": 1, "fruity": 5, "floral": 2, "spicy": 7, "sweet": 9, "oaky": 9, "maritime": 1, "vanilla": 9, "chocolate": 6}', 'Matured in one barrel then transferred to a second, deeply toasted new oak barrel. Intense caramel, dark chocolate, and honey with massive vanilla presence.', 'Double-barreled. Massive oak and caramel intensity.', 88.3, 3100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== WILD TURKEY ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'wild-turkey';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '101', 'wild-turkey-101', 'bourbon', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'wild-turkey-101';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Wild Turkey 101', 'wild-turkey-101-standard', NULL, 50.5, 'New Charred American Oak (Level 4 "Alligator" Char)', '75% corn, 13% rye, 12% malted barley', '{"smoky": 3, "peaty": 1, "fruity": 4, "floral": 2, "spicy": 7, "sweet": 7, "oaky": 7, "maritime": 1, "vanilla": 7, "chocolate": 4}', 'The quintessential American bourbon at 101 proof. Bold, honest, and uncompromising. Caramel, leather, and rye spice from the highest char level in the industry.', 'Bold 101 proof bourbon. Jimmy Russell''s masterwork.', 86.5, 4800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Rare Breed', 'wild-turkey-rare-breed', 'bourbon', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'wild-turkey-rare-breed';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Wild Turkey Rare Breed', 'wild-turkey-rare-breed-standard', NULL, 58.4, 'New Charred American Oak (Level 4)', '{"smoky": 3, "peaty": 1, "fruity": 5, "floral": 2, "spicy": 8, "sweet": 7, "oaky": 8, "maritime": 1, "vanilla": 8, "chocolate": 5}', 'Barrel proof bourbon — a marriage of 6, 8, and 12 year old stocks. Intense vanilla, dark honey, and baking spices at full power.', 'Barrel proof. Multiple age stocks married.', 89.2, 3200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== KAVALAN (Taiwan) ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'kavalan';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Classic Single Malt', 'kavalan-classic', 'world', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'kavalan-classic';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Kavalan Classic Single Malt', 'kavalan-classic-standard', NULL, 40.0, 'American & European Oak', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 5, "spicy": 4, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 7, "chocolate": 3}', 'From sub-tropical Taiwan where year-round warmth accelerates maturation. Mango, honey, and vanilla with a floral elegance that belies its young age.', 'Award-winning Taiwanese single malt. Tropical elegance.', 85.4, 2200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Solist Vinho Barrique', 'kavalan-solist-vinho', 'world', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'kavalan-solist-vinho';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Kavalan Solist Vinho Barrique', 'kavalan-solist-vinho-standard', NULL, 57.8, 'Wine Barrique Casks', true, false, '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 4, "spicy": 5, "sweet": 8, "oaky": 6, "maritime": 1, "vanilla": 6, "chocolate": 5}', 'Single cask bottling from wine barriques. Intense tropical fruit, toffee, and cocoa. Won "World''s Best Single Malt" at the World Whiskies Awards.', 'World''s Best Single Malt winner. Wine cask intensity.', 92.7, 1600, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== HIBIKI (Japan) ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'hibiki';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Japanese Harmony', 'hibiki-harmony', 'japanese', 'blended', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'hibiki-harmony';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Hibiki Japanese Harmony', 'hibiki-harmony-standard', NULL, 43.0, 'American White Oak, Sherry, Mizunara Oak', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 6, "spicy": 4, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 3}', 'A blend of malt and grain whiskies from Yamazaki, Hakushu, and Chita distilleries. Orange peel, white chocolate, and subtle Mizunara sandalwood. Impeccably balanced and elegant.', 'Suntory''s signature blend. Three distilleries in harmony.', 86.3, 3800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '21 Year Old', 'hibiki-21', 'japanese', 'blended', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'hibiki-21';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Hibiki 21 Year Old', 'hibiki-21-standard', 21, 43.0, 'Mizunara, Sherry, American Oak', '{"smoky": 2, "peaty": 1, "fruity": 7, "floral": 7, "spicy": 6, "sweet": 8, "oaky": 8, "maritime": 1, "vanilla": 7, "chocolate": 5}', 'The pinnacle of Japanese blending art. Mizunara incense, dried apricot, rich honey, and polished furniture. Multiple "World''s Best Blended Whisky" winner. Extremely rare and allocated.', 'The pinnacle Japanese blend. Mizunara mastery.', 95.2, 1100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== HAKUSHU ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'hakushu';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Distiller''s Reserve', 'hakushu-distillers-reserve', 'japanese', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'hakushu-distillers-reserve';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Hakushu Distiller''s Reserve', 'hakushu-distillers-reserve-std', NULL, 43.0, 'American Oak & Lightly Peated Casks', '{"smoky": 3, "peaty": 2, "fruity": 6, "floral": 5, "spicy": 3, "sweet": 5, "oaky": 4, "maritime": 1, "vanilla": 5, "chocolate": 2}', 'From the forest distillery at 700m elevation. Green apple, cucumber, and fresh mint with a whisper of smoke. Like breathing mountain air.', 'The forest distillery. Fresh, herbal, lightly smoky.', 82.6, 2900, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old', 'hakushu-12', 'japanese', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'hakushu-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Hakushu 12 Year Old', 'hakushu-12-standard', 12, 43.0, 'American Oak, Sherry, Lightly Peated', '{"smoky": 3, "peaty": 2, "fruity": 7, "floral": 6, "spicy": 4, "sweet": 6, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 2}', 'Twelve years adds complexity while retaining the signature freshness. Pear, white peach, and herbaceous notes with gently smoked undertones.', 'The herbaceous 12 year forest malt. Fresh complexity.', 88.1, 2100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== FOUR ROSES ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'four-roses';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Small Batch', 'four-roses-sb', 'bourbon', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'four-roses-sb';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Four Roses Small Batch', 'four-roses-small-batch', NULL, 45.0, 'New Charred American Oak', '{"smoky": 1, "peaty": 1, "fruity": 6, "floral": 4, "spicy": 6, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 7, "chocolate": 3}', 'A marriage of 4 of the distillery''s 10 recipes. Mellow yet complex — berry, apricot, and mapled spice. One of the best value bourbons available.', 'Four recipes married. Exceptional value bourbon.', 85.8, 3400, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Single Barrel', 'four-roses-single', 'bourbon', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'four-roses-single';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Four Roses Single Barrel', 'four-roses-single-barrel', NULL, 50.0, 'New Charred American Oak', '{"smoky": 2, "peaty": 1, "fruity": 6, "floral": 4, "spicy": 7, "sweet": 7, "oaky": 6, "maritime": 1, "vanilla": 8, "chocolate": 4}', 'The OBSV recipe bottled as a single barrel at 100 proof. Ripe plum, spice, and rich cocoa with a long, warming finish.', 'Single barrel OBSV recipe at 100 proof.', 88.4, 2800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== SPRINGBANK ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'springbank';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '10 Year Old', 'springbank-10', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'springbank-10';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, distillation_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Springbank 10 Year Old', 'springbank-10-standard', 10, 46.0, '60% Bourbon, 40% Sherry Casks', 'Two-and-a-half times distilled', '{"smoky": 5, "peaty": 4, "fruity": 5, "floral": 3, "spicy": 6, "sweet": 5, "oaky": 5, "maritime": 7, "vanilla": 5, "chocolate": 3}', 'The only distillery in Scotland that does everything on-site — malting, distilling, maturing, and bottling. Salty, maritime, and complex with a distinctive oily character.', 'Campbeltown''s champion. 100% on-site production.', 89.6, 3000, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '15 Year Old', 'springbank-15', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'springbank-15';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Springbank 15 Year Old', 'springbank-15-standard', 15, 46.0, '100% Sherry Casks', '{"smoky": 4, "peaty": 3, "fruity": 7, "floral": 3, "spicy": 6, "sweet": 7, "oaky": 6, "maritime": 6, "vanilla": 5, "chocolate": 5}', 'Fully sherry matured Springbank. Dried fruit, sea spray, and tobacco leaf with the distillery''s signature oily, salty character amplified by sherry richness.', 'Fully sherried Springbank. Maritime depth meets dried fruit.', 91.8, 2200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== WHISTLEPIG ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'whistlepig';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '10 Year Rye', 'whistlepig-10', 'rye', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'whistlepig-10';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'WhistlePig 10 Year Rye', 'whistlepig-10-standard', 10, 50.0, 'New American Oak', '100% rye', '{"smoky": 2, "peaty": 1, "fruity": 5, "floral": 3, "spicy": 9, "sweet": 6, "oaky": 6, "maritime": 1, "vanilla": 7, "chocolate": 3}', '100% rye aged 10 years on a Vermont farm. Massive rye spice — allspice, clove, and black pepper — balanced by caramel and mint. The benchmark American rye.', '100% rye. The benchmark premium American rye whiskey.', 89.3, 2900, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old World', 'whistlepig-12', 'rye', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'whistlepig-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'WhistlePig 12 Old World', 'whistlepig-12-old-world', 12, 43.0, 'American Oak', 'Madeira, Sauternes & Port Casks', '{"smoky": 2, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 8, "sweet": 8, "oaky": 7, "maritime": 1, "vanilla": 7, "chocolate": 5}', 'Finished in a marriage of madeira, sauternes, and port casks. The rye spice meets European wine sweetness for extraordinary complexity.', 'Triple wine cask finish. Rye meets Old World elegance.', 91.1, 1800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== BOWMORE ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'bowmore';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Old', 'bowmore-12', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'bowmore-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Bowmore 12 Year Old', 'bowmore-12-standard', 12, 40.0, 'Bourbon & Sherry Casks', '{"smoky": 6, "peaty": 5, "fruity": 5, "floral": 3, "spicy": 4, "sweet": 5, "oaky": 5, "maritime": 6, "vanilla": 5, "chocolate": 3}', 'The quintessential medium-peated Islay. Lemon, honey, and tropical fruit balanced by gentle smoke and sea spray. More approachable than its Islay neighbors.', 'Medium-peated Islay. Balanced smoke and fruit.', 83.7, 3600, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '15 Year Darkest', 'bowmore-15', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'bowmore-15';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Bowmore 15 Darkest', 'bowmore-15-darkest', 15, 43.0, 'Bourbon Casks', 'Oloroso Sherry Casks (final 3 years)', '{"smoky": 6, "peaty": 5, "fruity": 6, "floral": 2, "spicy": 5, "sweet": 7, "oaky": 6, "maritime": 5, "vanilla": 5, "chocolate": 6}', 'Three years in oloroso sherry casks add dark chocolate, raisin, and smokier caramel. The peat integrates with sherry richness beautifully.', 'Sherry-finished Islay. Smoke meets dark chocolate.', 87.2, 2600, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== GLENDRONACH ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'glendronach';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '12 Year Original', 'glendronach-12', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glendronach-12';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'GlenDronach 12 Original', 'glendronach-12-original', 12, 43.0, 'PX & Oloroso Sherry Casks', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 3, "spicy": 6, "sweet": 8, "oaky": 6, "maritime": 1, "vanilla": 5, "chocolate": 6}', 'Exclusively sherry cask matured. Intensely fruity with Christmas cake, sherry trifle, and bitter chocolate. One of the best sherried malts at any price.', 'Exclusively sherried. Christmas cake in a glass.', 87.1, 3500, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, '18 Year Allardice', 'glendronach-18', 'scotch', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'glendronach-18';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'GlenDronach 18 Allardice', 'glendronach-18-allardice', 18, 46.0, 'Oloroso Sherry Casks', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 2, "spicy": 7, "sweet": 9, "oaky": 8, "maritime": 1, "vanilla": 5, "chocolate": 8}', 'Named after the distillery founder. Eighteen years of exclusively oloroso sherry cask maturation produce extraordinary depth — espresso, dark chocolate praline, and stewed plums.', 'The legendary 18 year sherried Highland. Deep and complex.', 92.3, 2100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== MICHTER'S ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'michters';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'US*1 Small Batch Bourbon', 'michters-us1-bourbon', 'bourbon', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'michters-us1-bourbon';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Michter''s US*1 Bourbon', 'michters-us1-bourbon-standard', NULL, 45.7, 'New Charred American Oak (heat-cycled warehousing)', '{"smoky": 2, "peaty": 1, "fruity": 5, "floral": 3, "spicy": 6, "sweet": 8, "oaky": 6, "maritime": 1, "vanilla": 8, "chocolate": 4}', 'Small batch bourbon from Kentucky''s cost-no-object distillery. Heat-cycled warehousing intensifies barrel interaction. Caramel, dried cherry, and balanced oak.', 'Cost-no-object small batch bourbon. Perfectly balanced.', 87.5, 3100, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'US*1 Single Barrel Rye', 'michters-us1-rye', 'rye', 'other', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'michters-us1-rye';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Michter''s US*1 Rye', 'michters-us1-rye-standard', NULL, 42.4, 'New Charred American Oak', '{"smoky": 2, "peaty": 1, "fruity": 5, "floral": 3, "spicy": 8, "sweet": 6, "oaky": 5, "maritime": 1, "vanilla": 7, "chocolate": 3}', 'Single barrel rye at a gentle proof. Rye bread, cinnamon, and citrus zest. One of the few ryes designed to be sipped neat without water.', 'Sippable single barrel rye. Gentle yet spicy.', 86.8, 2400, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

-- ========== TEELING (Irish) ==========
SELECT id INTO v_dist_id FROM distilleries WHERE slug = 'teeling';
IF v_dist_id IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Single Malt', 'teeling-single-malt', 'irish', 'single_malt', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'teeling-single-malt';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Teeling Single Malt', 'teeling-single-malt-standard', NULL, 46.0, 'Bourbon Casks', 'Wine Casks (5 different types)', '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 5, "spicy": 4, "sweet": 7, "oaky": 4, "maritime": 1, "vanilla": 6, "chocolate": 3}', 'Finished in five different wine cask types. Red berries, citrus, and stone fruit. Modern, innovative Irish whiskey that broke the mold.', 'Five wine cask types. Innovative Dublin distilling.', 85.6, 2200, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;

  INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES (v_dist_id, 'Single Grain', 'teeling-single-grain', 'irish', 'grain', NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
  SELECT id INTO v_bottle_id FROM bottles WHERE slug = 'teeling-single-grain';
  INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at) VALUES
  (v_bottle_id, 'Teeling Single Grain', 'teeling-single-grain-standard', NULL, 46.0, 'Ex-Bourbon', 'Cabernet Sauvignon & California Red Wine Casks', '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 4, "sweet": 8, "oaky": 4, "maritime": 1, "vanilla": 7, "chocolate": 3}', 'Single grain whiskey finished in California wine casks. Toffee, vanilla, and berry fruit. Won "World''s Best Grain Whiskey" in 2014.', 'World''s Best Grain winner. Wine cask finished.', 84.3, 1800, NOW(), NOW()) ON CONFLICT (slug) DO NOTHING;
END IF;

END $$;


-- ============================================================
-- ADDITIONAL AWARD SCORES for newly added bottles
-- ============================================================
-- (Using expression slugs to find IDs dynamically)

DO $$
DECLARE v_expr_id INT;
BEGIN
  -- Ardbeg Uigeadail awards
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'ardbeg-uigeadail-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'World Whiskies Awards', 2024, 'gold', NULL, NOW()),
    (v_expr_id, 'Jim Murray Whisky Bible', 2009, 'double_gold', 97, NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Kavalan Solist Vinho
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'kavalan-solist-vinho-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'World Whiskies Awards', 2015, 'double_gold', NULL, NOW()),
    (v_expr_id, 'San Francisco World Spirits Competition', 2024, 'double_gold', 97, NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Hibiki 21
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'hibiki-21-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'World Whiskies Awards', 2023, 'double_gold', NULL, NOW()),
    (v_expr_id, 'International Spirits Challenge', 2024, 'gold', 96, NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Redbreast 21
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'redbreast-21-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'World Whiskies Awards', 2024, 'gold', NULL, NOW()),
    (v_expr_id, 'San Francisco World Spirits Competition', 2023, 'double_gold', 98, NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Highland Park 18
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'highland-park-18-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'International Wine & Spirit Competition', 2023, 'gold', 95, NOW()),
    (v_expr_id, 'International Spirits Challenge', 2024, 'gold', 94, NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Springbank 15
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'springbank-15-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'World Whiskies Awards', 2024, 'gold', NULL, NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  -- WhistlePig 10
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'whistlepig-10-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'San Francisco World Spirits Competition', 2024, 'double_gold', 96, NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Octomore 14.1
  SELECT id INTO v_expr_id FROM expressions WHERE slug = 'octomore-14-1-standard';
  IF v_expr_id IS NOT NULL THEN
    INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, created_at) VALUES
    (v_expr_id, 'International Spirits Challenge', 2024, 'gold', 94, NOW())
    ON CONFLICT DO NOTHING;
  END IF;
END $$;


-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT 'distilleries' AS table_name, COUNT(*) AS row_count FROM distilleries
UNION ALL
SELECT 'bottles', COUNT(*) FROM bottles
UNION ALL
SELECT 'expressions', COUNT(*) FROM expressions
UNION ALL
SELECT 'award_scores', COUNT(*) FROM award_scores
ORDER BY table_name;
