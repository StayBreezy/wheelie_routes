require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  routes = require("./controllers/routes"),
  comments = require("./controllers/comments"),
  pictures = require('./controllers/pictures')
  user = require("./controllers/user"),
  aws = require('aws-sdk');
  bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env;

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

app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-east-2',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});


// ENDPOINTS
// HERE
app.post("/api/auth/register", user.register);
app.post("/api/auth/login", user.login);
app.get("/api/auth/me", user.getUser);
app.post("/api/auth/logout", user.logout);

app.get("/api/getRoutes", routes.getAll);
app.get("/api/getFiltered", routes.filterRoutes);
app.put("/api/editRoute", routes.editRoute);
app.get("/api/getMyRoutes", routes.getMyRoutes);
app.delete("/api/deleteRoute", routes.deleteRoute);

app.get("/api/getComments", comments.getAll);
app.post("/api/postComment", comments.post);
app.put("/api/editComment", comments.editComment);
app.delete("/api/deleteComment", comments.deleteComment);

app.get("api/getPictures/:route_id", pictures.getRoutePics);
app.post('api/uploadPictures/:route_id', pictures.uploadRoutePics)



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
