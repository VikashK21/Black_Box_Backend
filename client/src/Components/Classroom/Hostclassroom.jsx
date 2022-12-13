import {
  InputAdornment,
  TextField,
  Button,
  Box,
  Paper,
  Stepper,
  Typography,
  Step,
  StepLabel,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import MeetLink from "../../Pages/Classes/MeetLink";
import CropImage from "../Common/CropImage";
import Footer from "../Common/Footer";
import FormDialog from "../Common/FormDialog";
import Header from "../Common/Header";

function Hostclassroom() {
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(["Session Details", "Session Timings"]);
  const [clsCourse, setClsCourse] = useState({
    title: "",
    description: "",
    images: [""],
    link: "",
    requirements: [""],
  });
  const [clsSession, setClsSessison] = useState({
    date: "",
    duration: "",
    time: "",
  });
  const [totalSessons, setTotalSessons] = useState([]);

  const {
    setSeenavs,
    setCourse,
    course,
    image,
    setImage,
    createClassroom,
    editClassroom,
    createSession,
    editSession,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    console.log(course);
  };

  const handleRequirementAdd = (e) => {
    e.preventDefault();
    setCourse({
      ...course,
      requirements: [...course.requirements, { requirements: "" }],
    });
    console.log(course);
  };

  const handleRequirementChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...course.requirements];
    list[index][name] = value;
    setCourse({ ...course, requirements: list });
  };

  const handleRequirementRemove = (index) => {
    const list = [...course.requirements];
    list.splice(index, 1);
    setCourse({ ...course, requirements: list });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSeenavs(true);
  });
  return (
    <div>
      <Container fluid className="p-0 m-0 ">
        <Header />
        <Container fluid className="m-0 p-0 white"></Container>
        <Container fluid className="justify-content-center">
          {/* <CssBaseline /> */}
          <Container
            fluid
            className="d-flex bggrey justify-content-center py-2 pb-2 mb-3"
          >
            <div>
              <h1 className="regtitle">Host your Session</h1>
            </div>
          </Container>
          <Container
            component={Box}
            md={12}
            className="d-flex justify-content-center mx-4 ms-4"
          >
            <Paper component={Box} p={4} className="pt-4 ms-5">
              <div className="pt-3 pb-3 ps-5">
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  // className="pb-4"
                >
                  {steps &&
                    steps.map((ele, ind) => {
                      return (
                        <Step key={ind}>
                          <StepLabel>{ele}</StepLabel>
                        </Step>
                      );
                    })}
                </Stepper>
                <div className="d-flex justify-content-center flex-column w-100  m-4 pt-3 ">
                  <div className="d-flex justify-content-center w-100 mb-5 mt-1">
                    <Row className=" w-100" style={{ maxWidth: "700px" }}>
                      <Col md={12}>
                        <TextField
                          className="my-2 w-100"
                          label="Title"
                          name="title"
                          placeholder="e.g: Presentation review"
                          defaultValue={clsCourse.title}
                          onChange={(e) =>
                            setClsCourse((pre) => ({
                              ...pre,
                              title: e.target.value,
                            }))
                          }
                          variant="outlined"
                          onKeyDown={(e) => {
                            e.key === "Enter" && e.preventDefault();
                          }}
                          required
                        />
                      </Col>

                      <Col md={12} className="mx-0">
                        <TextField
                          className="my-2 w-100"
                          label="Description"
                          placeholder="i.e: we are going to disucuss some points regarding the presentatinon..."
                          name="description"
                          minRows={3}
                          defaultValue={clsCourse.description}
                          onChange={(e) =>
                            setClsCourse((pre) => ({
                              ...pre,
                              description: e.target.value,
                            }))
                          }
                          multiline
                          variant="outlined"
                          required
                        />
                      </Col>
                      <Col md={12} className="my-2">
                        {course.requirements.map((requirements, index) => (
                          <div key={index}>
                            <div className="d-flex">
                              <TextField
                                label="Enter requirements"
                                name="requirements"
                                multiline
                                variant="outlined"
                                placeholder="i.e: bring notes related to benefits of the project..."
                                value={course.requirements[index].requirements}
                                onChange={(e) =>
                                  handleRequirementChange(e, index)
                                }
                                className=" mb-3 w-100"
                              />
                              <div>
                                {course.requirements.length !== 1 && (
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRequirementRemove(index);
                                    }}
                                    color="error"
                                    variant="outlined"
                                    className="h-75 ms-2"
                                  >
                                    Remove
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div>
                              {course.requirements.length - 1 === index && (
                                <div className="d-flex justify-content-end">
                                  <Button
                                    onClick={handleRequirementAdd}
                                    color="primary"
                                    variant="contained"
                                  >
                                    Add
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </Col>
                      <Col md={12} className="mx-0 d-flex ">
                        <TextField
                          className="my-2 w-100"
                          label="Google meet"
                          name="link"
                          onKeyDown={(e) => {
                            e.key === "Enter" && e.preventDefault();
                          }}
                          defaultValue={course.link}
                          placeholder="To get the google meet link, click on Link button"
                          onChange={changeHandler}
                          variant="outlined"
                          required
                        />
                        <MeetLink />
                        <a
                          href="https://meet.google.com/"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Button
                            variant="contained"
                            className="h-75 w-25 ms-1 my-2"
                          >
                            Link
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className="profile-img text-center my-1 "
                    style={{
                      height: "fit-content",
                    }}
                  >
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
                            <img
                              width={250}
                              src={ele}
                              alt=""
                              className="imghover"
                            />
                            <div>
                              <Button
                                variant="contained"
                                color="error"
                                className="my-2 imgdlt "
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
                        {image.length !== 0 ? (
                          <label htmlFor="upload_image">
                            <span className="profilepic__icon">
                              <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp">
                                Add image
                              </p>
                            </span>
                          </label>
                        ) : (
                          <label htmlFor="upload_image">
                            <span className="profilepic__icon">
                              <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp">
                                Upload image
                              </p>
                            </span>
                          </label>
                        )}

                        {/* <label htmlFor="upload_image">
                    <span className="profilepic__icon">
                      <p className=" mx-auto bg-dark p-2 text-white rounded-3 px-4 cp">
                        Upload photo
                      </p>
                    </span>
                  </label> */}
                        {/* <FormDialog /> */}
                      </div>
                    </div>
                  </div>

                  {showCropper && (
                    // <CropImage
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
                  <div className="d-flex justify-content-between">
                    <Button
                      disabled={activeStep === 0}
                      onClick={() => {
                        setActiveStep((pre) => pre - 1);
                      }}
                      style={{
                        maxWidth: "200px",
                        width: "200px",
                        minWidth: "100px",
                      }}
                    >
                      back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        maxWidth: "200px",
                        width: "200px",
                        minWidth: "100px",
                      }}
                      onClick={() => {
                        setActiveStep((pre) => pre + 1);
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </Paper>
          </Container>
        </Container>
        {/* <Footer /> */}
      </Container>
    </div>
  );
}

export default Hostclassroom;
