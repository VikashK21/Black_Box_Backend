//Remeber the errors can be from here also, when without .evn...
//did not occured the changes let me try again...
require("dotenv").config();
//////-----> rember this part...
require("./auth/google.auth");
require("./auth/facebook.auth");
//Modules : ) ...
const express = require("express");
const createError = require("http-errors");
const passport = require("passport");
//  -----> rember this part...
const session = require("express-session");
const cookieParser = require("cookie-parser");
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

/////Related to social auth....
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY_TOKEN,
    resave: true,
    saveUninitialized: true,
  }),
);
// -----> rember this part..
app.use(passport.initialize());
app.use(passport.session());

//Home page///
///////Remeber for heroku APP....
// -----> rember this part..
// if (process.env.NODE_ENV == "production") {
// app.use(express.static("client/build"));  
//   // app.get("/*", (req, res) => {
//   //   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
//   // });
// }
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
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api", require("./routes/classroom.routes"));
// app.use("/meeting", require("./server"));
// app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Error Handlings...
app.use((req, res, next) => {
  //////For the heroku appp -----> rember this part..
  // res.redirect("http://localhost:3001");
  // res.redirect("https://creative-black-box.herokuapp.com/");
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
debugger;
try {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
} catch (err) {
  console.log(err.message);
}
