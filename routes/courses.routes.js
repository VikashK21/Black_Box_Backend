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
        response: {
          dolphin: {
            desktop_client_uri:
              "dolphin-vc://test-blackis.dolphinvc.com/r/9zesx2/55453166420?pwd=1ac2ed07a118bc9a45923d66d0f30557954c16e453&jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg#userInfo.displayName=Vikash&config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.subject=adfasdf&config.endMeetingRedirectUrl=https://blackboxnow.com/profile&interfaceConfig.BRAND_WATERMARK_IMAGE=https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png&interfaceConfig.BRAND_WATERMARK_LINK=https://blackboxnow.com/&config.meetingInfoId=0c32aa38-383f-4b8d-b05a-bdc93f69335e&config.recordingMediaType=video",
            failures: [],
            meeting_id: "55453166420",
            meeting_info_id: "0c32aa38-383f-4b8d-b05a-bdc93f69335e",
            mobile_client_uri:
              "https://dolphinvcapp.page.link/?link=https://test-blackis.dolphinvc.com/r/9zesx2/55453166420&apn=com.nouveaulabs.dolphinvc&amv=3&ibi=com.nouveaulabs.dolphinvc&isi=1538144277&ius=dolphin-vc&jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg",
            mobile_client_uri_android:
              "intent://test-blackis.dolphinvc.com/r/9zesx2/55453166420?jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg#Intent;scheme=com.nouveaulabs.dolphinvc;package=com.nouveaulabs.dolphinvc;end",
            mobile_client_uri_io:
              "dolphin-vc://test-blackis.dolphinvc.com/r/9zesx2/55453166420?jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg",
            web_client_uri:
              "https://test-blackis.dolphinvc.com/r/9zesx2/55453166420?pwd=d666812f5609b4e02046317d4d63b7e892892a62f1&jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg#userInfo.displayName=Vikash&config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.subject=adfasdf&config.endMeetingRedirectUrl=https://blackboxnow.com/profile&interfaceConfig.BRAND_WATERMARK_IMAGE=https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png&interfaceConfig.BRAND_WATERMARK_LINK=https://blackboxnow.com/&config.meetingInfoId=0c32aa38-383f-4b8d-b05a-bdc93f69335e&config.recordingMediaType=video&config.inviteViaDvcEnabled=true&config.joinPageFlowEnabled=false&config.callMode=true&config.showFeedbackPage=true&config.startWithAudioMuted=false",
          },
        },
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
        params:
          "add the course id instead of courseID and also remeber the auth token",
        info: "This API is for both time reacting and disreacting too. The reaction data will receive with the courses in Reactions feild.",
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

    editClassById: {
      PATCH: {
        route: "/api/class/:id",
        parameters:
          "The same body what you were sending for the adding Classes",
      },
    },

    deleteClassById: {
      DELETE: {
        route: "/api/class/:id",
      },
    },
    getParticipant: {
      GET: {
        route: "/api/participant/:courseID",
        token: true,
        response: {
          found: {
            status: true,
            msg: "The participant exist.",
          },
          notFound: { status: false, msg: "The participant does not exist!" },
          failure: {},
        },
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
  "/participant/:courseID",
  authorizationToken,
  Course_inf.getParticipant,
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
router.delete("/class/:id", authorizationToken, Course_inf.deleteClassById);
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

let k = {
  dolphin: {
    desktop_client_uri:
      "dolphin-vc://test-blackis.dolphinvc.com/r/9zesx2/55453166420?pwd=1ac2ed07a118bc9a45923d66d0f30557954c16e453&jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg#userInfo.displayName=Vikash&config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.subject=adfasdf&config.endMeetingRedirectUrl=https://blackboxnow.com/profile&interfaceConfig.BRAND_WATERMARK_IMAGE=https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png&interfaceConfig.BRAND_WATERMARK_LINK=https://blackboxnow.com/&config.meetingInfoId=0c32aa38-383f-4b8d-b05a-bdc93f69335e&config.recordingMediaType=video",
    failures: [],
    meeting_id: "55453166420",
    meeting_info_id: "0c32aa38-383f-4b8d-b05a-bdc93f69335e",
    mobile_client_uri:
      "https://dolphinvcapp.page.link/?link=https://test-blackis.dolphinvc.com/r/9zesx2/55453166420&apn=com.nouveaulabs.dolphinvc&amv=3&ibi=com.nouveaulabs.dolphinvc&isi=1538144277&ius=dolphin-vc&jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg",
    mobile_client_uri_android:
      "intent://test-blackis.dolphinvc.com/r/9zesx2/55453166420?jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg#Intent;scheme=com.nouveaulabs.dolphinvc;package=com.nouveaulabs.dolphinvc;end",
    mobile_client_uri_io:
      "dolphin-vc://test-blackis.dolphinvc.com/r/9zesx2/55453166420?jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg",
    web_client_uri:
      "https://test-blackis.dolphinvc.com/r/9zesx2/55453166420?pwd=d666812f5609b4e02046317d4d63b7e892892a62f1&jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzQyNDUzNjgsImlhdCI6MTY3NDI0MTc2OCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI0NjcyMDUyNi0yMjViLTQ5M2QtYmZjYy1hMDBlOWNjNDU0YzIiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.NHmYL0nSpr5yyff45_PcJZKiSb9EshCDjbFkl9WNTLkuz_jPgNdNqAi361gDC-e8dNf4ClctxSHQoZpQ_mIeLxuTkoG6nhm70MrjmJOQTw1uCJlUgkth4WO2yuGSbZGzmjtf6O2I9dzVNvx1QkH6igOdhOvDLfbk78k0aaS2ynY80jX6-tY_clKtvIuxLlDOzc8XpudqVbz0VEm3i6FcBT6xkTAG5ZKcpF6__I-b3MJTQyt9mxrb8HQLXKwvgBIbMKqHXoQQDutF_GTZmjG9BSOvJ1dhVrAXhQL4lXJXbDWis07XabRa4FBrLdmr_IbDzjkD99NOd9Bl5F56t02_Dg#userInfo.displayName=Vikash&config.startWithAudioMuted=true&config.startWithVideoMuted=true&config.subject=adfasdf&config.endMeetingRedirectUrl=https://blackboxnow.com/profile&interfaceConfig.BRAND_WATERMARK_IMAGE=https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png&interfaceConfig.BRAND_WATERMARK_LINK=https://blackboxnow.com/&config.meetingInfoId=0c32aa38-383f-4b8d-b05a-bdc93f69335e&config.recordingMediaType=video&config.inviteViaDvcEnabled=true&config.joinPageFlowEnabled=false&config.callMode=true&config.showFeedbackPage=true&config.startWithAudioMuted=false",
    duration_type: "Classes",
  },
};
