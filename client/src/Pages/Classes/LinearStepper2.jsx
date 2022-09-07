import { Container } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Host from "./Host4";
import Host2 from "./Host5";
import Host3 from "./Host6";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";
import StyleContext from "../../Context/StyleContext";

function getSteps() {
  return [
    "Class details",
    "Class description",
    "Class timings",
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

const LinearStepper2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const { HostCourse, HostClasses, image, course } = useContext(AuthContext);
  const { errorToast } = useContext(StyleContext);
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
    if (activeStep === 1) {
      HostCourse();
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleBack = () => {
    if (activeStep === 2) {
      alert(
        "You have already entered course data \n You can edit it later!\nContinue with adding the class data :)"
      );
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };
  return (
    <Container fluid className="p-0 m-0">
      <Header />

      <Container fluid className="white m-0 p-0"></Container>
      <>
        <CssBaseline />
        <Container
          fluid
          className="d-flex bggrey justify-content-center py-5 mb-5"
        >
          <div>
            <h1 className="regtitle">Host your class</h1>
          </div>
        </Container>
        <Container component={Box} p={4} className="mb-5">
          <Paper component={Box} p={3} className="pt-5">
            <div className="pt-3">
              <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
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
                    {isStepOptional(activeStep) && (
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
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        maxWidth: "200px",
                        width: "200px",
                        minWidth: "100px",
                      }}
                      onClick={() => {
                        if (activeStep === 0) {
                          console.log(course);
                          if (course) {
                            var count = 0;
                            var err = false;
                            for (let i in course) {
                              if (course[i] === "" && count <= 5) {
                                err = true;
                                const a = capitalizeFirstLetter(i);
                                errorToast(a + " is required");
                              }

                              count++;
                            }
                            if (err === false) {
                              HandleNext();
                            }
                          } else {
                            HandleNext();
                          }
                        } else {
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

export default LinearStepper2;
