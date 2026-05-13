-- Prices and Awards for expansion 2 expressions

DO $$
DECLARE
  eid INTEGER;
BEGIN

-- BUNNAHABHAIN 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'bunnahabhain-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 49.99, 69.99, 59.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 35.00, 48.00, 40.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 240.00, 320.00, 275.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- BUNNAHABHAIN 18
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'bunnahabhain-18-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 99.99, 139.99, 119.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 72.00, 98.00, 82.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 78.00, 108.00, 90.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 450.00, 620.00, 530.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- CAOL ILA 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'caol-ila-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 74.99, 64.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 40.00, 56.00, 47.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 260.00, 340.00, 295.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- OBAN 14
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'oban-14-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 74.99, 99.99, 84.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 48.00, 65.00, 55.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 52.00, 72.00, 60.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 340.00, 450.00, 390.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- DALWHINNIE 15
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'dalwhinnie-15-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 74.99, 62.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 36.00, 48.00, 41.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 250.00, 340.00, 290.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ABERFELDY 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'aberfeldy-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 49.99, 42.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 28.00, 38.00, 32.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 30.00, 40.00, 34.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 180.00, 240.00, 200.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ARRAN 10
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'arran-10-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 44.99, 59.99, 49.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 32.00, 42.00, 36.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 34.00, 45.00, 38.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 200.00, 270.00, 230.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ARRAN 18
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'arran-18-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 99.99, 139.99, 119.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 70.00, 95.00, 80.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 75.00, 100.00, 86.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 450.00, 600.00, 520.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- COMPASS BOX PEAT MONSTER
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'compass-box-peat-monster-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 44.99, 59.99, 52.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 32.00, 42.00, 36.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 34.00, 46.00, 39.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 210.00, 280.00, 245.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- COMPASS BOX SPICE TREE
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'compass-box-spice-tree-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 49.99, 69.99, 59.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 36.00, 48.00, 41.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 240.00, 320.00, 275.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- OLD FORESTER 1920
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'old-forester-1920-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 69.99, 59.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 55.00, 72.00, 62.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 58.00, 78.00, 66.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 300.00, 400.00, 340.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- NEW RIFF BiB
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'new-riff-bourbon-bib-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 39.99, 49.99, 44.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 48.00, 62.00, 54.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 50.00, 65.00, 56.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 240.00, 310.00, 270.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- BARRELL SEAGRASS
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'barrell-seagrass-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 79.99, 99.99, 89.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 72.00, 92.00, 80.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 75.00, 98.00, 85.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 380.00, 500.00, 430.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- MONKEY SHOULDER
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'monkey-shoulder-original-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 28.99, 36.99, 32.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 22.00, 30.00, 25.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 24.00, 32.00, 27.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 130.00, 175.00, 150.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- CROWN ROYAL DELUXE
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'crown-royal-deluxe-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 24.99, 32.99, 28.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 28.00, 38.00, 32.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 25.00, 35.00, 29.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 130.00, 180.00, 150.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- LOT NO. 40 RYE
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'lot-40-rye-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 49.99, 42.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 32.00, 45.00, 38.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 34.00, 48.00, 40.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 180.00, 240.00, 200.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ============================================================
-- AWARDS FOR NEW AND EXISTING EXPRESSIONS
-- ============================================================

-- Bunnahabhain 12 awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'bunnahabhain-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'IWSC', 2023, 'gold', 95),
    (eid, 'San Francisco World Spirits Competition', 2024, 'double_gold', 96)
  ON CONFLICT DO NOTHING;
END IF;

-- Caol Ila 12 awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'caol-ila-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'IWSC', 2024, 'gold', 93),
    (eid, 'World Whiskies Awards', 2023, 'gold', NULL)
  ON CONFLICT DO NOTHING;
END IF;

-- Compass Box Spice Tree awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'compass-box-spice-tree-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'World Whiskies Awards', 2024, 'gold', NULL),
    (eid, 'IWSC', 2024, 'gold', 94)
  ON CONFLICT DO NOTHING;
END IF;

-- Old Forester 1920 awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'old-forester-1920-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'San Francisco World Spirits Competition', 2023, 'double_gold', 97),
    (eid, 'American Whiskey Masters', 2024, 'gold', NULL)
  ON CONFLICT DO NOTHING;
END IF;

-- Barrell Seagrass awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'barrell-seagrass-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'San Francisco World Spirits Competition', 2022, 'double_gold', 98),
    (eid, 'World Whiskies Awards', 2023, 'gold', NULL),
    (eid, 'IWSC', 2023, 'gold', 96)
  ON CONFLICT DO NOTHING;
END IF;

-- Arran 18 awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'arran-18-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'World Whiskies Awards', 2024, 'gold', NULL),
    (eid, 'IWSC', 2024, 'gold', 95)
  ON CONFLICT DO NOTHING;
END IF;

-- Kavalan Solist Vinho awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'kavalan-solist-vinho-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'World Whiskies Awards', 2015, 'gold', NULL),
    (eid, 'SFWSC', 2024, 'double_gold', 97),
    (eid, 'IWSC', 2023, 'gold', 96)
  ON CONFLICT DO NOTHING;
END IF;

-- Pappy 20 awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'pappy-20-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'San Francisco World Spirits Competition', 2023, 'double_gold', 99),
    (eid, 'World Whiskies Awards', 2024, 'gold', NULL)
  ON CONFLICT DO NOTHING;
END IF;

-- Elijah Craig Barrel Proof awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'ec-barrel-proof-a124';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'San Francisco World Spirits Competition', 2024, 'double_gold', 97),
    (eid, 'Whisky Advocate Top 20', 2023, 'gold', NULL)
  ON CONFLICT DO NOTHING;
END IF;

-- Glenfarclas 25 awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfarclas-25-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'IWSC', 2024, 'gold', 96),
    (eid, 'World Whiskies Awards', 2023, 'gold', NULL)
  ON CONFLICT DO NOTHING;
END IF;

-- Glen Scotia Victoriana awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glen-scotia-victoriana-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'San Francisco World Spirits Competition', 2023, 'double_gold', 96),
    (eid, 'IWSC', 2024, 'gold', 94)
  ON CONFLICT DO NOTHING;
END IF;

-- WhistlePig 10 awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'whistlepig-10-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'San Francisco World Spirits Competition', 2024, 'double_gold', 96),
    (eid, 'World Whiskies Awards', 2023, 'gold', NULL)
  ON CONFLICT DO NOTHING;
END IF;

-- Crown Royal Northern Harvest awards
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'crown-royal-harvest-rye-standard';
IF eid IS NOT NULL THEN
  INSERT INTO award_scores (expression_id, competition_name, year, award_level, score) VALUES
    (eid, 'Jim Murray Whisky Bible', 2016, 'gold', 97)
  ON CONFLICT DO NOTHING;
END IF;

END $$;
