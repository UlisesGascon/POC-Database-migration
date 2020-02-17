create extension if not exists "uuid-ossp";

CREATE TABLE quotes.quote(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  legacy_id VARCHAR (250),
  author VARCHAR (250) NOT NULL,
  quote VARCHAR (250) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  modified_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS quote_id_idx ON quotes.quote(id);
