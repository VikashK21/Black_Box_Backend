import Header from "../../Components/Common/Header";
import { Button, InputAdornment, TextField, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";
import Default from "../../Images/defualtProPic.jpg";
import ProfilePic from "../../Components/Common/Crop";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControll from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";

import CropImage from "../../Components/Common/CropImage";
import axios from "axios";
import FormDialog from "../../Components/Common/FormDialog";
import MeetLink from "./MeetLink";

const EditCourse = () => {
  const {
    setCourse,
    course,
    image,
    setImage,
    classes,
    setClasses,
    HostClasses,
    classlist,
    setClasslist,
    setHostClasses,
    BaseUrl,
    editCourse,
  } = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(BaseUrl + "/courses/" + id)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(false);

  const navigate = useNavigate();

  const handleMethodologyChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...course.methodology];
    list[index][name] = value;
    setCourse({ ...course, index: list });
  };

  const handleRemove = (index) => {
    const list = [...course.content];
    list.splice(index, 1);
    setCourse({ ...course, content: list });
  };

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
    <Container fluid className="p-0 m-0 bggrey" style={{ width: "100vw" }}>
      <Header />
      <Container fluid className="white p-0 m-0"></Container>
      <Container fluid className=" p-0 m-0 bgw boxshadow  py-5 ">
        <Container className="d-flex justify-content-center">
          <div className="editcourse">
            <h1 className="gx title">Edit Course</h1>
          </div>
        </Container>
      </Container>
      <Container fluid className=" p-0 m-0 mt-3 ">
        <Container
          fluid
          className="d-flex justify-content-center  mt-3 m-0 p-0 "
        >
          <div>
            <Container className="d-flex justify-content-center bgw rounded-3 boxshadow py-5 pb-2 m-0">
              <Row className="m-0 p-0 pb-5">
                <Col md={6} sm={12} className="m-0 p-0">
                  <form className="d-flex justify-content-center flex-column w-100  m-2 me-0  ">
                    <div className="d-flex justify-content-center w-100 mb-5">
                      <Row
                        className=" w-100 px-3"
                        style={{ maxWidth: "700px" }}
                      >
                        <h5 className="text-start my-3 mb-2">Course Details</h5>
                        <Col md={12}>
                          <TextField
                            className="my-2 w-100"
                            label="Title"
                            name="title"
                            placeholder="e.g. Introduction to React.js"
                            value={course.title}
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
                            value={course.description}
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
                            // defaultValue={course.max_paticipants}
                            value={
                              course.max_paticipants
                                ? course.max_paticipants
                                : 0
                            }
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
                            placeholder="Fee e.g. 1400"
                            value={course.price}
                            defaultValue={course.price}
                            onChange={changeHandler}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            required
                          />
                        </Col>
                        <Col md={12} className="mx-0 d-flex ">
                          <TextField
                            className="my-2 w-100"
                            label="Google meet"
                            name="link"
                            defaultValue={course.link}
                            value={course.link}
                            placeholder="To get the google meet link, click on Link button"
                            onChange={changeHandler}
                            variant="outlined"
                            required
                          />
                          <MeetLink />
                          <a href="https://meet.google.com/" target="_blank">
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

                          <FormDialog />
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
                  </form>
                </Col>
                <Col md={6} sm={12} className="m-0 p-0 pt-2">
                  <form className="d-flex justify-content-center w-100 pe-3 ps-3 ">
                    <Box>
                      <Row className="signupform">
                        <h5 className="text-start my-3">Course Structure</h5>
                        <Col md={12}>
                          <TextField
                            label="Structure"
                            placeholder="You can write about the course structure here. i.e. You can write about what you will learn in this course."
                            multiline
                            name="structure"
                            value={course.structure}
                            defaultValue={course.structure}
                            rows={3}
                            onChange={changeHandler}
                            variant="outlined"
                            className=" mb-3 w-100"
                          />
                        </Col>

                        {course ? (
                          course.methodology ? (
                            course.methodology.length > 0 ? (
                              <>
                                <h5 className="text-start">Methodology</h5>

                                <Col md={12} className="my-2">
                                  {course
                                    ? course.methodology.map(
                                        (method, index) => (
                                          <div key={index}>
                                            <div className="d-flex">
                                              <TextField
                                                label="Enter a method"
                                                name="methodology"
                                                multiline
                                                // rows={3}
                                                variant="outlined"
                                                placeholder="e.g :  Lectures / Demonstration / Q&A Sessions"
                                                value={
                                                  course.methodology[index]
                                                    .methodology
                                                    ? course.methodology[index]
                                                        .methodology
                                                    : ""
                                                }
                                                onChange={(e) => {
                                                  handleMethodologyChange(
                                                    e,
                                                    index
                                                  );
                                                  console.log(method);
                                                }}
                                                className=" mb-3 w-100"
                                              />
                                              <div>
                                                {course.methodology.length !==
                                                  1 && (
                                                  <Button
                                                    onClick={() =>
                                                      handleMethodologyRemove(
                                                        index
                                                      )
                                                    }
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
                                              {course.methodology.length - 1 ===
                                                index && (
                                                <div className="d-flex justify-content-end">
                                                  <Button
                                                    onClick={
                                                      handleMethodologyAdd
                                                    }
                                                    color="primary"
                                                    variant="contained"
                                                  >
                                                    Add
                                                  </Button>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )
                                    : ""}
                                </Col>
                              </>
                            ) : (
                              " "
                            )
                          ) : (
                            " "
                          )
                        ) : (
                          " "
                        )}

                        <h5 className="text-start">Content</h5>

                        <Col md={12} className="my-2">
                          {course
                            ? course.content.map((content, index) => (
                                <div key={index}>
                                  <div className="d-flex">
                                    <TextField
                                      label="Enter a content"
                                      name="content"
                                      placeholder="e.g: Introduction to Calligraphy"
                                      multiline
                                      variant="outlined"
                                      value={
                                        course.content[index].content
                                          ? course.content[index].content
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleContentChange(e, index)
                                      }
                                      className=" mb-3 w-100"
                                    />
                                    <div>
                                      {course.content.length !== 1 && (
                                        <Button
                                          onClick={() =>
                                            handleContentRemove(index)
                                          }
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
                              ))
                            : ""}
                        </Col>

                        <h5 className="text-start">Requirements</h5>
                        <Col md={12} className="my-2">
                          {course
                            ? course.requirements.map((requirements, index) => (
                                <div key={index}>
                                  <div className="d-flex">
                                    <TextField
                                      label="Enter a requirement"
                                      name="requirements"
                                      multiline
                                      variant="outlined"
                                      placeholder="e.g: Basic knowledge of Cooking"
                                      value={
                                        course.requirements[index].requirements
                                          ? course.requirements[index]
                                              .requirements
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleRequirementChange(e, index)
                                      }
                                      className=" mb-3 w-100"
                                    />
                                    <div>
                                      {course.requirements.length !== 1 && (
                                        <Button
                                          onClick={() =>
                                            handleRequirementRemove(index)
                                          }
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
                                    {course.requirements.length - 1 ===
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
                              ))
                            : ""}
                        </Col>
                      </Row>
                    </Box>
                  </form>
                </Col>
              </Row>
            </Container>
            <Container className="d-flex justify-content-center mb-5 pb-5 w-50">
              <Row className="w-50">
                <Col xs={12} className="d-flex justify-content-center mt-3">
                  <div className="w-100 d-flex">
                    <Button className="bgy text-dark w-50 rounded-2 me-2"
                    onClick={()=>{
                      editCourse(id);
                    }}
                    >
                      Update
                    </Button>
                    <Button className="bg-dark text-white w-50 rounded-2">
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </Container>
      {/* <Container fluid className="loginpage p-0 m-0 bggrey ">
       
        <Container
          fluid
          className="d-flex justify-content-center  page mb-2 m-0 p-0 bggrey"
        >
          <Container className=" my-5 w-100 d-flex justify-content-center bgw rounded-3 boxshadow py-5">
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
                </Row>
              </Box>
            </form>
          </Container>
        </Container>
      </Container> */}
      {/* <Container fluid className=" p-0 m-0 bggrey">
        <Container className="d-flex justify-content-center mt-3 bgw">
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
                <Row className="w-100 ">
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
        <Container fluid className="d-flex justify-content-center m-0 p-0">
          <Container className=" my-5  w-100 d-flex justify-content-center">
            <form className="d-flex justify-content-center w-100 m-2 ">
              <Box>
                <h5 className="text-start my-3">Add classes</h5>
                <Row className="signupform ">
                  <Col md={12} className="">
                    <div className="d-flex">
                      <TextField
                        label="Title"
                        name="title"
                        value={classes.title}
                        onChange={(e) =>
                          setClasses({ ...classes, title: e.target.value })
                        }
                        multiline
                        variant="outlined"
                        placeholder="e.g :  Day 1: Intro to React"
                        className=" mb-3 w-100"
                      />
                    </div>
                  </Col>
                  <Col md={12} className="my-2">
                    <div className="d-flex">
                      <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        value={classes.description}
                        onChange={(e) =>
                          setClasses({
                            ...classes,
                            description: e.target.value,
                          })
                        }
                        variant="outlined"
                        placeholder="e.g :  This class will teach you about React and its advantages"
                        className=" mb-3 w-100"
                      />
                    </div>
                  </Col>
                  <Col md={4} xs={12} className="">
                    <>
                      <input
                        type="date"
                        value={classes.date}
                        className="w-100 p-2 rounded-2 timefield border-1"
                        onChange={(e) => {
                          setClasses({ ...classes, date: e.target.value });
                          console.log(classes.date);
                          console.log(e);
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
                        console.log(e.target.value);
                      }}
                      className="w-100 p-2 rounded-2 timefield border-1"
                    />
                  </Col>
                  <Col md={4}>
                    <TextField
                      label="Duration"
                      name="duration"
                      type="number"
                      placeholder="e.g : 45 minutes"
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
                        onClick={() => {
                          console.log(classes);
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
                          console.log(classes);
                          HostClasses();
                          setClasses({
                            title: "",
                            description: "",
                            fee: "",
                            date: "",
                            time: "",
                            duration: "",
                          });
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
      </Container> */}

      <Footer feeds="true" />
    </Container>
  );
};

export default EditCourse;
