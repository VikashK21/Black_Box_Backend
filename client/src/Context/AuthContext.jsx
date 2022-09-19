import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";
// import { imageListItemClasses } from "@mui/material";
import StyleContext from "./StyleContext";

const AuthContext = createContext();
export default AuthContext;

export const BaseUrl = "http://localhost:3001/api";
// export const BaseUrl = "http://localhost:3001";
// export const BaseLink = "https://brotocamp.space/";
// export const BaseUrl = "https://creative-black-box.herokuapp.com/api";
// export const BaseLink = "http://localhost:3000/";

// export const BaseUrl = "/api"
// process.env.NODE_ENV === "production"
//   ? "/api"
//   : "http://localhost:3001/api";

// export const BaseLink = "http://localhost:3000/";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const { errorToast, successToast } = useContext(StyleContext);

  const [errUser, setErrUser] = useState();
  const [profile, setProfile] = useState();
  const [cloud, setCloud] = useState("");
  const [image, setImage] = useState([]);
  const [classlist, setClasslist] = useState([{}]);

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    about: "",
    otp: "",
  });

  ///reactions...
  const [reaction, setReaction] = useState([]);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    max_students: "",
    link: "",
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
  const [cldimages, setCldimages] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseId, setCourseId] = useState();
  const [name, setName] = useState();

  const [signUpBatch, setSignUpBatch] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const signupUser = async (propic) => {
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
      .then((res) => {
        console.log(res.data);
        standingData(values.email, values.password);
        navigate("/profile");

        // stndingData(username, password);
      })
      .catch((err) => {
        console.log(err.data);
        // if (err.response.status === 400) {
        //   setErrUser("Username already exists");
        //   setTimeout(() => {
        //     setErrUser("");
        //   }, 1500);
        // }
      });
  };

  const [userDetails, setUserDetails] = useState([]);

  const standingData = async (email, password) => {
    await axios
      .post(BaseUrl + "/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        var details = res.data.result;
        localStorage.setItem("User", JSON.stringify(details.id));
        const propic =
          res.data.result.img_thumbnail.length > 0
            ? JSON.parse(res.data.result.img_thumbnail)
            : "";
        localStorage.setItem("propic", JSON.stringify(propic));
        setAuthTokens(res.data.token);
        localStorage.setItem("authTokens", JSON.stringify(res.data.token));
        setUser(jwt_decode(res.data.token));
        setUserDetails(res.data.result);
        const name =
          res.data.result.first_name + " " + res.data.result.last_name;
        localStorage.setItem("name", name);
        setName(name);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.data);
        if (err.response.status === 400) {
          errorToast("Invalid Username or password");
          navigate("/login");
          // setTimeout(() => {
          //   errorToast("");
          // }, 1500);
        }
      });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const email = values.email;
    const password = values.password;
    standingData(email, password);
  };

  const logoutUser = async () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("User");
    localStorage.removeItem("name");
    localStorage.removeItem("propic");
    navigate("/main");
  };

  const OtpLogin = async (e) => {
    console.log(values.mobile, "Heyyy");
    e.preventDefault();
    await axios
      .post(BaseUrl + "/login", {
        phone_num: values.mobile,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/otpverify");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  // const getProfile = async () => {
  //   await axios
  //     .get(BaseUrl + "/profile", {
  //       headers: {
  //         Authorization: "Bearer " + authTokens,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setProfile(res.data.result);
  //     })
  //     .catch((err) => {
  //       console.log(err.data);
  //     });
  // };

  const OtpVerify = async (e) => {
    e.preventDefault();
    await axios
      .post(BaseUrl + "/login", {
        phone_num: values.mobile,
        otp: values.otp,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const editProfile = async (pro, propic) => {
    console.log(pro);
    console.log(cloud);
    console.log("Heyyyy");
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
          }
        )
        .then((res) => {
          console.log(res.data);
          console.log("Successs");
          setProfile(res.data.result);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err.data);
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
          }
        )
        .then((res) => {
          console.log(res.data);
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
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HostCourse = async (e) => {
    async function uploaingImg(data) {
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/black-box/image/upload",
          data
        );
        console.log(res.data, "uploaded...");
        return res.data;
      } catch (err) {
        console.log(err.message, "the error");
      }
    }
    try {
      const uploaders = await Promise.all(
        image.map(async (img) => {
          let formData = new FormData();
          formData.append("file", img);
          formData.append("upload_preset", "i1m10bd7");
          formData.append("cloud_name", "black-box");
          const data = await uploaingImg(formData);
          return data.secure_url;
        })
      );
      console.log(uploaders, "res is here.");
      const res = await axios.post(
        BaseUrl + "/host/course",
        {
          course: { ...course, images: uploaders },
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      );
      console.log(res.data);
      if (typeof res.data === "object") {
        setCourseId(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
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
        }
      );
      setClasslist([{ ...classlist[0], ...res.data }]);
      successToast("Class Added Successfully");
    } catch (err) {
      console.log(err.message);
    }
  };

  const DynamicTimer = async () => {
    await axios
      .get(BaseUrl + "/nextclass")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  function letSee(e) {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append("videoFile", form.file);
    videoData.append("title", form.title);
    videoData.append("description", form.description);

    axios
      .post(BaseUrl + "/upload", videoData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    console.log(videoData, "videoData");
  }

  const getCoursesList = async () => {
    await axios
      .get(BaseUrl + "/courses")
      .then((res) => {
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
        console.log(reactArray);
        setReaction(reactArray);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const triggerReaction = async (i, course_id) => {
    let update = reaction;
    console.log(reaction);
    if (update[i].heart) {
      update[i].heart = false;
      update[i].count -= 1;
    } else {
      update[i].heart = true;
      update[i].count += 1;
    }
    try {
      setReaction(update);
      const result = await axios.post(
        BaseUrl + "/react/" + course_id,
        {},
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      );
      console.log(result, "result");
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCourseDetails = async (id) => {
    await axios
      .get(BaseUrl + "/courses/" + id)
      .then((res) => {
        console.log(res.data);
        setCourseDetails(res.data);
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

  const contextData = {
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
    HostCourse,
    courseId,
    setCourseId,
    letSee,
    form,
    setForm,
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
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

{
  /* <iframe width="1520" height="553" src="https://www.youtube.com/embed/zE-a5eqvlv8" title="Dua Lipa, Coldplay, Martin Garrix & Kygo, The Chainsmokers Style - Feeling Me" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */
}
