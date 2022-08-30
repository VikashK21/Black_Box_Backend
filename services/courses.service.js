const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const fs2 = require("fs-extra");

// const date = new Date().getTime();
// const date = new Date().getMonth();
// console.log(date);
// // console.log(date2.toLocaleTimeString(), "current");
// const update = new Date(date + 15 * 60 * 60 * 1000);
// console.log(update.toLocaleTimeString());
// const day = new Date().getMonth();
// console.log();

class Courses_Classes {
  ///still in progress...
  async nextClass(id) {
    try {
      const result = await prisma.course.findMany({
        where: { completion: false },
        include: {
          Participants: {
            where: {
              participant_id: id,
            },
          },
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async addParticipants(participant_id, course_id) {
    try {
      const result = await prisma.participants.create({
        data: { participant_id, course_id },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async addToGifted(gifted_by, email_id, course_id) {
    try {
      const result = await prisma.gift.create({
        data: { gifted_by, email_id, course_id },
        include: { gifted: true },
      });
      this.addParticipants(result.gifted.id, result.course_id);
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async addSuggested(suggested_by, email_id, course_id) {
    try {
      const result = await prisma.suggest.create({
        data: { suggested_by, email_id, course_id },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async ClassLink(id) {
    try {
      const date = new Date();
      let day = date.getMonth();
      let month = date.getMonth();
      const year = date.getFullYear();
      if (day.toString().length === 1) {
        day = "0" + day;
      }
      if (month.toString().length === 1) {
        month = "0" + month;
      }
      const fullDate = `${year}-${month}-${day}`;
      const Courses = prisma.participants.findMany({
        where: { participant_id: id },
        select: {
          course: {
            where: { completion: false },
            select: {
              Classes: {
                where: { over: false },
                select: {
                  date: {
                    contains: fullDate,
                  },
                },
              },
            },
          },
        },
      });
      if (Courses.course.length === 0) {
        return "The user has not applied in any Courses!!";
      }
      for (let classes of Courses.Classes) {
        console.log(classes);
        let timeA = classes.time.split(":");
        console.log(timeA);
        if (timeA[0] == date.getHours) {
          if (date.getMinutes - Number(timeA[0]) <= 5) {
            await prisma.classes.update({
              where: { id: classes.id },
              data: { over: true },
            });
            return { link: classes.course.link };
          }
        }
      }
      console.log("not worked...");
      return Courses;
    } catch (err) {
      return err.message;
    }
  }

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
        orderBy: {
          id: "desc",
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
      return { id: result.id };
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
      fs2.removeSync("./videos");
      fs.writeFileSync(
        "./youtube.json",
        JSON.stringify({ id: "vZB3D3ykAsY" }, null, 4)
      );
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
}

module.exports = Courses_Classes;
