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

//Classes:
router.post("/host/course", authorizationToken, Course_inf.hostCourse);
router.post("/host/structure", authorizationToken, Course_inf.courseStructure);
router.post(
  "/host/methodology",
  authorizationToken,
  Course_inf.courseMethodology
);
router.post("/host/content", authorizationToken, Course_inf.courseContent);
//the video stuff
router.post("/host/classes", authorizationToken, Course_inf.course_Classes);

router.post("/upload", uploadVideoFile, (req, res) => {
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
});

router.get("/oauth2callback", (req, res) => {
  console.log("google");
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
});

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
