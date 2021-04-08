UPDATE comments
SET trail_conditions = $2
,comment = $3
WHERE comment_id = $1;

SELECT * FROM comments WHERE comment_id = $1;
