import { Box, Button, TextField } from "@mui/material";
// eslint-disable-next-line
import TextareaAutosize from "@mui/material/TextareaAutosize";
// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Default from "../../Images/defualtProPic.jpg";
// eslint-disable-next-line
import ProfilePic from "../../Components/Common/Crop";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import CropImage from "../../Components/Common/CropImage";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .min(3, "Firstname should contain 3 characters")
    .required("Firstname is required"),

  lastname: yup.string(),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(6, "Password should contain 6 characters")
    .required("Password is required"),

  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), "Passwords not matching"]),

  about: yup
    .string()
    .min(20, "About should contain 10 characters")
    .required("About is required"),
});

const Registration = () => {
  const [image, setImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  // eslint-disable-next-line
  const [thumbnail, setThumbnail] = useState("");

  const {
    // eslint-disable-next-line
    backendUpdate,
    signupUser,
    setValues,
    values,
    // eslint-disable-next-line
    profile,
    // eslint-disable-next-line
    cloud,
    setCloud,
  } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(image);
  // } , [image]);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const uploadImage = () => {
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

          setCloud(JSON.stringify(data.data));
          signupUser();
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      signupUser();
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
            <h1 className="regtitle">REGISTRATION</h1>
          </div>
        </Container>
        <div className=" logindiv my-5">
          {/* <div>
            <img src={Default} width={200} />
            <Col  className="p-0" form={null}>
              <div  className="d-flex justify-content-end pe-3 pt-1">
                <label htmlFor="upload_image">
                  <Button
                    className="px-4 py-2 rounded-3 bgdark text-light"
                    variant="contained"
                    onClick={uploadImage}
                  >
                    Change
                  </Button>
                </label>
              </div>
              <Col
                
                className={`px-3 py-0 mb-4 d-flex justify-content-center`}
              >
                <ProfilePic
                  cropped={setImage}
                  image={profile ? profile.photo : Default}
                  aspect={1 / 1}
                  className="rounded-circle"
                  width={50}
                />
              </Col>
            </Col>
          </div> */}

         
          <Container className="d-flex justify-content-center">
            <form
              className="d-flex justify-content-center flex-column w-100  m-2 mt-5"
              onSubmit={handleSubmit(uploadImage)}
            >
               <div className="profile-img text-center my-1">
            {!image ? (
              // <img
              //   width={250}
              //   src={profile.avatar ? profile.avatar.url : Default }
              //   alt=""
              // />
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
                        Upload photo
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
              }}
              closeHander={() => {
                setShowCropper(false);
              }}
            />
          )}
              <Box>
                <Row className="signupform">
                  <Col md={6}>
                    <TextField
                      
                      label="First name"
                      name="firstname"
                      {...register("firstname")}
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.firstname && errors.firstname.message}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      
                      label="Last name"
                      name="lastname"
                      {...register("lastname")}
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.lastname && errors.lastname.message}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      
                      label="Email"
                      name="email"
                      {...register("email")}
                      variant="outlined"
                      autoComplete="false"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.email && errors.email.message}
                    />
                  </Col>
                  <Col md={6}>
                    <PhoneInput
                      // inputStyle={{color:'green'}}
                      enableSearch={true}
                      // containerStyle={{margin:'20px'}}
                      // buttonStyle={{}}
                      dropdownStyle={{ height: "200px" }}
                      country={"in"}
                      containerClass=" mobile m-0 p-0"
                      required={true}
                      // value="1425652"
                      onChange={(phone) =>
                        setValues({ ...values, mobile: phone })
                      }
                      helperText={errors.phone && errors.phone.message}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      
                      label="Password"
                      name="password"
                      {...register("password")}
                      type="password"
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.password && errors.password.message}
                    />
                  </Col>
                  <Col md={6}>
                    <TextField
                      
                      label="Confirm Password"
                      name="confirmPassword"
                      {...register("cpassword")}
                      type="password"
                      variant="outlined"
                      className=" mb-3 w-100"
                      onChange={changeHandler}
                      helperText={errors.cpassword && errors.cpassword.message}
                    />
                  </Col>
                  <Col md={12}>
                    <textarea
                      rows="4"
                      className="w-100 noti-content"
                      name="about"
                      {...register("about")}
                      placeholder="About yourself"
                      onChange={changeHandler}
                    />
                    <p className="text-danger text-start">
                      {errors.about && errors.about.message}
                    </p>
                  </Col>
                </Row>

                {/* <TextField
              
              label="Mobile"
              name='mobile'
              variant="outlined"
              className=" mb-3"
              onChange={changeHandler}
            /> */}
                {/* <PhoneInput
                country={"in"}
                enableSearch={true}
                name='mobile'
                className="mb-3 w-100 "
                style={{width: "100%",zIndex:1}}
                value={values.mobile}
                onChange={changeHandler}
                onChange={setValues.mobile(phone)}
            /> */}

                {/* <input type="text" className='bw input my-3' placeholder='Email' />
      <input type="password" className='bw input' placeholder='Password' /> */}

                <div className="mt-3 d-flex flex-column">
                  <p className="moto opacity-75">
                    Use your email or mobile to signin
                  </p>
                  <center>
                    <a
                      className="underline "
                      style={{
                        width: "fit-content",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      Forgot your password
                    </a>
                  </center>
                  <div className="mt-4 pt-2 w-100">
                    <Button
                      variant="contained"
                      type="submit"
                      className="bgdark w-100"
                    >
                      Join here
                    </Button>
                  </div>
                </div>
              </Box>
            </form>
          </Container>
          <hr className="my-3" />
          <div className="d-flex justify-content-between w-100">
            <GoogleLoginButton>
              <span>Signup with Google</span>
            </GoogleLoginButton>
            <FacebookLoginButton>
              <span>Signup with Facebook</span>
            </FacebookLoginButton>
          </div>
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Registration;
