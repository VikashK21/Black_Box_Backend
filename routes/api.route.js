const router = require("express").Router();
const Users = new (require("../controllers/users.controller"))();
const {forLogout} = require("../auth/user.auth");

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

//Classes:

module.exports = router;
