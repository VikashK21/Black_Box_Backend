const router = require("express").Router();
const Course_inf = new (require("../controllers/courses.controller"))();
const { authorizationToken } = require("../auth/user.auth");

const { uploadVideoFile } = require("../utils/youtube");
const {
  uploaddImgFile,
  uploaddImgToCloudinary,
} = require("../utils/cloudinary");

router.get("/course", (req, res) => {
  res.send({
    msg: "After login you have to send the auth token axcept upload video",
    hostCourse: {
      POST: {
        route: "/api/host/course",
        parameters: "you already have it..",
      },
    },
    getAllCourses: { GET: { route: "/api/courses" } },
    getCourseById: {
      GET: {
        route: "/api/courses/:id",
        parameters: "you already have it..",
      },
    },
    editCourseById: {
      PATCH: {
        route: "/api/course/:id",
        parameters: "you already have it..",
      },
    },
    course_Classes: {
      POST: {
        route: "/api/host/classes",
        parameters: "you already have it..",
      },
    },
    uploadVideoFile: {
      POST: { route: "/api/upload", parameters: "you already have it.." },
    },
    uploaddImgFile: {
      POST: {
        route: "/api/imgupload",
        parameters: "you don't need to even try!!",
      },
    },
    beforeCallingAddParticipant: {
      GET: {
        route: "/api/parallelclasses/:courseID",
        parameters: "just fill the params",
      },
    },
    addParticipant: {
      POST: {
        route: "/api/participant/:courseID",
        parameters: "just fill the params",
      },
    },
    //only for single
    giftFriends: {
      POST: {
        route: "/api/gift",
        parameters: {
          email: "string",
          course_id: "int",
        },
      },
    },
    //only for single
    suggestFriends: {
      POST: {
        route: "/api/suggest",
        parameters: {
          email: "string",
          course_id: "int",
        },
      },
    },
    nextClass: {
      GET: {
        route: "/api/nextclass",
      },
    },
    whileJoiningTheLink: {
      PATCH: {
        route: "/api/attending",
        parameters: "send the same parameters, sent by nextClass",
      },
    },
    deleteCourse: {
      DELETE: {
        route: "/api/delete/course/:id",
      },
    },
    reactCourse: {
      POST: {
        route: "/api/react/:courseID",
      },
    },

    trainersHosted: {
      GET: {
        route: "/api/trainer",
      },
    },
    studentCourses: {
      GET: {
        route: "/api/student",
      },
    },
  });
});

//registered course for both...
router.get("/trainer", authorizationToken, Course_inf.trainersDetail);
router.get("/student", authorizationToken, Course_inf.studentsDetail);

//reactions...
router.post("/react/:courseID", authorizationToken, Course_inf.courseReaction);

//Use very carefully!!
router.delete("/delete/course/:id", Course_inf.deleteCourse);

//Courses with Classes:
router.post("/host/course", authorizationToken, Course_inf.hostCourse);
//also adding the reaction...
router.get("/courses", Course_inf.getAllCourses);
router.get("/courses/:id", Course_inf.getCourseById);
router.patch("/course/:id", authorizationToken, Course_inf.editCourseById);

router.post(
  "/participant/:courseID",
  authorizationToken,
  Course_inf.addParticipant,
);
router.get(
  "/parallelclasses/:courseID",
  authorizationToken,
  Course_inf.parallelClasses,
);
router.patch("/attending", authorizationToken, Course_inf.attendingCls);
router.get("/nextclass", authorizationToken, Course_inf.nextClass);
router.post("/gift", authorizationToken, Course_inf.addToGifted);
router.post("/suggest", authorizationToken, Course_inf.addToSuggested);

router.post("/host/classes", authorizationToken, Course_inf.course_Classes);
router.patch("/class/:id", authorizationToken, Course_inf.editClassById);
/**
 * @swagger
 * /api/host/classes:
 *  post:
 *    description: Takes all the information about the classes, designed by the trainner.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '201':
 *        Description: Object
 *      '400':
 *        Description: Error msg/ Error msg of db
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: title
 *        in: formData
 *        required: false
 *        type: string
 *      - name: date
 *        in: formData
 *        required: true
 *        type: string
 *      - name: over
 *        in: formData
 *        require: false
 *        type: boolean
 *      - name: duration
 *        in: formData
 *        required: true
 *        type: string
 *      - name: time
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        in: formData
 *        required: false
 *        type: string
 *      - name: course_id
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: fee
 *        in: formData
 *        required: false
 *        type: string
 */

router.post("/upload", uploadVideoFile, Course_inf.uploadVideo);
/**
 * @swagger
 * /api/upload:
 *  post:
 *    description: Takes the input from the file directory, body and saves to youtube storage as unlisted.
 *    responses:
 *      '200':
 *        Description: Redirects to the successfull page.
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: videoFile
 *        in: videoFile
 *        required: true
 *        type: file
 *      - name: title
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        in: formData
 *        required: true
 *        type: string
 */

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
