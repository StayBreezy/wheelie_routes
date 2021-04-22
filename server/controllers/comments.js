module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get("db");
    const comments = await db.comments.get_all_comments();
    return res.send(comments);
  },
  post: async (req, res) => {
    const { user_id, route_id, comment } = req.body;
    const db = req.app.get("db");
    const comments = await db.comments.post_comment([
      user_id,
      route_id,
      trail_conditions,
      comment,
    ]);
    return res.send(comments);
  },
  editComment: async (req, res) => {
    const { comment_id, trail_conditions, comment } = req.body;
    const db = req.app.get("db");
    const comments = await db.comments.edit_comment([
      comment_id,
      trail_conditions,
      comment,
    ]);
    return res.send(comments);
  },
  deleteComment: async (req, res) => {
    const { comment_id, route_id } = req.body;
    const db = req.app.get("db");
    const comments = await db.comments.delete_comment([comment_id, route_id]);
    return res.send(comments);
  },
};
