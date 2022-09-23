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

const Whatsnew = () => {
  const name = localStorage.getItem("name");
  const pro = localStorage.getItem("propic");
  const prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
  const propic = prop.secure_url;
  const about = localStorage.getItem("userDetails");

  const { goToTop, getCoursesList, courseList, setShowclasses } =
    useContext(AuthContext);

  useEffect(() => {
    getCoursesList();
  }, []);

  return (
    <Container
      fluid
      className="profilediv d-flex justify-content-center p-0 m-0 bgw boxshadow my-1"
    >
      <Container className="pc p-5 pb-0">
        <Row>
          <Col md={4}>
            <div className="d-flex ">
              {prop ? (
                propic ? (
                  <img
                    src={propic}
                    width={100}
                    height={100}
                    className=" mb-1 mt-3 ic2"
                  />
                ) : (
                  <img
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "50%",
                    }}
                    className="profilepic mb-1 mt-3"
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
              <div className="mt-3 ps-3">
                <h3>{name}</h3>
                <b>
                  <p className="gl">{about}</p>
                </b>
                <div className="d-flex">
                  <Button variant="contained" className="bggrey w-100 me-1 text-dark">
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    className="bgy w-100 ms-1 text-dark"
                    onClick={() => {
                      setShowclasses(true);
                    }}
                  >
                    My Classes
                  </Button>
                </div>

                {/* <Button variant="contained">Edit</Button> */}
              </div>
            </div>
            {/* <div className="searchdiv mt-5">
              <input
                type="text"
                className="borderlessinput"
                placeholder="Search black box"
              />
              <div className="icondiv">
                <BsSearch className="profilesearch p-2" size={35} />
              </div>
            </div>
            <div>
              <div className="ms-3 my-5 mt-3 d-flex">
                <div className="d-flex">
                  <FiLock className="profilelock me-2" size={25} />
                  <h6 className="gl">Private</h6>
                </div>
                <div className="d-flex mx-3">
                  <FiUnlock className="profileunlock me-2" size={25} />
                  <h6 className="gl">Public</h6>
                </div>
              </div>
            </div> */}
          </Col>
          <Col md={8} className="ps-4 icon2">
            <h1 className="profilename gx">What's new</h1>
            <Row className="">
              {courseList
                ? courseList.slice(0, 4).map((course, index) => {
                    const a = JSON.parse(course.images);
                    const host = course.host_details.img_thumbnail
                      ? course.host_details.img_thumbnail.secure_url !== null
                        ? JSON.parse(course.host_details.img_thumbnail)
                        : null
                      : null;
                    return (
                      <Col
                        md={3}
                        className="my-4 mt-1 class"
                        key={index}
                        style={{ height: "320px" }}
                      >
                        <Link to={`/classes/join/${course.id}`} className="cp">
                          <div className="boxshadow rounded-5">
                            <div className="profileclassesimg">
                              <img src={a[0]} className="classesimg" />
                            </div>
                            <Row
                              className="profilest bw m-0 p-2 "
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
                                <div className="w-25">
                                  <img
                                    src={
                                      host
                                        ? host.secure_url
                                          ? host.secure_url
                                          : DefaultPic
                                        : DefaultPic
                                    }
                                    className="ic3 pt-2"
                                  />
                                </div>
                                <div className=" w-75">
                                  <b>
                                    <p className="gl mb-0">{course.title}</p>
                                  </b>
                                  <p className="gl textgrey">
                                    {course.host_details.first_name}
                                  </p>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Link>
                      </Col>
                    );
                  })
                : ""}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Whatsnew;
