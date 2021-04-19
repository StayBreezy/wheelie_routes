module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get("db");
    const routes = await db.search.get_all_routes();
    return res.send(routes);
  },
  uploadRoute: async (req, res) => {
    const { url, data, recommended_bike, water, shops, description } = req.body;
    const {distanceI, vertical_gainI} = data
    console.log({ url, data, recommended_bike, water, shops, description });
    const db = req.app.get("db");
    const { id } = req.session.user;
    const date_created = new Date();
    if (!id) {
      return res.sendStatus(403);
    }
    await db.routes.post_new_route([
      url,
      distanceI,
      vertical_gainI,
      recommended_bike,
      water,
      shops,
      +id,
      date_created,
      description,
    ]);
    return res.sendStatus(200);
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
  deleteRoute: (req, res) => {
    const { route_id } = req.body;
    const db = req.app.get("db");
    db.routes.delete_route([route_id]);
    return res.sendStatus(200);
  },
  getRoute: async (req, res) => {
    const id = req.params;
    const db = req.app.get("db");
    const route = await db.search.get_route_by_id([id]);
    return res.send(route);
  },
};
