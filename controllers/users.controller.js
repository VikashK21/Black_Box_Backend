const Users = new (require("../services/users.service"))();
const { authenticationToken } = require("../auth/user.auth");
const bcrypt = require('bcrypt');

class User_Ctrl {
  signup = async (req, res) => {
    try {
      const {password} = req.body;
      req.body.password = await bcrypt.hash(password, 12);
      const result = await Users.signup(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  login = async (req, res) => {
    try {
      if (req.body.hasOwnProperty("email")) {
        const result = await Users.loginWithEmailPass(
          req.body.email,
          
        );
        const token = await authenticationToken(req.body);
        res.status(202).cookie("token_key", token).json(result);
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
}

module.exports = User_Ctrl;
