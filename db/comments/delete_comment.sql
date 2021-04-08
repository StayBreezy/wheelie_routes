DELETE FROM comments
WHERE comment_id = $1;

SELECT * FROM comments WHERE route_id = $2;
