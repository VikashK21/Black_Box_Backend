const router = require("express").Router();
const Users = new (require("../controllers/users.controller"))();
const { forLogout, authorizationToken } = require("../auth/user.auth");
const passport = require("passport");

//home_page...
router.get("/", async (req, res, next) => {
  res.send({
    message: "Ok api is working 🚀",
    login: "/api/login",
    signup: "/api/signup",
    logout: "/api/logout",
    signup_google: "/api/signup/google",
    signup_facebook: "/api/signup/facebook",
  });
});

//Users:
router.get("/profile", authorizationToken, Users.profile);
router.patch("/profile", authorizationToken, Users.editProfile);
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

module.exports = router;
