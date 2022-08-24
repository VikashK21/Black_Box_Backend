const { oAuth, uploadVideoToYouTube } = require("../utils/youtube");
const open = require("open");

const Courses = new (require("../services/courses.service"))();
// const joi = require('joi');

class Course_inf {
  hostCourse = async (req, res) => {
    try {
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
        })
      );
    }
  };

  uploadVideoWithAuth = (req, res) => {
    console.log("google");
    res.send(
      '<h4 align="center">Successfully video uploaded!! Please go back to continue procedure : )</h4>'
    );
    console.log(req.query.state, "state");
    console.log(req.query.code, "token");
    // res.redirect("http://localhost:3000/success");
    const { filename, title, description } = JSON.parse(req.query.state);
    console.log(req.query.state, "accha");
    console.log(req.query.code, "dekha maine");

    oAuth.getToken(req.query.code, (err, token) => {
      if (err) throw err;
      console.log(token, "from get token...");
      oAuth.setCredentials(token);
      uploadVideoToYouTube(filename, title, description);
    });
  };
}

module.exports = Course_inf;
