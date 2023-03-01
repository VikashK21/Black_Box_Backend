import {
  Box,
  Button,
  // ButtonBase,
  // InputAdornment,
  TextField,
} from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import Footer from "../../Components/Common/Footer";
// import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";
import "react-phone-input-2/lib/bootstrap.css";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import DatePicker from "react-multi-date-picker";
import StyleContext from "../../Context/StyleContext";

const Host6 = () => {
  const { classes, setClasses, HostClasses, course, classlist, setClasslist } =
    useContext(AuthContext);
  const { errorToast } = useContext(StyleContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (course.type === "") {
      navigate("/host");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className=" p-0 m-0 ">
      {/* <Header /> */}
      <Container className="d-flex justify-content-center mt-5">
        <div className="w-75 text-center mt-3">
          {classlist.length > 0 && <h4>Added classes</h4>}
          {classlist.length > 0 && (
            <b>
              <Row className="w-100 mb-2">
                <Col md={2}>No.</Col>
                <Col md={2}>Title</Col>
                <Col md={2}>Date</Col>
                <Col md={2}>Time</Col>
                <Col md={2}>Duration</Col>
                <Col md={2}>Action</Col>
              </Row>
            </b>
          )}
          {classlist.length > 0 &&
            classlist.map((item, index) => (
              <Row className="w-100 " key={index}>
                <Col md={2}>#{index + 1}</Col>
                <Col md={2}>{item.title}</Col>
                <Col md={2}>{item.date}</Col>
                <Col md={2}>{item.time}</Col>
                <Col md={2}>{item.duration + " mins"}</Col>
                <Col md={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      // setClasslist(classlist.filter((i) => i !== item)); //filtering out the item that is clicked on and setting the new array to the classlist state variable.

                      // console.log(classlist);
                      let currentList = classlist;
                      currentList.splice(index, 1);
                      setClasslist(currentList);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
        </div>
      </Container>
      {/* <Container className="d-flex justify-content-center mt-3">
        <Row className="w-50">
          <Col md={2}>#1</Col>
          <Col md={2}>Name</Col>
          <Col md={2}>Fee</Col>
          <Col md={2}>Date</Col>
          <Col md={2}>Time</Col>
          <Col md={2}>Duration</Col>
        </Row>
      </Container> */}
      <Container fluid className="d-flex justify-content-center m-0 p-0">
        {/* <Container fluid className="reg_div py-5">
          <div>
            <h1 className="regtitle">Step 3</h1>
          </div>
        </Container> */}

        <Container className=" my-5  w-100 d-flex justify-content-center">
          <form className="d-flex justify-content-center w-100 m-2 ">
            <Box>
              <h5 className="text-start my-3">Add classes</h5>
              <Row className="signupform ">
                <Col md={4} xs={12} className="">
                  <>
                    {/* <DatePicker
                      className="w-100"
                      placeholder="Date"
                      value={classes.date}
                      onChange={(e) =>
                        setClasses({ ...classes, date: e.target.value })
                      }
                    />
                    {classes.date?.toDate?.().toString()} */}
                    <input
                      type="date"
                      className="w-100 p-2 rounded-2 timefield border-1"
                      onChange={(e) => {
                        setClasses({ ...classes, date: e.target.value });
                        // console.log(classes.date);
                        // console.log(e);
                      }}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </>
                </Col>
                <Col md={4}>
                  <input
                    type="time"
                    value={classes.time}
                    onChange={(e) => {
                      setClasses({ ...classes, time: e.target.value });
                      // console.log(e.target.value);
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
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    placeholder="e.g : 45 mins"
                    variant="outlined"
                    value={classes.duration}
                    onChange={(e) =>
                      setClasses({ ...classes, duration: e.target.value })
                    }
                    className=" mb-3 w-100"
                  />
                </Col>

                <Col md={12} className="mt-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      color="error"
                      variant="contained"
                      className="w-25"
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      onClick={() => {
                        // console.log(classes);
                        setClasses({
                          title: "",
                          fee: "",
                          description: "",
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
                        if (
                          (classes && classes.date === "") ||
                          classes.time === "" ||
                          classes.duration === ""
                        )
                          errorToast("The class timing infos are required");
                        else {
                          HostClasses();
                          setClasses({
                            title: "",
                            description: "",
                            fee: "",
                            date: "",
                            time: "",
                            duration: "",
                          });
                        }
                        // console.log(classes);
                        // HostClasses();
                        // setClasses({
                        //   title: "",
                        //   description: "",
                        //   fee: "",
                        //   date: "",
                        //   time: "",
                        //   duration: "",
                        // });
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Col>
              </Row>
            </Box>
          </form>
        </Container>
      </Container>
      {/* <Footer /> */}
    </Container>
  );
};

export default Host6;
