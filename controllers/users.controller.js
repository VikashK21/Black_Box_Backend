const { send_OTP } = require("../auth/verfication");
const crypto = require("crypto");
const Users = new (require("../services/users.service"))();
const fs = require("fs");
const { token } = require("morgan");

class User_Ctrl {
  allUsers = async (req, res) => {
    try {
      const result = await Users.allUsers();
      res.status(200).json({ totalUsers: result.Users.length, ...result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  verification = (req, res) => {
    const otp = crypto.randomInt(100000, 999999);
    send_OTP(req.body.email, otp);
    res.status(200).json({ status: true });
  };

  verifying = async (req, res) => {
    const data = JSON.parse(fs.readFileSync("./youtube.json", "utf-8"));
    if (data.passCode === req.body.otp) {
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ status: false });
    }
  };

  hostProfile = async (req, res) => {
    try {
      const result = await Users.hostProfile(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  forgetPass = async (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync("./youtube.json", "utf-8"));
      if (!data.hasOwnProperty("passEmail")) {
        return res.status(400).json({ status: false });
      }
      const result = await Users.forgetPass(data.passEmail, req.body.password);
      console.log(result);
      if (typeof result === "object") {
        return res.status(202).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
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
      const result = await Users.editProfile(req.body, req.user_id);
      if (typeof result === "object") {
        return res.status(202).json(result);
      }
      res.status(406).json(result);
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
      console.log(
        data,
        ">>>>the data while singing in",
        "\n >>>> the data recieved from db",
        result,
      );
      if (typeof result === "object") {
        if (result.hasOwnProperty("token")) {
          console.log(result, "vikash");
          return res.cookie("token_key", result.token);
          // .redirect("https://blackboxnow.com/profile");
        } else {
          return res.status(201).cookie("token_key", result.token).json(result);
        }
      }
      res.status(400).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  logout = async (req, res) => {
    try {
      fs.writeFileSync("./youtube.json", JSON.stringify({ id: null }, null, 4));
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
          req.body.password,
        );
        if (typeof result === "object") {
          return res.status(202).cookie("token_key", result.token).json(result);
        }
        res.status(400).send(result);
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
        res.status(400).send(result);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  };
}

module.exports = User_Ctrl;
