const { oAuth } = require("../utils/youtube");
const open = require("open");

const Courses = new (require("../services/courses.service"))();
// const joi = require('joi');

class Course_inf {
  hostCourse = async (req, res) => {
    try {
      const result = await Courses.hostCourse(req.body);
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
      /// only the link part...the class (google-meet)
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
        })
      );
    }
  };
}

module.exports = Course_inf;
