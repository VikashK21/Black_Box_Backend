const jwt = require("jsonwebtoken");
require("dotenv").config();

//// This is was just for the secrete key...
// const secrete = require("crypto").randomBytes(64).toString("hex");
// console.log(secrete);

/**
 * Just few lines to test the behavior.
 */
const TokenGenerator = require("./token-generator");

//  setTimeout(function () {
//  token2 = tokenGenerator.refresh(token, { verify: { audience: 'myaud', issuer: 'myissuer' }, jwtid: '2' })
//    console.log(jwt.decode(token, { complete: true }))
//    console.log(jwt.decode(token2, { complete: true }))
//  }, 3000)
const tokenGenerator = new TokenGenerator(
  process.env.SECRET_KEY_TOKEN,
  process.env.PUBLIC_KEY_TOKEN,
  {
    algorithm: "HS256",
    keyid: "1",
    noTimestamp: false,
    // expiresIn: "2m",
    // notBefore: "2s",
  },
);

authenticationToken = (data) => {
  console.log(tokenGenerator, "tokenGenerator");
  token = tokenGenerator.sign(data, {
    audience: "myaud",
    issuer: "myissuer",
    jwtid: "1",
    subject: "user",
  });
  //my...
  // const result = jwt.sign(`${data.id}`, process.env.SECRET_KEY_TOKEN, {
  //   algorithm: "RS256",
  // });
  // return result;
  console.log(token, "token");
  return token;
};

authorizationToken = (req, res, next) => {
  console.log(req.headers);
  // const cookie = req.headers.authorization;
  //remeber this
  const cookie = req.headers.cookie;
  console.log(cookie, "cookiedasdasds");
  let token = cookie.split(" ")[1];
  if (token) {
    //and this too
    // token = token.split("=")[1];
    const decodedToken = tokenGenerator.verify(token, {
      verify: {
        audience: "myaud",
        issuer: "myissuer",
        jwtid: "1",
        subject: "user",
      },
    });
    // console.log(decodedToken, "the data when it comes here");
    if (decodedToken.admin) {
      req.user_id = decodedToken;
    }
    // const id = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    // console.log(decodedToken.id, "id");
    else {
      req.user_id = Number(decodedToken.id);
      req.classroom_id =
        decodedToken.classroom_id && Number(decodedToken.classroom_id);
    }
    console.log(req.user_id, req.classroom_id, "the saving...");
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
