const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Courses {
  async hostClass(data) {
    try {
      const result = prisma.classes.create({
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }
}
