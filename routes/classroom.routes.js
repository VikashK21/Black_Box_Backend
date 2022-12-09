const { authorizationToken } = require("../auth/user.auth");
const Classroom_ctrl = new (require("../controllers/classroom.ctrller"))();

console.log("the classroom page, need something different...");
const router = require("express").Router();

router.get("/", (req, res) => {
  //   res.send("The classroom page.");
  res.status(200).json({
    msg: "These apis will take the auth token.",
    workSpaceAllow: {
      GET: {
        route: "/api/workspaceallow/:userEmail",
        response: "true: go and create || false: leave it.",
      },
    },
    createWorkSpace: {
      POST: {
        route: "/api/workspace/:userID",
        parameters: {
          logo: "string",
          title: "string",
          description: 'not neccessary but if there then "string"',
        },
      },
    },
    editWorkSpace: {
      PATCH: {
        route: "/api/workspace",
        parameters: {
          title: "string",
          description: 'not neccessary but if there then "string"',
        },
      },
    },
    workSpace: {
      GET: {
        route: "/api/workspace",
      },
    },
    createClassroom: {
      POST: {
        route: "/api/classroom",
        parameters: {
          title: "string",
          description: "not neccessary but if there then 'string'",
          images: "array",
          link: "string",
          requirements: "not neccessary but if there then 'json'",
        },
      },
    },
    createSession: {
      POST: {
        route: "/api/session/:classroomID",
        parameters: {
          title: "not neccessary but if there then 'string'",
          date: "string",
          duration: "in mins",
          time: "string",
        },
      },
    },
    editClassroom: {
      PATCH: {
        route: "/api/classroom/:classroomID",
        parameters: {
          title: "string",
          description: "not neccessary but if there then 'string'",
          images: "array",
          link: "string",
          requirements: "not neccessary but if there then 'json'",
        },
      },
    },
    editSession: {
      PATCH: {
        route: "/api/session/:sessionID",
        parameters: {
          title: "not neccessary but if there then 'string'",
          date: "string",
          duration: "in mins",
          time: "string",
        },
      },
    },
    classroomById: {
      GET: {
        route: "/api/classroom/:classroomID",
      },
    },
    sessionById: {
      GET: {
        route: "/api/session/:sessionID",
      },
    },
    workSpaceClassrooms: {
      GET: {
        route: "/api/classrooms",
      },
    },
    classroomSessions: {
      GET: {
        route: "/api/sessions/:classroomID",
      },
    },
  });
});

router.delete("/workspace")
//workspace as a company or org...
router.get("/workspaceallow/:email", Classroom_ctrl.workSpaceAllow);

router.post("/workspace/:id", Classroom_ctrl.createWorkSpace);

router.patch("/workspace", authorizationToken, Classroom_ctrl.editWorkSpace);
router.get("/workspace", authorizationToken, Classroom_ctrl.workSpace);

//contents into workspace
router.post("/classroom", authorizationToken, Classroom_ctrl.createClassroom);
router.post("/session/:id", authorizationToken, Classroom_ctrl.createSession);

router.patch(
  "/classroom/:id",
  authorizationToken,
  Classroom_ctrl.editClassroom,
);
router.patch("/session/:id", authorizationToken, Classroom_ctrl.editSession);

router.get(
  "/classrooms",
  authorizationToken,
  Classroom_ctrl.workSpaceClassrooms,
);
router.get(
  "/sessions/:id",
  authorizationToken,
  Classroom_ctrl.classroomSessions,
);

router.get("/classroom/:id", authorizationToken, Classroom_ctrl.classroomById);
router.get("/session/:id", authorizationToken, Classroom_ctrl.sessionById);

module.exports = router;
