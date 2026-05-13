-- Add prices table for bottle pricing data
CREATE TABLE IF NOT EXISTS prices (
  id SERIAL PRIMARY KEY,
  expression_id INTEGER NOT NULL REFERENCES expressions(id),
  country_code VARCHAR(2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  min_price REAL,
  max_price REAL,
  avg_price REAL,
  retailer TEXT,
  retailer_url TEXT,
  last_updated TIMESTAMP DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS prices_expression_idx ON prices(expression_id);
CREATE INDEX IF NOT EXISTS prices_country_idx ON prices(country_code);
CREATE UNIQUE INDEX IF NOT EXISTS prices_expression_country_retailer_idx ON prices(expression_id, country_code, retailer);
