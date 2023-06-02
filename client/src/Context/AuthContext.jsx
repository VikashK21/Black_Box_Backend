/*eslint no-lone-blocks: "error"*/
/*eslint-env es6*/
import { createContext, useContext, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";
import StyleContext from "./StyleContext";
import {} from "@testing-library/user-event/dist/type";

const AuthContext = createContext();
export default AuthContext;

// export const BaseUrl = "http://localhost:3001/api";
export const dDomain = "https://test-blackis.dolphinvc.com/";

export const BaseUrl = "/api";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showclasses, setShowclasses] = useState(false);

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null,
  );

  const { errorToast, successToast, infoToast } = useContext(StyleContext);

  // eslint-disable-next-line
  const [errUser, setErrUser] = useState();
  const [profile, setProfile] = useState();
  const [cloud, setCloud] = useState("");
  const [image, setImage] = useState([]);
  const [updatedImgs, setUpdatedImgs] = useState([]);
  const [classlist, setClasslist] = useState([]);

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    mobile: "",
    about: "",
    otp: "",
  });

  ///reactions...
  const [reaction, setReaction] = useState([]);

  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    max_students: "",
    images: [""],
    type: "",
    structure: "",
    classes: "",
    methodology: [{}],
    content: [{}],
    requirements: [{}],
  });

  const [classes, setClasses] = useState({
    title: "",
    description: "",
    fee: "",
    date: "",
    time: "",
    duration: "",
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null,
  });
  // eslint-disable-next-line
  const [cldimages, setCldimages] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseId, setCourseId] = useState();
  // eslint-disable-next-line
  const [name, setName] = useState();
  const [value, setValue] = useState("");

  const [toChoose, setToChoose] = useState(false);
  const [enterR, setEnterR] = useState(true);

  const [workspaceAllow, setWorkspaceAllow] = useState(false);
  const [workspace, setWorkspace] = useState({});
  const [workdata, setWorkdata] = useState([]);
  const [seenavs, setSeenavs] = useState(false);
  const [clsroom, setClsroom] = useState(false);

  const [startMeeting, setStartMeeting] = useState();
  const [meetingAuth, setMeetingAuth] = useState();

  const [willBeFrnd, setWillBeFrnd] = useState([]);
  const [areFriends, setAreFriends] = useState([]);
  const [acceptngFrnd, setAcceptngFrn] = useState([]);

  //Friendship>>>
  const willFrnd = async () => {
    try {
      const res = await axios.get(BaseUrl + `/blackboxusers`, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      if (res.status === 200) {
        setWillBeFrnd(() => [...res.data]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const saveFrnd = async (id, ind) => {
    try {
      const res = await axios.post(
        BaseUrl + `/friends/add/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      if (typeof res.data === "object") {
        let users = willBeFrnd;
        users.splice(ind, 1);
        setWillBeFrnd(() => [...users]);
        successToast("Request sent successfully");
      } else {
        infoToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const allAcceptingFrnds = async () => {
    try {
      const res = await axios.get(BaseUrl + `/friends/requests`, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      if (typeof res.data === "object") {
        setAcceptngFrn(() => [...res.data]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const acceptFrnd = async (id, ind) => {
    try {
      const res = await axios.patch(
        BaseUrl + `/friends/accept/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      if (typeof res.data === "object") {
        let users = acceptngFrnd;
        users.splice(ind, 1);
        setAcceptngFrn(() => [...users]);
        successToast("Saved in your Friends list");
        await allFriends();
      } else {
        infoToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const dismissFrnd = async (id, ind, type) => {
    try {
      const res = await axios.delete(BaseUrl + `/friends/dismiss/${id}`, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      if (typeof res.data === "object") {
        // let users2 = willBeFrnd;
        if (type === "frnd") {
          const users = areFriends;
          // friend
          // users2.splice(0, 0, users[ind].friend);
          users.splice(ind, 1);
          setAreFriends(() => [...users]);
          successToast("Removed from the friends list");
        } else {
          const users = acceptngFrnd;
          // Friends_Peer[0]
          // users2.splice(0, 0, users[ind].Friends_Peer[0]);
          users.splice(ind, 1);
          setAcceptngFrn(() => [...users]);
          successToast("Removed from the requests list");
        }
        // setWillBeFrnd(() => [...users2]);
      } else {
        errorToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const allFriends = async () => {
    try {
      const res = await axios.get(BaseUrl + `/friends`, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      if (typeof res.data === "object") {
        setAreFriends(() => [...res.data]);
      } else {
        infoToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  //Dolphin>>>
  const dvc = new window.DvcSDK();
  dvc.setDomain("https://test-blackis.dolphinvc.com");
  // dvc.getReconcileJwt(authTokens);

  const reconcileJWT = async () => {
    try {
      const res = await axios.post(
        dDomain + "auth/api/v1/reconcile-jwt",
        { token: authTokens },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );
      // console.log(res.data);
      setMeetingAuth(() => res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const refreshJWT = async () => {
    try {
      if (!meetingAuth) {
        // console.log("Token not found!!");
        return;
      }

      const res = await axios.post(dDomain + "auth/api/v1/refresh-token", {
        refreshToken: meetingAuth.refreshToken,
      });
      // console.log(res.data);
      setMeetingAuth(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const callStartMeetingApi = async (meeting_name) => {
    try {
      const data = {
        default: true,
        audio_only: true,
        include_video: true,
        include_audio: true,
        mute_audio_on_start: true,
        meeting_name,
        // moderator_info: {
        //   username: "string",
        //   user_id: "string",
        // },
        password: "12345",
        redirect_url: "https://blackboxnow.com/",
        water_mark_image_png:
          "https://res.cloudinary.com/black-box/image/upload/v1672752016/buqwsbiz9lp2rezinn5t.jpg",
        water_mark_image_link: "https://blackboxnow.com/",
        // redirect_url: "string",
        // water_mark_image_png: "string",
        // water_mark_image_link: "string",
      };
      const token = await reconcileJWT();
      const res = await axios.post(dDomain + "meeting/api/v1/meeting", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      // console.log(res.data, "the startMeeting D");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const callJoinMeetingApi = async (id) => {
    try {
      // console.log(token.token);
      const token = await reconcileJWT();
      // console.log("meeting token", meetingAuth);
      let config = {
        method: "get",
        url: `${dDomain}meeting/api/v1/join/${id}?passcode=12345&end_meeting_redirect_url=https://blackboxnow.com/profile&display_name=${user.first_name}%20${user.last_name}&mute_audio_on_start=true&include_video=true&include_audio=true&water_mark_image_png=https://res.cloudinary.com/black-box/image/upload/v1672752016/buqwsbiz9lp2rezinn5t.jpg&water_mark_image_link=https://blackboxnow.com/`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      };
      const res = await axios(config);
      // console.log(res.data, "the data fromt he join");
      setLoading(true);
      return res.data;
    } catch (err) {
      // console.log("something went wrong");
      console.log(err.response);
    }
  };

  const callStartMeeting = async (meeting_name) => {
    try {
      dvc.getReconcileJwt(authTokens);
      dvc.setShowFeedback(false);
      let config = {
        // default: false,
        audio_only: false,
        include_video: true,
        include_audio: true,
        mute_audio_on_start: true,
        // moderator_incoming_call: true,
        redirect_url: "https://blackboxnow.com/",
        water_mark_image_png:
          "https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png",
        water_mark_image_link: "https://blackboxnow.com/",
        meeting_name,
        passcode: "12345",
        // meeting_call_type: "video",
        // dvc_users: [],
        // telephony_users: [],
      };
      // moderator_info: {
      //   username: "someuser@gmail.com",
      //   user_id: "123e4567-e89b-12d3-a456-426614174000",
      // },
      const res = await dvc // this variable represents the instance of the DvcSDK class
        .startMeeting(config); // instance method to start meeting taking in config as object
      // console.log(res.data, "the meeting de");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getParticipant = async (course_id) => {
    try {
      const res = await axios.get(BaseUrl + `/participant/${course_id}`, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      if (res) {
        if (res.status) {
          return true;
        } else if (!res.status) {
          errorToast("You have not registered this course");
          return false;
        }
      }
      return false;
    } catch (err) {
      console.log(err.message);
    }
  };

  const callJoinMeeting = async (meeting_id, course_id, type) => {
    try {
      // console.log(meeting_id, "the meeting id");
      setLoading(true);
      let allow = false;
      if (type === "ses" && user.classroom_id) {
        const data = await getClassroomById(course_id);
        if (data && data.dolphin && data.dolphin.meeting_id === meeting_id) {
          allow = true;
        }
      } else if (type === "cls") {
        allow = await getParticipant(course_id);
        if (typeof allow !== "boolean") {
          allow = false;
        }
        allow = true;
      }
      if (allow) {
        // console.log(authTokens, "the token");
        dvc.getReconcileJwt(authTokens);
        dvc.setShowFeedback(false);
        // dvc.setWaterMarkImagePng(
        //   "https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png",
        // );
        // dvc.setWaterMarkImageLink("https://blackboxnow.com/");
        // dvc.setRedirectUrl("https://blackboxnow.com/profile");
        // console.log(dvc);
        // console.log(startMeeting);
        let params = {
          include_audio: true,
          include_video: false,
          mute_audio_on_start: true,
          end_meeting_redirect_url: "https://blackboxnow.com/",
          water_mark_image_png:
            "https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png",
          water_mark_image_link: "https://blackboxnow.com/",
          passcode: "12345",
          display_name: `${user.first_name} ${user.last_name}`,
          meeting_id,
        };
        // redirect_url: "https://blackboxnow.com/profile",
        // end_meeting_redirect_url: "https://blackboxnow.com/profile",
        // water_mark_image_png:
        //   "https://blackboxnow.com/static/media/blackbox-logo-01.86234ed62aef14383960.png",
        // water_mark_image_link: "https://blackboxnow.com/",
        const res = await dvc.joinMeeting(params);
        // console.log(res);
        setLoading((pre) => !pre);
        return res.data;
      }
      if (type !== "ses" || type !== "cls" || course_id === 0) {
        errorToast("Invalid url");
      }
    } catch (err) {
      console.log(err);
      errorToast(err);
    }
  };

  // callStartMeeting();

  const createClassroom = async (data, sessions) => {
    // console.log(data);
    try {
      const uploaders = await imgsAlgo(image);
      let dolphin = await callStartMeeting(data.title);
      // console.log(dolphin, "from the classroom");
      if (!dolphin.hasOwnProperty("web_client_uri")) {
        dolphin = await callStartMeeting(data.title);
      }
      const res = await axios.post(
        BaseUrl + "/classroom",
        { ...data, images: uploaders, dolphin },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      // console.log(res);
      if (res.status === 201) {
        await Promise.all(
          sessions.map(async (sess) => {
            // let formData = new FormData();
            // formData.append("file", img);
            // formData.append("upload_preset", "i1m10bd7");
            // formData.append("cloud_name", "black-box");
            const data = await createSession(sess, res.data.id);
            if (res.status !== 201) {
              errorToast(data);
            }
          }),
        );
        successToast("Session uploaded successfully");
        await getWorkSpaceClassroom();
        setImage([]);
        // return res.data;
      } else {
        console.log(res.data);
        errorToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
      errorToast(err.message);
    }
  };

  const editClassroom = async (data, clsroomID) => {
    try {
      const res = await axios.patch(BaseUrl + "/classroom/" + clsroomID, data, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res);
      if (res.status === 202) {
        successToast("Successfully Session Details updated");
        return res.data;
      } else {
        console.log(res.data);
        errorToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
      errorToast(err.message);
    }
  };

  const createSession = async (data, clsroomID) => {
    try {
      const res = await axios.post(BaseUrl + "/session/" + clsroomID, data, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res);
      if (res.status === 201) {
        // successToast("Successfully Session timings uploaded");
        return res.data;
      } else {
        console.log(res.data);
        return res.data;
        // errorToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
      return err.message;
      // errorToast(err.message);
    }
  };

  const editSession = async (data, sessionID) => {
    try {
      const res = await axios.patch(BaseUrl + "/session/" + sessionID, data, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res);
      if (res.status === 202) {
        successToast("Successfully Session timings  updated");
        return res.data;
      } else {
        console.log(res.data);
        errorToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
      errorToast(err.message);
    }
  };

  const getClassroomSessions = async (clsroomID) => {
    try {
      const res = await axios.get(BaseUrl + "/sessions/" + clsroomID, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res);
      if (res.status === 200) {
        successToast("Classroom sessions are presented");
        return res.data;
      } else {
        console.log(res.data);
        errorToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
      errorToast(err.message);
    }
  };

  const getClassroomById = async (clsroomID) => {
    try {
      const res = await axios.get(BaseUrl + "/classroom/" + clsroomID, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res);
      if (res.status === 200) {
        // successToast("")
        return res.data;
      } else {
        console.log(res.data);
        errorToast(res.data);
      }
    } catch (err) {
      console.log(err.message);
      errorToast(err.message);
    }
  };

  const getWorkSpaceAllow = async (email) => {
    try {
      const res = await axios.get(BaseUrl + "/workspaceallow/" + email);
      // console.log(res);
      setWorkspaceAllow(res.data.status);
      return res.data.status;
    } catch (err) {
      console.log(err.message);
    }
  };

  const createWorkSpace = async (id, data) => {
    try {
      setLoading(true);
      if (user) {
        // console.log(user, "the user id");
        id = user.id;
      }
      await axios.post(BaseUrl + "/workspace/" + id, data);
      if (user) {
        await getProfile();
      } else {
        // await standingData(workdata.email, workdata.password, "/classroom");
        infoToast("Have not been logged in yet");
      }
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getWorkSpaceClassroom = async () => {
    try {
      const res = await axios.get(BaseUrl + "/classrooms", {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res.data, "the data of the Classroom");
      setWorkdata(() => [...res.data]);
      // return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const editWorkSpace = async (data) => {
    try {
      setLoading(true);
      const res = await axios.patch(BaseUrl + "/workspace", data, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res.data, "edited, the workspace...");
      navigate("/classroom");
      setLoading(false);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getWorkSpace = async () => {
    try {
      const res = await axios.get(BaseUrl + "/workspace", {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      const data = res.data;
      // console.log(data, "the data from the workspace");
      setWorkspace(() => data);
      return data;
    } catch (err) {
      console.log(err.message, "the eoror");
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get(BaseUrl + "/profile", {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res.data, "the profile data");
      setProfile(res.data);
      loginProcess(res, "/classroom");
    } catch (err) {
      console.log(err.message, "the eroror");
    }
  };

  const signupUser = async (propic) => {
    if (clsroom) {
      const email_type = values.email.split("@")[1];
      if (
        email_type === "gmail.com" ||
        email_type === "outlook.com" ||
        email_type === "hotmail.com" ||
        email_type === "yahoo.com"
      ) {
        setClsroom(false);
        return infoToast("Email should be of an official corporate");
      }
    }
    setLoading(true);
    console.log("Came till here....");
    const entry = await getWorkSpaceAllow(values.email);
    console.log(entry, "the resa");
    await axios
      .post(BaseUrl + "/signup", {
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        password: values.password,
        phone_num: values.mobile,
        about: values.about,
        img_thumbnail: propic,
      })
      .then(() => {
        // console.log(res.data);
        // if (entry) {
        //   setWorkdata({
        //     id: res.data.id,
        //     email: values.email,
        //     password: values.password,
        //   });
        //   if (user) {
        //     navigate("/classroom/register");
        //   }
        // } else {
        standingData(values.email, values.password);
        setLoading(false);
        // }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        if (err.response.status === 400) {
          // setErrUser("Username already exists");
          // setTimeout(() => {
          //   setErrUser("");
          // }, 1500);
          errorToast("Email / Phone number already exists");
        }
      });
  };

  const [userDetails, setUserDetails] = useState([]);

  const loginProcess = async (res, nav = "/profile") => {
    try {
      // console.log(clsroom, "the data classroom");
      setClsroom(false);
      // console.log(res.data);
      var details = res.data.result;
      localStorage.setItem("User", JSON.stringify(details.id));
      // const propic = "";
      // console.log("details.id");
      if (res.data.result.img_thumbnail.includes("{")) {
        // console.log("yes");
        // console.log(res.data.result.img_thumbnail);
        const propic =
          res.data.result.img_thumbnail.length > 0
            ? JSON.parse(res.data.result.img_thumbnail)
            : "";
        // console.log(propic);
        localStorage.setItem("propic", JSON.stringify(propic));
      } else {
        const propic2 = res.data.result.img_thumbnail;
        localStorage.setItem("propic", propic2);
      }

      setAuthTokens(res.data.token);
      localStorage.setItem("authTokens", JSON.stringify(res.data.token));
      setUser(jwt_decode(res.data.token));
      setUserDetails(res.data.result);
      localStorage.setItem("userDetails", res.data.result.about);
      const name = res.data.result.first_name + " " + res.data.result.last_name;
      localStorage.setItem("name", name);
      setName(name);
      setLoading(false);

      if (toChoose === true) {
        navigate("/host");
        setToChoose(false);
      } else if (toChoose === false) {
        navigate(nav);
      } else {
        navigate("/classes/join/" + toChoose);
      }
    } catch (err) {
      console.log(err, "the mislenues error....");
    }
  };

  const standingData = async (email, password, nav = "/profile") => {
    setLoading(true);
    await axios
      .post(BaseUrl + "/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (clsroom || res.data.result.classroom_id) {
          console.log("this is from classroom");
          nav = "/classroom";
          // console.log(nav, "the nav chnages...");
        }
        loginProcess(res, nav);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status === 400) {
          errorToast("Invalid Username or password");
          setLoading(false);

          // navigate("/login");
          // setTimeout(() => {
          //   errorToast("");
          // }, 1500);
        }
      });
  };

  const scollToRef = useRef();
  const loginUser = async (e) => {
    e.preventDefault();
    // console.log(clsroom, "the login side....");

    const email = values.email;
    const password = values.password;
    standingData(email, password);
  };

  const logoutUser = async () => {
    setSeenavs(() => false);
    await axios
      .post(BaseUrl + "/logout", {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("User");
        localStorage.removeItem("name");
        localStorage.removeItem("propic");
        navigate("/main");
      })
      .catch((err) => {
        console.log(err.data);
      });
    // setAuthTokens(null);
    // setUser(null);
    // localStorage.removeItem("authTokens");
    // localStorage.removeItem("User");
    // localStorage.removeItem("name");
    // localStorage.removeItem("propic");
    // navigate("/main");
  };

  const OtpLogin = async (e) => {
    // console.log(values.email, "Heyyy");
    e.preventDefault();
    await axios
      .post(BaseUrl + "/sendotp", {
        email: values.email,
      })
      .then((res) => {
        // console.log(res.data);
        navigate("/otpverify");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const OtpVerify = async (e) => {
    // console.log(values.otp, "Heyyy");
    // console.log(values.email, "Email");
    e.preventDefault();
    let em = values.email;
    // console.log(em, "em");
    let otpp = values.otp;
    // console.log(otpp, "otpp");

    await axios
      .post(BaseUrl + "/verification", {
        otp: otpp,
        email: em,
      })
      .then((res) => {
        // console.log(res.data);
        navigate("/change-password");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const changePass = async (e) => {
    // console.log(values.password, "Password");
    // console.log(values.cpassword, "Confirm Password");
    // console.log(values.email, "Email");
    e.preventDefault();
    if (values.password !== values.cpassword) {
      errorToast("Password does not match");
    } else {
      await axios
        .patch(BaseUrl + "/forgetpass", {
          password: values.password,
          email: values.email,
        })
        .then((res) => {
          // console.log(res.data);
          loginProcess(res);
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  const editProfile = async (pro, propic) => {
    setLoading(true);
    if (propic === "") {
      await axios
        .patch(
          BaseUrl + "/profile",
          {
            first_name: pro.first_name,
            last_name: pro.last_name,
            email: pro.email,
            phone_num: pro.phone_num,
            about: pro.about,
          },
          {
            headers: { Authorization: `Bearer ${authTokens}` },
          },
        )
        .then((res) => {
          // console.log(res.data);
          setProfile(res.data.result);

          setLoading(false);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err.data);
          setLoading(false);
        });
    } else {
      await axios
        .patch(
          BaseUrl + "/profile",
          {
            img_thumbnail: propic,
            first_name: pro.first_name,
            last_name: pro.last_name,
            email: pro.email,
            phone_num: pro.phone_num,
            about: pro.about,
          },
          {
            headers: { Authorization: `Bearer ${authTokens}` },
          },
        )
        .then((res) => {
          // console.log(res.data);
          localStorage.setItem("propic", res.data.img_thumbnail);
          console.log("Successs");
          setProfile(res.data.result);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  const backendUpdate = async (data) => {
    await axios
      .post(BaseUrl + "user/update/profilephoto", data, {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        // console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imgsAlgo = async (image) => {
    try {
      async function uploaingImg(data) {
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/black-box/image/upload",
            data,
          );
          // console.log(res.data, "uploaded...");
          return res.data;
        } catch (err) {
          console.log(err.message, "the error");
        }
      }
      const uploaders = await Promise.all(
        image.map(async (img) => {
          let formData = new FormData();
          formData.append("file", img);
          formData.append("upload_preset", "i1m10bd7");
          formData.append("cloud_name", "black-box");
          const data = await uploaingImg(formData);
          return data.secure_url;
        }),
      );
      return uploaders;
    } catch (err) {
      console.log(err.message);
    }
  };

  const HostCourse = async (e) => {
    try {
      const uploaders = await imgsAlgo(image);
      // console.log(uploaders, "res is here.");
      // **** the dolphin apis not working
      let dolphin = await callStartMeeting(course.title);
      // console.log(dolphin, "the Host course");
      if (dolphin && !dolphin.hasOwnProperty("web_client_uri")) {
        dolphin = await callStartMeeting(course.title);
      }
      const res = await axios.post(
        BaseUrl + "/host/course",
        {
          course: { ...course, images: uploaders, dolphin },
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      // console.log(res.data);
      if (typeof res.data === "object") {
        setCourseId(res.data);
        setImage([]);
      }
    } catch (err) {
      navigate("/host");
      infoToast("Please try again, something went wrong!");
      console.log(err.message);
    }
  };

  const editClass = async (id, id2) => {
    // console.log(id, id2);
    // console.log(classes);

    await axios
      .patch(BaseUrl + "/class/" + id2, classes, {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then(() => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const HostClasses = async (e) => {
    try {
      const res = await axios.post(
        BaseUrl + "/host/classes",
        {
          classes: classes,
          course_id: courseId.id,
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      successToast("Class Added Successfully");
      // setClasslist([{ ...classlist[0], ...res.data }]);

      // setClasslist.push(res.data);

      setClasslist([...classlist, res.data]);
      // console.log(classlist);
    } catch (err) {
      console.log(err.message);
    }
  };

  const HostClasses2 = async (id) => {
    // console.log(classes);
    try {
      // eslint-disable-next-line
      // console.log(id, "the id");
      await axios.post(
        BaseUrl + "/host/classes",
        {
          classes: classes,
          course_id: id,
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      successToast("Class Added Successfully");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [classtime, setClasstime] = useState({});
  const [noClasses, setNoClasses] = useState(true);

  const DynamicTimer = async () => {
    await axios
      .get(BaseUrl + "/nextclass", {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        setClasstime((prev) => ({ ...prev, ...res.data }));
        if (res.data.length < 1) {
          setNoClasses(false);
        } else {
          setEnterR(false);
        }
        setShowclasses(false);
        if (res.status === 400) {
          setEnterR(true);
        }
        //  (res.data, "the next class");
        // console.log(typeof classtime);
        return res.data;
      })
      .catch((err) => {
        // console.log(err.data);
        setNoClasses(false);
      });
  };

  const attendingCls = async (data) => {
    try {
      const res = await axios.patch(BaseUrl + "/attending", data, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      // console.log(res.data);
      setEnterR((pre) => !pre);
      infoToast(res.data.msg);
    } catch (err) {
      console.log(err.message);
    }
  };

  function letSee(e) {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append("videoFile", form.file);
    videoData.append("title", form.title);
    videoData.append("description", form.description);

    axios
      .post(BaseUrl + "/upload", videoData)
      .then(() => {
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
    // console.log(videoData, "videoData");
  }

  const getCoursesList = async () => {
    await axios
      .get(BaseUrl + "/courses")
      .then((res) => {
        // console.log(res.data);
        setCourseList(res.data);
        let reactArray = [];
        let heart = false;
        for (let course of res.data) {
          heart = false;
          if (course.Reactions.length > 0) {
            for (let reactors of course.Reactions) {
              let userID = localStorage.getItem("User");
              if (reactors.reactor_id === Number(userID)) {
                heart = true;
                break;
              }
            }
          }
          reactArray.push({
            count: course._count.Reactions,
            heart,
          });
        }
        setReaction(reactArray);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const triggerReaction = async (i, course_id) => {
    let update = reaction;
    // console.log(reaction);
    if (update[i].heart) {
      update[i].heart = false;
      update[i].count -= 1;
    } else {
      update[i].heart = true;
      update[i].count += 1;
    }
    try {
      setReaction(update);
      // const result =
      await axios.post(
        BaseUrl + "/react/" + course_id,
        {},
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      // console.log(result, "result");
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCourseDetails = async (id) => {
    await axios
      .get(BaseUrl + "/courses/" + id)
      .then((res) => {
        // console.log(res.data);
        setCourseDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [hcl, setHcl] = useState([]);

  const hostedClasses = async () => {
    await axios
      .get(BaseUrl + "/trainer", {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        // console.log(res.data);
        setHcl(res.data);
        scollToRef.current.scrollIntoView();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [jcl, setJcl] = useState([]);

  const joinedClasses = async () => {
    await axios
      .get(BaseUrl + "/student", {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        // console.log(res.data);
        setJcl(res.data);
        scollToRef.current.scrollIntoView();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteCourse = async (id) => {
    await axios
      .delete(BaseUrl + "/delete/course/" + id, {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        // console.log(res.data);
        hostedClasses();
        successToast("Course Deleted Successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteClass = async (id) => {
    await axios
      .delete(BaseUrl + "/class/" + id, {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then(() => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editCourse = async (id) => {
    let uploaders = await imgsAlgo(updatedImgs);
    uploaders = [...uploaders, ...image];
    // console.log(uploaders, "after");
    const dolphin = await callStartMeeting(course.title);
    // console.log(dolphin, "the dolphine step");
    await axios
      .patch(
        BaseUrl + "/course/" + id,
        {
          course: { ...course, images: uploaders, dolphin },
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      )
      .then((res) => {
        // console.log(res.data, "data");
        successToast("Course Updated Successfully");
        navigate("/profile");
      })
      .catch((err) => {
        errorToast("Please try again");
      });
  };

  const getGift = async (id, email) => {
    try {
      const res = await axios.post(
        BaseUrl + "/gift",
        {
          course_id: id,
          email: email,
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      );
      if (res.status === 200) {
        infoToast(res.data);
      }
    } catch (err) {
      errorToast(err.message);
      console.log(err.message);
    }
  };

  const getSuggest = async (id, email) => {
    await axios
      .post(
        BaseUrl + "/suggest",
        {
          course_id: id,
          email: email,
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          successToast(
            `Successfully suggested your friend ${res.data.suggested_name}`,
          );
        }
      })
      .catch((err) => {
        infoToast("The suggesting email does not exist!");
        console.log(err.message);
      });
  };

  const [batch, setBatch] = useState("");

  const contextData = {
    editClass,
    scollToRef,
    deleteCourse,
    backendUpdate,
    signupUser,
    profile,
    setProfile,
    loginUser,
    logoutUser,
    setValues,
    values,
    errUser,
    user,
    OtpVerify,
    OtpLogin,
    course,
    setCourse,
    classes,
    setClasses,
    cloud,
    setCloud,
    HostClasses,
    HostClasses2,
    HostCourse,
    courseId,
    setCourseId,
    letSee,
    form,
    setForm,
    classtime,
    goToTop,
    cldimages,
    image,
    setImage,
    getCoursesList,
    courseList,
    getCourseDetails,
    courseDetails,
    BaseUrl,
    userDetails,
    setCourseList,
    reaction,
    authTokens,
    editProfile,
    triggerReaction,
    DynamicTimer,
    hostedClasses,
    hcl,
    joinedClasses,
    jcl,
    classlist,
    setClasslist,
    showclasses,
    setShowclasses,
    editCourse,
    setLoading,
    loading,
    updatedImgs,
    setUpdatedImgs,
    getSuggest,
    noClasses,
    setNoClasses,
    deleteClass,
    toChoose,
    setToChoose,
    changePass,
    loginProcess,
    value,
    setValue,
    batch,
    setBatch,
    workspaceAllow,
    workspace,
    setWorkspaceAllow,
    setWorkspace,
    getWorkSpaceAllow,
    getProfile,
    getWorkSpace,
    getWorkSpaceClassroom,
    editWorkSpace,
    createWorkSpace,
    workdata,
    setWorkdata,
    standingData,
    setSeenavs,
    seenavs,
    setClsroom,
    clsroom,
    createClassroom,
    editClassroom,
    createSession,
    editSession,
    getClassroomById,
    getClassroomSessions,
    callStartMeeting,
    startMeeting,
    setStartMeeting,
    meetingAuth,
    setMeetingAuth,
    reconcileJWT,
    refreshJWT,
    callJoinMeeting,
    callJoinMeetingApi,
    callStartMeetingApi,
    infoToast,
    getParticipant,
    attendingCls,
    setEnterR,
    enterR,
    getGift,
    willFrnd,
    setWillBeFrnd,
    willBeFrnd,
    areFriends,
    setAreFriends,
    acceptngFrnd,
    setAcceptngFrn,
    saveFrnd,
    allAcceptingFrnds,
    acceptFrnd,
    dismissFrnd,
    allFriends,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

// Creating an optimized production build...
// Browserslist: caniuse-lite is outdated. Please run:
//   npx update-browserslist-db@latest
//   Why you should do it regularly: https://github.com/browserslist/update-db#readme
