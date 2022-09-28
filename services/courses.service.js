const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const fs2 = require("fs-extra");

class Courses_Classes {
  async deleteClassById(id) {
    try {
      const result = prisma.classes.delete({
        where: { id },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async editClassById(id, data) {
    try {
      const result = prisma.classes.update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async studentsDetail(participant_id) {
    try {
      const result = await prisma.participants.findMany({
        where: { participant_id },
        include: {
          course: {
            include: {
              Participants: true,
              Classes: true,
              Vid_Classes: true,
              Reactions: true,
              host_details: true,
            },
          },
          participant: true,
          suggested_parti: true,
          gifted_parti: true,
        },
      });
      return result;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  async trainersDetail(host) {
    try {
      const result = await prisma.course.findMany({
        where: { host },
        include: {
          host_details: true,
          Classes: true,
          Vid_Classes: true,
          Participants: true,
          Gift: true,
          Suggest: true,
          Reactions: true,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async courseReaction(reactor_id, course_id) {
    try {
      const result = await prisma.reactions.findFirst({
        where: { reactor_id, course_id },
      });
      if (result && result.heartful === 1) {
        return await prisma.reactions.delete({
          where: { id: result.id },
        });
      } else if (!result) {
        return await prisma.reactions.create({
          data: {
            course_id,
            reactor_id,
          },
        });
      }
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  async deleteCourse(id) {
    try {
      const result = await prisma.course.findUnique({
        where: { id },
        include: {
          Classes: true,
          Vid_Classes: true,
          Participants: true,
          Gift: true,
          Suggest: true,
          Reactions: true,
        },
      });
      //1
      if (result && result.Classes.length > 0) {
        await prisma.classes.deleteMany({
          where: { course_id: id },
        });
      }
      //2
      if (result && result.Vid_Classes.length > 0) {
        await prisma.vid_Classes.deleteMany({
          where: { course_id: id },
        });
      }
      //3
      if (result && result.Participants.length > 0) {
        await prisma.participants.deleteMany({
          where: { course_id: id },
        });
      }
      if (result && result.Reactions.length > 0) {
        await prisma.reactions.deleteMany({
          where: { course_id: id },
        });
      }
      //4
      if (result && result.Gift.length > 0) {
        await prisma.gift.deleteMany({
          where: { course_id: id },
        });
      }
      //5
      if (result && result.Suggest.length > 0) {
        await prisma.suggest.deleteMany({
          where: { course_id: id },
        });
      }
      if (result) {
        await prisma.course.delete({ where: { id } });
        return "Successfully the course details deleted.";
      }
      return "The course does not exist!!";
    } catch (err) {
      return err.message;
    }
  }
  async attendingCls(data) {
    try {
      // {
      //   link: sendingClass.link,
      //   time: sendingClass.time,
      //   class_id: sendingClass.class_id,
      //   course_id: sendingClass.course_id,
      // };

      ///if you have time, just look, you can add some effect.
      const result = await prisma.classes.update({
        where: { id: data.class_id },
        data: { over: true },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  ///Perfect : )
  async nextClass(id, check = true) {
    try {
      const result2 = await prisma.participants.findFirst({
        where: { participant_id: id },
      });
      if (result2) {
        const result = await prisma.participants.findMany({
          where: { participant_id: id },
          select: {
            course: {
              select: {
                id: true,
                link: true,
                completion: true,
                Classes: {
                  orderBy: {
                    id: "desc",
                  },
                },
              },
            },
          },
        });
        const nextClassGroupt = {};
        for (let crs of result) {
          if (
            crs.course.link.length > 0 &&
            crs.course.completion === false &&
            crs.course.Classes.length > 0
          ) {
            let Cls = crs.course.Classes;
            function addingCls(
              date,
              time,
              duration,
              class_id,
              course_id,
              link,
            ) {
              // This is just to bring the values in the sorting order.
              let num = date;
              //check will used while participants registration.
              if (check) {
                if (Number(date.split("-")[1]) === new Date().getMonth() + 1) {
                  num = Number(date.split("-")[1]) + Number(date.split("-")[2]);
                } else if (
                  Number(date.split("-")[1]) ===
                  new Date().getMonth() + 2
                ) {
                  num =
                    Number(date.split("-")[1]) +
                    Number(date.split("-")[2]) +
                    31;
                  console.log("coming here right????", num);
                }
              }
              if (nextClassGroupt.hasOwnProperty(num)) {
                // let savedTime = nextClassGroupt[num];
                const M_STime = time.split(":");
                // if (Number(M_STime[0]) < Number(savedTime.time.split(":")[0])) {
                nextClassGroupt[num] = {
                  ...nextClassGroupt[num],
                  [Number(M_STime[0])]: {
                    date,
                    time,
                    duration,
                    class_id,
                    course_id,
                    link,
                  },
                };
                // }
              } else if (
                num > 31 ||
                new Date().getMonth() + 2 === Number(date.split("-")[1]) ||
                (new Date().getMonth() + 1 <= Number(date.split("-")[1]) &&
                  new Date().getDate() <= Number(date.split("-")[2]))
              ) {
                console.log(
                  new Date().getMonth() + 2,
                  "--- the month",
                  Number(date.split("-")[1]),
                  date,
                );
                nextClassGroupt[num] = {
                  [Number(time.split(":")[0])]: {
                    date,
                    time,
                    duration,
                    class_id,
                    course_id,
                    link,
                  },
                };
              }
            }
            ///function ending...
            if (Cls.length === 1 && Cls[0].over === false) {
              addingCls(
                Cls[0].date,
                Cls[0].time,
                Cls[0].duration,
                Cls[0].id,
                crs.course.id,
                crs.course.link,
              );
            } else if (Cls.length > 1) {
              for (let clsSq of Cls) {
                if (clsSq.over === false) {
                  addingCls(
                    clsSq.date,
                    clsSq.time,
                    clsSq.duration,
                    clsSq.id,
                    crs.course.id,
                    crs.course.link,
                  );
                }
              }
            }
          }
        }
        //for the participants registrations...
        if (!check) {
          return nextClassGroupt;
        }
        // The locha of TIME...but gave Success.
        const sendingClass = Object.values(
          Object.values(nextClassGroupt)[0],
        )[0];

        let gTime = sendingClass.time.split(":");
        const d = new Date(sendingClass.date).getTime();
        let gTime2 = (Number(gTime[1]) + Number(sendingClass.duration)) / 60;
        gTime = gTime2 + Number(gTime[0]);
        let update = new Date(d + gTime * 60 * 60 * 1000);
        sendingClass.time = `${update}`;
        // for the front-end..
        return {
          link: sendingClass.link,
          time: sendingClass.time,
          class_id: sendingClass.class_id,
          course_id: sendingClass.course_id,
        };
      }
      return result2;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }

  //Checking the participant has the parallel classes or not...
  async parallelClasses(participant_id, course_id) {
    try {
      const result2 = await this.nextClass(participant_id, false);
      const result3 = await prisma.course.findUnique({
        where: { id: course_id },
        include: { Classes: true },
      });
      const parallelCls = [];
      if (result3 && result3.Classes.length > 0) {
        for (let cls of result3.Classes) {
          if (result2.hasOwnProperty(cls.date)) {
            if (
              result2[cls.date].hasOwnProperty(Number(cls.time.split(":")[0]))
            ) {
              parallelCls.push(cls);
            }
          }
        }
      }
      return parallelCls;
    } catch (err) {
      return err.message;
    }
  }

  //As confirm, it will be proceed to add the ....
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

  async editCourseById(id, data) {
    try {
      data = {
        title: data.course.title,
        price: data.course.price,
        description: data.course.description,
        host: id,
        max_paticipants: Number(data.course.max_paticipants),
        images: JSON.stringify(data.course.images),
        duration_type: data.course.type,
        link: data.course.link,
        class_structure: data.course.classes,
        structure: data.course.structure,
        methodology: data.course.methodology,
        content: data.course.content,
        requirements: data.course.requirements,
      };
      const result = await prisma.course.update({
        where: { id },
        data,
      });
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
        include: {
          host_details: true,
          Participants: true,
          Classes: true,
          Vid_Classes: true,
          Reactions: true,
        },
      });
      if (result && result.images.length > 0) {
        result.images = JSON.parse(result.images[0]);
      }
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
          Reactions: true,
          _count: {
            select: {
              Reactions: true,
            },
          },
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
      fs.writeFileSync("./youtube.json", JSON.stringify({ id: null }, null, 4));
      fs.removeSync("/videos");
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
}

module.exports = Courses_Classes;
