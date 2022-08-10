const router = require("express").Router();
const Users = new (require("../controllers/users.controller"))();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

//Users:
router.post("/signup", Users.signup);
router.post("/login", Users.login);

//Classes:

module.exports = router;
