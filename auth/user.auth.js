const jwt = require("jsonwebtoken");
require("dotenv").config();

//// This is was just for the secrete key...
// const secrete = require("crypto").randomBytes(64).toString("hex");
// console.log(secrete);

authenticationToken = (data) => {
  const result = jwt.sign(`${data.id}`, process.env.SECRET_KEY);
  return result
};

authorizationToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  if (cookie) {
    let token = cookie.split("=")[1];
    const id = jwt.verify(token, process.env.SECRET_KEY);
    req.user_id = Number(id);
    next();
  } else {
    res.status(403).send("Login first to proceed!!");
  }
};


module.exports = {
    authenticationToken,
    authorizationToken
}
