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
    msg: "After login you have to send the auth token axcept /api/upload - video",
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
      logout: { POST: { route: "/api/logout" } },
      signup_google: { GET: { route: "/api/signup/google" } },
      signup_facebook: { GET: { route: "/api/signup/facebook" } },
      profile: { GET: { route: "/api/profile", parameters: "token" } },
      editProfile: {
        PATCH: {
          route: "/api/profile",
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
      forgetPass: {
        1: {
          POST: {
            route: "/api/sendotp",
            parameters: {
              email: "string",
            },
          },
          response: {
            status: true,
            status: false,
          },
        },
        2: {
          POST: {
            route: "/api/verification",
            parameters: {
              otp: "number",
            },
          },
          response: {
            status: true,
            status: false,
          },
        },
        3: {
          PATCH: {
            route: "/api/forgetpass",
            parameters: {
              password: "string",
            },
          },
        },
      },
      hostersProfileById: {
        GET: {
          route: "/api/host/profile/:id",
        },
      },
    },
  });
});

//Users:
/**
 *
 */
//only admin can view this...
router.get("/adminallowance", Users.allUsers);
router.post("/sendotp", Users.verification);
router.post("/verification", Users.verifying);
router.get("/host/profile/:id", Users.hostProfile);
router.get("/profile", authorizationToken, Users.profile);
router.patch("/profile", authorizationToken, Users.editProfile);
router.patch("/forgetpass", Users.forgetPass);
router.post("/signup", forLogout, Users.signup);
router.post("/login", forLogout, Users.login);
router.post("/logout", Users.logout);
//google
router.get(
  "/signup/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/protected",
    failureRedirect: "/api/failure",
  }),
);
//facebook
router.get(
  "/signup/facebook",
  passport.authenticate("facebook", { scope: "email" }),
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/protected",
    failureRedirect: "/api/failure",
  }),
);
//handler
router.get("/protected", Users.signup);
router.get("/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

module.exports = router;
