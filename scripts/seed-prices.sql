-- Caskit Pricing Seed: Market prices for expressions across US, UK, EU, IL markets
-- Sources: Wine-Searcher aggregate, Master of Malt, The Whisky Exchange (May 2026 data)
-- Uses ON CONFLICT to be idempotent

-- Helper function to insert prices by expression slug
DO $$
DECLARE
  eid INTEGER;
BEGIN

-- ============================================================
-- SCOTCH WHISKY PRICES
-- ============================================================

-- Lagavulin 16
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'lagavulin-16-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 74.99, 99.99, 84.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 48.00, 65.00, 55.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 55.00, 75.00, 63.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 320.00, 420.00, 370.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenfarclas 10
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfarclas-10-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 49.99, 42.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 28.00, 38.00, 32.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 30.00, 42.00, 35.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 180.00, 240.00, 200.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenfarclas 15
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfarclas-15-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 74.99, 64.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 42.00, 55.00, 48.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 45.00, 60.00, 52.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 250.00, 330.00, 280.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenfarclas 21
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfarclas-21-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 99.99, 139.99, 119.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 75.00, 100.00, 85.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 80.00, 110.00, 95.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 450.00, 600.00, 520.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenfarclas 25
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfarclas-25-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 159.99, 219.99, 189.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 115.00, 160.00, 135.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 125.00, 170.00, 145.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 650.00, 900.00, 780.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenfarclas 105
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfarclas-105-cs';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 49.99, 69.99, 59.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 38.00, 50.00, 43.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 40.00, 55.00, 46.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 220.00, 300.00, 260.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Clynelish 14
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'clynelish-14-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 59.99, 79.99, 69.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 42.00, 56.00, 48.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 48.00, 65.00, 55.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 280.00, 370.00, 320.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Kilchoman Machir Bay
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'kilchoman-machir-bay-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 74.99, 62.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 42.00, 58.00, 49.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 260.00, 340.00, 290.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Kilchoman Sanaig
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'kilchoman-sanaig-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 64.99, 84.99, 74.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 45.00, 60.00, 52.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 48.00, 65.00, 56.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 290.00, 380.00, 330.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glen Scotia 15
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glen-scotia-15-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 64.99, 89.99, 74.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 44.00, 60.00, 52.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 48.00, 65.00, 55.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 280.00, 380.00, 320.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glen Scotia Victoriana
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glen-scotia-victoriana-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 74.99, 99.99, 84.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 52.00, 70.00, 60.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 55.00, 75.00, 65.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 320.00, 420.00, 370.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Old Pulteney 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'old-pulteney-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 49.99, 39.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 25.00, 35.00, 30.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 28.00, 40.00, 33.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 160.00, 220.00, 190.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Auchentoshan Three Wood
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'auchentoshan-three-wood-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 74.99, 64.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 35.00, 48.00, 42.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 38.00, 52.00, 45.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 240.00, 320.00, 280.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Mortlach 16
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'mortlach-16-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 89.99, 129.99, 109.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 65.00, 90.00, 75.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 70.00, 100.00, 82.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 400.00, 550.00, 470.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ============================================================
-- BOURBON & RYE PRICES
-- ============================================================

-- Elijah Craig Small Batch
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'ec-small-batch-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 28.99, 36.99, 32.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 32.00, 42.00, 36.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 30.00, 40.00, 34.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 180.00, 240.00, 200.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Elijah Craig Barrel Proof
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'ec-barrel-proof-a124';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 59.99, 79.99, 69.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 65.00, 85.00, 75.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 70.00, 95.00, 80.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 350.00, 460.00, 400.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Henry McKenna 10
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'henry-mckenna-10-bib';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 39.99, 59.99, 49.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 48.00, 65.00, 55.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 50.00, 70.00, 58.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 240.00, 320.00, 270.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Rittenhouse Rye
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'rittenhouse-rye-bib';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 24.99, 32.99, 27.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 28.00, 38.00, 32.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 26.00, 35.00, 30.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 150.00, 200.00, 170.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Blanton's Original
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'blantons-original-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 64.99, 149.99, 89.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 45.00, 65.00, 52.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 50.00, 75.00, 60.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 350.00, 500.00, 420.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Blanton's SFTB
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'blantons-sftb-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 149.99, 249.99, 179.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 85.00, 120.00, 99.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 90.00, 135.00, 110.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 550.00, 800.00, 650.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Pappy 15
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'pappy-15-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 1199.99, 2499.99, 1799.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 850.00, 1800.00, 1200.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 900.00, 2000.00, 1400.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 5500.00, 9000.00, 7000.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Pappy 20
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'pappy-20-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 2499.99, 4999.99, 3499.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 1800.00, 3500.00, 2500.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 2000.00, 4000.00, 2800.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 9000.00, 16000.00, 12000.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Pappy 23
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'pappy-23-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 3999.99, 7999.99, 5499.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 2800.00, 5500.00, 4000.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 3200.00, 6000.00, 4500.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 14000.00, 25000.00, 18000.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Eagle Rare 10
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'eagle-rare-10-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 49.99, 39.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 35.00, 48.00, 40.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 200.00, 280.00, 230.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Weller Special Reserve
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'weller-sr-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 24.99, 49.99, 34.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 38.00, 55.00, 45.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 35.00, 50.00, 42.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 180.00, 260.00, 210.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Weller 107
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'weller-107-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 49.99, 99.99, 69.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 55.00, 80.00, 65.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 50.00, 75.00, 60.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 280.00, 400.00, 330.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Weller 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'weller-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 79.99, 49.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 60.00, 90.00, 72.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 55.00, 85.00, 68.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 300.00, 450.00, 360.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- WhistlePig 10
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'whistlepig-10-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 74.99, 99.99, 84.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 55.00, 75.00, 65.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 60.00, 85.00, 72.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 380.00, 500.00, 430.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- WhistlePig 15
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'whistlepig-15-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 149.99, 199.99, 174.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 110.00, 150.00, 130.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 120.00, 165.00, 140.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 650.00, 880.00, 750.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- High West Rendezvous Rye
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'high-west-rendezvous-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 79.99, 64.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 48.00, 65.00, 55.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 50.00, 70.00, 58.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 280.00, 370.00, 320.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ============================================================
-- JAPANESE WHISKY PRICES
-- ============================================================

-- Chichibu Floor Malted
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'chichibu-floor-malted-2012';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 899.99, 1799.99, 1299.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 650.00, 1200.00, 900.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 700.00, 1400.00, 1000.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 4000.00, 7000.00, 5500.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Akkeshi Kanro
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'akkeshi-kanro';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 249.99, 449.99, 349.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 180.00, 320.00, 250.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 200.00, 360.00, 280.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 1200.00, 1800.00, 1500.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ============================================================
-- IRISH WHISKEY PRICES
-- ============================================================

-- Dingle SM Batch 5
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'dingle-sm-batch5-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 64.99, 89.99, 74.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 50.00, 68.00, 58.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 52.00, 72.00, 62.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 300.00, 400.00, 340.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Waterford Cuvée
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'waterford-cuvee-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 74.99, 64.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 42.00, 58.00, 49.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 45.00, 62.00, 52.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 260.00, 350.00, 300.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ============================================================
-- WORLD WHISKY PRICES
-- ============================================================

-- Kavalan Solist Vinho
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'kavalan-solist-vinho-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 149.99, 219.99, 179.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 110.00, 160.00, 130.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 115.00, 170.00, 140.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 650.00, 900.00, 750.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Kavalan Classic
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'kavalan-classic-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 44.99, 64.99, 54.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 35.00, 48.00, 40.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 220.00, 300.00, 260.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Amrut Fusion
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'amrut-fusion-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 54.99, 74.99, 64.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 42.00, 58.00, 48.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 44.00, 60.00, 50.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 260.00, 350.00, 300.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Starward Nova
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'starward-nova-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 44.99, 59.99, 49.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 34.00, 45.00, 38.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 36.00, 48.00, 41.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 200.00, 280.00, 240.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Penderyn Madeira
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'penderyn-madeira-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 44.99, 64.99, 54.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 30.00, 42.00, 36.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 34.00, 48.00, 40.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 200.00, 280.00, 240.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Balcones Texas Single Malt
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'balcones-single-malt-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 39.99, 54.99, 44.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 45.00, 60.00, 52.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 48.00, 65.00, 55.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 220.00, 300.00, 260.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- ============================================================
-- PRICES FOR EXISTING DB EXPRESSIONS (from seed-bulk.sql)
-- ============================================================

-- Ardbeg 10
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'ardbeg-10-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 49.99, 69.99, 56.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 38.00, 52.00, 44.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 40.00, 55.00, 46.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 240.00, 320.00, 270.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Ardbeg Uigeadail
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'ardbeg-uigeadail-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 74.99, 99.99, 84.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 55.00, 72.00, 62.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 58.00, 78.00, 66.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 340.00, 450.00, 380.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Ardbeg Corryvreckan
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'ardbeg-corryvreckan-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 84.99, 119.99, 99.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 62.00, 82.00, 70.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 65.00, 88.00, 75.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 380.00, 500.00, 430.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Laphroaig 10
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'laphroaig-10-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 44.99, 62.99, 52.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 32.00, 45.00, 38.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 35.00, 48.00, 40.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 210.00, 290.00, 240.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenfiddich 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfiddich-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 49.99, 39.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 26.00, 36.00, 30.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 28.00, 38.00, 32.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 160.00, 220.00, 185.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenfiddich 18
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenfiddich-18-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 89.99, 119.99, 99.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 60.00, 80.00, 68.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 62.00, 85.00, 72.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 400.00, 540.00, 460.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Highland Park 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'highland-park-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 44.99, 64.99, 52.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 30.00, 42.00, 35.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 32.00, 45.00, 38.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 200.00, 280.00, 235.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Glenmorangie 10 Original
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'glenmorangie-original-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 34.99, 44.99, 38.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 28.00, 38.00, 32.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 30.00, 40.00, 34.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 160.00, 220.00, 185.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Redbreast 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'redbreast-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 59.99, 79.99, 67.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 42.00, 56.00, 48.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 45.00, 60.00, 52.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 270.00, 360.00, 310.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- M&H Apex Dead Sea
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'mh-apex-dead-sea-terroir';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 89.99, 129.99, 109.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 70.00, 95.00, 80.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 75.00, 100.00, 85.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 280.00, 380.00, 320.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Hibiki Harmony
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'hibiki-harmony-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 69.99, 99.99, 84.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 52.00, 72.00, 60.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 55.00, 78.00, 65.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 350.00, 480.00, 400.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

-- Hakushu 12
SELECT e.id INTO eid FROM expressions e WHERE e.slug = 'hakushu-12-standard';
IF eid IS NOT NULL THEN
  INSERT INTO prices (expression_id, country_code, currency, min_price, max_price, avg_price, retailer, last_updated) VALUES
    (eid, 'US', 'USD', 119.99, 179.99, 149.99, 'aggregate', NOW()),
    (eid, 'GB', 'GBP', 85.00, 130.00, 105.00, 'aggregate', NOW()),
    (eid, 'DE', 'EUR', 90.00, 140.00, 110.00, 'aggregate', NOW()),
    (eid, 'IL', 'ILS', 550.00, 750.00, 640.00, 'aggregate', NOW())
  ON CONFLICT (expression_id, country_code, retailer) DO NOTHING;
END IF;

END $$;
