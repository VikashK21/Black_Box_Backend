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
  res.redirect("http://localhost:3000/success");
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

module.exports = router;

// https://accounts.google.com/signin/oauth/error?authError=Cg1hY2Nlc3NfZGVuaWVkEtUBVGhlIGRldmVsb3BlciBoYXNu4oCZdCBnaXZlbiB5b3UgYWNjZXNzIHRvIHRoaXMgYXBwLiBJdOKAmXMgY3VycmVudGx5IGJlaW5nIHRlc3RlZCBhbmQgaXQgaGFzbuKAmXQgYmVlbiB2ZXJpZmllZCBieSBHb29nbGUuIElmIHlvdSB0aGluayB5b3Ugc2hvdWxkIGhhdmUgYWNjZXNzLCBjb250YWN0IHRoZSBkZXZlbG9wZXIgKGJsYWNrYm94ZGlnaXRhbDIyQGdtYWlsLmNvbSkuGkRodHRwczovL3N1cHBvcnQuZ29vZ2xlLmNvbS9hY2NvdW50cy9hbnN3ZXIvMzQ2NjUyMT9wPWFwcF9ub3R2ZXJpZmllZCCTAyoWCgthY2Nlc3NfdHlwZRIHb2ZmbGluZSoVCg1yZXNwb25zZV90eXBlEgRjb2RlKpwBCgVzdGF0ZRKSAXsiZmlsZW5hbWUiOiJDOlxcZmFrZXBhdGhcXFRlbmFsaSBSYW1hIFNlYXNvbiAyIChUaXRsZSBTb25nKSAgTmV3IFByb21vICBTdGFydHMgU29vbi5tcDQiLCJ0aXRsZSI6InRlbmFsaSByYW1hIiwiZGVzY3JpcHRpb24iOiJUaGUgYmVnZ2lubmluZy4uLiJ9KjgKDHJlZGlyZWN0X3VyaRIoaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9vYXV0aDJjYWxsYmFjaypWCgljbGllbnRfaWQSSTEwNTg1MDI2ODU4MTYtdms3bjBxMHVkOG1rdjNzaHRxOW9sdXBpOTZhb2I2c2ouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20qNwoFc2NvcGUSLmh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgveW91dHViZS51cGxvYWQ%3D&client_id=1058502685816-vk7n0q0ud8mkv3shtq9olupi96aob6sj.apps.googleusercontent.com&app_domain=http%3A%2F%2Flocalhost%3A3001&authuser=0
