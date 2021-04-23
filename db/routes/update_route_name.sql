UPDATE routes
SET name = $1
WHERE route_id = $2
returning *;
