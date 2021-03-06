module.exports = {
  getAll: async (req, res) => {
    const {id} = req.body;
    const db = req.app.get("db");
    const comments = await db.comments.get_all_comments([id]);
    return res.send(comments);
  },
  post: async (req, res) => {
    const { username, route_id, comment } = req.body;
    const db = req.app.get("db");
    const comments = await db.comments.post_comment([
      username,
      route_id,
      comment,
    ]);
    return res.send(comments);
  },
  editComment: async (req, res) => {
    const { comment_id, trail_conditions, comment } = req.body;
    const db = req.app.get("db");
    const comments = await db.comments.edit_comment([
      comment_id,
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
