const router = require("express").Router();
const Course_inf = new (require("../controllers/courses.controller"))();
const { authorizationToken } = require("../auth/user.auth");

const {
  uploadVideoFile,
  oAuth,
  uploadVideoToYouTube,
} = require("../utils/youtube");
const {
  uploaddImgFile,
  uploaddImgToCloudinary,
} = require("../utils/cloudinary");
const open = require("open");

router.get("/course", (req, res) => {
  res.send({
    hostCourse: "/api/host/course",
    getAllCourses: "/api/courses",
    getCourseById: "/api/courses/:id",
    editCourseById: "/api/courses/:id",
    course_Classes: "/api/host/classes",
    uploadVideoFile: "/api/upload",
    uploaddImgFile: "/api/imgupload",
  });
});

//Courses with Classes:
router.post("/host/course", authorizationToken, Course_inf.hostCourse);
router.get("/courses", Course_inf.getAllCourses);
router.get("/courses/:id", Course_inf.getCourseById);
router.patch("/courses/:id", authorizationToken, Course_inf.editCourseById);

router.post(
  "/participant/:courseID",
  authorizationToken,
  Course_inf.addParticipant
);
router.get(
  "/parallelclasses/:courseID",
  authorizationToken,
  Course_inf.parallelClasses
);
router.patch("/attending", authorizationToken, Course_inf.attendingCls);
router.get("/nextclass", authorizationToken, Course_inf.nextClass);
router.post("/gift", authorizationToken, Course_inf.addToGifted);
router.post("/suggest", authorizationToken, Course_inf.addToSuggested);

router.post("/host/classes", authorizationToken, Course_inf.course_Classes);

router.post("/upload", uploadVideoFile, Course_inf.uploadVideo);

router.get("/oauth2callback", Course_inf.uploadVideoWithAuth);

router.post("/imgupload", uploaddImgFile, async (req, res) => {
  try {
    console.log(req.file.path);
    const result = await uploaddImgToCloudinary(req.file.path);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// router.get('/meet', authorizationToken, async)
//

module.exports = router;
