require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  routes = require("./controllers/routes"),
  bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);

// ENDPOINTS
// HERE
app.get("/api/getRoutes", routes.getAll);
app.get("/api/getFiltered", routes.filterRoutes);
app.put("/api/editRoute", routes.editRoute);
app.get("/api/getMyRoutes", routes.getMyRoutes);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    app.listen(SERVER_PORT, () =>
      console.log(`Da server is running on ${SERVER_PORT} mon.`)
    );
  })
  .catch((err) => console.log(err));
