const Courses = new (require("../services/courses.service"))();
// const joi = require('joi');

class Course_inf {
  hostCourse = async (req, res) => {
    try {
      const result = await Courses.hostCourse(req.body);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  courseStructure = async (req, res) => {
    try {
      const result = await Courses.courseStructure(req.body);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  courseMethodology = async (req, res) => {
    try {
      const result = await Courses.courseMethodology(req.body);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  };

  courseContent = async (req, res) => {
    try {
      const result = await Courses.courseContent(req.body);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  course_Classes = async (req, res) => {
    try {
      const result = await Courses.course_Classes(req.body);
      /// don't forget about the link of the classes....
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  course_Video = async (req, res) => {
    try {
      /// remember before pushing into the database we need the link....
      const result = await Courses.course_Video(req.body);
      if (typeof result === "object") {
        return res.status(201).json(result);
      }
      res.status(404).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
}

module.exports = Course_inf;
