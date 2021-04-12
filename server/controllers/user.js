const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const result = await db.users.find_user_by_username([username]);
    const existingUser = result[0];
    if (existingUser) {
      return res.status(409).send("Username Taken");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.users.create_user([username, hash]);
    const user = registeredUser[0];
    req.session.user = {
      id: user.user_id,
      username: user.username,
      password: user.password,
    };
    return res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await req.app
      .get("db")
      .users.find_user_by_username([username]);
    const user = foundUser[0];
    if (!user) {
      return res.status(409).send(`Username/Password doesn't match`);
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) {
      return res.status(403).send(`Username/Password doesn't match`);
    }
    req.session.user = {
      username: user.username,
      password: user.password,
    };
    return res.send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (req.session.user) {
      return res.send(req.session.user);
    }
    return res.sendStatus(404);
  },
};
