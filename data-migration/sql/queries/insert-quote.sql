INSERT INTO quotes.quote (legacy_id, author, quote)
VALUES (%L, %L, %L)
RETURNING *;