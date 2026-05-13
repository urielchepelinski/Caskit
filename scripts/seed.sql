-- ============================================================
-- Caskit Whiskey App - Database Seed
-- Run in Neon SQL Editor (paste entire file)
-- Order: distilleries -> bottles -> expressions -> award_scores
--
-- IMPORTANT: This assumes empty tables with SERIAL IDs starting at 1.
-- If tables already have data, run the TRUNCATE below first.
-- ============================================================

-- Uncomment to clear existing data:
-- TRUNCATE award_scores, expressions, bottles, distilleries RESTART IDENTITY CASCADE;

-- ============================================================
-- DISTILLERIES (10 total)
-- ============================================================

INSERT INTO distilleries (name, slug, country, region, lat, lng, website, description, image_url, logo_url, verified, created_at, updated_at)
VALUES
-- Israel (3)
('Milk & Honey', 'milk-and-honey', 'Israel', 'Tel Aviv', 32.0546, 34.7554, 'https://mh-distillery.com',
 'Israel''s first whisky distillery, founded in 2014 in the heart of Tel Aviv. Known for innovative cask programs leveraging the warm Mediterranean climate for accelerated maturation.',
 'https://mh-distillery.com/wp-content/uploads/2025/05/apex-dead-sea-terroir-874X918-1.png',
 'https://mh-distillery.com/wp-content/uploads/2022/07/logo-vector.svg',
 true, NOW(), NOW()),

('Golan Heights Distillery', 'golan-heights', 'Israel', 'Katzrin', 32.9914, 35.6924, 'https://www.golanispirit.com',
 'Situated in the volcanic Golan Heights at 400m elevation, producing whisky influenced by the unique terroir and climate of the region. Uses local spring water from the Hermon mountain.',
 'https://www.golanispirit.com/cdn/shop/files/about-us.jpg',
 NULL,
 true, NOW(), NOW()),

('Pelter', 'pelter', 'Israel', 'Upper Galilee', 33.0079, 35.5247, 'https://pelter.co.il',
 'A family winery in Upper Galilee that expanded into whisky production, combining winemaking expertise with distilling craft. Their wine cask finishes are among the most distinctive in Israeli whisky.',
 NULL, NULL,
 true, NOW(), NOW()),

-- Scotland (3)
('Lagavulin', 'lagavulin', 'Scotland', 'Islay', 55.6358, -6.1264, 'https://www.lagavulin.com',
 'One of the most iconic Islay distilleries, known for its intense, smoky, peaty single malts. Established in 1816 on the shores of Lagavulin Bay.',
 NULL, NULL,
 true, NOW(), NOW()),

('The Macallan', 'macallan', 'Scotland', 'Speyside', 57.4848, -3.2081, 'https://www.themacallan.com',
 'The Macallan is renowned for its rich, sherried single malts. One of the most collected and investment-worthy whisky brands in the world, with a legacy dating to 1824.',
 NULL, NULL,
 true, NOW(), NOW()),

('Talisker', 'talisker', 'Scotland', 'Isle of Skye', 57.3025, -6.3564, 'https://www.talisker.com',
 'The only distillery on the Isle of Skye, producing distinctively maritime and peppery single malts since 1830. Made by the sea, shaped by the wild Skye landscape.',
 NULL, NULL,
 true, NOW(), NOW()),

-- Japan (2)
('Yamazaki', 'yamazaki', 'Japan', 'Osaka', 34.8931, 135.6718, 'https://www.suntory.com/factory/yamazaki',
 'Japan''s first and oldest malt whisky distillery, founded by Shinjiro Torii in 1923. Located at the confluence of three rivers where humidity and temperature create ideal aging conditions.',
 NULL, NULL,
 true, NOW(), NOW()),

('Nikka', 'nikka', 'Japan', 'Hokkaido', 43.0781, 140.9744, 'https://www.nikka.com',
 'Founded by Masataka Taketsuru in 1934. The Yoichi distillery in Hokkaido uses coal-fired pot stills, producing robust, peaty whiskies influenced by the cold northern climate.',
 NULL, NULL,
 true, NOW(), NOW()),

-- USA (2)
('Maker''s Mark', 'makers-mark', 'United States', 'Kentucky', 37.6800, -85.3400, 'https://www.makersmark.com',
 'A Kentucky straight bourbon distillery known for using red winter wheat instead of rye in its mash bill. Hand-dipped in their signature red wax since 1958.',
 NULL, NULL,
 true, NOW(), NOW()),

('Buffalo Trace', 'buffalo-trace', 'United States', 'Kentucky', 38.2106, -84.8675, 'https://www.buffalotracedistillery.com',
 'One of the oldest continuously operating distilleries in America, producing legendary bourbons since 1773. Home to Pappy Van Winkle, Eagle Rare, and Blanton''s.',
 NULL, NULL,
 true, NOW(), NOW());


-- ============================================================
-- BOTTLES (28 total, 2-3 per distillery)
-- ============================================================

-- Milk & Honey bottles (distillery_id = 1)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(1, 'Apex Dead Sea', 'mh-apex-dead-sea', 'world', 'single_malt', NOW(), NOW()),
(1, 'Apex Jerusalem', 'mh-apex-jerusalem', 'world', 'single_malt', NOW(), NOW()),
(1, 'Classic Single Malt', 'mh-classic', 'world', 'single_malt', NOW(), NOW()),
(1, 'Elements Sherry', 'mh-elements-sherry', 'world', 'single_malt', NOW(), NOW());

-- Golan Heights bottles (distillery_id = 2)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(2, 'Golani Whisky', 'golan-golani', 'world', 'single_malt', NOW(), NOW()),
(2, 'Ramat HaGolan Single Cask', 'golan-ramat-hagolan-sc', 'world', 'single_malt', NOW(), NOW()),
(2, 'Basalt Single Malt', 'golan-basalt', 'world', 'single_malt', NOW(), NOW());

-- Pelter bottles (distillery_id = 3)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(3, 'Single Malt 10 Year', 'pelter-single-malt-10', 'world', 'single_malt', NOW(), NOW()),
(3, 'Rye Whisky', 'pelter-rye', 'world', 'other', NOW(), NOW()),
(3, 'Wine Cask Finish', 'pelter-wine-cask', 'world', 'single_malt', NOW(), NOW());

-- Lagavulin bottles (distillery_id = 4)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(4, '16 Year Old', 'lagavulin-16', 'scotch', 'single_malt', NOW(), NOW()),
(4, '8 Year Old', 'lagavulin-8', 'scotch', 'single_malt', NOW(), NOW()),
(4, 'Distillers Edition', 'lagavulin-de', 'scotch', 'single_malt', NOW(), NOW());

-- Macallan bottles (distillery_id = 5)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(5, '12 Year Sherry Oak', 'macallan-12-sherry', 'scotch', 'single_malt', NOW(), NOW()),
(5, '18 Year Sherry Oak', 'macallan-18-sherry', 'scotch', 'single_malt', NOW(), NOW()),
(5, 'Rare Cask', 'macallan-rare-cask', 'scotch', 'single_malt', NOW(), NOW());

-- Talisker bottles (distillery_id = 6)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(6, '10 Year Old', 'talisker-10', 'scotch', 'single_malt', NOW(), NOW()),
(6, '18 Year Old', 'talisker-18', 'scotch', 'single_malt', NOW(), NOW()),
(6, 'Storm', 'talisker-storm', 'scotch', 'single_malt', NOW(), NOW());

-- Yamazaki bottles (distillery_id = 7)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(7, '12 Year Old', 'yamazaki-12', 'japanese', 'single_malt', NOW(), NOW()),
(7, '18 Year Old', 'yamazaki-18', 'japanese', 'single_malt', NOW(), NOW()),
(7, 'Distiller''s Reserve', 'yamazaki-distillers-reserve', 'japanese', 'single_malt', NOW(), NOW());

-- Nikka bottles (distillery_id = 8)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(8, 'From The Barrel', 'nikka-from-the-barrel', 'japanese', 'blended', NOW(), NOW()),
(8, 'Yoichi Single Malt', 'nikka-yoichi', 'japanese', 'single_malt', NOW(), NOW()),
(8, 'Coffey Grain', 'nikka-coffey-grain', 'japanese', 'grain', NOW(), NOW());

-- Maker's Mark bottles (distillery_id = 9)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(9, 'Original', 'makers-mark-original', 'bourbon', 'other', NOW(), NOW()),
(9, 'Cask Strength', 'makers-mark-cask-strength', 'bourbon', 'other', NOW(), NOW()),
(9, '46', 'makers-mark-46', 'bourbon', 'other', NOW(), NOW());

-- Buffalo Trace bottles (distillery_id = 10)
INSERT INTO bottles (distillery_id, name, slug, type, category, created_at, updated_at) VALUES
(10, 'Buffalo Trace Bourbon', 'buffalo-trace-bourbon', 'bourbon', 'other', NOW(), NOW()),
(10, 'Eagle Rare 10 Year', 'buffalo-trace-eagle-rare', 'bourbon', 'other', NOW(), NOW()),
(10, 'Blanton''s Original', 'buffalo-trace-blantons', 'bourbon', 'other', NOW(), NOW());


-- ============================================================
-- EXPRESSIONS (30 total, 1-2 per bottle)
-- ============================================================

-- M&H Apex Dead Sea (bottle_id = 1)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, cask_size, aging_method, natural_color, chill_filtered, is_limited_edition, release_year, flavor_profile, story, description, image_url, avg_community_score, review_count, created_at, updated_at)
VALUES
(1, 'Apex Dead Sea Terroir', 'mh-apex-dead-sea-terroir', NULL, 57.4, 'STR Casks (Shaved, Toasted, Re-charred)', 'Barrique', 'Dead Sea climate maturation', true, false, false, 2023,
 '{"smoky": 3, "peaty": 1, "fruity": 6, "floral": 4, "spicy": 7, "sweet": 6, "oaky": 5, "maritime": 2, "vanilla": 7, "chocolate": 4}',
 'Sweet French vanilla and mocha, a rush of warm cinnamon and coriander, long finish with candied ginger and sea salt. Matured at the lowest point on Earth where extreme heat accelerates the angel''s share, concentrating flavors into something truly unique.',
 'Terroir Series single malt aged near the Dead Sea. Cask strength, non chill-filtered.',
 'https://mh-distillery.com/wp-content/uploads/2025/05/apex-dead-sea-terroir-874X918-1.png',
 92.3, 1842, NOW(), NOW());

-- M&H Apex Jerusalem (bottle_id = 2)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, aging_method, natural_color, chill_filtered, is_limited_edition, release_year, flavor_profile, story, description, image_url, avg_community_score, review_count, created_at, updated_at)
VALUES
(2, 'Apex Jerusalem Terroir', 'mh-apex-jerusalem-terroir', NULL, 55.4, 'Ex-Red Wine Casks', 'Jerusalem Hills climate maturation', true, false, false, 2023,
 '{"smoky": 2, "peaty": 1, "fruity": 8, "floral": 6, "spicy": 4, "sweet": 5, "oaky": 4, "maritime": 1, "vanilla": 5, "chocolate": 3}',
 'Bright green apples with citrus leaf and subtle oak, fresh pine, toffee apple finish. The cool Jerusalem night air slows maturation, allowing delicate fruit notes to develop over years of patient rest in the Judean Hills.',
 'Terroir Series single malt aged in the Jerusalem Hills at 800m elevation.',
 'https://mh-distillery.com/wp-content/uploads/2025/05/apex-jerusalem-terroir-874X918-1.png',
 88.1, 956, NOW(), NOW());

-- M&H Classic (bottle_id = 3)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, aging_method, natural_color, chill_filtered, flavor_profile, story, description, image_url, avg_community_score, review_count, created_at, updated_at)
VALUES
(3, 'Classic Single Malt', 'mh-classic-standard', NULL, 46.0, 'Ex-Bourbon & STR Casks', 'Tel Aviv warehouse maturation', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 7, "floral": 5, "spicy": 5, "sweet": 7, "oaky": 4, "maritime": 3, "vanilla": 8, "chocolate": 3}',
 'The flagship expression of Israel''s first whisky distillery. Honey, vanilla, baked apple, and gentle spice. A marriage of ex-bourbon and STR casks that captures the essence of Tel Aviv — warm, bold, and welcoming.',
 'The flagship M&H expression. Approachable yet complex.',
 'https://mh-distillery.com/wp-content/uploads/2023/01/mh-classic-874x918.png',
 85.7, 2340, NOW(), NOW());

-- M&H Elements Sherry (bottle_id = 4)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(4, 'Elements Sherry Cask', 'mh-elements-sherry-cask', NULL, 46.0, 'First-fill Oloroso Sherry Casks', 'Oloroso Sherry', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 7, "floral": 3, "spicy": 5, "sweet": 8, "oaky": 6, "maritime": 1, "vanilla": 6, "chocolate": 5}',
 'Rich dried fruits and Christmas cake, dark chocolate, clove, and toasted almond. First-fill oloroso sherry casks from Jerez impart their deep mahogany color and luxurious mouthfeel.',
 'Sherry cask matured single malt from the Elements series.',
 87.4, 1120, NOW(), NOW());

-- Golan Heights - Golani (bottle_id = 5)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, aging_method, natural_color, chill_filtered, flavor_profile, story, description, image_url, avg_community_score, review_count, created_at, updated_at)
VALUES
(5, 'Golani Classic', 'golan-golani-classic', 3, 46.0, 'Ex-Bourbon American Oak', 'Volcanic elevation maturation at 400m', true, false,
 '{"smoky": 3, "peaty": 2, "fruity": 5, "floral": 3, "spicy": 6, "sweet": 5, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 3}',
 'The Golan Heights'' unique volcanic terroir and dramatic temperature swings between day and night push the spirit deep into the oak. Notes of toasted hazelnuts, caramel, and basalt minerality.',
 'The signature expression from Golan Heights Distillery. Volcanic terroir, Israeli character.',
 'https://www.golanispirit.com/cdn/shop/files/about-us.jpg',
 84.2, 678, NOW(), NOW());

-- Golan Heights - Ramat HaGolan (bottle_id = 6)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, is_limited_edition, bottle_count, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(6, 'Ramat HaGolan Single Cask #47', 'golan-ramat-hagolan-sc47', 5, 58.2, 'First-fill PX Sherry Hogshead', true, 312, true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 8, "floral": 2, "spicy": 4, "sweet": 9, "oaky": 5, "maritime": 1, "vanilla": 5, "chocolate": 7}',
 'Single cask bottling from a Pedro Ximenez sherry hogshead. Intensely sweet with dark chocolate, raisins, fig jam, and espresso. Only 312 bottles released from this exceptional cask.',
 'Limited single cask release. PX sherry influence at cask strength.',
 89.6, 234, NOW(), NOW());

-- Pelter Single Malt 10 (bottle_id = 8)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, aging_method, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(8, 'Single Malt 10 Year Old', 'pelter-single-malt-10y', 10, 46.0, 'Ex-Bourbon Casks', 'Golan Heights elevation maturation', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 5, "floral": 3, "spicy": 4, "sweet": 7, "oaky": 6, "maritime": 1, "vanilla": 8, "chocolate": 3}',
 'A decade of Golan Heights maturation. Pecan pie, lemon drizzle cake, warm oak and honey. The volcanic basalt soil and high altitude create dramatic temperature swings that push whisky in and out of the wood, building complexity year after year.',
 '10 year single malt from the Golan Heights. Winery heritage meets distilling craft.',
 86.3, 412, NOW(), NOW());

-- Pelter Wine Cask (bottle_id = 10)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(10, 'Wine Cask Finish Cabernet', 'pelter-wine-cask-cabernet', 5, 46.0, 'Ex-Bourbon', 'Pelter Winery Cabernet Sauvignon Casks', true, false,
 '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 4, "spicy": 5, "sweet": 6, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 4}',
 'Finished in casks that previously held Pelter''s own Cabernet Sauvignon wine. A unique expression that bridges their winery and distillery heritage. Red berries, blackcurrant, and warm vanilla oak.',
 'Finished in Pelter''s own Cabernet Sauvignon wine casks. Winery-distillery crossover.',
 85.1, 298, NOW(), NOW());

-- Lagavulin 16 (bottle_id = 11)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, distillation_type, water_source, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(11, '16 Year Old', 'lagavulin-16-standard', 16, 43.0, 'Ex-Oloroso Sherry & Ex-Bourbon', true, false, 'Double distilled in copper pot stills', 'Solum Lochs',
 '{"smoky": 9, "peaty": 9, "fruity": 3, "floral": 1, "spicy": 5, "sweet": 4, "oaky": 6, "maritime": 8, "vanilla": 3, "chocolate": 2}',
 'The definitive Islay single malt. Sixteen years of patient maturation in the damp, sea-sprayed warehouses of Lagavulin Bay. Intensely smoky with iodine, seaweed, and dark chocolate, balanced by dried fruit sweetness and a warming, immensely long finish.',
 'The benchmark Islay whisky. Massive peat smoke balanced by sherry sweetness.',
 91.4, 4250, NOW(), NOW());

-- Lagavulin 8 (bottle_id = 12)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(12, '8 Year Old', 'lagavulin-8-standard', 8, 48.0, 'Ex-Bourbon Refill Casks', true, false,
 '{"smoky": 8, "peaty": 8, "fruity": 4, "floral": 2, "spicy": 6, "sweet": 3, "oaky": 4, "maritime": 7, "vanilla": 4, "chocolate": 2}',
 'Originally released to celebrate the distillery''s 200th anniversary. Younger and more vibrant than the 16, with explosive peat smoke, lemon zest, and black pepper. The higher ABV amplifies every note.',
 'Young, vibrant, punchy Islay character at higher strength.',
 87.8, 2180, NOW(), NOW());

-- Lagavulin DE (bottle_id = 13)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, wood_finish, release_year, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(13, 'Distillers Edition 2023', 'lagavulin-de-2023', 16, 43.0, 'Ex-Bourbon', 'Pedro Ximenez Sherry Cask Finish', 2023, true, false,
 '{"smoky": 8, "peaty": 7, "fruity": 5, "floral": 2, "spicy": 4, "sweet": 7, "oaky": 6, "maritime": 6, "vanilla": 4, "chocolate": 5}',
 'The annual Distillers Edition adds a PX sherry cask finish to the classic Lagavulin profile. The result marries intense peat smoke with sticky-sweet dried fruits, dark chocolate, and espresso.',
 'PX sherry finished Lagavulin. Smoke meets sweetness.',
 90.2, 1560, NOW(), NOW());

-- Macallan 12 Sherry (bottle_id = 14)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(14, '12 Year Old Sherry Oak', 'macallan-12-sherry-standard', 12, 40.0, 'First-fill and Refill Oloroso Sherry Casks', true, false,
 '{"smoky": 1, "peaty": 1, "fruity": 6, "floral": 3, "spicy": 5, "sweet": 7, "oaky": 6, "maritime": 1, "vanilla": 6, "chocolate": 4}',
 'Matured exclusively in hand-picked sherry seasoned oak casks from Jerez, Spain. The Macallan''s signature richness — dried fruits, ginger, and gentle wood spice — presented in its most accessible form.',
 'The benchmark sherried Speyside. Rich, fruity, approachable.',
 86.5, 4800, NOW(), NOW());

-- Macallan 18 Sherry (bottle_id = 15)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(15, '18 Year Old Sherry Oak', 'macallan-18-sherry-standard', 18, 43.0, 'First-fill Oloroso Sherry Casks', true, false,
 '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 3, "spicy": 6, "sweet": 8, "oaky": 8, "maritime": 1, "vanilla": 7, "chocolate": 6}',
 'Eighteen years of exclusive sherry oak maturation. Dried fruits, ginger, chocolate orange, and polished mahogany. The extra time in first-fill sherry casks adds layers of depth and a legendary velvety texture that defines luxury Scotch.',
 'The legendary Macallan 18. Benchmark luxury sherried malt.',
 93.1, 3200, NOW(), NOW());

-- Macallan Rare Cask (bottle_id = 16)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, is_limited_edition, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(16, 'Rare Cask 2023', 'macallan-rare-cask-2023', NULL, 43.0, 'Hand-selected Rare Sherry Seasoned Oak', false, true, false,
 '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 6, "sweet": 9, "oaky": 7, "maritime": 1, "vanilla": 8, "chocolate": 7}',
 'Crafted from the rarest casks in The Macallan''s vast maturation warehouses — fewer than 1% of casks qualify. Intensely rich with raisin, dark chocolate, cinnamon, and candied orange peel. Each batch is unique.',
 'From fewer than 1% of Macallan casks. Ultra-rich sherried luxury.',
 91.8, 890, NOW(), NOW());

-- Talisker 10 (bottle_id = 17)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, distillation_type, water_source, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(17, '10 Year Old', 'talisker-10-standard', 10, 45.8, 'Ex-Bourbon Refill Casks', true, false, 'Double distilled with worm tub condensers', 'Cnoc nan Speireag (Hawk Hill)',
 '{"smoky": 7, "peaty": 5, "fruity": 4, "floral": 2, "spicy": 8, "sweet": 3, "oaky": 4, "maritime": 8, "vanilla": 3, "chocolate": 2}',
 'Made by the sea. Explosive black pepper, brine, and smoke — the signature Talisker combination. A warming dram that evokes stormy Skye coastlines and crashing Atlantic waves.',
 'The essential maritime single malt. Pepper, smoke, and sea.',
 88.9, 3800, NOW(), NOW());

-- Talisker 18 (bottle_id = 18)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(18, '18 Year Old', 'talisker-18-standard', 18, 45.8, 'Ex-Bourbon & Ex-Sherry Casks', true, false,
 '{"smoky": 6, "peaty": 4, "fruity": 5, "floral": 3, "spicy": 7, "sweet": 5, "oaky": 7, "maritime": 7, "vanilla": 5, "chocolate": 4}',
 'The mature side of Talisker. Eighteen years have softened the youthful pepper into a complex interplay of dried fruits, wood smoke, sea salt, and dark toffee. The maritime character remains but gains elegance.',
 'The sophisticated Talisker. Maritime depth with aged complexity.',
 91.2, 1450, NOW(), NOW());

-- Talisker Storm (bottle_id = 19)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(19, 'Storm', 'talisker-storm-standard', NULL, 45.8, 'Heavily Charred Ex-Bourbon Casks', true, false,
 '{"smoky": 7, "peaty": 5, "fruity": 3, "floral": 1, "spicy": 8, "sweet": 3, "oaky": 5, "maritime": 9, "vanilla": 3, "chocolate": 2}',
 'Inspired by the fierce storms that batter the Isle of Skye. More intense maritime character than the 10 Year Old, with crashing waves of black pepper, sea spray, and bonfire smoke.',
 'Wild maritime intensity. The stormiest Talisker expression.',
 84.6, 1890, NOW(), NOW());

-- Yamazaki 12 (bottle_id = 20)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, distillation_type, water_source, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(20, '12 Year Old', 'yamazaki-12-standard', 12, 43.0, 'Bourbon Casks, Sherry Casks, Mizunara Oak', true, false, 'Pot still distilled', 'Confluence of Katsura, Uji, and Kizu rivers',
 '{"smoky": 2, "peaty": 1, "fruity": 7, "floral": 6, "spicy": 4, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 6, "chocolate": 3}',
 'The whisky that put Japanese single malt on the world stage. Peach, pineapple, and Japanese incense (Mizunara oak influence), with vanilla custard and a delicate floral finish. Refined and multi-layered.',
 'Japan''s most iconic single malt. Elegant, fruity, with Mizunara influence.',
 90.5, 3600, NOW(), NOW());

-- Yamazaki 18 (bottle_id = 21)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(21, '18 Year Old', 'yamazaki-18-standard', 18, 43.0, 'Mizunara Oak, Sherry Butts, American Oak', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 6, "floral": 7, "spicy": 6, "sweet": 8, "oaky": 8, "maritime": 1, "vanilla": 7, "chocolate": 5}',
 'The pinnacle of Japanese whisky craftsmanship. Deep Mizunara sandalwood and incense, dark berry compote, bitter chocolate, and coconut. Winner of multiple World Whisky of the Year awards. Extremely rare and allocated.',
 'The pinnacle Yamazaki. Mizunara-driven complexity, world-class.',
 94.8, 1200, NOW(), NOW());

-- Yamazaki Distiller's Reserve (bottle_id = 22)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(22, 'Distiller''s Reserve', 'yamazaki-distillers-reserve', NULL, 43.0, 'Bordeaux Wine Casks & Bourbon Casks', true, false,
 '{"smoky": 1, "peaty": 1, "fruity": 8, "floral": 5, "spicy": 3, "sweet": 7, "oaky": 4, "maritime": 1, "vanilla": 6, "chocolate": 3}',
 'A no-age-statement expression showcasing the diversity of Yamazaki''s cask inventory. The wine cask influence brings strawberry and cranberry notes alongside the distillery''s signature floral elegance.',
 'No age statement Yamazaki with wine cask influence. Accessible luxury.',
 83.4, 2800, NOW(), NOW());

-- Nikka From The Barrel (bottle_id = 23)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(23, 'From The Barrel', 'nikka-ftb-standard', NULL, 51.4, 'Ex-Bourbon, Ex-Sherry, Refill Casks', true, false,
 '{"smoky": 3, "peaty": 2, "fruity": 6, "floral": 3, "spicy": 7, "sweet": 6, "oaky": 5, "maritime": 2, "vanilla": 7, "chocolate": 4}',
 'A marriage of over 100 different batches of malt and grain whisky from both Yoichi and Miyagikyo distilleries. Bottled at 51.4% after being re-casked in smaller barrels for extra maturation. Punches far above its price.',
 'Legendary Japanese blend at cask strength. Over 100 components married.',
 89.7, 4100, NOW(), NOW());

-- Nikka Yoichi (bottle_id = 24)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, distillation_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(24, 'Yoichi Single Malt', 'nikka-yoichi-nas', NULL, 45.0, 'Ex-Bourbon & New Charred Oak', true, false, 'Coal-fired pot still distilled',
 '{"smoky": 6, "peaty": 5, "fruity": 5, "floral": 2, "spicy": 6, "sweet": 4, "oaky": 5, "maritime": 5, "vanilla": 4, "chocolate": 3}',
 'From Nikka''s northern distillery in Hokkaido, where coal-fired pot stills create a robust, peaty spirit. Maritime notes from the coastal location combine with smoke and stone fruit in a uniquely Japanese interpretation of Islay style.',
 'Coal-fired Hokkaido single malt. Japanese peat meets maritime.',
 87.3, 1650, NOW(), NOW());

-- Nikka Coffey Grain (bottle_id = 25)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, natural_color, chill_filtered, distillation_type, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(25, 'Coffey Grain', 'nikka-coffey-grain-standard', NULL, 45.0, 'Ex-Bourbon American Oak', true, false, 'Coffey (column) still distilled',
 '{"smoky": 1, "peaty": 1, "fruity": 7, "floral": 4, "spicy": 3, "sweet": 9, "oaky": 4, "maritime": 1, "vanilla": 9, "chocolate": 3}',
 'Distilled in Nikka''s historic Coffey stills — continuous column stills imported from Scotland in the 1960s. The result is exceptionally smooth with bourbon-like sweetness: corn syrup, vanilla cream, and tropical fruit.',
 'Column-still grain whisky. Exceptionally sweet and smooth.',
 85.8, 1980, NOW(), NOW());

-- Maker's Mark Original (bottle_id = 26)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, aging_method, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(26, 'Original', 'makers-mark-original-standard', NULL, 45.0, 'New Charred American Oak (Level 3 Char)', '70% corn, 16% red winter wheat, 14% malted barley', 'Limestone cellar rotation', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 5, "floral": 2, "spicy": 4, "sweet": 8, "oaky": 5, "maritime": 1, "vanilla": 8, "chocolate": 3}',
 'The bourbon that replaced rye with red winter wheat in the mash bill, creating a softer, sweeter spirit. Hand-dipped in red wax since 1958. Caramel, vanilla, and baked bread with no harsh bite.',
 'The original wheated bourbon. Soft, sweet, approachable.',
 82.5, 4900, NOW(), NOW());

-- Maker's Mark Cask Strength (bottle_id = 27)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(27, 'Cask Strength', 'makers-mark-cask-strength-standard', NULL, 55.75, 'New Charred American Oak (Level 3 Char)', '70% corn, 16% red winter wheat, 14% malted barley', true, false,
 '{"smoky": 3, "peaty": 1, "fruity": 5, "floral": 2, "spicy": 6, "sweet": 8, "oaky": 7, "maritime": 1, "vanilla": 9, "chocolate": 4}',
 'The same wheated mash bill as the original but bottled straight from the barrel with no water added. Amplified caramel, brown sugar, and baking spices with a rich oaky backbone.',
 'Full-proof Maker''s Mark. All the sweetness amplified.',
 87.2, 1650, NOW(), NOW());

-- Maker's Mark 46 (bottle_id = 28)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, wood_finish, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(28, '46', 'makers-mark-46-standard', NULL, 47.0, 'New Charred American Oak', '70% corn, 16% red winter wheat, 14% malted barley', 'Seared French Oak Staves', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 5, "floral": 3, "spicy": 7, "sweet": 7, "oaky": 7, "maritime": 1, "vanilla": 8, "chocolate": 5}',
 'After initial maturation, 10 seared French oak staves are inserted into the barrel for an additional finish. This innovative process adds layers of baking spice, caramel, and subtle dark chocolate complexity.',
 'French oak stave finished. Extra complexity beyond the original.',
 85.9, 2100, NOW(), NOW());

-- Buffalo Trace Bourbon (bottle_id = 29)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, aging_method, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(29, 'Kentucky Straight Bourbon', 'buffalo-trace-bourbon-standard', NULL, 45.0, 'New Charred American Oak', 'Mash Bill #1: corn-heavy with rye', 'Warehouse H (iron-clad, single story)', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 5, "floral": 2, "spicy": 5, "sweet": 7, "oaky": 5, "maritime": 1, "vanilla": 8, "chocolate": 3}',
 'From America''s most award-winning distillery. Toffee, brown sugar, and vanilla with a hint of mint and anise. A classic Kentucky straight bourbon that over-delivers at every price point.',
 'The benchmark Kentucky bourbon. Award-winning and accessible.',
 84.3, 4500, NOW(), NOW());

-- Eagle Rare 10 (bottle_id = 30)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(30, 'Eagle Rare 10 Year', 'eagle-rare-10-standard', 10, 45.0, 'New Charred American Oak', 'Buffalo Trace Mash Bill #1', true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 6, "floral": 3, "spicy": 5, "sweet": 7, "oaky": 7, "maritime": 1, "vanilla": 8, "chocolate": 4}',
 'Ten years of Kentucky aging brings out bold toffee, dark cherry, and leather notes. Single barrel selected for consistent quality. One of the most sought-after bourbons for its quality-to-price ratio.',
 'Single barrel 10 year bourbon. Exceptional value and depth.',
 88.6, 3200, NOW(), NOW());

-- Blanton's Original (bottle_id = 31)
INSERT INTO expressions (bottle_id, name, slug, age_years, abv, cask_type, mash_bill, is_limited_edition, natural_color, chill_filtered, flavor_profile, story, description, avg_community_score, review_count, created_at, updated_at)
VALUES
(31, 'Blanton''s Original Single Barrel', 'blantons-original', NULL, 46.5, 'New Charred American Oak (Warehouse H)', 'Buffalo Trace Mash Bill #2 (high rye)', false, true, false,
 '{"smoky": 2, "peaty": 1, "fruity": 6, "floral": 3, "spicy": 7, "sweet": 7, "oaky": 6, "maritime": 1, "vanilla": 7, "chocolate": 4}',
 'The world''s first commercially marketed single barrel bourbon, created in 1984. Each bottle comes from a single hand-selected barrel in Warehouse H. Citrus, caramel, and rye spice with a long, warm finish. The iconic horse-and-jockey stopper makes every bottle collectible.',
 'The original single barrel bourbon. Collectible and exceptional.',
 90.1, 2800, NOW(), NOW());


-- ============================================================
-- AWARD SCORES
-- ============================================================

INSERT INTO award_scores (expression_id, competition_name, year, award_level, score, source_url, created_at) VALUES
-- M&H Apex Dead Sea Terroir (expression_id = 1)
(1, 'San Francisco World Spirits Competition', 2024, 'double_gold', 96, 'https://sfspiritscomp.com/results/2024', NOW()),
(1, 'International Wine & Spirit Competition', 2023, 'gold', 95, 'https://iwsc.net/results/2023', NOW()),
(1, 'World Whiskies Awards', 2024, 'gold', NULL, 'https://worldwhiskiesawards.com/2024', NOW()),

-- M&H Elements Sherry (expression_id = 4)
(4, 'World Whiskies Awards', 2024, 'gold', NULL, 'https://worldwhiskiesawards.com/2024', NOW()),
(4, 'International Wine & Spirit Competition', 2024, 'gold', 93, 'https://iwsc.net/results/2024', NOW()),

-- Lagavulin 16 (expression_id = 9)
(9, 'International Spirits Challenge', 2023, 'gold', 95, NULL, NOW()),
(9, 'San Francisco World Spirits Competition', 2023, 'double_gold', 97, NULL, NOW()),

-- Macallan 18 Sherry Oak (expression_id = 13)
(13, 'World Whiskies Awards', 2023, 'gold', NULL, NULL, NOW()),
(13, 'International Wine & Spirit Competition', 2023, 'gold', 96, NULL, NOW()),

-- Yamazaki 18 (expression_id = 19)
(19, 'World Whiskies Awards', 2024, 'double_gold', NULL, NULL, NOW()),
(19, 'International Spirits Challenge', 2024, 'gold', 98, NULL, NOW()),

-- Nikka From The Barrel (expression_id = 21)
(21, 'World Whiskies Awards', 2023, 'gold', NULL, NULL, NOW()),
(21, 'International Wine & Spirit Competition', 2024, 'gold', 94, NULL, NOW()),

-- Blanton's Original (expression_id = 29)
(29, 'San Francisco World Spirits Competition', 2024, 'gold', 93, NULL, NOW()),
(29, 'International Spirits Challenge', 2023, 'gold', 91, NULL, NOW());


-- ============================================================
-- VERIFICATION: Count inserted rows
-- ============================================================

SELECT 'distilleries' AS table_name, COUNT(*) AS row_count FROM distilleries
UNION ALL
SELECT 'bottles', COUNT(*) FROM bottles
UNION ALL
SELECT 'expressions', COUNT(*) FROM expressions
UNION ALL
SELECT 'award_scores', COUNT(*) FROM award_scores;
