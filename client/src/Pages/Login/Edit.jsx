import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Default from "../../Images/defualtProPic.jpg";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import CropImage from "../../Components/Common/CropImage";

// const schema = yup.object().shape({
//   first_name: yup
//     .string()
//     .min(3, "Firstname should contain 3 characters")
//     .required("Firstname is required"),

//   last_name: yup.string(),

//   email: yup.string().email("Invalid email").required("Email is required"),

//   about: yup
//     .string()
//     .min(20, "About should contain 10 characters")
//     .required("About is required"),
// });

const Edit = () => {
  const [image, setImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  const [changed, setChanged] = useState(false);

  const { authTokens, BaseUrl, editProfile, loading, setLoading } =
    useContext(AuthContext);

  const [pro, setPro] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    cpassword: "",
    about: "",
    phone_num: "",
  });

  useEffect(() => {
    setLoading(false);
    const getMyProfile = async () => {
      await axios
        .get(BaseUrl + "/profile", {
          headers: { Authorization: `Bearer ${authTokens}` },
        })
        .then((res) => {
          setPro(res.data.result);
          if (res.data.result.img_thumbnail !== "{}") {
            if (res.data.result.img_thumbnail.includes("{")) {
              var i = JSON.parse(res.data.result.img_thumbnail);
              setImage(i.secure_url);
            } else {
              setImage(res.data.result.img_thumbnail);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMyProfile();
    // eslint-disable-next-line
  }, []);

  const changeHandler = (e) => {
    setPro({ ...pro, [e.target.name]: e.target.value });
  };

  const uploadImage = (e) => {
    var propic = "";
    e.preventDefault();
    if (changed === true) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "i1m10bd7");
      data.append("cloud_name", "black-box");
      axios
        .post("https://api.cloudinary.com/v1_1/black-box/image/upload", data)
        .then((data) => {
          console.log(data);
          propic = data.data.secure_url;
          editProfile(pro, propic);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      editProfile(pro, propic);
    }
  };

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(schema),
  //   });

  return (
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center  page mb-5 m-0 p-0"
      >
        <Container fluid className="reg_div py-5">
          <div>
            <h1 className="regtitle">EDIT PROFILE</h1>
          </div>
        </Container>
        <div className=" logindiv mb-5">
          <Container className="d-flex justify-content-center">
            <form
              className="d-flex justify-content-center flex-column w-100  m-2 mt-2"
              onSubmit={uploadImage}
            >
              <Box>
                <Row className="signupform">
                  <Col md={6}>
                    <TextField
                      label="First name"
                      name="first_name"
                      value={pro?.first_name}
                      defaultValue={pro?.first_name}
                      //   {...register("first_name")}
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      //   helperText={errors.firstname && errors.firstname.message}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      label="Last name"
                      name="last_name"
                      value={pro?.last_name}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      defaultValue={pro?.last_name}
                      //   {...register("last_name")}
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      //   helperText={errors.lastname && errors.lastname.message}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={pro?.email}
                      defaultValue={pro?.email}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      //   {...register("email")}
                      variant="outlined"
                      autoComplete="false"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      //   helperText={errors.email && errors.email.message}
                    />
                  </Col>
                  <Col md={6}>
                    <PhoneInput
                      enableSearch={true}
                      // containerStyle={{margin:'20px'}}
                      // buttonStyle={{}}
                      dropdownStyle={{ height: "200px" }}
                      country={"in"}
                      containerClass=" mobile m-0 p-0"
                      value={pro?.phone_num}
                      defaultValue={pro?.phone_num}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      required={true}
                      onChange={(phone) =>
                        setPro({ ...pro, phone_num: pro.phone_num })
                      }
                      //   helperText={errors.phone && errors.phone.message}
                    />
                  </Col>

                  <Col md={12}>
                    <TextField
                      rows="4"
                      label="About"
                      name="about"
                      multiline
                      className="w-100 noti-content"
                      value={pro?.about}
                      defaultValue={pro?.about}
                      //   {...register("about")}
                      placeholder="About yourself"
                      onChange={changeHandler}
                    />
                    <p className="text-danger text-start">
                      {/* {errors.about && errors.about.message} */}
                    </p>
                  </Col>
                </Row>
                <div className="profile-img text-center my-1">
                  {!image ? (
                    ""
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
                              Update photo
                            </p>
                          ) : (
                            <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp mt-4">
                              Change photo
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
                      setChanged(true);
                    }}
                    closeHander={() => {
                      setShowCropper(false);
                    }}
                  />
                )}
                <div className=" d-flex flex-column">
                  <div className=" pt-1 w-100">
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
                        " Update"
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

export default Edit;
