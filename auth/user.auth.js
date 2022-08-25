const jwt = require("jsonwebtoken");
require("dotenv").config();

//// This is was just for the secrete key...
// const secrete = require("crypto").randomBytes(64).toString("hex");
// console.log(secrete);

authenticationToken = (data) => {
  const result = jwt.sign(`${data.id}`, process.env.SECRET_KEY_TOKEN);
  return result;
};

authorizationToken = (req, res, next) => {
  console.log(req.headers);
  const cookie = req.headers.authorization;
  console.log(cookie, 'cookie');
  if (cookie) {
    let token = cookie.split(" ")[1];
    console.log(token, 'token');
    const id = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    console.log(id, 'id');
    req.user_id = Number(id);
    next();
  } else {
    res.status(403).send("Login first to proceed!!");
  }
};

forLogout = (req, res, next) => {
  let cookie = req.headers.cookie;
  if (cookie) {
    cookie = cookie.split("=");
    if (cookie[cookie.length - 2].includes("token_key")) {
      return res.status(406).send("Already logged in with an account!!");
    }
  }
  next();
};

module.exports = {
  authenticationToken,
  authorizationToken,
  forLogout,
};
