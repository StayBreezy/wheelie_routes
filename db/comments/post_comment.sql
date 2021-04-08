INSERT INTO comments (user_id, route_id, trail_conditions, comment)
VALUES ($1, $2, $3, $4);

SELECT * FROM comments
WHERE route_id = $2
