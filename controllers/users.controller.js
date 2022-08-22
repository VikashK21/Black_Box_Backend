const Users = new (require("../services/users.service"))();

class User_Ctrl {
  profile = async (req, res) => {
    try {
      const result = await Users.profile(req.user_id);
      if (typeof result === "object") {
        return res.status(200).json(result);
      }
      res.status(400).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  editProfile = async (req, res) => {
    try {
      if (
        req.body.hasOwnProperty("about") ||
        req.body.hasOwnProperty("phone_num") ||
        req.body.hasOwnProperty("img_thumbnail")
      ) {
        const result = await Users.editProfile(req.body, req.user_id);
        return res.status(202).json(result);
      }
      res.status(406).send("Cannot edit the credential/s directly!!");
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  signup = async (req, res) => {
    try {
      let data = req.body;
      if (req.hasOwnProperty("user")) {
        // console.log(req.user, "facebook/google");
        data = {
          provider: req.user.provider,
          img_thumbnail: req.user.photos[0].value,
          first_name: req.user.name.givenName,
          last_name: req.user.name.familyName,
          email: req.user.emails[0].value,
          password: req.user.id,
        };
      }
      const result = await Users.signup(data);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  logout = async (req, res) => {
    try {
      req.logout();
      console.log("print");
    } catch (error) {
      //only for the passport was...
    }
    res
      .status(200)
      .clearCookie("token_key")
      .send("The user is logged out now.");
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
        // console.log("The phone number login...");
        const result = await Users.loginWithPhoneOTP(req.body);
        // console.log(result, "result");
        if (typeof result === "object") {
          if (result.hasOwnProperty("token")) {
            res.cookie("token_key", result.token);
          }
          return res.status(200).json({
            to: result.to,
            channel: result.channel,
            status: result.status,
            dateCreated: result.dateCreated,
            token: result.token || null,
          });
        }
        res.status(404).send(result);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  };
}

module.exports = User_Ctrl;
