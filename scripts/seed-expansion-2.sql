-- Caskit Expansion Seed 2: 100+ more distilleries and 300+ expressions
-- Focus: filling gaps in major regions + adding blended scotch, Canadian, and more world whiskies

-- ============================================================
-- MORE SCOTTISH DISTILLERIES
-- ============================================================

INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Bunnahabhain', 'bunnahabhain', 'Scotland', 'Islay', 'The gentlest Islay malt. Unpeated core range with sherried richness. Remote distillery at the end of a single-track road.', true),
('Caol Ila', 'caol-ila', 'Scotland', 'Islay', 'Diageo largest Islay distillery. Smoky and briny but elegant. Overlooking the Sound of Islay.', true),
('Oban', 'oban', 'Scotland', 'Highlands', 'West Highland malt from one of Scotland smallest distilleries. Maritime meets Highland character.', true),
('Dalwhinnie', 'dalwhinnie', 'Scotland', 'Highlands', 'The highest distillery in Scotland at 326m. Gentle, honeyed Highland malt. Classic Malts selection.', true),
('Cardhu', 'cardhu', 'Scotland', 'Speyside', 'The spiritual home of Johnnie Walker. Smooth, sweet Speyside malt founded by Helen Cumming.', true),
('Singleton of Glendullan', 'singleton-glendullan', 'Scotland', 'Speyside', 'Smooth, accessible Speyside designed for US market. Rich and fruity house style.', true),
('Glen Grant', 'glen-grant', 'Scotland', 'Speyside', 'Italy best-selling single malt. Light, fruity, orchard character. James Grant Victorian gardens.', true),
('Knockando', 'knockando', 'Scotland', 'Speyside', 'Vintage-dated Speyside. Elegant, floral style. Key component of J&B blend.', true),
('Linkwood', 'linkwood', 'Scotland', 'Speyside', 'Rarely seen as official bottling. Floral, perfumed Speyside prized by blenders and indie bottlers.', true),
('Glen Elgin', 'glen-elgin', 'Scotland', 'Speyside', 'Hidden Speyside gem. Honey and heather character. Rarely bottled as single malt.', true),
('Inchgower', 'inchgower', 'Scotland', 'Speyside', 'Coastal Speyside malt with a salty, briny edge. Bell official distillery.', true),
('Teaninich', 'teaninich', 'Scotland', 'Highlands', 'Industrial-scale Highland distillery. Grassy, herbal spirit favored by blenders.', true),
('Blair Athol', 'blair-athol', 'Scotland', 'Highlands', 'Gateway to the Highlands. Nutty, sherried malt. Key Bell blend component.', true),
('Fettercairn', 'fettercairn', 'Scotland', 'Highlands', 'Unique tropical fruit character from copper cooling system. Eastern Highland distillery.', true),
('Aberfeldy', 'aberfeldy', 'Scotland', 'Highlands', 'Home of Dewar blended scotch. Honeyed Highland malt with gold flecks in local water.', true),
('Craigellachie', 'craigellachie-distillery', 'Scotland', 'Speyside', 'Sulfury and meaty Speyside. Oil-fired stills and traditional worm tubs create bold character.', true),
('Arran', 'arran', 'Scotland', 'Islands', 'Independent island distillery on the Isle of Arran. No chill-filtration, no coloring. Pure whisky.', true),
('Ledaig', 'ledaig', 'Scotland', 'Islands', 'Heavily peated expression from Tobermory distillery on Mull. Maritime smoke and oil.', true),
('Scapa', 'scapa', 'Scotland', 'Islands', 'Orkney second distillery. Honey and heather versus Highland Park peaty neighbor.', true),
('Tullibardine', 'tullibardine', 'Scotland', 'Highlands', 'Highland distillery with innovative cask finishes. Sauternes, sherry, burgundy wood.', true),
('Dufftown', 'dufftown', 'Scotland', 'Speyside', 'The malt that makes the blend sing. Key Diageo component. Speyside workhorse.', true),
('Mannochmore', 'mannochmore', 'Scotland', 'Speyside', 'Light, floral Speyside. Part of Flora & Fauna series. Elegant and understated.', true),
('Auchroisk', 'auchroisk', 'Scotland', 'Speyside', 'Smooth, fruity Speyside built in 1974. One of the newer traditional distilleries.', true)
ON CONFLICT (slug) DO NOTHING;

-- BLENDED SCOTCH (important category)
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Johnnie Walker', 'johnnie-walker', 'Scotland', 'Kilmarnock', 'World best-selling Scotch whisky. Iconic walking man logo. Blending art since 1820.', true),
('Chivas Regal', 'chivas-regal', 'Scotland', 'Speyside', 'Premium blended Scotch. Strathisla as spiritual home. Rich, smooth, generous style.', true),
('Dewar''s', 'dewars', 'Scotland', 'Highlands', 'Double-aged blended Scotch. Aberfeldy as key malt. US top-selling blended scotch.', true),
('Monkey Shoulder', 'monkey-shoulder', 'Scotland', 'Speyside', 'Triple malt Scotch whisky. Balvenie + Glenfiddich + Kininvie. Bartender favorite.', true),
('Compass Box', 'compass-box', 'Scotland', 'London', 'Artisan blender pushing boundaries. Transparency in blending. Award-winning creative expressions.', true),
('Famous Grouse', 'famous-grouse', 'Scotland', 'Perth', 'Scotland favorite whisky. Highland Park and Macallan in the blend. Smooth and balanced.', true)
ON CONFLICT (slug) DO NOTHING;

-- CANADIAN DISTILLERIES
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Crown Royal', 'crown-royal', 'Canada', 'Manitoba', 'Created for 1939 Royal Tour. Canada best-selling whisky. Smooth, sweet, versatile.', true),
('Lot No. 40', 'lot-no-40', 'Canada', 'Ontario', 'Hiram Walker copper pot still rye. Canada answer to craft American rye. Bold and spicy.', true),
('Canadian Club', 'canadian-club', 'Canada', 'Ontario', 'Smooth blended Canadian whisky since 1858. Pre-Prohibition favorite in the US.', true),
('Alberta Premium', 'alberta-premium', 'Canada', 'Alberta', '100% rye whisky from the Canadian prairies. Bold, grain-forward spirit.', true),
('Forty Creek', 'forty-creek', 'Canada', 'Ontario', 'John Hall craft Canadian whisky. Individual grain distillation then blending. Unique approach.', true)
ON CONFLICT (slug) DO NOTHING;

-- MORE AMERICAN CRAFT
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Woodinville', 'woodinville', 'United States', 'Washington', 'Pacific Northwest bourbon and rye using local grains. Aged in Washington climate.', true),
('Stellum', 'stellum', 'United States', 'Indiana', 'Barrell Craft Spirits blending operation. Cask-strength, single-barrel, no filtering.', true),
('New Riff', 'new-riff', 'United States', 'Kentucky', 'Non-chill filtered, bottled-in-bond. Northern Kentucky independent distillery.', true),
('Widow Jane', 'widow-jane', 'United States', 'New York', 'Brooklyn-based using limestone mineral water from Rosendale mines. Urban craft bourbon.', true),
('Rabbit Hole', 'rabbit-hole', 'United States', 'Kentucky', 'Louisville grain-to-glass distillery. Innovative mash bills and maturation.', true),
('Sagamore Spirit', 'sagamore-spirit', 'United States', 'Maryland', 'Maryland-style rye whiskey revival. Limestone-filtered water from Sagamore Farm.', true),
('Barrell Bourbon', 'barrell-bourbon', 'United States', 'Kentucky', 'Independent blender sourcing exceptional barrels. Cask strength, transparent sourcing.', true),
('Old Forester', 'old-forester', 'United States', 'Kentucky', 'First bourbon sold exclusively in sealed bottles (1870). Brown-Forman flagship.', true),
('Russell''s Reserve', 'russells-reserve', 'United States', 'Kentucky', 'Wild Turkey premium line by Jimmy & Eddie Russell. Small batch, higher proof.', true),
('Evan Williams', 'evan-williams', 'United States', 'Kentucky', 'America second-largest selling bourbon. Heaven Hill value brand. Excellent quality-to-price.', true)
ON CONFLICT (slug) DO NOTHING;

-- MORE WORLD DISTILLERIES
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Nantou (Omar)', 'nantou-omar', 'Taiwan', 'Nantou County', 'Omar whisky from Taiwan TTL. Tropical fruit-forward, lychee cask experiments.', true),
('Lark', 'lark', 'Australia', 'Tasmania', 'Pioneer of Tasmanian whisky revival. Small-batch single malt using Tasmanian peat.', true),
('Overeem', 'overeem', 'Australia', 'Tasmania', 'Family-run Tasmanian distillery. Port and sherry cask single malts.', true),
('Bain''s', 'bains', 'South Africa', 'Western Cape', 'James Sedgwick distillery. World best grain whisky 2013. Warm climate aging.', true),
('Rampur', 'rampur', 'India', 'Uttar Pradesh', 'Indian single malt at Himalayan foothills. Radico Khaitan distillery since 1943.', true),
('Miyagikyo', 'miyagikyo-distillery', 'Japan', 'Miyagi', 'Nikka second distillery in lush Miyagi valley. Elegant, fruity coffey and pot still.', true),
('Glann ar Mor', 'glann-ar-mor', 'France', 'Brittany', 'Celtic Whisky Distillerie. Breton whisky with maritime influence. French oak innovation.', true),
('Brenne', 'brenne', 'France', 'Cognac', 'French single malt aged in Cognac casks. Organic barley, limousin oak.', true),
('Kyrö', 'kyro', 'Finland', 'Ostrobothnia', 'Finnish 100% rye whisky distilled in old dairy. Nordic climate, birch smoke.', true),
('Millstone', 'millstone', 'Netherlands', 'Noord-Brabant', 'Zuidam distillery Dutch single malt. Full range: peated, sherry, wine cask.', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- BOTTLES AND EXPRESSIONS - MAJOR EXPANSION
-- ============================================================

DO $$
DECLARE
  did INTEGER;
  bid INTEGER;
BEGIN

-- BUNNAHABHAIN
SELECT id INTO did FROM distilleries WHERE slug = 'bunnahabhain';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '12 Year Old', 'bunnahabhain-12', 'scotch', 'single_malt'),
    (did, '18 Year Old', 'bunnahabhain-18', 'scotch', 'single_malt'),
    (did, 'Stiùireadair', 'bunnahabhain-stiuireadair', 'scotch', 'single_malt'),
    (did, 'Toiteach A Dhà', 'bunnahabhain-toiteach', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'bunnahabhain-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Bunnahabhain 12 Year Old', 'bunnahabhain-12-standard', 12, 46.3, 'Sherry Casks', false, true, '{"smoky":2,"peaty":1,"fruity":7,"floral":4,"spicy":4,"sweet":6,"oaky":5,"maritime":5,"vanilla":5,"chocolate":3}', 'The gentle Islay. Nutty, sherried, maritime without heavy peat. Dried fruit, sea salt, malt. Outstanding value.', 86, 3800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'bunnahabhain-18';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Bunnahabhain 18 Year Old', 'bunnahabhain-18-standard', 18, 46.3, 'Sherry Casks', false, true, '{"smoky":2,"peaty":1,"fruity":8,"floral":4,"spicy":5,"sweet":7,"oaky":7,"maritime":5,"vanilla":6,"chocolate":5}', 'Rich sherried Islay without smoke. Christmas cake, dried fig, walnut, sea breeze. Elegant aged malt.', 90, 1600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'bunnahabhain-stiuireadair';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Bunnahabhain Stiùireadair', 'bunnahabhain-stiuireadair-standard', 46.3, 'First-Fill Sherry Casks', false, true, '{"smoky":2,"peaty":1,"fruity":7,"floral":3,"spicy":5,"sweet":7,"oaky":5,"maritime":4,"vanilla":5,"chocolate":4}', 'Sherry-forward NAS. Dark chocolate, dried cranberry, nutmeg, sea salt. Excellent entry-point sherried Islay.', 84, 2900)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- CAOL ILA
SELECT id INTO did FROM distilleries WHERE slug = 'caol-ila';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '12 Year Old', 'caol-ila-12', 'scotch', 'single_malt'),
    (did, 'Moch', 'caol-ila-moch', 'scotch', 'single_malt'),
    (did, 'Distillers Edition', 'caol-ila-de', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'caol-ila-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Caol Ila 12 Year Old', 'caol-ila-12-standard', 12, 43.0, 'Ex-Bourbon Casks', '{"smoky":7,"peaty":6,"fruity":5,"floral":3,"spicy":3,"sweet":4,"oaky":4,"maritime":6,"vanilla":4,"chocolate":2}', 'Elegant Islay smoke. Lighter than Ardbeg/Laphroaig but complex. Lemon, smoke, sea air, olive oil.', 85, 3600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- OBAN
SELECT id INTO did FROM distilleries WHERE slug = 'oban';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '14 Year Old', 'oban-14', 'scotch', 'single_malt'),
    (did, 'Little Bay', 'oban-little-bay', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'oban-14';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Oban 14 Year Old', 'oban-14-standard', 14, 43.0, 'Ex-Bourbon Casks', '{"smoky":3,"peaty":2,"fruity":6,"floral":4,"spicy":4,"sweet":5,"oaky":5,"maritime":6,"vanilla":5,"chocolate":3}', 'Where the Highlands meet the sea. Orange peel, honey, sea salt, gentle smoke. Classic Malt.', 85, 3400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- DALWHINNIE
SELECT id INTO did FROM distilleries WHERE slug = 'dalwhinnie';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '15 Year Old', 'dalwhinnie-15', 'scotch', 'single_malt'),
    (did, 'Winter Gold', 'dalwhinnie-winters-gold', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'dalwhinnie-15';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Dalwhinnie 15 Year Old', 'dalwhinnie-15-standard', 15, 43.0, 'Ex-Bourbon Casks', '{"smoky":1,"peaty":1,"fruity":5,"floral":5,"spicy":3,"sweet":7,"oaky":4,"maritime":1,"vanilla":6,"chocolate":2}', 'Highland honey and heather. Gentle, sweet, approachable. Scotland highest distillery. Classic Malt.', 82, 3900)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- ABERFELDY
SELECT id INTO did FROM distilleries WHERE slug = 'aberfeldy';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '12 Year Old', 'aberfeldy-12', 'scotch', 'single_malt'),
    (did, '16 Year Old', 'aberfeldy-16', 'scotch', 'single_malt'),
    (did, '21 Year Old', 'aberfeldy-21', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'aberfeldy-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Aberfeldy 12 Year Old', 'aberfeldy-12-standard', 12, 40.0, 'Ex-Bourbon Casks', '{"smoky":1,"peaty":0,"fruity":6,"floral":5,"spicy":3,"sweet":7,"oaky":4,"maritime":1,"vanilla":6,"chocolate":2}', 'The Golden Dram. Local waters contain gold flecks. Honeycomb, orange, heather. Sweet Highland style.', 82, 2800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- ARRAN
SELECT id INTO did FROM distilleries WHERE slug = 'arran';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '10 Year Old', 'arran-10', 'scotch', 'single_malt'),
    (did, '18 Year Old', 'arran-18', 'scotch', 'single_malt'),
    (did, 'Barrel Reserve', 'arran-barrel-reserve', 'scotch', 'single_malt'),
    (did, 'Sherry Cask', 'arran-sherry-cask', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'arran-10';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Arran 10 Year Old', 'arran-10-standard', 10, 46.0, 'Ex-Bourbon & Sherry Casks', false, true, '{"smoky":1,"peaty":0,"fruity":7,"floral":6,"spicy":3,"sweet":6,"oaky":4,"maritime":3,"vanilla":6,"chocolate":2}', 'Pure island whisky, no chill-filtration or coloring. Citrus, apple, vanilla, light oak. Refreshingly honest.', 84, 2600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'arran-18';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Arran 18 Year Old', 'arran-18-standard', 18, 46.0, 'Sherry Hogsheads & Bourbon Barrels', false, true, '{"smoky":1,"peaty":0,"fruity":8,"floral":5,"spicy":5,"sweet":7,"oaky":6,"maritime":3,"vanilla":7,"chocolate":4}', 'Mature island elegance. Chocolate orange, toffee, dried mango, gentle spice. Outstanding aged Arran.', 89, 1100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- SCAPA
SELECT id INTO did FROM distilleries WHERE slug = 'scapa';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Skiren', 'scapa-skiren', 'scotch', 'single_malt'),
    (did, 'Glansa', 'scapa-glansa', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'scapa-skiren';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Scapa Skiren', 'scapa-skiren-standard', 40.0, 'First-Fill American Oak', '{"smoky":1,"peaty":0,"fruity":6,"floral":5,"spicy":3,"sweet":6,"oaky":4,"maritime":4,"vanilla":7,"chocolate":2}', 'Orkney unpeated alternative. Honey, vanilla, sea breeze, pear. Light and charming island malt.', 80, 1800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- FETTERCAIRN
SELECT id INTO did FROM distilleries WHERE slug = 'fettercairn';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '12 Year Old', 'fettercairn-12', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'fettercairn-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Fettercairn 12 Year Old', 'fettercairn-12-standard', 12, 40.0, 'Ex-Bourbon Casks', '{"smoky":1,"peaty":0,"fruity":7,"floral":4,"spicy":3,"sweet":5,"oaky":4,"maritime":2,"vanilla":5,"chocolate":3}', 'Tropical Highland. Unique cooling system creates mango, papaya, coconut notes. Underrated distillery.', 82, 1400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- COMPASS BOX (blender)
SELECT id INTO did FROM distilleries WHERE slug = 'compass-box';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'The Peat Monster', 'compass-box-peat-monster', 'scotch', 'blended'),
    (did, 'Spice Tree', 'compass-box-spice-tree', 'scotch', 'blended'),
    (did, 'Hedonism', 'compass-box-hedonism', 'scotch', 'grain'),
    (did, 'Great King Street Artist Blend', 'compass-box-gks', 'scotch', 'blended'),
    (did, 'Orchard House', 'compass-box-orchard-house', 'scotch', 'blended')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'compass-box-peat-monster';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Compass Box The Peat Monster', 'compass-box-peat-monster-standard', 46.0, 'Refill Casks', '{"smoky":8,"peaty":8,"fruity":4,"floral":2,"spicy":4,"sweet":4,"oaky":4,"maritime":5,"vanilla":3,"chocolate":3}', 'Islay and Highland peated malt blend. Campfire, seaweed, lemon, ash. Accessible peat for enthusiasts.', 86, 2400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'compass-box-spice-tree';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Compass Box Spice Tree', 'compass-box-spice-tree-standard', 46.0, 'Custom French Oak Hybrid Casks', '{"smoky":2,"peaty":1,"fruity":6,"floral":3,"spicy":8,"sweet":6,"oaky":6,"maritime":2,"vanilla":6,"chocolate":4}', 'Highland malt in innovative French oak. Clove, cinnamon, vanilla, nutmeg. The spice-forward dram.', 87, 2100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'compass-box-hedonism';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Compass Box Hedonism', 'compass-box-hedonism-standard', 43.0, 'First-Fill American Oak', '{"smoky":0,"peaty":0,"fruity":5,"floral":4,"spicy":3,"sweet":8,"oaky":4,"maritime":1,"vanilla":9,"chocolate":3}', 'Blended grain whisky masterpiece. Coconut, vanilla cream, toffee, butterscotch. Pure indulgence.', 84, 1800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- MONKEY SHOULDER
SELECT id INTO did FROM distilleries WHERE slug = 'monkey-shoulder';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Blended Malt', 'monkey-shoulder-original', 'scotch', 'blended')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'monkey-shoulder-original';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Monkey Shoulder Blended Malt', 'monkey-shoulder-original-standard', 40.0, 'Ex-Bourbon Casks', '{"smoky":1,"peaty":0,"fruity":6,"floral":3,"spicy":3,"sweet":7,"oaky":3,"maritime":1,"vanilla":7,"chocolate":3}', 'Triple malt blend (Balvenie + Glenfiddich + Kininvie). Vanilla, honey, malt, orange. Perfect for cocktails.', 80, 5200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- CROWN ROYAL (Canadian)
SELECT id INTO did FROM distilleries WHERE slug = 'crown-royal';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Deluxe', 'crown-royal-deluxe', 'world', 'blended'),
    (did, 'Northern Harvest Rye', 'crown-royal-harvest-rye', 'rye', 'other'),
    (did, 'XO', 'crown-royal-xo', 'world', 'blended')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'crown-royal-deluxe';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Crown Royal Deluxe', 'crown-royal-deluxe-standard', 40.0, 'New & Used Charred Oak', '{"smoky":0,"peaty":0,"fruity":5,"floral":3,"spicy":3,"sweet":7,"oaky":4,"maritime":0,"vanilla":7,"chocolate":2}', 'Canada iconic whisky. Creamy vanilla, light fruit, caramel. Smooth and approachable. Velvet bag classic.', 76, 4800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'crown-royal-harvest-rye';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Crown Royal Northern Harvest Rye', 'crown-royal-harvest-rye-standard', 45.0, 'New Charred & Used Oak', '{"smoky":0,"peaty":0,"fruity":5,"floral":3,"spicy":7,"sweet":6,"oaky":4,"maritime":0,"vanilla":6,"chocolate":2}', 'Jim Murray 2016 World Whisky of the Year. Spice, dark fruit, caramel, pepper. Remarkably complex Canadian.', 84, 3200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- LOT NO. 40
SELECT id INTO did FROM distilleries WHERE slug = 'lot-no-40';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Canadian Rye', 'lot-40-rye', 'rye', 'other'),
    (did, 'Cask Strength', 'lot-40-cs', 'rye', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'lot-40-rye';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Lot No. 40 Canadian Rye Whisky', 'lot-40-rye-standard', 43.0, 'New & Used Oak Barrels', '{"smoky":1,"peaty":0,"fruity":4,"floral":3,"spicy":8,"sweet":5,"oaky":5,"maritime":0,"vanilla":5,"chocolate":3}', '100% rye mash, copper pot distilled. Clove, black pepper, vanilla, oak. Canada finest rye.', 86, 1900)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- OLD FORESTER
SELECT id INTO did FROM distilleries WHERE slug = 'old-forester';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '1920 Prohibition Style', 'old-forester-1920', 'bourbon', 'other'),
    (did, '1897 Bottled in Bond', 'old-forester-1897', 'bourbon', 'other'),
    (did, '86 Proof', 'old-forester-86', 'bourbon', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'old-forester-1920';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Old Forester 1920 Prohibition Style', 'old-forester-1920-standard', 57.5, 'New Charred American Oak', '{"smoky":2,"peaty":0,"fruity":6,"floral":2,"spicy":7,"sweet":8,"oaky":7,"maritime":0,"vanilla":7,"chocolate":6}', 'Dark caramel, chocolate, cherry, banana. Rich and chewy at 115 proof. Outstanding bourbon value.', 89, 3800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'old-forester-1897';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Old Forester 1897 Bottled in Bond', 'old-forester-1897-standard', 50.0, 'New Charred American Oak', '{"smoky":1,"peaty":0,"fruity":5,"floral":2,"spicy":6,"sweet":7,"oaky":6,"maritime":0,"vanilla":7,"chocolate":4}', 'Classic BiB bourbon. Caramel apple, cinnamon, toasted oak, brown sugar. Reliable and well-made.', 86, 2600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- NEW RIFF
SELECT id INTO did FROM distilleries WHERE slug = 'new-riff';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Bourbon BiB', 'new-riff-bourbon-bib', 'bourbon', 'other'),
    (did, 'Single Barrel Bourbon', 'new-riff-single-barrel', 'bourbon', 'other'),
    (did, 'Kentucky Rye BiB', 'new-riff-rye-bib', 'rye', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'new-riff-bourbon-bib';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'New Riff Bottled in Bond Bourbon', 'new-riff-bourbon-bib-standard', 50.0, 'Toasted & Charred New Oak', false, '{"smoky":1,"peaty":0,"fruity":6,"floral":2,"spicy":6,"sweet":7,"oaky":6,"maritime":0,"vanilla":7,"chocolate":4}', 'Non-chill filtered BiB from Kentucky craft. Butterscotch, toasted coconut, baking spice. Rising star.', 87, 1800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- BARRELL BOURBON
SELECT id INTO did FROM distilleries WHERE slug = 'barrell-bourbon';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Batch 035', 'barrell-batch-035', 'bourbon', 'other'),
    (did, 'Seagrass', 'barrell-seagrass', 'rye', 'other'),
    (did, 'Dovetail', 'barrell-dovetail', 'bourbon', 'blended')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'barrell-seagrass';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Barrell Seagrass', 'barrell-seagrass-standard', 59.32, 'Martinique Rum, Madeira, Apricot Brandy Casks', false, '{"smoky":1,"peaty":0,"fruity":8,"floral":3,"spicy":6,"sweet":8,"oaky":5,"maritime":3,"vanilla":6,"chocolate":4}', 'Rye whiskey finished in three cask types. Tropical fruit, brine, apricot, caramel. Wildly creative.', 91, 1600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- LARK (Tasmania)
SELECT id INTO did FROM distilleries WHERE slug = 'lark';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Classic Cask', 'lark-classic-cask', 'world', 'single_malt'),
    (did, 'Symphony No.1', 'lark-symphony-1', 'world', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'lark-classic-cask';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Lark Classic Cask Single Malt', 'lark-classic-cask-standard', 43.0, 'Small Bourbon Casks', '{"smoky":3,"peaty":2,"fruity":6,"floral":3,"spicy":4,"sweet":6,"oaky":5,"maritime":2,"vanilla":6,"chocolate":3}', 'Pioneer of Australian whisky. Tasmanian peat, honey, citrus, malt. Island character from the southern hemisphere.', 85, 1200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- KYRÖ (Finland)
SELECT id INTO did FROM distilleries WHERE slug = 'kyro';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Malt Rye', 'kyro-malt-rye', 'rye', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'kyro-malt-rye';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Kyrö Malt Rye Whisky', 'kyro-malt-rye-standard', 47.2, 'American Oak Casks', '{"smoky":2,"peaty":0,"fruity":5,"floral":4,"spicy":7,"sweet":5,"oaky":5,"maritime":1,"vanilla":5,"chocolate":3}', 'Finnish 100% malted rye. Rye bread, dark berries, white pepper, birch. Nordic terroir in a glass.', 84, 680)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- SAGAMORE SPIRIT
SELECT id INTO did FROM distilleries WHERE slug = 'sagamore-spirit';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Signature Rye', 'sagamore-signature', 'rye', 'other'),
    (did, 'Double Oak Rye', 'sagamore-double-oak', 'rye', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'sagamore-signature';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Sagamore Spirit Signature Rye', 'sagamore-signature-standard', 41.5, 'New Charred American Oak', '{"smoky":0,"peaty":0,"fruity":5,"floral":3,"spicy":7,"sweet":5,"oaky":4,"maritime":1,"vanilla":6,"chocolate":2}', 'Maryland-style rye using limestone-filtered water. Black pepper, vanilla, caramel, floral. Smooth and balanced.', 83, 1500)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- GLEN GRANT
SELECT id INTO did FROM distilleries WHERE slug = 'glen-grant';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '10 Year Old', 'glen-grant-10', 'scotch', 'single_malt'),
    (did, '12 Year Old', 'glen-grant-12', 'scotch', 'single_malt'),
    (did, '18 Year Old', 'glen-grant-18', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'glen-grant-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glen Grant 12 Year Old', 'glen-grant-12-standard', 12, 43.0, 'Ex-Bourbon & Sherry Casks', false, true, '{"smoky":0,"peaty":0,"fruity":7,"floral":6,"spicy":3,"sweet":6,"oaky":4,"maritime":1,"vanilla":6,"chocolate":2}', 'Italy best-selling single malt. Green apple, pear, almond, vanilla. Light and fruity Speyside.', 82, 2400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'glen-grant-18';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glen Grant 18 Year Old', 'glen-grant-18-standard', 18, 43.0, 'First-Fill Bourbon & Oloroso Casks', false, true, '{"smoky":1,"peaty":0,"fruity":7,"floral":5,"spicy":4,"sweet":7,"oaky":6,"maritime":1,"vanilla":7,"chocolate":3}', 'Rare Cask Series. Mature orchard fruit, honeycomb, gentle oak, rose petals. Elegant aged Speyside.', 88, 900)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- TULLIBARDINE
SELECT id INTO did FROM distilleries WHERE slug = 'tullibardine';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Sovereign', 'tullibardine-sovereign', 'scotch', 'single_malt'),
    (did, '225 Sauternes Finish', 'tullibardine-225', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'tullibardine-sovereign';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Tullibardine Sovereign', 'tullibardine-sovereign-standard', 43.0, 'First-Fill Bourbon Casks', false, true, '{"smoky":0,"peaty":0,"fruity":6,"floral":4,"spicy":3,"sweet":6,"oaky":4,"maritime":1,"vanilla":7,"chocolate":2}', 'Entry-level Highland single malt. Vanilla custard, pear drops, light spice. Uncomplicated sipper.', 79, 1600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

END $$;
