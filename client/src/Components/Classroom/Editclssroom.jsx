import { Box, Button, TextField } from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Default from "../../Images/classroomDefault.jpeg";
// import ProfilePic from "../../Components/Common/Crop";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { FacebookLoginButton } from "react-social-login-buttons";
// import { GoogleLoginButton } from "react-social-login-buttons";
import CropImage from "../../Components/Common/CropImage";

const schema = yup.object().shape({
  //   title: yup
  //     .string()
  //     .min(5, "Firstname should contain 3 characters")
  //     .required("Firstname is required"),
  //   lastname: yup.string(),
  //   email: yup.string().email("Invalid email").required("Email is required"),
  //   password: yup
  //     .string()
  //     .min(6, "Password should contain 6 characters")
  //     .required("Password is required"),
  //   cpassword: yup
  //     .string()
  //     .oneOf([yup.ref("password"), "Passwords not matching"])
  //     .required("Confirm password is required"),
  //   about: yup
  //     .string()
  //     .min(10, "Should contain a minimum of 10 characters")
  //     .required("About is required"),
});

const Editclssroom = () => {
  const [image, setImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  const [pro, setPro] = useState({
    description: "",
    logo: "",
    title: "",
  });

  const {
    // backendUpdate,
    // signupUser,
    // setValues,
    // values,
    loading,
    setLoading,
    getWorkSpace,
    editWorkSpace,
  } = useContext(AuthContext);
  // const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getWorkSpace().then((res) => {
      setPro(res);
      setImage(res.logo);
    });
    // eslint-disable-next-line
  }, []);

  const changeHandler = (e) => {
    setPro({ ...pro, [e.target.name]: e.target.value });
  };

  const uploadImage = () => {
    var propic = "";
    if (image !== null) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "i1m10bd7");
      data.append("cloud_name", "black-box");
      axios
        .post("https://api.cloudinary.com/v1_1/black-box/image/upload", data)
        .then((data) => {
          console.log(data);
          // backendUpdate({
          //   secure_url: data.data.secure_url,
          //   public_id: data.data.public_id,
          //   signature: data.data.signature,
          //   timestamp: data.data.created_at,
          // });

          // setCloud(JSON.stringify(data.data));
          propic = data.data.secure_url;
          editWorkSpace({
            title: pro.title,
            description: pro.description,
            logo: propic,
          });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      editWorkSpace({ title: pro.title, description: pro.description });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center  page mb-5 m-0 p-0"
      >
        <Container fluid className="reg_div py-5">
          <div>
            <h1 className="regtitle">Edit Profile</h1>
          </div>
        </Container>
        <div className=" logindiv my-5">
          <Container className="d-flex justify-content-center">
            <form
              className="d-flex justify-content-center flex-column w-100  m-2 mt-5"
              onSubmit={handleSubmit(uploadImage)}
            >
              <Box>
                <div className="profile-img text-center my-1">
                  {!image ? (
                    <img width={250} src={Default} alt="" />
                  ) : (
                    <img width={250} src={image ? image : Default} alt="" />
                  )}
                  <div className="edit-profile-pic d-flex justify-content-center">
                    <div className="d-flex">
                      <FormControl
                        className="d-none"
                        id="upload_image"
                        type="file"
                        onChange={(e) => {
                          setCropImage(e.target.files[0]);
                          setShowCropper(true);
                        }}
                        accept=".jpg,.jpeg,.png,"
                      />
                      <label htmlFor="upload_image">
                        <span className="profilepic__icon">
                          {!image ? (
                            <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp">
                              Upload Logo
                            </p>
                          ) : (
                            <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp mt-4">
                              Change Logo
                            </p>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {showCropper && (
                  <CropImage
                    cropRatio={{ width: 320, height: 420 }}
                    src={cropImage}
                    imageCallback={(image) => {
                      setImage(image);
                      setShowCropper(false);
                    }}
                    closeHander={() => {
                      setShowCropper(false);
                    }}
                  />
                )}

                <Row className="signupform">
                  <Col md={12}>
                    <TextField
                      label="Company Name"
                      name="title"
                      {...register("title")}
                      variant="outlined"
                      className=" mb-3 w-100"
                      value={pro?.title}
                      //   defaultValue={pro?.title}
                      onChange={changeHandler}
                      helperText={errors.title && errors.title.message}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </Col>

                  <Col md={12}>
                    <textarea
                      rows="4"
                      className="w-100 noti-content"
                      name="description"
                      {...register("description")}
                      placeholder="About Company"
                      value={pro?.description}
                      //   defaultValue={pro?.description}
                      onChange={changeHandler}
                      // onKeyDown={(e) => {
                      //   e.key === "Enter" && e.preventDefault();
                      // }}
                    />
                    <p className="text-danger text-start">
                      {errors.description && errors.description.message}
                    </p>
                  </Col>
                </Row>

                <div className="mt-3 d-flex flex-column t-3">
                  <div className="mt-4 pt-2 w-100">
                    <Button
                      variant="contained"
                      type="submit"
                      className="bgdark w-100"
                    >
                      {loading ? (
                        <>
                          <div className="loadingio-spinner-rolling-jm01qv7mmak mx-2">
                            <div className="ldio-cqj9sf9mcdj">
                              <div></div>
                            </div>
                          </div>
                          Updating
                        </>
                      ) : (
                        "Update "
                      )}
                    </Button>
                  </div>
                </div>
              </Box>
            </form>
          </Container>
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Editclssroom;
