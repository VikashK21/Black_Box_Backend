const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { authenticationToken } = require("../auth/user.auth");
const phoneConfig = require("../config/twilio.cofig");
console.log(phoneConfig.accountSID, phoneConfig.authToken);
const twilio = require("twilio")(phoneConfig.accountSID, phoneConfig.authToken);

class Users {
  async signup(data) {
    try {
      const result = await prisma.users.findUnique({
        where: { email: data.email },
      });
      if (result) {
        return "The user already exits!!";
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
      console.log(password, email);
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

  async loginWithPhoneOTP(phone_num) {
    try {
      // console.log(phone_num);
      // const result = await prisma.users.findUnique({
      //   where: { phone_num },
      // });
      // console.log('there is no issue...');
      // if (!result) {
      //   console.log("The user does not exits!!");
      //   return "The user does not exits!!";
      // }
      const data = await twilio.verify
        .services(phoneConfig.serviceID)
        .verifications.create({
          to: `+91${phone_num}`,
          channel: "sms",
        });
      console.log(data);
      return data;
    } catch (err) {
      console.log("accha to ye hai...");
      return err.message;
    }
  }
}

module.exports = Users;
