INSERT INTO quotes.quote (author, quote)
VALUES (%L, %L)
RETURNING *;