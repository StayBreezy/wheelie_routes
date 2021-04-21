INSERT INTO routes (gpx, distance, vertical_gain, recommended_bike, water, shops, user_id, date_created, name)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *;
