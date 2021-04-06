
require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  bcrypt = require("bcryptjs");


const app = express();
app.use(express.json());
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14,
        }
    })
);

// ENDPOINTS
// HERE


massive({
    connectionString: CONNECTION_STRING,
    SSL: {rejectUnauthorized: false},
})
    .then((db) => {
        app.set("db", db);
        app.listen(SERVER_PORT, ( ) => console.log(`Da server is running on ${SERVER_PORT} mon.`));
    })
    .catch((err) => console.log(err));
