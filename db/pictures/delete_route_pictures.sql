DELETE FROM pictures
WHERE picture_id = $1;

SELECT * FROM pictures
WHERE route_id = $2
