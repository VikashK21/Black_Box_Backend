const Users = new (require("../services/users.service"))();

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
      if (req.body.hasOwnProperty("email")) {
        const result = await Users.loginWithEmailPass(
          req.body.email,
          req.body.password
        );
        if (typeof result === "object") {
          return res.status(202).cookie("token_key", result.token).json(result);
        }
        res.status(404).send(result);
      } else if (req.body.hasOwnProperty("phone_num")) {
        const result = await Users.loginWithPhoneOTP(req.body.phone_num);
        console.log(result);
        res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  };
}

module.exports = User_Ctrl;
