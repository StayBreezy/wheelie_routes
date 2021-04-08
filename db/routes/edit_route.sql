UPDATE routes
SET recommended_bike = $2
,water = $3
,shops = $4
WHERE route_id = $1;

SELECT * FROM routes WHERE route_id = $1;
