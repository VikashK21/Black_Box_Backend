const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Classroom {
  async workSpaceAllow(email_type) {
    try {
      const result = await prisma.classroom.findUnique({
        where: { email_type },
      });
      if (result) return false;
      return true;
    } catch (err) {
      return err.message;
    }
  }
  async createWorkSpace(id, data) {
    try {
      const result = await prisma.users.findUnique({ where: { id } });
      console.log(result, "the data");
      const email_type = result.email.split("@")[1];
      if (email_type === "gmail.com")
        return "This email can't be supported in the Workspace!!";

      const result4 = await prisma.classroom.findUnique({
        where: { email_type },
      });
      if (result4) return "The Workspace already exists!!";

      const result2 = await prisma.classroom.create({
        data: {
          ...data,
          email_type,
          host: id,
        },
      });
      const result3 = await prisma.users.update({
        where: { id },
        data: { classroom_id: result2.id },
        include: {
          Classroom: true,
        },
      });
      return result3;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  async editWorkSpace(id, data, host) {
    try {
      const result2 = await prisma.classroom.findUnique({ where: { id } });
      if (result2 && result2.host !== host) {
        return "Not has a right access to edit!!";
      }
      const result = await prisma.classroom.update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async workSpace(id) {
    try {
      const result = await prisma.classroom.findUnique({
        where: { id },
        include: {
          Users: true,
          Classroom_Course: true,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async createClassroom(host, data, creator) {
    try {
      data.host = host;
      data.creator = creator;
      console.log(data, "the data");
      const result = await prisma.classroom_Course.create({
        data,
      });
      console.log(result, "the result");
      return result;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  async createSession(classroom_course_id, data) {
    try {
      data.classroom_course_id = classroom_course_id;
      console.log(data);
      const result = await prisma.classes.create({
        data,
      });
      console.log(result, "the result");
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async editClassroom(id, data, user_id) {
    try {
      const result2 = await prisma.classroom_Course.findUnique({
        where: { id },
      });
      if (result2 && result2.creator !== user_id) {
        return "Not has a right access to edit!!";
      }
      const result = await prisma.classroom_Course.update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async editSession(id, data, user_id) {
    try {
      const result2 = await prisma.classes.findUnique({
        where: { id },
        include: { Classroom_Course: true },
      });
      if (result2 && result2.Classroom_Course.creator !== user_id) {
        return "Not has a right access to edit";
      }
      const result = await prisma.classes.update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async workSpaceClassrooms(host) {
    try {
      const result = await prisma.classroom_Course.findMany({
        where: { host },
        include: {
          host_details: true,
          Classes: true,
          Vid_Classes: true,
          Reactions: true,
          creator_d: true,
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async classroomSessions(classroom_course_id) {
    try {
      const result = await prisma.classes.findMany({
        where: { classroom_course_id },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async classroomById(id) {
    try {
      const result = await prisma.classroom_Course.findUnique({
        where: { id },
        include: {
          host_details: true,
          Classes: true,
          Vid_Classes: true,
          Reactions: true,
          creator_d: true,
        },
      });
      return result;
    } catch (err) {
      return res.message;
    }
  }

  async sessionById(id) {
    try {
      const result = await prisma.classes.findUnique({
        where: { id },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Classroom;
