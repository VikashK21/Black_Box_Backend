import React, { useContext, useEffect } from "react";
import Class2 from "../../Images/Classes/class2.jpg";
import Icon2 from "../../Images/Classes/icon2.png";
import Pradeesh from "../../Images/Profile/pradeesh.jpeg";
import { BsSearch } from "react-icons/bs";
import { FiUnlock } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import DefaultPic from "../../Images/defualtProPic.jpg";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import $ from "jquery";
import ReadMoreReact from "read-more-react";

const Whatsnew = () => {
  const name = localStorage.getItem("name");
  const pro = localStorage.getItem("propic");
  if (pro.includes("{")) {
    var prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
    var propic = prop.secure_url;
  } else {
    var prop = pro;
    var propic = pro;
  }
  // const prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
  // const propic = prop.secure_url;
  const about = localStorage.getItem("userDetails");
  const navigate = useNavigate();

  const {
    goToTop,
    getCoursesList,
    courseList,
    setShowclasses,
    scollToRef,
    willFrnd,
    willBeFrnd,
    saveFrnd,
  } = useContext(AuthContext);

  useEffect(() => {
    getCoursesList();
    willFrnd();
  }, []);

  return (
    <Container
      fluid
      className="profilediv d-flex justify-content-center p-0 m-0 bgw boxshadow my-1"
    >
      <Container className="pc py-5 pb-0">
        <Row>
          <Col lg={1}></Col>
          <Col lg={3}>
            <Row className="mb-5">
              <Col
                md={12}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="ps-3">
                  {prop ? (
                    propic ? (
                      <img
                        src={propic}
                        className=" mb-1 mt-3 ic2 "
                        alt={DefaultPic}
                      />
                    ) : (
                      <img
                        width={100}
                        height={100}
                        alt=""
                        style={{
                          borderRadius: "50%",
                        }}
                        className="profilepic mb-1 mt-3 "
                      />
                    )
                  ) : (
                    <img
                      src={DefaultPic}
                      width={100}
                      height={100}
                      alt=""
                      className=" mb-1 mt-3 ic2"
                    />
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="text-center mt-2 ps-3">
                  <h3>{name}</h3>
                  <ReadMoreReact
                    text={about}
                    min={150}
                    ideal={150}
                    max={150}
                    readMoreText=".. read more"
                  />
                  <div className="mt-4 pt-1 d-flex justify-content-center align-items-center">
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ width: 300 }}
                      options={willBeFrnd}
                      autoHighlight
                      getOptionLabel={(option) =>
                        `${option.first_name} ${option.last_name}`
                      }
                      renderOption={(props, option) => (
                        <div className="d-flex p-1" key={option.id}>
                          <Box
                            component="li"
                            sx={{
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...props}
                            onClick={() => {
                              navigate(`/trainer/${option.id}`);
                            }}
                          >
                            {option.img_thumbnail.length > 0 ? (
                              <img
                                src={option.img_thumbnail}
                                width={40}
                                height={40}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                alt="logo"
                              />
                            ) : (
                              <img
                                src={DefaultPic}
                                width={40}
                                height={40}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                alt="logo"
                              />
                            )}
                            <Typography>
                              {option.first_name} {option.last_name}
                            </Typography>
                          </Box>
                          <button
                            style={{
                              border: 0,
                              borderRadius: 2,
                              marginLeft: "auto",
                            }}
                            className="bgy mt-1 mb-1"
                            onClick={() => {
                              let ind = willBeFrnd.indexOf(option);
                              saveFrnd(option.id, ind);
                            }}
                          >
                            {" "}
                            Save
                          </button>
                        </div>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Friends"
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col></Col>
          <Col lg={7} className="ps-4 ">
            <h1 className="profilename gx">What's new</h1>
            <div
              className="d-flex w-100 abc"
              style={{
                overflowX: "scroll",
              }}
            >
              {courseList
                ? courseList.slice(0, 5).map((course, index) => {
                    const a = JSON.parse(course.images);
                    if (course.host_details.img_thumbnail.includes("{")) {
                      const host = course.host_details.img_thumbnail
                        ? course.host_details.img_thumbnail.secure_url !== null
                          ? JSON.parse(course.host_details.img_thumbnail)
                          : null
                        : null;
                    } else {
                      const host = course.host_details.img_thumbnail;
                    }
                    if (a.length !== 0 && a[0].length !== undefined) {
                      return (
                        <div
                          className="my-4 mt-1 me-4 class"
                          key={index}

                          // style={{ height: "320px" }}
                        >
                          <Link
                            to={`/classes/join/${course.id}`}
                            className="cp"
                          >
                            <div
                              className="boxshadow rounded-5 mb-2"
                              style={{
                                width: "155px",
                              }}
                            >
                              <div className="profileclassesimg">
                                <img src={a[0]} className="classesimg" alt="" />
                              </div>
                              <Row
                                className="profilest bw m-0 "
                                style={{
                                  overflowY: "hidden",
                                }}
                              >
                                <div
                                  className="d-flex"
                                  style={{
                                    overflowX: "hidden",
                                  }}
                                >
                                  <div
                                    className=" w-75 ms-1 pt-1"
                                    style={{
                                      margin: "auto",
                                    }}
                                  >
                                    <b>
                                      <p
                                        className="gx pb-1 text-dark"
                                        style={{
                                          margin: "auto",
                                        }}
                                      >
                                        {course.title
                                          ? course.title.length > 20
                                            ? course.title.slice(0, 20) + "..."
                                            : course.title
                                          : ""}
                                      </p>
                                    </b>
                                  </div>
                                </div>
                              </Row>
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  })
                : ""}
            </div>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Whatsnew;
