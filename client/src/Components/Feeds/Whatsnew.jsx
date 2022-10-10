import React, { useContext, useEffect } from "react";
import Class2 from "../../Images/Classes/class2.jpg";
import Icon2 from "../../Images/Classes/icon2.png";
import Pradeesh from "../../Images/Profile/pradeesh.jpeg";
import { BsSearch } from "react-icons/bs";
import { FiUnlock } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import DefaultPic from "../../Images/defualtProPic.jpg";
import { Button } from "@mui/material";
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

  const { goToTop, getCoursesList, courseList, setShowclasses, scollToRef } =
    useContext(AuthContext);

  useEffect(() => {
    getCoursesList();
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
                className="d-flex justify-content-start align-items-center"
              >
                <div className="ps-3">
                  {prop ? (
                    propic ? (
                      <img src={propic} className=" mb-1 mt-3 ic2 " />
                    ) : (
                      <img
                        width={100}
                        height={100}
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
                      className=" mb-1 mt-3 ic2"
                    />
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-2 ps-3">
                  <h3>{name}</h3>
                  {/* <p className="">{about}</p> */}
                  <ReadMoreReact
                    text={about}
                    min={150}
                    ideal={150}
                    max={150}
                    readMoreText=".. read more"
                  />
                  <div className="d-flex mt-2">
                    <Link to="/edit/profile">
                      <Button
                        variant="contained"
                        className="bggrey me-1 text-dark px-4"
                        style={{
                          height: "40px",
                          width: "100px",
                        }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      className="bg-dark ms-1 text-white"
                      style={{
                        height: "40px",
                        width: "130px",
                      }}
                      onClick={() => {
                        setShowclasses(true);
                      }}
                    >
                      My Classes
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
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
                                <img src={a[0]} className="classesimg" />
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
