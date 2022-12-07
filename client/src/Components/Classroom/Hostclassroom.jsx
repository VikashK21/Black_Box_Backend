import {
  CssBaseline,
  InputAdornment,
  TextField,
  Button,
  Box,
  Paper,
  Stepper,
  Typography,
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

  const { setSeenavs, setCourse, course, image, setImage } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    console.log(course);
  };

  const handleRequirementAdd = () => {
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
        <Container fluid className="white m-0 p-0"></Container>
        <Container fluid className="justify-content-center">
          {/* <CssBaseline /> */}
          <CssBaseline />
          <Container
            fluid
            className="d-flex bggrey justify-content-center py-4 mb-4"
          >
            <div>
              <h1 className="regtitle">Host your Session</h1>
            </div>
          </Container>
          <Container
            component={Box}
            p={4}
            className="d-flex justify-content-center"
          >
            <Stepper alternativeLabel activeStep={activeStep}>
              {/* {steps.map((step, index) => {
                  const labelProps = {};
                  const stepProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography
                        variant="caption"
                        align="center"
                        style={{ display: "block" }}
                      >
                        optional
                      </Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step {...stepProps} key={index}>
                      <StepLabel {...labelProps}>{step}</StepLabel>
                    </Step>
                  );
                })} */}
            </Stepper>
            {/* <Paper p={6} className="p-6"> */}
            <div className="d-flex justify-content-center flex-column w-100  m-2 ">
              <div className="d-flex justify-content-center w-100 mb-5">
                <Row className=" w-100" style={{ maxWidth: "700px" }}>
                  <Col md={12}>
                    <TextField
                      className="my-2 w-100"
                      label="Title"
                      name="title"
                      placeholder="e.g: Presentation review"
                      defaultValue={course.title}
                      onChange={changeHandler}
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
                      defaultValue={course.description}
                      onChange={changeHandler}
                      multiline
                      variant="outlined"
                      required
                    />
                  </Col>
                  {/* <Col md={6} className="mx-0">
                    <TextField
                      className="my-2 w-100"
                      label="Maximum Students"
                      type="number"
                      name="max_students"
                      defaultValue={course.max_students}
                      InputProps={{ inputProps: { min: 1 } }}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
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
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
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
                  </Col> */}
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
                            onChange={(e) => handleRequirementChange(e, index)}
                            className=" mb-3 w-100"
                          />
                          <div>
                            {course.requirements.length !== 1 && (
                              <Button
                                onClick={() => handleRequirementRemove(index)}
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
                    <FormDialog />
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
                  // disabled={activeStep === 0 || activeStep === 2}
                  // onClick={() => {
                  //   handleBack();
                  // }}
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
                >
                  Next
                </Button>
              </div>
            </div>
            {/* </Paper> */}
          </Container>
        </Container>
        {/* <Footer /> */}
      </Container>
    </div>
  );
}

export default Hostclassroom;
