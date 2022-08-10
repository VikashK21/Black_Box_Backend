const router = require("express").Router();
const Users = new (require("../controllers/users.controller"))();

router.get("/", async (req, res, next) => {
  res.send({
    message: "Ok api is working 🚀",
    login: "https://black-box-backend.herokuapp.com/api/login",
    signup: "https://black-box-backend.herokuapp.com/api/signup",
  });
});

//Users:
router.post("/signup", Users.signup);
router.post("/login", Users.login);

//Classes:

module.exports = router;
