const Users = new (require("../services/users.service"))();
const { authenticationToken } = require("../auth/user.auth");

class User_Ctrl {
  signup = async (req, res) => {
    try {
      const result = await Users.signup(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  login = async (req, res) => {
    try {
      console.log('what happened???', req.body);
      if (req.body.hasOwnProperty("email")) {
        const result = await Users.loginWithEmailPass(
          req.body.email,
          req.body.password
        );
        const token = await authenticationToken(req.body);
        res.status(202).cookie("token_key", token).json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  };
}

module.exports = User_Ctrl;
