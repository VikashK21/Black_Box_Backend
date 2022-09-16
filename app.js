//Remeber the errors can be from here also, when without .evn...
require("dotenv").config();
require("./auth/google.auth");
// require("./auth/facebook.auth");
//Modules : ) ...
const express = require("express");
const createError = require("http-errors");
const passport = require("passport");
const session = require("express-session");
const path = require("path");

//Helping to understand APIs...
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUI = require("swagger-ui-express");
// const swaggerDocs = swaggerJSDoc(require("./swagger.json"));

//The status to the console, when triggered an API...
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//Middlewares Section...
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

//Home page
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  // });
}
// app.get("/", async (req, res, next) => {
//   res.send({
//     message:
//       "You are successfully standing on to the root page, please go to /api/users || /api/course page to view details.",
//   });
// res.send(
//   '<a href="http://localhost:3001/api/signup/google">Authenticate with Google</a>'
// );
// });

//The APIs sections...
app.use("/api", require("./routes/users.routes"));
app.use("/api", require("./routes/courses.routes"));
// app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Error Handlings...
app.use((req, res, next) => {
  res.redirect("https://creative-black-box.herokuapp.com/");
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  console.log(err.status, "comming from herr...");
  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message,
  });
});

//The listner...
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
