import {
  // InputAdornment,
  TextField,
  Button,
  Box,
  Paper,
  Stepper,
  // Typography,
  Step,
  StepLabel,
  // CssBaseline,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
// import DatePicker from "react-multi-date-picker";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import StyleContext from "../../Context/StyleContext";
// import Host3 from "../../Pages/Classes/Host3";
// import MeetLink from "../../Pages/Classes/MeetLink";
import CropImage from "../Common/CropImage";
// import Footer from "../Common/Footer";
// import FormDialog from "../Common/FormDialog";
import Header from "../Common/Header";

function Hostclassroom() {
  const steps = ["Session Details", "Session Timings"];
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [markdone, setMarkdone] = useState(false);
  const [clsCourse, setClsCourse] = useState({
    title: "",
    description: "",
    requirements: [""],
  });
  const [clsSession, setClsSessison] = useState({
    date: "",
    time: "",
    duration: "",
  });
  const [totalSessons, setTotalSessons] = useState([]);

  const {
    setSeenavs,
    image,
    setImage,
    createClassroom,
    // editClassroom,
    // createSession,
    // editSession,
  } = useContext(AuthContext);
  const { errorToast } = useContext(StyleContext);

  const navigate = useNavigate();

  const handleRequirementAdd = (e) => {
    e.preventDefault();
    setClsCourse((pre) => ({
      ...pre,
      requirements: [...pre.requirements, ""],
    }));
    // console.log(clsCourse);
  }; //done

  const handleRequirementChange = (e, index) => {
    // e.preventDefault();
    // const { name, value } = e.target;
    const list = [...clsCourse.requirements];
    list[index] = e.target.value;
    setClsCourse((pre) => ({ ...pre, requirements: [...list] }));
  }; //done

  const handleRequirementRemove = (index) => {
    const list = [...clsCourse.requirements];
    list.splice(index, 1);
    setClsCourse((pre) => ({ ...pre, requirements: list }));
  }; //done

  const handleRemoveSession = (e, ind) => {
    e.preventDefault();
    const list = totalSessons;
    list.splice(ind, 1);
    setTotalSessons(() => [...list]);
  };

  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
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
              <h1
                className="regtitle"
                // style={{
                //   overflowY: "hidden",
                //   overflowX: "hidden",
                // }}
              >
                Host your Session
              </h1>
            </div>
          </Container>
          <Container
            component={Box}
            md={12}
            className="d-flex justify-content-center mx-4 ms-4 w-100"
            // style={{ overflow: "hidden" }}
          >
            <Paper
              component={Box}
              p={4}
              className="pt-4 ms-5"
              // style={{
              //   overflowX: "hidden",
              //   overflowY: "hidden",
              // }}
            >
              <div className="pt-3 pb-3">
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  // className="pb-4"
                >
                  {steps &&
                    steps.map((ele, ind) => {
                      return (
                        <Step completed={markdone && ind === 0} key={ind}>
                          <StepLabel>{ele}</StepLabel>
                        </Step>
                      );
                    })}
                </Stepper>
                {activeStep < 1 ? (
                  <div className="d-flex justify-content-center flex-column w-100  m-4 pt-3 ">
                    {/* <form> */}
                    <div className="d-flex justify-content-center w-100 mb-5 mt-1">
                      <Row className=" w-100" style={{ maxWidth: "700px" }}>
                        <Col md={12}>
                          <TextField
                            className="my-2 w-100"
                            label="Title"
                            name="title"
                            placeholder="e.g: Presentation review"
                            value={clsCourse.title}
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
                            value={clsCourse.description}
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
                          {clsCourse.requirements.map((requirements, index) => (
                            <div key={index}>
                              <div className="d-flex">
                                <TextField
                                  label="Enter requirements"
                                  name="requirements"
                                  variant="outlined"
                                  placeholder="i.e: bring notes related to benefits of the project..."
                                  multiline
                                  value={requirements}
                                  onChange={(e) => {
                                    handleRequirementChange(e, index);
                                    // console.log(e.target.value);
                                  }}
                                  className=" mb-3 w-100"
                                />
                                <div>
                                  {clsCourse.requirements.length !== 1 && (
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
                                {clsCourse.requirements.length - 1 ===
                                  index && (
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
                        {/* <Col md={12} className="mx-0 d-flex ">
                          <TextField
                            className="my-2 w-100"
                            label="Google meet"
                            name="link"
                            onKeyDown={(e) => {
                              e.key === "Enter" && e.preventDefault();
                            }}
                            defaultValue={clsCourse.link}
                            placeholder="To get the google meet link, click on Link button"
                            onChange={(e) =>
                              setClsCourse((pre) => ({
                                ...pre,
                                link: e.target.value,
                              }))
                            }
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
                        </Col> */}
                      </Row>
                    </div>
                    <div
                      className="profile-img text-center "
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
                    {/* </form> */}
                  </div>
                ) : (
                  // <Host3 />
                  <Container
                    fluid
                    className="d-flex justify-content-center flex-column w-100  m-4"
                  >
                    <Container className="d-flex justify-content-center">
                      <div className="w-75 text-center mt-4">
                        {/* {totalSessons.length === 0 && <h4>Added classes</h4>} */}
                        {totalSessons.length > 0 && (
                          <b>
                            <Row className="w-100 mb-2">
                              <Col md={2}>No.</Col>
                              {/* <Col md={2}>Title</Col> */}
                              <Col md={2}>Date</Col>
                              <Col md={2}>Time</Col>
                              <Col md={2}>Duration</Col>
                            </Row>
                          </b>
                        )}
                        {totalSessons.map((item, index) => (
                          <Row className="w-100 " key={index}>
                            <Col md={2}>#{index + 1}</Col>
                            {/* <Col md={2}>{item.title}</Col> */}
                            <Col md={2}>{item.date}</Col>
                            <Col md={2}>{item.time}</Col>
                            <Col md={2}>{item.duration + " mins"}</Col>
                            <Col md={2}>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={handleRemoveSession}
                              >
                                Delete
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Container>
                    <Container
                      fluid
                      className="d-flex justify-content-center m-0 p-0"
                    >
                      <Container className=" my-5  w-100 d-flex justify-content-center">
                        <div className="d-flex justify-content-center w-100 m-2 ">
                          <Box>
                            {/* <h5 className="text-start my-3">Add classes</h5> */}
                            <Row className="signupform ">
                              {/* <Col md={12} className="">
                                <div className="d-flex">
                                  <TextField
                                    label="Title"
                                    name="title"
                                    value={clsSession.title}
                                    onChange={(e) => {
                                      setClsSessison((pre) => ({
                                        ...pre,
                                        title: e.target.value,
                                      }));
                                      console.log(clsSession.title);
                                    }}
                                    variant="outlined"
                                    placeholder="e.g: Session 1: Points discussion..."
                                    className=" mb-3 w-100"
                                  />
                                </div>
                              </Col> */}
                              <Col md={4} xs={12} className="">
                                <>
                                  {/* <DatePicker
                                    className="w-100"
                                    placeholder="Date"
                                    // value={classes.date}
                                    onChange={(e) =>
                                      console.log(e)
                                      // setClasses({ ...classes, date: e.target.value })
                                    }
                                  /> */}
                                  {/* {classes.date?.toDate?.().toString()} */}
                                  <input
                                    type="date"
                                    className="w-100 p-2 rounded-2 timefield border-1"
                                    onKeyDown={(e) => {
                                      e.key === "Enter" && e.preventDefault();
                                    }}
                                    value={clsSession.date}
                                    onChange={(e) => {
                                      setClsSessison((pre) => ({
                                        ...pre,
                                        date: e.target.value,
                                      }));
                                      // console.log(clsSession.date);
                                    }}
                                  />
                                </>
                              </Col>
                              <Col md={4}>
                                <input
                                  type="time"
                                  value={clsSession.time}
                                  onChange={(e) => {
                                    setClsSessison((pre) => ({
                                      ...pre,
                                      time: e.target.value,
                                    }));
                                    // console.log(clsSession);
                                  }}
                                  onKeyDown={(e) => {
                                    e.key === "Enter" && e.preventDefault();
                                  }}
                                  className="w-100 p-2 rounded-2 timefield border-1"
                                />
                              </Col>
                              <Col md={4}>
                                <TextField
                                  label="Duration"
                                  name="duration"
                                  type="number"
                                  InputProps={{ inputProps: { min: 1 } }}
                                  placeholder="e.g : 45 minutes"
                                  variant="outlined"
                                  value={clsSession.duration}
                                  onChange={(e) => {
                                    setClsSessison((pre) => ({
                                      ...pre,
                                      duration: e.target.value,
                                    }));
                                    // console.log(clsSession.duration);
                                  }}
                                  className=" mb-3 w-100"
                                />
                              </Col>
                              <Col md={12} className="mt-4">
                                <div className="d-flex justify-content-between">
                                  <Button
                                    color="error"
                                    variant="contained"
                                    className="w-25"
                                    onClick={() => {
                                      // console.log(clsSession);
                                      setClsSessison({
                                        title: "",
                                        date: "",
                                        time: "",
                                        duration: "",
                                      });
                                    }}
                                  >
                                    Clear
                                  </Button>
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    className="w-25"
                                    onClick={() => {
                                      if (clsSession.date === "") {
                                        errorToast("Date is required");
                                      } else if (clsSession.time === "") {
                                        errorToast("Time is required");
                                      } else if (clsSession.duration === "") {
                                        errorToast("Minutes is required");
                                      } else {
                                        // setMarkdone(() => true)
                                        // console.log(clsSession);
                                        // HostClasses();
                                        setTotalSessons((pre) => [
                                          ...pre,
                                          clsSession,
                                        ]);
                                        setClsSessison({
                                          title: "",
                                          date: "",
                                          time: "",
                                          duration: "",
                                        });
                                      }
                                    }}
                                  >
                                    Add
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </Box>
                        </div>
                      </Container>
                    </Container>
                    {/* <Footer /> */}
                  </Container>
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
                    disabled={activeStep === 1 && totalSessons.length <= 0}
                    type="submit"
                    color="primary"
                    style={{
                      maxWidth: "200px",
                      width: "200px",
                      minWidth: "100px",
                    }}
                    onClick={() => {
                      if (
                        clsCourse.title !== "" &&
                        clsCourse.description !== "" &&
                        image.length !== 0
                      ) {
                        setMarkdone(() => true);
                      }
                      if (activeStep === 1) {
                        if (clsCourse.title === "") {
                          errorToast("Title is required");
                        } else if (clsCourse.description === "") {
                          errorToast("Description is required");
                        }
                        // else if (clsCourse.link === "") {
                        //   errorToast("Link is required");
                        // }
                        //  else if (
                        //   clsCourse.link.substring(0, 8) !== "https://"
                        // ) {
                        //   errorToast("Link should start with https://");
                        // }
                        else if (image.length === 0) {
                          errorToast("Upload any one image. It is required");
                        } else {
                          // HandleNext();
                          createClassroom(clsCourse, totalSessons);
                          // console.log(
                          //   clsCourse,
                          //   "Sesssion details",
                          //   totalSessons,
                          //   "SEssion timings",
                          // );
                          // setTimeout(() => {
                          navigate("/classroom");
                          // }, 1000);
                        }
                      } else {
                        setActiveStep((pre) => pre + 1);
                      }
                    }}
                  >
                    {activeStep >= 1 ? "Go" : "Next"}
                  </Button>
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
