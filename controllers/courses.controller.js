const { oAuth, uploadVideoToYouTube } = require("../utils/youtube");
const open = require("open");

const Courses = new (require("../services/courses.service"))();
// const joi = require('joi');

class Course_inf {
  deleteClassById = async (req, res) => {
    try {
      const result = Courses.deleteClassById(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  editClassById = async (req, res) => {
    try {
      const result = await Courses.editClassById(
        Number(req.params.id),
        req.body,
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  studentsDetail = async (req, res) => {
    try {
      const result = await Courses.studentsDetail(req.user_id);
      // const result = await Courses.studentsDetail(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  };

  trainersDetail = async (req, res) => {
    try {
      const result = await Courses.trainersDetail(req.user_id);
      // const result = await Courses.trainersDetail(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  };

  courseReaction = async (req, res) => {
    try {
      const result = await Courses.courseReaction(
        req.user_id,
        Number(req.params.courseID),
      );
      console.log(result, "lets see");
      res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  };

  deleteCourse = async (req, res) => {
    try {
      const result = await Courses.deleteCourse(Number(req.params.id));
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  attendingCls = async (req, res) => {
    try {
      const result = await Courses.attendingCls(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  nextClass = async (req, res) => {
    try {
      const result = await Courses.nextClass(req.user_id);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  addToSuggested = async (req, res) => {
    try {
      const result = await Courses.addSuggested(
        req.user_id,
        req.body.email,
        req.body.course_id,
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  addToGifted = async (req, res) => {
    try {
      const result = await Courses.addToGifted(
        req.user_id,
        req.body.email,
        req.body.course_id,
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  addParticipant = async (req, res) => {
    try {
      const result = await Courses.addParticipants(
        req.user_id,
        Number(req.params.courseID),
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  parallelClasses = async (req, res) => {
    try {
      const result = await Courses.parallelClasses(
        req.user_id,
        Number(req.params.courseID),
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  editCourseById = async (req, res) => {
    try {
      const result = await Courses.editCourseById(
        Number(req.params.id),
        req.body,
        req.user_id,
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  getCourseById = async (req, res) => {
    try {
      const result = await Courses.courseById(Number(req.params.id));
      res.status(200).json(result);
    } catch (err) {
      return err.message;
    }
  };
  getAllCourses = async (req, res) => {
    try {
      const result = await Courses.allCourses();
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  hostCourse = async (req, res) => {
    try {
      console.log(req.body, "the body");
      const result = await Courses.hostCourse(req.body, req.user_id);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(400).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  course_Classes = async (req, res) => {
    try {
      const result = await Courses.course_Classes(req.body);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(400).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  uploadVideo = async (req, res) => {
    console.log(req.file, "files");
    if (req.file) {
      const filename = req.file.filename;
      const { title, description } = req.body;
      open(
        oAuth.generateAuthUrl({
          access_type: "offline",
          scope: "https://www.googleapis.com/auth/youtube.upload", // https://www.googleapis.com/auth/userinfo.profile
          state: JSON.stringify({
            filename,
            title,
            description,
          }),
        }),
      );
    }
  };

  uploadVideoWithAuth = (req, res) => {
    console.log("google");
    const { filename, title, description } = JSON.parse(req.query.state);
    console.log(req.query.state, "accha");
    // console.log(req.query.code, "dekha maine");

    oAuth.getToken(req.query.code, (err, token) => {
      if (err) throw err;
      console.log(token, "from get token...");
      oAuth.setCredentials(token);
      uploadVideoToYouTube(filename, title, description);
    });
    res.send(
      '<h4 align="center">Successfully video uploaded!! Please go back to continue procedure : )</h4>',
    );
  };
}

module.exports = Course_inf;
