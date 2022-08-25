const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

class Courses_Classes {
  async hostCourse(data, id) {
    console.log(data);
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
    console.log(data, "the updated...");
    try {
      const result = await prisma.course.create({
        data,
      });
      console.log(result, "course data");
      await this.course_Video(result.id);
      return { id: result.course_id };
    } catch (err) {
      console.log(err.message, "the course erroro");
      return err.message;
    }
  }

  async course_Classes(data) {
    try {
      data = { ...data.classes, course_id: data.course_id };
      console.log(data, "the udpdated");
      const result = await prisma.classes.create({
        data,
      });
      console.log(result);
      return result;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  async course_Video(course_id) {
    try {
      const name = JSON.parse(
        fs.readFileSync(
          "/home/vikash/Desktop/BASK/black_box/youtube.json",
          "utf-8"
        )
      );
      console.log(name.id, "the video id");
      const result = await prisma.vid_Classes.create({
        data: { name: name.id, course_id },
      });
      console.log(result);
      fs.writeFileSync(
        "/home/vikash/Desktop/BASK/black_box/youtube.json",
        JSON.stringify({ id: null }, null, 4)
      );
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
}

module.exports = Courses_Classes;
