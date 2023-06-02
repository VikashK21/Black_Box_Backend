import Header from "../../Components/Common/Header";
import {
  Button,
  InputAdornment,
  TextField,
  Box,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";
// import Default from "../../Images/defualtProPic.jpg";
// import ProfilePic from "../../Components/Common/Crop";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControll from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";

import CropImage from "../../Components/Common/CropImage";
import axios from "axios";
// import FormDialog from "../../Components/Common/FormDialog";
// import MeetLink from "./MeetLink";
import EditClass from "./EditClass";
import AddClass from "./AddClass";

const EditCourse = () => {
  const {
    setCourse,
    course,
    image,
    setImage,
    // classes,
    // setClasses,
    // HostClasses,
    // classlist,
    // setClasslist,
    // setHostClasses,
    deleteClass,
    BaseUrl,
    setUpdatedImgs,
    editCourse,
  } = useContext(AuthContext);

  const [imgs, setImgs] = useState([]);
  const [clss, setClss] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(BaseUrl + "/courses/" + id)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
        setImage(res.data.images);
        setImgs([...res.data.images]);
        setClss(res.data.Classes);
        console.log(res.data.Classes, "the distributer");
      })
      .catch((err) => {
        console.log(err);
      });
    // }, [clss]); ----> this is for making the chnages occur, but it will make the whole things in continues process...
    // eslint-disable-next-line
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

  // const handleRemove = (index) => {
  //   const list = [...course.content];
  //   list.splice(index, 1);
  //   setCourse({ ...course, content: list });
  // };

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
                  <div className="d-flex justify-content-center flex-column w-100  m-2 me-0  ">
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
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                              }
                            }}
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
                        {/* <Col md={12} className="mx-0 d-flex ">
                          <TextField
                            className="my-2 w-100"
                            label="Google meet"
                            name=imgsAlgo"link"
                           
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
                        </Col> */}
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
                        {imgs.length > 0 &&
                          imgs.map((ele, index) => (
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
                                    let list = [...image];
                                    if (image.length <= index) {
                                      list.splice(index, 1);
                                      setImage(list);
                                    }
                                    list = [...imgs];
                                    list.splice(index, 1);
                                    setImgs(list);
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
                          // setImage((prev) => [...prev, image]);
                          setImgs((pre) => [...pre, image]);
                          setUpdatedImgs((pre) => [...pre, image]);
                          // setCopyImage((prev) => [...prev, image]);
                          setShowCropper(false);
                        }}
                        closeHander={() => {
                          setShowCropper(false);
                        }}
                      />
                    )}
                  </div>
                </Col>
                <Col md={6} sm={12} className="m-0 p-0 pt-2">
                  <div className="d-flex justify-content-center w-100 pe-3 ps-3 ">
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
                                                    index,
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
                                                        index,
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
                                        ),
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
                  </div>
                </Col>
                <Col xs={12} className="mt-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3>Added classes</h3>
                    </div>
                    <div className="d-flex justify-content-end">
                      {/* <Button variant="contained" className="w-100 bgy">
                        Add class
                      </Button> */}
                      <AddClass id={course.id} />
                    </div>
                  </div>
                  <Row className="mt-3">
                    {clss.length > 0 &&
                      clss.map((classes, index) => {
                        // console.log(classes);
                        return (
                          <Col md={4} key={index}>
                            <Card
                              className="mb-4 "
                              style={{
                                height: "300px",
                              }}
                            >
                              <CardHeader
                                title={"Day : " + (index + 1)}
                                subheader={classes.date + " " + classes.time}
                              />
                              <CardContent>
                                <Row>
                                  <Col md={8}>
                                    <div>
                                      <h6 className="mb-2 font-weight-bold">
                                        {classes.title
                                          ? classes.title.length > 30
                                            ? classes.title.substring(0, 30) +
                                              "..."
                                            : classes.title
                                          : ""}
                                      </h6>
                                      <p className="mb-3 font-size-sm text-black-50">
                                        {classes.description
                                          ? classes.description.length > 50
                                            ? classes.description.substring(
                                                0,
                                                50,
                                              ) + "..."
                                            : classes.description
                                          : ""}
                                      </p>
                                    </div>
                                  </Col>
                                  <Col md={4}>
                                    <div>
                                      {/* <Button
                                              variant="contained"
                                              className="h-25 ms-2 w-100 mt-2 px-2 bg-dark"
                                            >
                                              Edit
                                            </Button> */}
                                      <EditClass
                                        classes={classes}
                                        setClss={setClss}
                                        index={index}
                                      />
                                      <Button
                                        color="error"
                                        variant="contained"
                                        className="h-25 ms-2 w-100 mt-2 px-2"
                                        onClick={() => {
                                          let updatePro = clss;
                                          updatePro.splice(index, 1);
                                          setClss((pre) => [...updatePro]);
                                          deleteClass(classes.id);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
                              </CardContent>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                </Col>
              </Row>
            </Container>
            <Container className="d-flex justify-content-center mb-5 pb-5 w-50">
              <Row className="w-50">
                <Col xs={12} className="d-flex justify-content-center mt-3">
                  <div className="w-100 d-flex">
                    <Button
                      className="bgy text-dark w-50 rounded-2 me-2"
                      onClick={() => {
                        editCourse(id);
                        // navigate("/profile");
                        console.log('what is going on');
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="bg-dark text-white w-50 rounded-2"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </Container>

      <Footer feeds="true" />
    </Container>
  );
};

export default EditCourse;
