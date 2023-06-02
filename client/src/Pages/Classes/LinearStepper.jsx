import { Container } from "react-bootstrap";
import Header from "../../Components/Common/Header";

// import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import React, { useContext, useState } from "react";

import Host from "./Host";
import Host2 from "./Host2";
import Host3 from "./Host3";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";
import StyleContext from "../../Context/StyleContext";

function getSteps() {
  return [
    "Course Details",
    "Course Description",
    "Class Timings & Description",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Host />;

    case 1:
      return <Host2 />;
    case 2:
      return <Host3 />;

    default:
      return "unknown step";
  }
}

const LinearStepper = () => {
  //   const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const {
    HostCourse,
    classlist,
    image,
    course,
    courseId,
    setClasslist,
    setCourseId,
  } = useContext(AuthContext);
  const { errorToast } = useContext(StyleContext);
  const [markdone, setMarkdone] = useState(false);
  const navigate = useNavigate();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const HandleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
    if (markdone && activeStep === 1) {
      alert("Course details saved");
      HostCourse();
    }
  };

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  const handleBack = () => {
    if (activeStep === 2) {
      alert(
        "You have already entered course data \n You can edit it later!\nContinue with adding the class data :)",
      );
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  // const handleSkip = () => {
  //   if (!isStepSkipped(activeStep)) {
  //     setSkippedSteps([...skippedSteps, activeStep]);
  //   }
  //   setActiveStep(activeStep + 1);
  // };

  return (
    <Container fluid className="p-0 m-0">
      <Header />

      <Container fluid className="white m-0 p-0"></Container>
      <>
        {/* <CssBaseline /> */}
        <Container
          fluid
          className="d-flex bggrey justify-content-center py-2 pb-2 mb-4"
        >
          <div>
            <h1 className="regtitle">Host your Course</h1>
          </div>
        </Container>
        <Container component={Box} p={4} className="mb-5">
          <Paper component={Box} p={3} className="pt-4">
            <div className="pt-3">
              <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
                  const labelProps = {};
                  let completed =
                    (markdone && index === 0) ||
                    (index === 1 && typeof courseId === "object") ||
                    (index === 2 && classlist.length !== 0);
                  // console.log(completed, "this is boolean only");
                  const stepProps = {
                    completed,
                  };
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
                })}
              </Stepper>

              {activeStep === steps.length ? (
                <>
                  <Typography variant="h4" align="center" className="my-5 gl">
                    Your class is live <br />
                    Congratulations!
                  </Typography>
                  <center>
                    <Button
                      className="bg-dark text-white w-25 mb-5"
                      onClick={() => {
                        navigate("/profile");
                        setCourseId();
                        setClasslist([]);
                      }}
                    >
                      Go Home
                    </Button>
                  </center>
                </>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <div className="d-flex justify-content-between">
                    <Button
                      disabled={activeStep === 0 || activeStep === 2}
                      onClick={() => {
                        handleBack();
                      }}
                      style={{
                        maxWidth: "200px",
                        width: "200px",
                        minWidth: "100px",
                      }}
                    >
                      back
                    </Button>
                    {/* {isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          maxWidth: "200px",
                          width: "200px",
                          minWidth: "100px",
                        }}
                        onClick={handleSkip}
                      >
                        skip
                      </Button>
                    )} */}
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        maxWidth: "200px",
                        width: "200px",
                        minWidth: "100px",
                      }}
                      disabled={
                        activeStep === steps.length - 1 &&
                        classlist.length === 0
                      }
                      onClick={() => {
                        if (
                          course &&
                          course.title !== "" &&
                          course.description !== "" &&
                          course.price !== "" &&
                          course.max_students !== "" &&
                          image.length !== 0
                        ) {
                          // console.log(course, "filled data");
                          setMarkdone(() => true);
                        }
                        if (activeStep === 1 && course) {
                          if (course.title === "") {
                            errorToast("Course Title is required");
                          } else if (course.description === "") {
                            errorToast("Course Description is required");
                          } else if (course.price === "") {
                            errorToast("Course Price is required");
                          } else if (course.max_students === "") {
                            errorToast("Course Max_students is required");
                          }
                          //  else if (course.link === "") {
                          //   errorToast("Link is required");
                          // }
                          // else if (course.link.substring(0, 7) === "https://") {
                          //   errorToast("Link should start with https://");
                          // }
                          else if (image.length === 0) {
                            errorToast("Upload any one Image, it is required");
                          } else {
                            HandleNext();
                          }
                        }
                        // else {
                        //   errorToast("Course data is required");
                        // }
                        // }
                        else {
                          HandleNext();
                        }
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Paper>
        </Container>
      </>
      <Footer />
    </Container>
  );
};

export default LinearStepper;
