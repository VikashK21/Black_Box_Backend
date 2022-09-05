// import React, { useContext, useState } from "react";
// import AuthContext from "../../Context/AuthContext";
// eslint-disable-next-line
import { Box, Button, ButtonBase, TextField } from "@mui/material";
// eslint-disable-next-line
import TextareaAutosize from "@mui/material/TextareaAutosize";
// eslint-disable-next-line
import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// eslint-disable-next-line
import Footer from "../../Components/Common/Footer";
// eslint-disable-next-line
import Header from "../../Components/Common/Header";
// eslint-disable-next-line
import Default from "../../Images/defualtProPic.jpg";
// eslint-disable-next-line
import ProfilePic from "../../Components/Common/Crop";
// eslint-disable-next-line
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
// eslint-disable-next-line
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// eslint-disable-next-line 
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { useForm } from "react-hook-form";
// eslint-disable-next-line
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line
import * as yup from "yup";
// eslint-disable-next-line
import { FacebookLoginButton } from "react-social-login-buttons";
// eslint-disable-next-line
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";

const Host2 = () => {
  //   const [serviceList, setServiceList] = useState([{ service: "" }]);

  const { course, setCourse } = useContext(AuthContext);
  // eslint-disable-next-line
  const navigate = useNavigate();

  const handleContentChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...course.content];
    list[index][name] = value;
    setCourse({ ...course, content: list });
  };

  const handleContentRemove = (index) => {
    const list = [...course.content];
    list.splice(index, 1);
    setCourse({ ...course, content: list });
  };

  const handleContentAdd = () => {
    setCourse({ ...course, content: [...course.content, { content: "" }] });
    console.log(course);
  };

  const handleMethodologyChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...course.methodology];
    list[index][name] = value;
    setCourse({ ...course, index: list });
  };

  const handleMethodologyRemove = (index) => {
    const list = [...course.methodology];
    list.splice(index, 1);
    setCourse({ ...course, methodology: list });
  };

  const handleMethodologyAdd = () => {
    setCourse({
      ...course,
      methodology: [...course.methodology, { methodology: "" }],
    });
    console.log(course);
  };

  const handleRequirementChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...course.requirements];
    list[index][name] = value;
    setCourse({ ...course, requirements: list });
  };

  const changeHandler = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
    console.log(course);
  };

  const handleRequirementRemove = (index) => {
    const list = [...course.requirements];
    list.splice(index, 1);
    setCourse({ ...course, requirements: list });
  };
  const handleRequirementAdd = () => {
    setCourse({
      ...course,
      requirements: [...course.requirements, { requirements: "" }],
    });
    console.log(course);
  };

  return (
    <div>
      <Container fluid className="loginpage p-0 m-0 ">
        {/* <Header /> */}
        <Container
          fluid
          className="d-flex justify-content-center  page mb-5 m-0 p-0"
        >
          <Container className=" my-5 w-100 d-flex justify-content-center">
            <form className="d-flex justify-content-center w-100 m-2 mt-5">
              <Box>
                <h5 className="text-start my-3">Course Structure</h5>
                <Row className="signupform ">
                  <Col md={12}>
                    <TextField
                      
                      label="Structure"
                      placeholder="You can write about the course structure here. i.e. You can write about what you will learn in this course."
                      multiline
                      name="structure"
                      defaultValue={course.structure}
                      rows={3}
                      onChange={changeHandler}
                      variant="outlined"
                      className=" mb-3 w-100"
                    />
                  </Col>
                  <h5 className="text-start">Methodology</h5>

                  <Col md={12} className="my-2">
                    {course.methodology.map((method, index) => (
                      <div key={index}>
                        <div className="d-flex">
                          <TextField
                            
                            label="Enter a method"
                            name="methodology"
                            multiline
                            // rows={3}
                            variant="outlined"
                            placeholder="e.g :  Lectures / Demonstration / Q&A Sessions"
                            value={course.methodology[index].methodology}
                            onChange={(e) => {
                              handleMethodologyChange(e, index);
                              console.log(method);
                            }}
                            className=" mb-3 w-100"
                          />
                          <div>
                            {course.methodology.length !== 1 && (
                              <Button
                                onClick={() => handleMethodologyRemove(index)}
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
                          {course.methodology.length - 1 === index && (
                            <div className="d-flex justify-content-end">
                              <Button
                                onClick={handleMethodologyAdd}
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

                  <h5 className="text-start">Content</h5>

                  <Col md={12} className="my-2">
                    {course.content.map((content, index) => (
                      <div key={index}>
                        <div className="d-flex">
                          <TextField
                            
                            label="Enter a content"
                            name="content"
                            placeholder="e.g: Introduction to Calligraphy"
                            multiline
                            // rows={3}
                            variant="outlined"
                            value={course.content[index].content}
                            onChange={(e) => handleContentChange(e, index)}
                            className=" mb-3 w-100"
                          />
                          <div>
                            {course.content.length !== 1 && (
                              <Button
                                onClick={() => handleContentRemove(index)}
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
                          {course.content.length - 1 === index && (
                            <div className="d-flex justify-content-end">
                              <Button
                                onClick={handleContentAdd}
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

                  <h5 className="text-start">Requirements</h5>
                  <Col md={12} className="my-2">
                    {course.requirements.map((requirements, index) => (
                      <div key={index}>
                        <div className="d-flex">
                          <TextField
                            
                            label="Enter a requirement"
                            name="requirements"
                            multiline
                            
                            variant="outlined"
                            placeholder="e.g: Basic knowledge of Cooking"
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

                  <h5 className="text-start">Classes</h5>

                  <Col md={12}>
                    <TextField
                      
                      label="Enter class timings"
                      placeholder="e.g. 2 hours per week on every Saturday 9 pm – 10 pm"
                      multiline
                      rows={2}
                      name="email"
                      variant="outlined"
                      className=" mb-3 w-100"
                    />
                  </Col>
                </Row>
              </Box>
            </form>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default Host2;
