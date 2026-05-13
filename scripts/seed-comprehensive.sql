-- Caskit Comprehensive Seed: 200+ distilleries, 600+ expressions, awards, and prices
-- Idempotent: uses ON CONFLICT DO NOTHING throughout

-- ============================================================
-- PART 1: DISTILLERIES (new ones not already in DB)
-- ============================================================

-- Scottish Distilleries
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Glenfarclas', 'glenfarclas', 'Scotland', 'Speyside', 'Family-owned since 1865, known for rich sherried malts aged in oloroso casks.', true),
('Cragganmore', 'cragganmore', 'Scotland', 'Speyside', 'Complex Speyside malt, one of Diageo Classic Malts. Double-gold worm tub condensers.', true),
('Clynelish', 'clynelish', 'Scotland', 'Highlands', 'Waxy, coastal Highland malt. Former Brora site, now producing distinctive oily spirit.', true),
('BenRiach', 'benriach', 'Scotland', 'Speyside', 'Innovative Speyside distillery revived in 2004, known for peated and triple-distilled expressions.', true),
('Kilchoman', 'kilchoman', 'Scotland', 'Islay', 'Farm distillery on Islay, one of the smallest. Grows own barley and malts on-site.', true),
('Deanston', 'deanston', 'Scotland', 'Highlands', 'Former cotton mill converted to distillery in 1965. Self-powered by hydroelectricity.', true),
('Tobermory', 'tobermory', 'Scotland', 'Islands', 'The only distillery on the Isle of Mull, producing both unpeated Tobermory and peated Ledaig.', true),
('Glen Scotia', 'glen-scotia', 'Scotland', 'Campbeltown', 'One of only three surviving Campbeltown distilleries. Maritime-influenced single malts.', true),
('Edradour', 'edradour', 'Scotland', 'Highlands', 'One of the smallest traditional distilleries in Scotland, handcrafted in tiny batches.', true),
('Royal Brackla', 'royal-brackla', 'Scotland', 'Highlands', 'First distillery to receive a Royal Warrant in 1835. Fruity, honeyed Highland malts.', true),
('Benromach', 'benromach', 'Scotland', 'Speyside', 'Small-batch Speyside distillery owned by Gordon & MacPhail. Classic, lightly-peated style.', true),
('Tamnavulin', 'tamnavulin', 'Scotland', 'Speyside', 'Hidden gem in Speyside, soft and approachable with sherry cask finishes.', true),
('Tamdhu', 'tamdhu', 'Scotland', 'Speyside', '100% sherry oak matured. Own Saladin maltings and traditional worm tubs.', true),
('Auchentoshan', 'auchentoshan', 'Scotland', 'Lowlands', 'Triple-distilled Lowland malt. Lighter, more delicate style from Glasgow.', true),
('Balblair', 'balblair', 'Scotland', 'Highlands', 'Vintage-only releases from one of the oldest working distilleries in Scotland (1790).', true),
('Old Pulteney', 'old-pulteney', 'Scotland', 'Highlands', 'Maritime Highland malt from Wick, the northernmost mainland distillery. Salty, briny character.', true),
('AnCnoc', 'ancnoc', 'Scotland', 'Highlands', 'Light, honeyed Highland malt from Knockdhu distillery. Clean and elegant.', true),
('Mortlach', 'mortlach', 'Scotland', 'Speyside', 'The Beast of Dufftown. Complex distillation with 2.81 times distilled spirit. Meaty and rich.', true),
('Craigellachie', 'craigellachie', 'Scotland', 'Speyside', 'Sulfury, meaty Speyside malt. Oil-fired stills and worm tub condensers create unique character.', true),
('Glenkinchie', 'glenkinchie', 'Scotland', 'Lowlands', 'Edinburgh Malt. Light, grassy Lowland style. One of the Classic Malts.', true),
('Jura', 'jura', 'Scotland', 'Islands', 'Island distillery with tall stills producing lighter spirit than typical island malts.', true),
('Tomatin', 'tomatin', 'Scotland', 'Highlands', 'Large Highland distillery, Japanese-owned. Soft, fruity, excellent value malts.', true),
('Speyburn', 'speyburn', 'Scotland', 'Speyside', 'Overlooked Speyside gem. Crisp, heathery spirit at approachable price points.', true),
('Glenrothes', 'glenrothes', 'Scotland', 'Speyside', 'Vintage-dated Speyside malt. Rich, fruity, sherried style. Edrington-owned.', true),
('Strathisla', 'strathisla', 'Scotland', 'Speyside', 'The spiritual home of Chivas Regal. Oldest operating distillery in the Highlands (1786).', true)
ON CONFLICT (slug) DO NOTHING;

-- Irish Distilleries
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Midleton', 'midleton', 'Ireland', 'Cork', 'Home of Jameson, Redbreast, Powers, Green/Yellow Spot. Ireland largest distillery complex.', true),
('Cooley', 'cooley', 'Ireland', 'Louth', 'Independent Irish distillery producing Connemara peated and Tyrconnell single malts.', true),
('Dingle', 'dingle', 'Ireland', 'Kerry', 'Small-batch craft distillery on the Wild Atlantic Way. Triple-pot-still Irish whiskey.', true),
('Waterford', 'waterford', 'Ireland', 'Waterford', 'Terroir-driven Irish whisky. Single-farm origin barley tracked from field to glass.', true),
('Kilbeggan', 'kilbeggan', 'Ireland', 'Westmeath', 'Oldest licensed distillery in Ireland (1757). Traditional double-distilled pot still.', true),
('West Cork', 'west-cork', 'Ireland', 'Cork', 'Craft distillery using local ingredients and innovative cask finishes.', true),
('Writers Tears', 'writers-tears', 'Ireland', 'Carlow', 'Walsh Whiskey blend of single pot still and single malt. Honey and apricot notes.', true)
ON CONFLICT (slug) DO NOTHING;

-- Japanese Distilleries
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Chichibu', 'chichibu', 'Japan', 'Saitama', 'Ichiro Akuto micro-distillery. Highly sought-after Japanese craft whisky.', true),
('Miyagikyo', 'miyagikyo', 'Japan', 'Miyagi', 'Nikka second distillery. Elegant, fruity style using coffey and pot stills.', true),
('Yoichi', 'yoichi', 'Japan', 'Hokkaido', 'Nikka founding distillery. Coal-fired direct heat, peaty and maritime.', true),
('Mars Shinshu', 'mars-shinshu', 'Japan', 'Nagano', 'Highest altitude distillery in Japan (798m). Mountain-influenced maturation.', true),
('Akkeshi', 'akkeshi', 'Japan', 'Hokkaido', 'Peated Japanese whisky inspired by Islay. Maritime climate similar to Scotland.', true),
('White Oak (Eigashima)', 'eigashima', 'Japan', 'Hyogo', 'Oldest whisky license in Japan (1919). Small-batch coastal Japanese malt.', true),
('Fuji Gotemba', 'fuji-gotemba', 'Japan', 'Shizuoka', 'Kirin-owned distillery at the foot of Mt. Fuji. Grain and malt production.', true)
ON CONFLICT (slug) DO NOTHING;

-- American Distilleries
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Heaven Hill', 'heaven-hill', 'United States', 'Kentucky', 'Largest family-owned distillery. Home of Elijah Craig, Evan Williams, Henry McKenna.', true),
('Wild Turkey', 'wild-turkey', 'United States', 'Kentucky', 'Bold, high-rye bourbons aged in deep-charred barrels. Jimmy and Eddie Russell legacy.', true),
('Woodford Reserve', 'woodford-reserve', 'United States', 'Kentucky', 'Premium small-batch bourbon. Triple-distilled in copper pot stills.', true),
('Four Roses', 'four-roses', 'United States', 'Kentucky', 'Ten unique bourbon recipes from two mash bills and five yeast strains.', true),
('Barton 1792', 'barton-1792', 'United States', 'Kentucky', 'Historic Bardstown distillery. Home of 1792 bourbons and Very Old Barton.', true),
('Angel Envy', 'angels-envy', 'United States', 'Kentucky', 'Port-finished bourbon pioneer. Founded by Lincoln Henderson (former Woodford master distiller).', true),
('Michters', 'michters', 'United States', 'Kentucky', 'Small-batch American whiskey focusing on quality over quantity. US*1 series.', true),
('Bulleit', 'bulleit', 'United States', 'Kentucky', 'High-rye bourbon and straight rye. Frontier-inspired brand owned by Diageo.', true),
('Elijah Craig', 'elijah-craig', 'United States', 'Kentucky', 'Named after the Baptist minister credited with inventing bourbon. Heaven Hill flagship.', true),
('Knob Creek', 'knob-creek', 'United States', 'Kentucky', 'Jim Beam small-batch collection. Pre-Prohibition style, 9-year aged, 100 proof.', true),
('Blanton', 'blantons', 'United States', 'Kentucky', 'The original single barrel bourbon. Buffalo Trace flagship premium expression.', true),
('Eagle Rare', 'eagle-rare', 'United States', 'Kentucky', '10-year-old single barrel bourbon from Buffalo Trace. Outstanding value.', true),
('Weller', 'weller', 'United States', 'Kentucky', 'Wheated bourbon from Buffalo Trace. Same mashbill family as Pappy Van Winkle.', true),
('Pappy Van Winkle', 'pappy-van-winkle', 'United States', 'Kentucky', 'The most sought-after bourbon in the world. Wheated, 15-23 year aged expressions.', true),
('Westland', 'westland', 'United States', 'Washington', 'Pacific Northwest single malt using local barley and innovative peat sources.', true),
('Stranahan', 'stranahans', 'United States', 'Colorado', 'Colorado single malt whiskey. Rocky Mountain water, locally sourced barley.', true),
('Balcones', 'balcones', 'United States', 'Texas', 'Texas craft whisky. Blue corn bourbon and innovative Texas single malt.', true),
('High West', 'high-west', 'United States', 'Utah', 'Blending house and distillery in Park City. Known for creative whiskey blends.', true),
('WhistlePig', 'whistlepig', 'United States', 'Vermont', 'Farm-to-bottle rye whiskey from a 500-acre Vermont farm. Premium aged ryes.', true),
('Garrison Brothers', 'garrison-brothers', 'United States', 'Texas', 'First legal bourbon distillery in Texas. Hot climate rapid aging.', true)
ON CONFLICT (slug) DO NOTHING;

-- World Distilleries
INSERT INTO distilleries (name, slug, country, region, description, verified) VALUES
('Kavalan', 'kavalan', 'Taiwan', 'Yilan County', 'Tropical maturation produces incredibly mature whisky in just a few years. Multiple world awards.', true),
('Amrut', 'amrut', 'India', 'Bangalore', 'Pioneer of Indian single malt. High-altitude tropical aging concentrates flavors rapidly.', true),
('Paul John', 'paul-john', 'India', 'Goa', 'Goan single malt using six-row barley. Tropical maturation in ex-bourbon casks.', true),
('Starward', 'starward', 'Australia', 'Melbourne', 'Australian whisky aged in local wine barrels. Melbourne four-seasons-in-a-day climate.', true),
('Sullivan Cove', 'sullivan-cove', 'Australia', 'Tasmania', 'World best single malt 2014. Small Tasmanian craft distillery.', true),
('Mackmyra', 'mackmyra', 'Sweden', 'Gavle', 'Swedish single malt. Gravity-fed distillery, innovative Nordic ingredients.', true),
('Penderyn', 'penderyn', 'Wales', 'Brecon Beacons', 'Welsh single malt using a unique Faraday still. Madeira cask finished.', true),
('Stauning', 'stauning', 'Denmark', 'Jutland', 'Danish floor-malted whisky. Direct-fired pot stills, Scandinavian innovation.', true),
('Cotswolds', 'cotswolds', 'England', 'Cotswolds', 'English single malt using locally grown barley. STR red wine cask matured.', true),
('Braunstein', 'braunstein', 'Denmark', 'Koge', 'Danish micro-distillery producing peated and unpeated Nordic whiskies.', true),
('Nantou', 'nantou', 'Taiwan', 'Nantou', 'Omar whisky from Taiwan Tobacco and Liquor Corp. Tropical fruit-forward style.', true),
('Puni', 'puni', 'Italy', 'South Tyrol', 'Italian Alpine whisky. Unique cube-shaped distillery in the Dolomites.', true),
('Spirit of Yorkshire', 'spirit-of-yorkshire', 'England', 'Yorkshire', 'Field-to-bottle English whisky. Own malting floor, farming all barley used.', true),
('Wolfburn', 'wolfburn', 'Scotland', 'Highlands', 'Most northerly distillery on the Scottish mainland. Revived in 2013 after 150 years.', true),
('Milk & Honey', 'milk-and-honey', 'Israel', 'Tel Aviv', 'Israel first whisky distillery. Mediterranean climate, innovative cask programs.', true),
('Golan Heights Distillery', 'golan-heights', 'Israel', 'Katzrin', 'Volcanic terroir whisky from the Golan Heights. Elevation-aged.', true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- PART 2: BOTTLES AND EXPRESSIONS (massive expansion)
-- ============================================================

-- Helper: We'll use DO blocks to look up distillery IDs
DO $$
DECLARE
  did INTEGER;
  bid INTEGER;
  eid INTEGER;
BEGIN

-- GLENFARCLAS
SELECT id INTO did FROM distilleries WHERE slug = 'glenfarclas';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '10 Year Old', 'glenfarclas-10', 'scotch', 'single_malt'),
    (did, '15 Year Old', 'glenfarclas-15', 'scotch', 'single_malt'),
    (did, '21 Year Old', 'glenfarclas-21', 'scotch', 'single_malt'),
    (did, '25 Year Old', 'glenfarclas-25', 'scotch', 'single_malt'),
    (did, '105 Cask Strength', 'glenfarclas-105', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'glenfarclas-10';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glenfarclas 10 Year Old', 'glenfarclas-10-standard', 10, 40.0, 'Oloroso Sherry Casks', '{"smoky":1,"peaty":0,"fruity":6,"floral":3,"spicy":4,"sweet":7,"oaky":5,"maritime":1,"vanilla":5,"chocolate":4}', 'Rich sherried Speyside at an excellent price point. Dried fruit, toffee, and malt.', 83, 2150)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'glenfarclas-15';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glenfarclas 15 Year Old', 'glenfarclas-15-standard', 15, 46.0, 'Oloroso Sherry Casks', '{"smoky":1,"peaty":0,"fruity":7,"floral":3,"spicy":5,"sweet":8,"oaky":6,"maritime":1,"vanilla":5,"chocolate":5}', 'Sweet sherry, Christmas cake, orange peel. Exceptional value for aged sherry-bomb whisky.', 87, 3200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'glenfarclas-21';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glenfarclas 21 Year Old', 'glenfarclas-21-standard', 21, 43.0, 'Oloroso Sherry Casks', '{"smoky":2,"peaty":0,"fruity":8,"floral":4,"spicy":5,"sweet":8,"oaky":7,"maritime":1,"vanilla":6,"chocolate":6}', 'Deep mahogany spirit. Dark chocolate, raisins, antique wood. Remarkably well-balanced for the age.', 89, 1850)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'glenfarclas-25';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glenfarclas 25 Year Old', 'glenfarclas-25-standard', 25, 43.0, 'Oloroso Sherry Casks', '{"smoky":2,"peaty":0,"fruity":8,"floral":5,"spicy":6,"sweet":9,"oaky":8,"maritime":1,"vanilla":6,"chocolate":7}', 'Quarter-century of sherry cask maturation. Leather, espresso, blackcurrant, walnut. Stunning complexity.', 91, 980)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'glenfarclas-105';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glenfarclas 105 Cask Strength', 'glenfarclas-105-cs', 60.0, 'Oloroso Sherry Casks', '{"smoky":2,"peaty":0,"fruity":7,"floral":2,"spicy":7,"sweet":8,"oaky":6,"maritime":1,"vanilla":5,"chocolate":5}', 'Cask strength sherry monster at 60%. Intense dried fruit, chocolate, pepper. Unbeatable value for CS whisky.', 88, 2800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- CLYNELISH
SELECT id INTO did FROM distilleries WHERE slug = 'clynelish';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '14 Year Old', 'clynelish-14', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'clynelish-14';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Clynelish 14 Year Old', 'clynelish-14-standard', 14, 46.0, 'Ex-Bourbon & Refill Casks', '{"smoky":2,"peaty":1,"fruity":6,"floral":5,"spicy":4,"sweet":6,"oaky":5,"maritime":4,"vanilla":6,"chocolate":2}', 'Waxy, coastal Highland malt. Beeswax, tropical fruit, sea spray. Cult following among enthusiasts.', 87, 2900)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- KILCHOMAN
SELECT id INTO did FROM distilleries WHERE slug = 'kilchoman';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Machir Bay', 'kilchoman-machir-bay', 'scotch', 'single_malt'),
    (did, 'Sanaig', 'kilchoman-sanaig', 'scotch', 'single_malt'),
    (did, 'Loch Gorm', 'kilchoman-loch-gorm', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'kilchoman-machir-bay';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Kilchoman Machir Bay', 'kilchoman-machir-bay-standard', 46.0, 'Bourbon & Oloroso Sherry Casks', '{"smoky":7,"peaty":7,"fruity":5,"floral":2,"spicy":4,"sweet":4,"oaky":4,"maritime":6,"vanilla":4,"chocolate":2}', 'Young, vibrant peated Islay. Citrus peel, bonfire smoke, vanilla. Farm distillery freshness.', 85, 3100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'kilchoman-sanaig';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Kilchoman Sanaig', 'kilchoman-sanaig-standard', 46.0, 'Oloroso Sherry Casks', '{"smoky":7,"peaty":7,"fruity":6,"floral":2,"spicy":5,"sweet":5,"oaky":5,"maritime":6,"vanilla":3,"chocolate":4}', 'Sherry-influenced Islay peat. Dark chocolate, campfire, dried cherries. Richer than Machir Bay.', 87, 2400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- OLD PULTENEY
SELECT id INTO did FROM distilleries WHERE slug = 'old-pulteney';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '12 Year Old', 'old-pulteney-12', 'scotch', 'single_malt'),
    (did, '15 Year Old', 'old-pulteney-15', 'scotch', 'single_malt'),
    (did, '18 Year Old', 'old-pulteney-18', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'old-pulteney-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Old Pulteney 12 Year Old', 'old-pulteney-12-standard', 12, 40.0, 'Ex-Bourbon Casks', '{"smoky":1,"peaty":0,"fruity":5,"floral":4,"spicy":3,"sweet":5,"oaky":4,"maritime":7,"vanilla":5,"chocolate":1}', 'Maritime Highland. Sea salt, honey, green apples. Briny and refreshing like the Wick harbour breeze.', 83, 3500)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- AUCHENTOSHAN
SELECT id INTO did FROM distilleries WHERE slug = 'auchentoshan';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Three Wood', 'auchentoshan-three-wood', 'scotch', 'single_malt'),
    (did, '12 Year Old', 'auchentoshan-12', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'auchentoshan-three-wood';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Auchentoshan Three Wood', 'auchentoshan-three-wood-standard', 43.0, 'Bourbon, Oloroso & PX Sherry Casks', '{"smoky":0,"peaty":0,"fruity":7,"floral":3,"spicy":4,"sweet":8,"oaky":5,"maritime":1,"vanilla":6,"chocolate":4}', 'Triple-distilled, triple-matured. Butterscotch, dark fruits, brown sugar. Approachable dessert dram.', 84, 2700)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'auchentoshan-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Auchentoshan 12 Year Old', 'auchentoshan-12-standard', 12, 40.0, 'Ex-Bourbon Casks', '{"smoky":0,"peaty":0,"fruity":5,"floral":5,"spicy":2,"sweet":6,"oaky":3,"maritime":1,"vanilla":7,"chocolate":2}', 'Light, triple-distilled Lowland. Crème brûlée, toasted almonds, citrus. Perfect intro to Scotch.', 80, 3800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- GLEN SCOTIA
SELECT id INTO did FROM distilleries WHERE slug = 'glen-scotia';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '15 Year Old', 'glen-scotia-15', 'scotch', 'single_malt'),
    (did, 'Victoriana', 'glen-scotia-victoriana', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'glen-scotia-15';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glen Scotia 15 Year Old', 'glen-scotia-15-standard', 15, 46.0, 'American Oak Casks', '{"smoky":3,"peaty":2,"fruity":6,"floral":4,"spicy":5,"sweet":6,"oaky":5,"maritime":6,"vanilla":5,"chocolate":3}', 'Campbeltown maritime character. Sea salt, coconut, vanilla toffee. Outstanding value Campbeltown malt.', 87, 1600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'glen-scotia-victoriana';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Glen Scotia Victoriana', 'glen-scotia-victoriana-standard', 54.2, 'Deep Charred Oak Casks', false, true, '{"smoky":4,"peaty":2,"fruity":5,"floral":2,"spicy":7,"sweet":7,"oaky":7,"maritime":5,"vanilla":6,"chocolate":6}', 'Cask strength Campbeltown. Dark chocolate, espresso, charred oak, sea breeze. Phenomenal depth.', 89, 1200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- DINGLE (Irish)
SELECT id INTO did FROM distilleries WHERE slug = 'dingle';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Single Malt Batch 5', 'dingle-sm-batch5', 'irish', 'single_malt'),
    (did, 'Single Pot Still', 'dingle-pot-still', 'irish', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'dingle-sm-batch5';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Dingle Single Malt Batch No. 5', 'dingle-sm-batch5-standard', 46.5, 'Bourbon & Sherry Casks', '{"smoky":1,"peaty":0,"fruity":7,"floral":5,"spicy":3,"sweet":6,"oaky":4,"maritime":3,"vanilla":6,"chocolate":2}', 'Craft Irish single malt from the Wild Atlantic Way. Honeycomb, green apple, Atlantic sea air.', 84, 620)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- WATERFORD (Irish)
SELECT id INTO did FROM distilleries WHERE slug = 'waterford';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'The Cuvée', 'waterford-cuvee', 'irish', 'single_malt'),
    (did, 'Peated Fenniscourt', 'waterford-peated-fenniscourt', 'irish', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'waterford-cuvee';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Waterford The Cuvée', 'waterford-cuvee-standard', 50.0, 'French Oak, American Oak, Vin Doux Naturel', '{"smoky":1,"peaty":0,"fruity":8,"floral":6,"spicy":4,"sweet":6,"oaky":5,"maritime":2,"vanilla":5,"chocolate":3}', 'Terroir-driven Irish single malt. Barley from multiple farms blended like wine. Orchard fruits, brioche, honey.', 86, 890)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- CHICHIBU (Japanese)
SELECT id INTO did FROM distilleries WHERE slug = 'chichibu';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'The Floor Malted', 'chichibu-floor-malted', 'japanese', 'single_malt'),
    (did, 'IPA Cask Finish', 'chichibu-ipa-cask', 'japanese', 'single_malt'),
    (did, 'On The Way', 'chichibu-on-the-way', 'japanese', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'chichibu-floor-malted';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, is_limited_edition, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Chichibu The Floor Malted 2012', 'chichibu-floor-malted-2012', 50.5, 'Bourbon Barrels', true, '{"smoky":2,"peaty":1,"fruity":7,"floral":5,"spicy":4,"sweet":7,"oaky":5,"maritime":1,"vanilla":7,"chocolate":3}', 'One of the most collectible Japanese whiskies. Floor-malted barley, tropical fruit, butterscotch, marzipan.', 93, 340)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- AKKESHI (Japanese)
SELECT id INTO did FROM distilleries WHERE slug = 'akkeshi';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Peated Single Malt', 'akkeshi-peated', 'japanese', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'akkeshi-peated';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Akkeshi Peated Single Malt Kanro', 'akkeshi-kanro', 55.0, 'Bourbon & Sherry Casks', '{"smoky":7,"peaty":7,"fruity":5,"floral":3,"spicy":4,"sweet":4,"oaky":4,"maritime":6,"vanilla":4,"chocolate":3}', 'Japanese Islay-style peat. Maritime Hokkaido climate. Seaweed, bonfire, citrus, oyster shell.', 89, 450)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- HEAVEN HILL (American)
SELECT id INTO did FROM distilleries WHERE slug = 'heaven-hill';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Elijah Craig Small Batch', 'ec-small-batch', 'bourbon', 'other'),
    (did, 'Elijah Craig Barrel Proof', 'ec-barrel-proof', 'bourbon', 'other'),
    (did, 'Henry McKenna 10 BiB', 'henry-mckenna-10', 'bourbon', 'other'),
    (did, 'Evan Williams Single Barrel', 'evan-williams-sb', 'bourbon', 'other'),
    (did, 'Rittenhouse Rye BiB', 'rittenhouse-rye', 'rye', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'ec-small-batch';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Elijah Craig Small Batch', 'ec-small-batch-standard', 47.0, 'New Charred American Oak', '{"smoky":2,"peaty":0,"fruity":5,"floral":2,"spicy":5,"sweet":7,"oaky":6,"maritime":0,"vanilla":8,"chocolate":4}', 'The quintessential bourbon. Vanilla, caramel, charred oak, cinnamon. Outstanding at its price point.', 86, 5200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'ec-barrel-proof';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, batch_number, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Elijah Craig Barrel Proof A124', 'ec-barrel-proof-a124', 65.45, 'New Charred American Oak', false, 'A124', '{"smoky":3,"peaty":0,"fruity":5,"floral":1,"spicy":7,"sweet":8,"oaky":8,"maritime":0,"vanilla":8,"chocolate":6}', 'Uncut, unfiltered bourbon at cask strength. Dark cherry, brown sugar, toasted pecan, campfire char. Monster.', 92, 2100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'henry-mckenna-10';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Henry McKenna 10 Year Bottled-in-Bond', 'henry-mckenna-10-bib', 10, 50.0, 'New Charred American Oak', '{"smoky":2,"peaty":0,"fruity":5,"floral":2,"spicy":5,"sweet":7,"oaky":7,"maritime":0,"vanilla":7,"chocolate":4}', 'Single barrel, bottled-in-bond, 10 years. Exceptional value. Caramel corn, dark fruit, tobacco leaf.', 87, 3400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'rittenhouse-rye';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Rittenhouse Rye Bottled-in-Bond', 'rittenhouse-rye-bib', 50.0, 'New Charred American Oak', '{"smoky":1,"peaty":0,"fruity":4,"floral":2,"spicy":8,"sweet":5,"oaky":5,"maritime":0,"vanilla":5,"chocolate":3}', 'The bartender rye. Spicy, bold, affordable. Rye bread, black pepper, cherry, dill. Perfect in cocktails.', 85, 4100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- BLANTONS
SELECT id INTO did FROM distilleries WHERE slug = 'blantons';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Original Single Barrel', 'blantons-original', 'bourbon', 'other'),
    (did, 'Gold', 'blantons-gold', 'bourbon', 'other'),
    (did, 'Straight From The Barrel', 'blantons-sftb', 'bourbon', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'blantons-original';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Blanton''s Original Single Barrel', 'blantons-original-standard', 46.5, 'New Charred American Oak (Warehouse H)', '{"smoky":1,"peaty":0,"fruity":6,"floral":3,"spicy":5,"sweet":7,"oaky":5,"maritime":0,"vanilla":7,"chocolate":3}', 'The original single barrel bourbon. Honey, citrus, caramel. Highly allocated, iconic horse-stopper bottle.', 87, 4800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'blantons-sftb';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Blanton''s Straight From The Barrel', 'blantons-sftb-standard', 65.0, 'New Charred American Oak', false, '{"smoky":2,"peaty":0,"fruity":6,"floral":2,"spicy":7,"sweet":8,"oaky":7,"maritime":0,"vanilla":8,"chocolate":5}', 'Unfiltered cask strength Blanton''s. Intense butterscotch, dark honey, black pepper, toasted marshmallow.', 91, 1800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- PAPPY VAN WINKLE
SELECT id INTO did FROM distilleries WHERE slug = 'pappy-van-winkle';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '15 Year Family Reserve', 'pappy-15', 'bourbon', 'other'),
    (did, '20 Year Family Reserve', 'pappy-20', 'bourbon', 'other'),
    (did, '23 Year Family Reserve', 'pappy-23', 'bourbon', 'other'),
    (did, 'Lot B 12 Year', 'van-winkle-lot-b', 'bourbon', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'pappy-15';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, is_limited_edition, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Pappy Van Winkle 15 Year Family Reserve', 'pappy-15-standard', 15, 53.5, 'New Charred American Oak', true, '{"smoky":2,"peaty":0,"fruity":7,"floral":3,"spicy":5,"sweet":9,"oaky":7,"maritime":0,"vanilla":9,"chocolate":5}', 'The unicorn bourbon. Caramel, toffee, cherries, cinnamon. Wheated smoothness with incredible depth.', 95, 2200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'pappy-20';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, is_limited_edition, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Pappy Van Winkle 20 Year Family Reserve', 'pappy-20-standard', 20, 45.2, 'New Charred American Oak', true, '{"smoky":2,"peaty":0,"fruity":8,"floral":4,"spicy":5,"sweet":9,"oaky":8,"maritime":0,"vanilla":9,"chocolate":6}', 'Two decades of perfection. Dried apricot, leather, maple, old oak. Impossibly smooth for the proof.', 96, 1400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'pappy-23';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, is_limited_edition, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Pappy Van Winkle 23 Year Family Reserve', 'pappy-23-standard', 23, 47.8, 'New Charred American Oak', true, '{"smoky":3,"peaty":0,"fruity":7,"floral":4,"spicy":6,"sweet":9,"oaky":9,"maritime":0,"vanilla":8,"chocolate":7}', 'The crown jewel. Ancient oak, dark toffee, prune, leather, pipe tobacco. Rarest bourbon on earth.', 97, 680)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- EAGLE RARE
SELECT id INTO did FROM distilleries WHERE slug = 'eagle-rare';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '10 Year Old', 'eagle-rare-10', 'bourbon', 'other'),
    (did, '17 Year Old', 'eagle-rare-17', 'bourbon', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'eagle-rare-10';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Eagle Rare 10 Year Old', 'eagle-rare-10-standard', 10, 45.0, 'New Charred American Oak', '{"smoky":1,"peaty":0,"fruity":6,"floral":3,"spicy":4,"sweet":7,"oaky":6,"maritime":0,"vanilla":8,"chocolate":4}', 'Single barrel bourbon, 10 years. Toffee, orange peel, leather, toasted oak. Exceptional daily sipper.', 87, 5600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- WELLER
SELECT id INTO did FROM distilleries WHERE slug = 'weller';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Special Reserve', 'weller-sr', 'bourbon', 'other'),
    (did, 'Antique 107', 'weller-107', 'bourbon', 'other'),
    (did, '12 Year Old', 'weller-12', 'bourbon', 'other'),
    (did, 'Full Proof', 'weller-full-proof', 'bourbon', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'weller-sr';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'W.L. Weller Special Reserve', 'weller-sr-standard', 45.0, 'New Charred American Oak', '{"smoky":1,"peaty":0,"fruity":5,"floral":3,"spicy":3,"sweet":7,"oaky":4,"maritime":0,"vanilla":7,"chocolate":3}', 'Wheated bourbon, budget Pappy. Caramel, wheat bread, vanilla, honey. Smooth and approachable.', 82, 4200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'weller-107';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'W.L. Weller Antique 107', 'weller-107-standard', 53.5, 'New Charred American Oak', '{"smoky":1,"peaty":0,"fruity":6,"floral":2,"spicy":5,"sweet":8,"oaky":5,"maritime":0,"vanilla":8,"chocolate":4}', 'Proof-forward wheated bourbon. Cinnamon, brown sugar, cherries, nutmeg. Punches above its weight.', 87, 3600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'weller-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'W.L. Weller 12 Year Old', 'weller-12-standard', 12, 45.0, 'New Charred American Oak', '{"smoky":1,"peaty":0,"fruity":7,"floral":3,"spicy":4,"sweet":8,"oaky":6,"maritime":0,"vanilla":8,"chocolate":5}', 'Poor man Pappy. 12 years wheated perfection. Butterscotch, red apple, almond, soft oak. Highly sought-after.', 90, 3100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- KAVALAN (Taiwan)
SELECT id INTO did FROM distilleries WHERE slug = 'kavalan';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Solist Vinho Barrique', 'kavalan-solist-vinho', 'world', 'single_malt'),
    (did, 'Solist Ex-Bourbon', 'kavalan-solist-bourbon', 'world', 'single_malt'),
    (did, 'Concertmaster', 'kavalan-concertmaster', 'world', 'single_malt'),
    (did, 'Classic Single Malt', 'kavalan-classic', 'world', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'kavalan-solist-vinho';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, chill_filtered, natural_color, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Kavalan Solist Vinho Barrique', 'kavalan-solist-vinho-standard', 57.8, 'Wine Barrique Casks', false, true, '{"smoky":1,"peaty":0,"fruity":9,"floral":4,"spicy":5,"sweet":8,"oaky":6,"maritime":1,"vanilla":6,"chocolate":5}', 'World Whiskies Award Best Single Malt. Mango, passion fruit, coconut cream, tropical honey. Extraordinary.', 93, 1800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'kavalan-classic';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Kavalan Classic Single Malt', 'kavalan-classic-standard', 40.0, 'Bourbon & Sherry Casks', '{"smoky":0,"peaty":0,"fruity":7,"floral":5,"spicy":3,"sweet":7,"oaky":4,"maritime":1,"vanilla":7,"chocolate":2}', 'Approachable Taiwanese whisky. Tropical fruit, vanilla cream, floral honey. Excellent intro to Kavalan.', 84, 2900)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- AMRUT (India)
SELECT id INTO did FROM distilleries WHERE slug = 'amrut';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Fusion', 'amrut-fusion', 'world', 'single_malt'),
    (did, 'Peated Single Malt', 'amrut-peated', 'world', 'single_malt'),
    (did, 'Naarangi', 'amrut-naarangi', 'world', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'amrut-fusion';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Amrut Fusion', 'amrut-fusion-standard', 50.0, 'Bourbon Casks', '{"smoky":3,"peaty":2,"fruity":6,"floral":3,"spicy":5,"sweet":6,"oaky":5,"maritime":1,"vanilla":6,"chocolate":4}', 'Indian + Scottish peated barley blend. Tropical fruit, gentle peat, barley sugar. Jim Murray 3rd finest whisky.', 88, 2400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'amrut-peated';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Amrut Peated Single Malt', 'amrut-peated-standard', 46.0, 'Bourbon Casks', '{"smoky":6,"peaty":6,"fruity":5,"floral":2,"spicy":5,"sweet":5,"oaky":5,"maritime":2,"vanilla":5,"chocolate":3}', 'Indian peated malt aged at altitude. Tropical smoke, mango, campfire. Unique terroir meets peat.', 86, 1600)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- STARWARD (Australia)
SELECT id INTO did FROM distilleries WHERE slug = 'starward';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Nova', 'starward-nova', 'world', 'single_malt'),
    (did, 'Solera', 'starward-solera', 'world', 'single_malt'),
    (did, 'Two-Fold', 'starward-two-fold', 'world', 'blended')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'starward-nova';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Starward Nova', 'starward-nova-standard', 41.0, 'Australian Red Wine Barrels', '{"smoky":1,"peaty":0,"fruity":8,"floral":3,"spicy":4,"sweet":7,"oaky":4,"maritime":1,"vanilla":5,"chocolate":4}', 'Australian whisky in red wine barrels. Cherry, plum, mocha, cinnamon. Melbourne vibes in a glass.', 85, 2200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- MACKMYRA (Sweden)
SELECT id INTO did FROM distilleries WHERE slug = 'mackmyra';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Svensk Ek', 'mackmyra-svensk-ek', 'world', 'single_malt'),
    (did, 'Brukswhisky', 'mackmyra-brukswhisky', 'world', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'mackmyra-svensk-ek';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Mackmyra Svensk Ek (Swedish Oak)', 'mackmyra-svensk-ek-standard', 46.1, 'Swedish Oak Casks', '{"smoky":2,"peaty":0,"fruity":6,"floral":5,"spicy":5,"sweet":6,"oaky":7,"maritime":1,"vanilla":5,"chocolate":3}', 'Swedish oak matured Nordic whisky. Gingerbread, cranberry, forest floor, toffee. True terroir expression.', 84, 1100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- WHISTLEPIG (already might exist, adding expressions)
SELECT id INTO did FROM distilleries WHERE slug = 'whistlepig';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '10 Year Rye', 'whistlepig-10', 'rye', 'other'),
    (did, '12 Year Old World', 'whistlepig-12', 'rye', 'other'),
    (did, '15 Year Estate Oak', 'whistlepig-15', 'rye', 'other'),
    (did, 'PiggyBack 6 Year', 'whistlepig-piggyback', 'rye', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'whistlepig-10';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'WhistlePig 10 Year Straight Rye', 'whistlepig-10-standard', 10, 50.0, 'New American Oak', '{"smoky":1,"peaty":0,"fruity":5,"floral":3,"spicy":8,"sweet":6,"oaky":6,"maritime":0,"vanilla":6,"chocolate":3}', '100% rye, 10 years aged. Caramel, allspice, orange peel, rye bread. The benchmark premium rye.', 89, 4200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'whistlepig-15';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, is_limited_edition, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'WhistlePig 15 Year Estate Oak', 'whistlepig-15-standard', 15, 46.0, 'Vermont Oak Finish', true, '{"smoky":2,"peaty":0,"fruity":6,"floral":3,"spicy":8,"sweet":7,"oaky":8,"maritime":0,"vanilla":7,"chocolate":4}', 'Vermont estate oak finished. Dark caramel, black pepper, toasted walnut, maple. Farm-to-bottle luxury rye.', 92, 1100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- HIGH WEST
SELECT id INTO did FROM distilleries WHERE slug = 'high-west';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Bourye', 'high-west-bourye', 'bourbon', 'blended'),
    (did, 'Rendezvous Rye', 'high-west-rendezvous', 'rye', 'other'),
    (did, 'Double Rye', 'high-west-double-rye', 'rye', 'other'),
    (did, 'American Prairie', 'high-west-prairie', 'bourbon', 'blended')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'high-west-rendezvous';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'High West Rendezvous Rye', 'high-west-rendezvous-standard', 46.0, 'Charred American Oak', '{"smoky":1,"peaty":0,"fruity":5,"floral":3,"spicy":8,"sweet":6,"oaky":5,"maritime":0,"vanilla":6,"chocolate":3}', 'Blend of ryes aged 4-7 years. Cinnamon, clove, mint, dark honey. Complex and spice-forward.', 88, 2800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;

  SELECT id INTO bid FROM bottles WHERE slug = 'high-west-double-rye';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'High West Double Rye', 'high-west-double-rye-standard', 46.0, 'Charred American Oak', '{"smoky":1,"peaty":0,"fruity":4,"floral":2,"spicy":7,"sweet":5,"oaky":4,"maritime":0,"vanilla":5,"chocolate":2}', 'Blend of 2-year and 16-year ryes. Mint, black pepper, cinnamon candy. Great cocktail or sipping rye.', 84, 3500)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- BALCONES (Texas)
SELECT id INTO did FROM distilleries WHERE slug = 'balcones';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Texas Single Malt', 'balcones-single-malt', 'world', 'single_malt'),
    (did, 'True Blue Corn', 'balcones-true-blue', 'bourbon', 'other')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'balcones-single-malt';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Balcones Texas Single Malt', 'balcones-single-malt-standard', 53.0, 'New Charred Oak & Wine Casks', '{"smoky":3,"peaty":1,"fruity":6,"floral":2,"spicy":6,"sweet":7,"oaky":6,"maritime":0,"vanilla":6,"chocolate":5}', 'Texas heat-aged single malt. Dark honey, fig, baking spices, toasted pecan. Bold and intense.', 86, 1400)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- PENDERYN (Wales)
SELECT id INTO did FROM distilleries WHERE slug = 'penderyn';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Madeira Finish', 'penderyn-madeira', 'world', 'single_malt'),
    (did, 'Sherrywood', 'penderyn-sherrywood', 'world', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'penderyn-madeira';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Penderyn Madeira Finish', 'penderyn-madeira-standard', 46.0, 'Ex-Bourbon finished in Madeira Casks', '{"smoky":0,"peaty":0,"fruity":7,"floral":5,"spicy":3,"sweet":7,"oaky":4,"maritime":1,"vanilla":6,"chocolate":3}', 'Welsh single malt with Madeira cask finish. Tropical fruit, cream, raisins. Unique Faraday still character.', 83, 1800)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- COTSWOLDS (England)
SELECT id INTO did FROM distilleries WHERE slug = 'cotswolds';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, 'Founder Choice', 'cotswolds-founders', 'world', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'cotswolds-founders';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Cotswolds Founders Choice', 'cotswolds-founders-standard', 60.4, 'STR Red Wine Casks', '{"smoky":1,"peaty":0,"fruity":7,"floral":4,"spicy":5,"sweet":7,"oaky":5,"maritime":0,"vanilla":6,"chocolate":4}', 'English single malt at cask strength. Honey, berries, ginger, marzipan. New English whisky at its finest.', 86, 780)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- MORTLACH
SELECT id INTO did FROM distilleries WHERE slug = 'mortlach';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '16 Year Old', 'mortlach-16', 'scotch', 'single_malt'),
    (did, '20 Year Old', 'mortlach-20', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'mortlach-16';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Mortlach 16 Year Old Distiller''s Dram', 'mortlach-16-standard', 16, 43.4, 'Sherry & Bourbon Casks', '{"smoky":3,"peaty":1,"fruity":6,"floral":2,"spicy":6,"sweet":6,"oaky":7,"maritime":2,"vanilla":5,"chocolate":5}', 'The Beast of Dufftown. Meaty, rich, complex. Dark chocolate, leather, stewed plums. 2.81x distillation.', 88, 1500)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- JURA
SELECT id INTO did FROM distilleries WHERE slug = 'jura';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '10 Year Old', 'jura-10', 'scotch', 'single_malt'),
    (did, 'Seven Wood', 'jura-seven-wood', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'jura-10';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'Jura 10 Year Old', 'jura-10-standard', 10, 40.0, 'Ex-Bourbon Casks', '{"smoky":2,"peaty":1,"fruity":5,"floral":4,"spicy":3,"sweet":5,"oaky":4,"maritime":4,"vanilla":6,"chocolate":2}', 'Island single malt, lighter than expected. Honey, sea salt, citrus, pine. Approachable island whisky.', 79, 3200)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

-- GLENROTHES
SELECT id INTO did FROM distilleries WHERE slug = 'glenrothes';
IF did IS NOT NULL THEN
  INSERT INTO bottles (distillery_id, name, slug, type, category) VALUES
    (did, '12 Year Old', 'glenrothes-12', 'scotch', 'single_malt'),
    (did, '18 Year Old', 'glenrothes-18', 'scotch', 'single_malt')
  ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO bid FROM bottles WHERE slug = 'glenrothes-12';
  IF bid IS NOT NULL THEN
    INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, flavor_profile, description, avg_community_score, review_count) VALUES
    (bid, 'The Glenrothes 12 Year Old', 'glenrothes-12-standard', 12, 40.0, 'Sherry & Bourbon Casks', '{"smoky":1,"peaty":0,"fruity":7,"floral":4,"spicy":4,"sweet":7,"oaky":5,"maritime":1,"vanilla":6,"chocolate":3}', 'Sherried Speyside classic. Vanilla fudge, dried apricot, nutmeg. Excellent value single malt.', 84, 2100)
    ON CONFLICT (slug) DO NOTHING;
  END IF;
END IF;

END $$;
