const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

class Courses_Classes {
  async hostCourse(data, id) {
    data = {
      title: data.title,
      price: data.price,
      description: data.description,
      host: id,
      max_paticipants: data.max_students,
      imgages: JSON.stringify(data.imgages),
      duration_type: data.type,
      link: data.link,
      class_structure: data.classes,
      structure: data.structure,
      methodology: data.methodology,
      content: data.content,
      requirements: data.requirements,
    };
    try {
      const result = await prisma.course.create({
        data,
      });
      await this.course_Video(result.id);
      return { id: result.course_id };
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
      const name = JSON.parse(fs.readFileSync("/youtube.json", "utf-8"));
      await prisma.vid_Classes.create({
        data: { name: name.id, course_id },
      });
      fs.writeFileSync("/youtube.json", JSON.stringify({ id: null }, null, 4));
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Courses_Classes;
