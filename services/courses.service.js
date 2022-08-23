const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

class Courses_Classes {
  async hostCourse(data) {
    try {
      const result = await prisma.course.create({
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async courseStructure(data) {
    try {
      const result = await prisma.structure.create({
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async courseMethodology(data) {
    try {
      const result = await prisma.methodology.create({
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async courseContent(data) {
    try {
      const result = await prisma.content.create({
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async course_Classes(data) {
    try {
      const result = await prisma.classes.create({
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async course_Video(course_id) {
    try {
      const name = fs.readFileSync("/youtube.json", "utf-8");
      const result = await prisma.vid_Classes.create({
        data: { name, course_id },
      });
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Courses_Classes;
