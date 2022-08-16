const router = require("express").Router();
const Users = new (require("../controllers/users.controller"))();
const { forLogout } = require("../auth/user.auth");
const passport = require("passport");

//home_page...
router.get("/", async (req, res, next) => {
  res.send({
    message: "Ok api is working 🚀",
    login: "https://black-box-backend.herokuapp.com/api/login",
    signup: "https://black-box-backend.herokuapp.com/api/signup",
    logout: "https://black-box-backend.herokuapp.com/api/logout",
  });
});

//Users:
router.post("/signup", forLogout, Users.signup);
router.post("/login", forLogout, Users.login);
router.post("/logout", Users.logout);
//google
router.get(
  "/signup/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/protected",
    failureRedirect: "/api/failure",
  })
);
//facebook
router.get(
  "/signup/facebook",
  passport.authenticate("facebook", { scope: "email" })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/protected",
    failureRedirect: "/api/failure",
  })
);
//handler
router.get("/protected", Users.signup);
router.get("/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

//Classes:

module.exports = router;
