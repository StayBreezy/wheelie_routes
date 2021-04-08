module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get("db");
    const routes = await db.search.get_all_routes();
    return res.send(routes);
  },
  filterRoutes: async (req, res) => {
    const { string } = req.body;
    const db = req.app.get("db");
    const result = await db.query(string);
    return res.send(result);
  },
  editRoute: async (req, res) => {
    const { route_id, recommended_bike, water, shops } = req.body;
    const db = req.app.get("db");
    const route = await db.routes.edit_route([
      route_id,
      recommended_bike,
      water,
      shops,
    ]);
    return res.send(route);
  },
  getMyRoutes: async (req, res) => {
    const { user_id } = req.body;
    const db = req.app.get("db");
    const routes = await db.search.get_my_routes([user_id]);
    return res.send(routes);
  },
};
