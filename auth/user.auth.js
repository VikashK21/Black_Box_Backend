"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
//// This is was just for the secrete key...
// const secrete = require("crypto").randomBytes(64).toString("hex");
// console.log(secrete);
/**
 * The openssl method to create the private and public keys
 * private.pem -->  openssl genrsa -out private_key.pem 4096
 * public.pem -->   openssl rsa -pubout -in private_key.pem -out public_key.pem
 */
// /home/vikash/Desktop/BASK/black_box/auth/keys/private_key.pem
const SECRET_KEY_TOKEN = fs.readFileSync(
  path.join(__dirname, "./keys/private_key.pem"),
  "utf8",
);
const PUBLIC_KEY_TOKEN = fs.readFileSync(
  path.join(__dirname, "./keys/public_key.pem"),
  "utf8",
);
console.log(SECRET_KEY_TOKEN);

const authenticationToken = async (data) => {
  console.log("Private_Key: ", SECRET_KEY_TOKEN);
  const result = jwt.sign(data, SECRET_KEY_TOKEN, {
    issuer: "blackboxnow.com",
    subject: "blackboxdigital22@gmail.com",
    audience: "https://www.blackboxnow.com",
    // expiresIn: exp,
    algorithm: "RS256",
  });
  console.log("Token: ", result);
  return result;
};

const authorizationToken = async (req, res, next) => {
  console.log(req.headers);
  const cookie = req.headers.authorization;
  //remeber this
  // const cookie = req.headers.cookie;
  if (!cookie) {
    return res.status(403).send("Cookies not found!!");
  }
  let token = cookie.split(" ")[1];
  if (token) {
    //and this too
    // token = token.split("=")[1];
    console.log("Public_Key: ", PUBLIC_KEY_TOKEN);
    const decodedToken = jwt.verify(token, PUBLIC_KEY_TOKEN, {
      issuer: "blackboxnow.com",
      subject: "blackboxdigital22@gmail.com",
      audience: "https://www.blackboxnow.com",
      // expiresIn: exp,
      algorithm: ["RS256"],
    });
    console.log("Decoded Token: ", decodedToken);
    if (decodedToken && decodedToken.admin) {
      req.user_id = decodedToken;
    } else if (decodedToken) {
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

const forLogout = (req, res, next) => {
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
