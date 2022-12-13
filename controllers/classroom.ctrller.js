const Classroom = new (require("../services/classroom.service"))();

class Classroom_ctrl {
  workSpaceAllow = async (req, res) => {
    try {
      const email_type = req.params.email.split("@")[1];
      if (
        email_type === "gmail.com" ||
        email_type === "outlook.com" ||
        email_type === "hotmail.com" ||
        email_type === "yahoo.com"
      ) {
        return res.status(200).json({ status: false });
      }
      const result = await Classroom.workSpaceAllow(email_type);
      return res.status(200).json({ status: result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  createWorkSpace = async (req, res) => {
    try {
      console.log(req.body, "the classroom parameters with data....");
      const result = await Classroom.createWorkSpace(
        Number(req.params.id),
        req.body,
      );
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  editWorkSpace = async (req, res) => {
    try {
      const result = await Classroom.editWorkSpace(
        Number(req.classroom_id),
        req.body,
        Number(req.user_id),
      );
      if (typeof result === "object") {
        return res.status(202).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  workSpace = async (req, res) => {
    try {
      const result = await Classroom.workSpace(Number(req.classroom_id));
      if (typeof result === "object") {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  createClassroom = async (req, res) => {
    try {
      const result = await Classroom.createClassroom(
        Number(req.classroom_id),
        req.body,
        Number(req.user_id),
      );
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  createSession = async (req, res) => {
    try {
      const result = await Classroom.createSession(
        Number(req.params.id),
        req.body,
      );
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  editClassroom = async (req, res) => {
    try {
      const result = await Classroom.editClassroom(
        Number(req.params.id),
        req.body,
        Number(req.user_id),
      );
      if (typeof result === "object") {
        return res.status(202).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  editSession = async (req, res) => {
    try {
      const result = await Classroom.editSession(
        Number(req.params.id),
        req.body,
        Number(req.user_id),
      );
      if (typeof result === "object") {
        return res.status(202).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  workSpaceClassrooms = async (req, res) => {
    try {
      const result = await Classroom.workSpaceClassrooms(
        Number(req.classroom_id),
      );
      if (typeof result === "object") {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  classroomSessions = async (req, res) => {
    try {
      const result = await Classroom.classroomSessions(Number(req.params.id));
      if (typeof result === "object") {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  classroomById = async (req, res) => {
    try {
      const result = await Classroom.classroomById(Number(req.params.id));
      if (typeof result === "object") {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  sessionById = async (req, res) => {
    try {
      const result = await Classroom.sessionById(Number(req.params.id));
      if (typeof result === "object") {
        return res.status(200).json(result);
      }
      return res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
}

module.exports = Classroom_ctrl;
