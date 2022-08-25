const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

class Courses_Classes {
  async editCourseById(id, data, host) {
    try {
      const result = await prisma.course.update({ where: { id, host }, data });
      return result;
    } catch (err) {
      console.log(err.message, "the editCourse by id");
      return err.message;
    }
  }

  async courseById(id) {
    try {
      const result = await prisma.course.findUnique({
        where: { id },
        include: { host_details: true, Classes: true, Vid_Classes: true },
      });
      return result;
    } catch (err) {
      console.log(err.message, "id by courses");
      return err.message;
    }
  }

  async allCourses() {
    try {
      const result = await prisma.course.findMany({
        include: {
          host_details: true,
          Classes: true,
          Vid_Classes: true,
        },
      });
      return result;
    } catch (err) {
      console.log(err.message, "all courses");
      return err.message;
    }
  }

  //working fine : )
  async hostCourse(data, id) {
    data = {
      title: data.course.title,
      price: data.course.price,
      description: data.course.description,
      host: id,
      max_paticipants: Number(data.course.max_students),
      images: JSON.stringify(data.course.images),
      duration_type: data.course.type,
      link: data.course.link,
      class_structure: data.course.classes,
      structure: data.course.structure,
      methodology: data.course.methodology,
      content: data.course.content,
      requirements: data.course.requirements,
    };
    try {
      const result = await prisma.course.create({
        data,
      });
      console.log(result, "course data");
      await this.course_Video(result.id);
      return { id: 5 };
    } catch (err) {
      console.log(err.message, "the course erroro");
      return err.message;
    }
  }

  //working fine : )
  async course_Classes(data) {
    try {
      data = { ...data.classes, course_id: data.course_id };
      const result = await prisma.classes.create({
        data,
      });
      return result;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  //working fine : )
  async course_Video(course_id) {
    try {
      const name = JSON.parse(fs.readFileSync("./youtube.json", "utf-8"));
      await prisma.vid_Classes.create({
        data: { name: name.id, course_id },
      });
      fs.writeFileSync("./youtube.json", JSON.stringify({ id: null }, null, 4));
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
}

module.exports = Courses_Classes;
