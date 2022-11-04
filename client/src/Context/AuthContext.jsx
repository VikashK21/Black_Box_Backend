import { createContext, useContext, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";
// import { imageListItemClasses } from "@mui/material";
import StyleContext from "./StyleContext";
import { type } from "@testing-library/user-event/dist/type";

const AuthContext = createContext();
export default AuthContext;

// export const BaseUrl = "http://localhost:3001/api";
// export const BaseUrl = "http://localhost:3001";
// export const BaseLink = "https://brotocamp.space/";
// export const BaseUrl = "https://creative-black-box.herokuapp.com/api";
// export const BaseLink = "http://localhost:3000/";

export const BaseUrl = "/api"
// process.env.NODE_ENV === "production"
//   ? "/api"
//   : "http://localhost:3001/api";

// export const BaseLink = "http://localhost:3000/";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showclasses, setShowclasses] = useState(false);

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

  const [toChoose, setToChoose] = useState(false);

  const [signUpBatch, setSignUpBatch] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const signupUser = async (propic) => {
    setLoading(true);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.data);
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

  const standingData = async (email, password) => {
    setLoading(true);
    await axios
      .post(BaseUrl + "/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        var details = res.data.result;
        localStorage.setItem("User", JSON.stringify(details.id));
        // const propic = "";
        console.log("details.id");
        if (res.data.result.img_thumbnail.includes("{")) {
          console.log("yes");
          console.log(res.data.result.img_thumbnail);
          const propic =
            res.data.result.img_thumbnail.length > 0
              ? JSON.parse(res.data.result.img_thumbnail)
              : "";
          console.log(propic);
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
        const name =
          res.data.result.first_name + " " + res.data.result.last_name;
        localStorage.setItem("name", name);
        setName(name);
        setLoading(false);

        if (toChoose) {
          navigate("/host");
          setToChoose(false);
        } else {
          navigate("/profile");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.data);
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

    const email = values.email;
    const password = values.password;
    standingData(email, password);
  };

  const logoutUser = async () => {
    await axios
      .post(BaseUrl + "/logout", {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
    console.log(values.email, "Heyyy");
    e.preventDefault();
    await axios
      .post(BaseUrl + "/sendotp", {
        email: values.email,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/otpverify");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const OtpVerify = async (e) => {
    console.log(values.otp, "Heyyy");
    e.preventDefault();
    await axios
      .post(BaseUrl + "/verification", {
        otp: parseInt(values.otp),
      })
      .then((res) => {
        console.log(res.data);
        navigate("/change-password");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const changePass = async (e) => {
    console.log(values.password, "Heyyy");
    e.preventDefault();
    if (values.password !== values.confirmpassword) {
      errorToast("Password does not match");
     
    }
    else{
       await axios
      .patch(BaseUrl + "/forgetpass", {
        password: values.password,
      })
      .then((res) => {
        console.log(res.data);
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
          }
        )
        .then((res) => {
          console.log(res.data);
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

  const imgsAlgo = async (image) => {
    try {
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
      return uploaders;
    } catch (err) {
      console.log(err.message);
    }
  };

  const HostCourse = async (e) => {
    try {
      const uploaders = await imgsAlgo(image);
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

  const editClass = async (id, id2) => {
    console.log(id, id2);
    console.log(classes);

    await axios
      .patch(BaseUrl + "/class/" + id2, classes, {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        console.log(res.data);
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
        }
      );
      successToast("Class Added Successfully");
      // setClasslist([{ ...classlist[0], ...res.data }]);

      // setClasslist.push(res.data);

      setClasslist([...classlist, res.data]);
      console.log(classlist);
    } catch (err) {
      console.log(err.message);
    }
  };

  const HostClasses2 = async (id) => {
    console.log(classes);
    try {
      const res = await axios.post(
        BaseUrl + "/host/classes",
        {
          classes: classes,
          course_id: id,
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      );
      successToast("Class Added Successfully");
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [classtime, setClasstime] = useState("");
  const [noClasses, setNoClasses] = useState(true);

  const DynamicTimer = async () => {
    await axios
      .get(BaseUrl + "/nextclass", {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        setClasstime(res.data);
        console.log(typeof classtime);
      })
      .catch((err) => {
        console.log(err.data);
        setNoClasses(false);
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
        console.log(res.data);
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

  const [hcl, setHcl] = useState([]);

  const hostedClasses = async () => {
    await axios
      .get(BaseUrl + "/trainer", {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        console.log(res.data);
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
        console.log(res.data);
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
        console.log(res.data);
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
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editCourse = async (id) => {
    let uploaders = await imgsAlgo(updatedImgs);
    uploaders = [...uploaders, ...image];
    console.log(uploaders, "after");
    await axios
      .patch(
        BaseUrl + "/course/" + id,
        {
          course: { ...course, images: uploaders },
        },
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        successToast("Course Updated Successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
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
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

{
  /* <iframe width="1520" height="553" src="https://www.youtube.com/embed/zE-a5eqvlv8" title="Dua Lipa, Coldplay, Martin Garrix & Kygo, The Chainsmokers Style - Feeling Me" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */
}
