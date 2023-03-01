import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
// import Footer from "../../Components/Common/Footer";
// import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";
// import Default from "../../Images/defualtProPic.jpg";
// import ProfilePic from "../../Components/Common/Crop";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControll from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

import CropImage from "../../Components/Common/CropImage";
// import axios from "axios";
// import FormDialog from "../../Components/Common/FormDialog";
// import MeetLink from "./MeetLink";

const Host4 = () => {
  const { setCourse, course, image, setImage } = useContext(AuthContext);

  useEffect(() => {
    if (course.type === "") {
      navigate("/host");
    }
    // eslint-disable-next-line
  }, []);

  // const [name, setName] = useState(false);
  // const [email, setEmail] = useState(false);
  // const [password, setPassword] = useState(false);
  // const [profile, setProfile] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  // const [cropImage, setCropImage] = useState([]);
  const [cropImage, setCropImage] = useState(false);
  // const [thumbnail, setThumbnail] = useState(true);

  const navigate = useNavigate();

  // const handleMethodologyChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...course.methodology];
  //   list[index][name] = value;
  //   setCourse({ ...course, index: list });
  // };

  // const handleRemove = (index) => {
  //   const list = [...course.content];
  //   list.splice(index, 1);
  //   setCourse({ ...course, content: list });
  // };

  const changeHandler = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    // console.log(course);
  };
  return (
    <Container fluid className="p-0 m-0 ">
      {/* <Header /> */}
      {/* <Container fluid className="white m-0 p-0"></Container> */}
      <Container fluid className="d-flex justify-content-center  my-3 m-0 p-0">
        {/* <Container fluid className="bggrey py-5">
          <div>
            <h1 className="regtitle">HOST A CLASS</h1>
          </div>
        </Container> */}
        <Container className="d-flex justify-content-center">
          <div className="d-flex justify-content-center flex-column w-100  m-2 ">
            <div className="d-flex justify-content-center w-100 mb-5">
              <Row className=" w-100" style={{ maxWidth: "700px" }}>
                <Col md={12}>
                  <TextField
                    className="my-2 w-100"
                    label="Title"
                    name="title"
                    placeholder="e.g. Introduction to React.js"
                    defaultValue={course.title}
                    onChange={changeHandler}
                    variant="outlined"
                    required
                  />
                </Col>

                <Col md={12} className="mx-0">
                  <TextField
                    className="my-2 w-100"
                    label="Description"
                    placeholder="i.e. You can talk about what you will be teaching in this course in short"
                    name="description"
                    minRows={3}
                    defaultValue={course.description}
                    onChange={changeHandler}
                    multiline
                    variant="outlined"
                    required
                  />
                </Col>
                <Col md={6} className="mx-0">
                  <TextField
                    className="my-2 w-100"
                    label="Maximum Students"
                    type="number"
                    name="max_students"
                    InputProps={{ inputProps: { min: 1 } }}
                    defaultValue={course.max_students}
                    placeholder="Maximum number of students"
                    onChange={changeHandler}
                    variant="outlined"
                    required
                  />
                </Col>
                <Col md={6} className="d-flex">
                  <TextField
                    className="my-2 w-100"
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="Fee e.g. 1400"
                    defaultValue={course.price}
                    onChange={changeHandler}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    required
                  />
                </Col>
                {/* <Col md={12} className="mx-0 d-flex ">
                  <TextField
                    className="my-2 w-100"
                    label="Google meet"
                    name="link"
                    
                    defaultValue={course.meet}
                    placeholder="To get the google meet link, click on Link button"
                    onChange={changeHandler}
                    variant="outlined"
                    required
                  />
                  <MeetLink />
                  <a href="https://meet.google.com/" target="_blank">
                    <Button variant="contained" className="h-75 w-25 ms-1 my-2">
                      Link
                    </Button>
                  </a>
                </Col> */}
              </Row>
            </div>
            <div className="profile-img text-center my-1">
              <div
                className="d-flex my-3 imgscroll"
                style={{
                  overflowX: "auto",
                  overflowY: "hidden",
                  height: "fit-content",
                }}
              >
                {image.length > 0 &&
                  image.map((ele, index) => (
                    <div key={index} className=" mx-2 p-2">
                      <img width={250} src={ele} alt="" className="imghover" />
                      <div>
                        <Button
                          variant="contained"
                          color="error"
                          className="my-2 imgdlt"
                          onClick={() => {
                            const list = [...image];
                            list.splice(index, 1);
                            setImage(list);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="edit-profile-pic d-flex justify-content-center">
                <div className="d-flex">
                  <FormControl
                    className="d-none"
                    id="upload_image"
                    type="file"
                    onChange={(e) => {
                      setCropImage(e.target.files[0]);
                      // setCropImage((prev) => [...prev, e.target.files[0]]);
                      setShowCropper(true);
                    }}
                    accept=".jpg,.jpeg,.png,"
                  />
                  <label htmlFor="upload_image">
                    <span className="profilepic__icon">
                      <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp">
                        Upload photo
                      </p>
                    </span>
                  </label>
                  {/* <FormDialog /> */}
                </div>
              </div>
            </div>

            {showCropper && (
              <CropImage
                cropRatio={{ width: 320, height: 420 }}
                src={cropImage}
                imageCallback={(image) => {
                  // setImage(image);
                  setImage((prev) => [...prev, image]);
                  // setCopyImage((prev) => [...prev, image]);
                  setShowCropper(false);
                }}
                closeHander={() => {
                  setShowCropper(false);
                }}
              />
            )}
            {/* <div
              className="d-flex justify-content-end my-5 "
              style={{ maxWidth: "800px" }}
            >
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className="m-2 bg-dark"
                  style={{ width: "150px" }}
                  onClick={() => {
                    navigate("-1");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="my-2"
                  type="submit"
                  style={{ width: "150px" }}
                  onClick={(e) => {
                    navigate("/host/2");
                  }
                  }
                >
                  Next
                </Button>
              </div>
            </div> */}
          </div>
        </Container>
      </Container>
      {/* <Footer /> */}
    </Container>
  );
};

export default Host4;
