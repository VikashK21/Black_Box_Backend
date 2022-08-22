require("dotenv").config();
require("./auth/google.auth");
require("./auth/facebook.auth");
const express = require("express");
const createError = require("http-errors");
const passport = require("passport");
const session = require("express-session");

const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SECRET_KEY_TOKEN,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res, next) => {
  // res.send({
  //   message:
  //     "You are successfully standing on to the root page, please go to /api page to view details.",
  // });
  res.send(
    '<a href="http://localhost:3001/api/signup/google">Authenticate with Google</a>'
  );
});

app.use("/api", require("./routes/users.routes"));
app.use("/api", require("./routes/courses.routes"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
