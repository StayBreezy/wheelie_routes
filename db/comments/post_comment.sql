INSERT INTO comments (user_id, route_id, comment)
VALUES ($1, $2, $3);

SELECT * FROM comments
WHERE route_id = $2;
