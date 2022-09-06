const router = require("express").Router();
const Users = new (require("../controllers/users.controller"))();
const { forLogout, authorizationToken } = require("../auth/user.auth");
const passport = require("passport");

//home_page...
// router.get('/', (req, res) => {
//   res.status(200).send('<nav><a href="https://black-box-creative.herokuapp.com/api/users">Users Detail</a><hr><a href="https://black-box-creative.herokuapp.com/api/course">Courses with Classes Detail</a></nav>')
// })
router.get("/users", async (req, res, next) => {
  res.send({
    message: "Ok api is working 🚀",
    login: {
      POST: {
        route: "/api/login",
        parameters: { email: "string", password: "string" },
      },
      signup: {
        POST: {
          route: "/api/signup",
          parameters: {
            img_thumbnail: "string",
            first_name: "string",
            last_name: "string",
            email: "string",
            phone_num: "string",
            password: "string",
          },
        },
      },
      logout: { POST: { route: "/api/logout", parameters: {} } },
      signup_google: "/api/signup/google",
      signup_facebook: "/api/signup/facebook",
      profile: "/api/profile",
      editProfile: "/api/profile",
    },
  });
});

//Users:
/**
 *
 */
router.get("/profile", authorizationToken, Users.profile);
router.patch("/profile", authorizationToken, Users.editProfile);
router.patch("/forgetpass", Users.forgetPass);
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
