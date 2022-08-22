const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { authenticationToken } = require("../auth/user.auth");
const phoneConfig = require("../config/twilio.cofig");
const twilio = require("twilio")(phoneConfig.accountSID, phoneConfig.authToken);

class Users {
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
    try {
      console.log(data, "data");
      const result = await prisma.users.findUnique({
        where: { email: data.email },
      });
      if (result) {
        if (data.hasOwnProperty("provider")) {
          return this.loginWithEmailPass(data.email, data.password);
        } else {
          return "The user already exits!!";
        }
      }
      data.password = await bcrypt.hash(data.password, 12);
      return await prisma.users.create({
        data,
      });
    } catch (err) {
      return err.message;
    }
  }

  async loginWithEmailPass(email, password) {
    try {
      const result = await prisma.users.findUnique({
        where: { email },
      });
      if (!result) {
        return "The user does not exits!!";
      }
      password = await bcrypt.compare(password, result.password);
      if (password) {
        const token = await authenticationToken(result);
        return { token, result };
      } else if (!password) {
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
