const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class Users {
  async signup(data) {
    try {
      const result = await prisma.users.findUnique({
        where: { email: data.email },
      });
      if (result) {
        return 'The user already exits!!'
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
      password = await bcrypt.compare(password, result.password);
      if (password) {
        return result;
      }
      return "The password is invalid!!";
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Users;
