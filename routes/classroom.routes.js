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
        beforeThisApi: {
          call: "api/signup",
          body: {
            img_thumbnail: "",
            first_name: "Arun",
            last_name: "Kumar",
            email: "arun@ai.co",
            phone_num: "+91 8877665544",
            password: "arun@123",
            about: "i AM a teacher...",
          },
          response: {
            id: 24,
            provider: "email/phone",
            img_thumbnail: "",
            first_name: "Arun",
            last_name: "Kumar",
            email: "arun@ai.co",
            phone_num: "+91 8877665544",
            password:
              "$2b$12$W9nd6rax5PAILtT8qSDOveofkvi4rNBOf9u8BIp3tkUIvgyXklaPa",
            about: "i AM a teacher...",
            otp: 0,
            verified: false,
            admin: false,
            created_at: "2022-12-19T06:04:09.150Z",
            classroom_id: null,
            updated_at: "2022-12-19T06:04:09.150Z",
          },
        },
        route: "/api/workspace/:userID",
        parameters: {
          logo: null,
          title: "Artificial Inteligence",
          description: "This is a company with leads to a group of Students",
        },
        info: "Only can be created if user belongs to a corprate. The token is not required in this.",
        response: {
          id: 24,
          provider: "email/phone",
          img_thumbnail: "",
          first_name: "Arun",
          last_name: "Kumar",
          email: "arun@ai.co",
          phone_num: "+91 8877665544",
          password:
            "$2b$12$W9nd6rax5PAILtT8qSDOveofkvi4rNBOf9u8BIp3tkUIvgyXklaPa",
          about: "i AM a teacher...",
          otp: 0,
          verified: false,
          admin: false,
          created_at: "2022-12-19T06:04:09.150Z",
          classroom_id: 9,
          updated_at: "2022-12-19T06:04:09.150Z",
          Classroom: {
            id: 9,
            logo: null,
            host: 24,
            title: "Artificial Inteligence",
            description: "This is a company with leads to a group of Students",
            email_type: "ai.co",
            updated_at: "2022-12-19T06:11:43.623Z",
          },
        },
      },
    },
    editWorkSpace: {
      PATCH: {
        route: "/api/workspace",
        parameters: {
          logo: "",
          title: "Artificial Inteligence",
          description: "This is a company with leads to a group of Students",
        },
        response: {
          id: 9,
          logo: "",
          host: 24,
          title: "Artificial Inteligence",
          description: "This is a company with leads to a group of Students",
          email_type: "ai.co",
          updated_at: "2022-12-19T06:11:43.623Z",
        },
      },
    },
    workSpace: {
      GET: {
        route: "/api/workspace",
        response: {
          id: 9,
          logo: "",
          host: 24,
          title: "Artificial Inteligence",
          description: "This is a company with leads to a group of Students",
          email_type: "ai.co",
          updated_at: "2022-12-19T06:11:43.623Z",
          Users: [
            {
              id: 24,
              provider: "email/phone",
              img_thumbnail: "",
              first_name: "Arun",
              last_name: "Kumar",
              email: "arun@ai.co",
              phone_num: "+91 8877665544",
              password:
                "$2b$12$W9nd6rax5PAILtT8qSDOveofkvi4rNBOf9u8BIp3tkUIvgyXklaPa",
              about: "i AM a teacher...",
              otp: 0,
              verified: false,
              admin: false,
              created_at: "2022-12-19T06:04:09.150Z",
              classroom_id: 9,
              updated_at: "2022-12-19T06:04:09.150Z",
            },
          ],
          Classroom_Course: [],
        },
      },
    },
    createClassroom: {
      POST: {
        route: "/api/classroom",
        parameters: {
          title: "Meeting",
          description: "This will relax your body and the mind.",
          images: [
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.helpguide.org%2Fwp-content%2Fuploads%2Fwoman-at-edge-of-dock-lotus-position.jpg&imgrefurl=https%3A%2F%2Fwww.helpguide.org%2Fmeditations%2Fprogressive-muscle-relaxation-meditation.htm&tbnid=w3A_oaC2lMbJoM&vet=12ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ..i&docid=pcpoeq6NaXsLRM&w=1541&h=924&q=meditation&ved=2ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ",
          ],
          link: "https://meet.google.com/abu-tnrr-pan?authuser=0",
          requirements: ["you", "Yourself", "Presence"],
        },
        response: {
          id: 4,
          completion: false,
          title: "Meeting",
          description: "This will relax your body and the mind.",
          host: 9,
          creator: 24,
          images: [
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.helpguide.org%2Fwp-content%2Fuploads%2Fwoman-at-edge-of-dock-lotus-position.jpg&imgrefurl=https%3A%2F%2Fwww.helpguide.org%2Fmeditations%2Fprogressive-muscle-relaxation-meditation.htm&tbnid=w3A_oaC2lMbJoM&vet=12ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ..i&docid=pcpoeq6NaXsLRM&w=1541&h=924&q=meditation&ved=2ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ",
          ],
          hosted: false,
          link: "https://meet.google.com/abu-tnrr-pan?authuser=0",
          requirements: ["you", "Yourself", "Presence"],
        },
      },
    },
    createSession: {
      POST: {
        route: "/api/session/:classroomID",
        parameters: {
          date: "Nov 30, 2022",
          duration: "2hr",
          time: "4:30 PM",
        },
        response: {
          id: 16,
          title: null,
          date: "Nov 30, 2022",
          over: false,
          duration: "2hr",
          time: "4:30 PM",
          description: null,
          course_id: null,
          fee: null,
          classroom_course_id: 4,
        },
      },
    },
    editClassroom: {
      PATCH: {
        route: "/api/classroom/:classroomID",
        parameters: {
          title: "Meetings",
          description: "This will relax your body and the mind.",
          images: [
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.helpguide.org%2Fwp-content%2Fuploads%2Fwoman-at-edge-of-dock-lotus-position.jpg&imgrefurl=https%3A%2F%2Fwww.helpguide.org%2Fmeditations%2Fprogressive-muscle-relaxation-meditation.htm&tbnid=w3A_oaC2lMbJoM&vet=12ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ..i&docid=pcpoeq6NaXsLRM&w=1541&h=924&q=meditation&ved=2ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ",
          ],
          link: "https://meet.google.com/abu-tnrr-pan?authuser=0",
          requirements: ["you", "Yourself", "Presence"],
        },
        response: {
          id: 4,
          completion: false,
          title: "Meetings",
          description: "This will relax your body and the mind.",
          host: 9,
          creator: 24,
          images: [
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.helpguide.org%2Fwp-content%2Fuploads%2Fwoman-at-edge-of-dock-lotus-position.jpg&imgrefurl=https%3A%2F%2Fwww.helpguide.org%2Fmeditations%2Fprogressive-muscle-relaxation-meditation.htm&tbnid=w3A_oaC2lMbJoM&vet=12ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ..i&docid=pcpoeq6NaXsLRM&w=1541&h=924&q=meditation&ved=2ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ",
          ],
          hosted: false,
          link: "https://meet.google.com/abu-tnrr-pan?authuser=0",
          requirements: ["you", "Yourself", "Presence"],
        },
      },
    },
    editSession: {
      PATCH: {
        route: "/api/session/:sessionID",
        parameters: {
          date: "string",
          duration: "in mins",
          time: "string",
        },
        response: {
          id: 16,
          title: null,
          date: "Dec 1, 2022",
          over: false,
          duration: "2hr",
          time: "3:30 PM",
          description: null,
          course_id: null,
          fee: null,
          classroom_course_id: 4,
        },
      },
    },
    classroomById: {
      GET: {
        route: "/api/classroom/:classroomID",
        response: {
          id: 4,
          completion: false,
          title: "Meetings",
          description: "This will relax your body and the mind.",
          host: 9,
          creator: 24,
          images: [
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.helpguide.org%2Fwp-content%2Fuploads%2Fwoman-at-edge-of-dock-lotus-position.jpg&imgrefurl=https%3A%2F%2Fwww.helpguide.org%2Fmeditations%2Fprogressive-muscle-relaxation-meditation.htm&tbnid=w3A_oaC2lMbJoM&vet=12ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ..i&docid=pcpoeq6NaXsLRM&w=1541&h=924&q=meditation&ved=2ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ",
          ],
          hosted: false,
          link: "https://meet.google.com/abu-tnrr-pan?authuser=0",
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
          duration_type: "Classes",
          requirements: ["you", "Yourself", "Presence"],
          host_details: {
            id: 9,
            logo: "",
            host: 24,
            title: "Artificial Inteligence",
            description: "This is a company with leads to a group of Students",
            email_type: "ai.co",
            updated_at: "2022-12-19T06:11:43.623Z",
          },
          Classes: [
            {
              id: 16,
              title: null,
              date: "Dec 1, 2022",
              over: false,
              duration: "2hr",
              time: "3:30 PM",
              description: null,
              course_id: null,
              fee: null,
              classroom_course_id: 4,
            },
          ],
          Vid_Classes: [],
          Reactions: [],
          creator_d: {
            id: 24,
            provider: "email/phone",
            img_thumbnail: "",
            first_name: "Arun",
            last_name: "Kumar",
            email: "arun@ai.co",
            phone_num: "+91 8877665544",
            password:
              "$2b$12$W9nd6rax5PAILtT8qSDOveofkvi4rNBOf9u8BIp3tkUIvgyXklaPa",
            about: "i AM a teacher...",
            otp: 0,
            verified: false,
            admin: false,
            created_at: "2022-12-19T06:04:09.150Z",
            classroom_id: 9,
            updated_at: "2022-12-19T06:04:09.150Z",
          },
        },
      },
    },
    sessionById: {
      GET: {
        route: "/api/session/:sessionID",
        response: {
          id: 16,
          title: null,
          date: "Dec 1, 2022",
          over: false,
          duration: "2hr",
          time: "3:30 PM",
          description: null,
          course_id: null,
          fee: null,
          classroom_course_id: 4,
        },
      },
    },
    workSpaceClassrooms: {
      GET: {
        route: "/api/classrooms",
        response: [
          {
            id: 4,
            completion: false,
            title: "Meetings",
            description: "This will relax your body and the mind.",
            host: 9,
            creator: 24,
            images: [
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.helpguide.org%2Fwp-content%2Fuploads%2Fwoman-at-edge-of-dock-lotus-position.jpg&imgrefurl=https%3A%2F%2Fwww.helpguide.org%2Fmeditations%2Fprogressive-muscle-relaxation-meditation.htm&tbnid=w3A_oaC2lMbJoM&vet=12ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ..i&docid=pcpoeq6NaXsLRM&w=1541&h=924&q=meditation&ved=2ahUKEwjgoJPvttD7AhWX_zgGHa5WBSgQMygEegUIARDqAQ",
            ],
            hosted: false,
            link: "https://meet.google.com/abu-tnrr-pan?authuser=0",
            requirements: ["you", "Yourself", "Presence"],
            host_details: {
              id: 9,
              logo: "",
              host: 24,
              title: "Artificial Inteligence",
              description:
                "This is a company with leads to a group of Students",
              email_type: "ai.co",
              updated_at: "2022-12-19T06:11:43.623Z",
            },
            Classes: [
              {
                id: 16,
                title: null,
                date: "Dec 1, 2022",
                over: false,
                duration: "2hr",
                time: "3:30 PM",
                description: null,
                course_id: null,
                fee: null,
                classroom_course_id: 4,
              },
            ],
            Vid_Classes: [],
            Reactions: [],
            creator_d: {
              id: 24,
              provider: "email/phone",
              img_thumbnail: "",
              first_name: "Arun",
              last_name: "Kumar",
              email: "arun@ai.co",
              phone_num: "+91 8877665544",
              password:
                "$2b$12$W9nd6rax5PAILtT8qSDOveofkvi4rNBOf9u8BIp3tkUIvgyXklaPa",
              about: "i AM a teacher...",
              otp: 0,
              verified: false,
              admin: false,
              created_at: "2022-12-19T06:04:09.150Z",
              classroom_id: 9,
              updated_at: "2022-12-19T06:04:09.150Z",
            },
          },
        ],
      },
    },
    classroomSessions: {
      GET: {
        route: "/api/sessions/:classroomID",
        response: [
          {
            id: 16,
            title: null,
            date: "Dec 1, 2022",
            over: false,
            duration: "2hr",
            time: "3:30 PM",
            description: null,
            course_id: null,
            fee: null,
            classroom_course_id: 4,
          },
        ],
      },
    },
  });
});

router.delete("/workspace");
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
