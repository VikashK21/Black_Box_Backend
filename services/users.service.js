const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { authenticationToken } = require("../auth/user.auth");
// const phoneConfig = require("../config/twilio.cofig");
// const twilio = require("twilio")(phoneConfig.accountSID, phoneConfig.authToken);

class Users {
  async hostProfile(id) {
    try {
      const result = await prisma.users.findUnique({
        where: { id },
        include: {
          Course: {
            include: {
              Classes: true,
              Vid_Classes: true,
            },
          },
        },
      });
    } catch (err) {
      return err.message;
    }
  }

  async forgetPass(email, password) {
    try {
      const result2 = await prisma.users.findUnique({
        where: { email },
      });
      if (!result2) {
        return "The email does not exist!!";
      }
      if (
        (result2 && result2.provider === "google") ||
        result2.provider === "facebook"
      ) {
        return `Please login with ${result2.provider} Account!!`;
      }
      password = await bcrypt.hash(password, 12);
      const result = await prisma.users.update({
        where: { email },
        data: { password },
      });
      console.log(result);
      return result;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
  async profile(id) {
    try {
      const result = await prisma.users.findUnique({ where: { id } });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async editProfile(data, id) {
    try {
      if (data.hasOwnProperty("email")) {
        const result2 = await prisma.users.findUnique({
          where: { id },
        });
        if (result2.provider === "google" || result2.provider === "facebook") {
          return `Please edit the email from your ${result2.provider} account!!`;
        }
      }
      if (data.hasOwnProperty("password")) {
        data.password = await bcrypt.hash(data.password, 12);
      }
      const result = await prisma.users.update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async signup(data) {
    // manual registration worked : )
    try {
      console.log(data, "data");
      const result = await prisma.users.findUnique({
        where: { email: data.email },
      });
      if (result) {
        if (data.hasOwnProperty("provider")) {
          return this.loginWithEmailPass(data.email, data.password);
        } else {
          console.log("okay the aready there...");
          return "The user already exits!!";
        }
      }
      data.password = await bcrypt.hash(data.password, 12);
      return await prisma.users.create({
        data,
      });
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  async loginWithEmailPass(email, password) {
    // manual login worked : )
    try {
      const result = await prisma.users.findUnique({
        where: { email },
      });
      if (!result) {
        console.log(result);
        return "The user does not exits!!";
      }
      password = await bcrypt.compare(password, result.password);
      if (password) {
        const token = await authenticationToken(result);
        return { token, result };
      } else if (!password) {
        console.log(password);
        return "The password is invalid!!";
      }
    } catch (err) {
      return err.message;
    }
  }

  async loginWithPhoneOTP(body) {
    try {
      const result = await prisma.users.findUnique({
        where: { phone_num: body.phone_num },
      });
      if (!result) {
        return "The user does not exits!!";
      }
      if (body.hasOwnProperty("phone_num") && body.hasOwnProperty("otp")) {
        const verifying = await twilio.verify
          .services(phoneConfig.serviceID)
          .verificationChecks.create({
            to: `+${body.phone_num}`,
            code: body.otp,
          });
        if (verifying.status === "approved") {
          const token = await authenticationToken(result);
          return { ...verifying, token };
        }
        return "Something went wrong, please try again.";
        // console.log(verifying, "verifying...");
      } else {
        const sending = await twilio.verify
          .services(phoneConfig.serviceID)
          .verifications.create({
            to: `+${body.phone_num}`,
            channel: "sms",
          });
        // console.log(sending, "creating and seding...");
        return sending;
      }
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Users;
