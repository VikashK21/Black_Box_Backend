import React, { useContext, useEffect, useState } from "react";
import Icon2 from "../../Images/Classes/icon2.png";
import Pradeesh from "../../Images/Profile/pradeesh.jpeg";
import { BsSearch } from "react-icons/bs";
import { FiUnlock } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Col, Container, Row } from "react-bootstrap";
import { Button, ListItem, ListItemText, Tooltip } from "@mui/material";
import $ from "jquery";
import ReadMoreReact from "read-more-react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Whatsnew from "../../Components/Feeds/Whatsnew";
import Classes from "../../Images/Classes/classes.jpg";
import Class2 from "../../Images/Classes/class2.jpg";
import AuthContext from "../../Context/AuthContext";
import DefaultPic from "../../Images/classroomDefault.jpeg";
import DefaultUserPic from "../../Images/defualtProPic.jpg";
import { AiFillHeart } from "react-icons/ai";
// import ReadMoreReact from "read-more-react";
import { Link, useNavigate } from "react-router-dom";
import StyleContext from "../../Context/StyleContext";
import { FaRegComment } from "react-icons/fa";
import { yellow } from "@mui/material/colors";

const Classroom = () => {
  const name = localStorage.getItem("name");
  const pro = localStorage.getItem("propic");
  const navigate = useNavigate();
  // if (pro.includes("{")) {
  //   var prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
  //   var propic = prop.secure_url;
  // } else {
  //   var prop = pro;
  //   var propic = pro;
  // }

  // var prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
  // var propic = prop.secure_url;
  // var about = localStorage.getItem("userDetails");
  const [workSpace, setWorkSpace] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sub, setSub] = useState(false);

  const {
    user,
    setClsroom,
    // profile,
    // goToTop,
    // getCoursesList,
    // courseList,
    // setShowclasses,
    // scollToRef,
    // getProfile,
    getWorkSpaceClassroom,
    getWorkSpace,
    workspaceAllow,
    getWorkSpaceAllow,
    setSeenavs,
  } = useContext(AuthContext);

  const checkerGetter = async () => {
    if (!user) {
      setClsroom(true);
      console.log("cmaer heretoooo");
      navigate("/signup");
    } else if (user && user.classroom_id) {
      const data = await getWorkSpace();
      setWorkSpace(data);
      const courseD = await getWorkSpaceClassroom();
      setCourses(courseD);
      setSeenavs(true);
      // console.log(data, "the data, 2");
      // console.log(workSpace, "the data");
      // getProfile()
      // console.log(profile, 'profile');
    } else if (user) {
      console.log("camer here ");
      await getWorkSpaceAllow(user.email);
      if (workspaceAllow) {
        // setClsroom(true);
        // navigate("/classroom/register");
        setSub(1);
      } else {
        // navigate('/profile')
        setClsroom(true);
        setSub(2);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    checkerGetter();
  }, []);

  return (
    <Container fluid className="m-0 p-0 bgg">
      <Header />
      <Container fluid className="white bggrey"></Container>
      {sub ? (
        <Container
          fluid
          className="profilediv d-flex flex-column justify-content-center align-items-center bgw pb-5"
        >
          {/* <Container className="pc py-5 pb-0"> */}
          {/* <Row className="d-flex flex-column justify-content-center align-items-center"> */}
          {/* <Col md={2}></Col> */}
          {/* <Col md={3}></Col> */}
          <Col
            md={7}
            className="d-flex text-center align-items-center"
            // style={{
            //   height: "fitContent",
            // }}
          >
            <div className="abc mb-4">
              {sub === 1 ? (
                <p style={{ fontSize: 22 }}>
                  {" "}
                  Tailored classes/sessions, just for you and your team. Join as
                  a corporate or school/college and experience it with
                  exploration.{" "}
                </p>
              ) : (
                <p style={{ fontSize: 22 }}>
                  {" "}
                  Tailored classes/sessions, just for you and your team. Join as
                  a <b>corporate or school/college account</b> and experience it
                  with exploration.{" "}
                </p>
              )}
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center pb-5 mb-5">
            {sub === 1 ? (
              <Button
                variant="contained"
                type="submit"
                className="bgdark"
                onClick={() => navigate("/classroom/register")}
              >
                {" "}
                Subscribe
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                className="bgdark"
                onClick={() => navigate("/signup")}
              >
                {" "}
                Join In
              </Button>
            )}
          </Col>
          {/* </Row> */}
        </Container>
      ) : (
        // </Container>
        <>
          <Container
            fluid
            className="profilediv d-flex justify-content-center p-0 m-0 bgw boxshadow my-1"
          >
            <Container className="pc py-5 pb-0">
              <Row>
                <Col lg={1}></Col>
                <Col lg={3}>
                  <Row className="mb-4">
                    <Col
                      md={12}
                      className="d-flex justify-content-start align-items-center"
                    >
                      <div className="ps-4">
                        {workSpace &&
                        workSpace.logo &&
                        workSpace.logo.length > 0 ? (
                          <img
                            src={workSpace.logo}
                            width={120}
                            height={100}
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            className="profilepic mb-1 mt-2"
                            alt="logo"
                          />
                        ) : (
                          <img
                            src={DefaultPic}
                            width={120}
                            height={100}
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            className="profilepic mb-1 mt-2 "
                            alt="logo"
                          />
                        )}
                      </div>
                    </Col>
                    {workSpace && user && workSpace.host === user.id ? (
                      <Col md={12}>
                        <div className="mt-2 ps-2">
                          {/* <h3>{workSpace && workSpace.title}</h3> */}
                          {/* <p className="">{about}</p> */}
                          {/* <ReadMoreReact
                      text={about}
                      min={150}
                      ideal={150}
                      max={150}
                      readMoreText=".. read more"
                    /> */}
                          <div className=" mt-2">
                            <Link to="/classroom/edit">
                              <Button
                                variant="contained"
                                className="bggrey me-1 text-dark px-4 mb-1 mt-3"
                                style={{
                                  height: "40px",
                                  width: "160px",
                                }}
                              >
                                Edit Profile
                              </Button>
                            </Link>
                            {/* <Button
                        variant="contained"
                        className="bg-dark text-white"
                        style={{
                          height: "40px",
                          width: "160px",
                        }}
                        onClick={() => {
                          setShowclasses(true);
                        }}
                      >
                        My Classes
                      </Button> */}
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <Col md={6}>
                        <div className="mt-2 mx-2 ps-5">
                          <div>
                            <Tooltip
                              title={`Admin ~ ${
                                workSpace && workSpace.Users[0].first_name
                              } ${workSpace && workSpace.Users[0].last_name}`}
                            >
                              {workSpace &&
                              workSpace.Users[0].img_thumbnail.length > 0 ? (
                                <img
                                  src={workSpace.Users[0].img_thumbnail}
                                  width={50}
                                  height={50}
                                  style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  className="mb-1 mt-2"
                                  alt="logo"
                                />
                              ) : (
                                <img
                                  src={DefaultUserPic}
                                  width={50}
                                  height={50}
                                  style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  className="mb-1 mt-2 "
                                  alt="logo"
                                />
                              )}
                            </Tooltip>
                          </div>
                        </div>
                      </Col>
                    )}
                  </Row>
                </Col>
                {/* <Col lg={1}></Col> */}
                <Col lg={7} className="ps-4 mt-4 abc text-center px-4">
                  <h1 className="mb-2 mt-2">{workSpace && workSpace.title}</h1>
                  <p className="mb-2 mt-4 abc">
                    {workSpace && workSpace.description}{" "}
                  </p>

                  {/* <ReadMoreReact
                text={workSpace && workSpace.description}
                min={150}
                ideal={150}
                max={150}
                readMoreText="..."
              /> */}
                  {/* <div
                className="d-flex w-100 abc"
                style={{
                  overflowX: "scroll",
                }}
              >
                {workSpace && workSpace.description}
                {workSpace && workSpace.Users.length > 0
                  ? workSpace.Classroom_Course.map((course, index) => {
                      const a = course.images;
                      // if (course.host_details.img_thumbnail.includes("{")) {
                      //   const host = course.host_details.img_thumbnail
                      //     ? course.host_details.img_thumbnail.secure_url !==
                      //       null
                      //       ? JSON.parse(course.host_details.img_thumbnail)
                      //       : null
                      //     : null;
                      // } else {
                      //   const host = course.host_details.img_thumbnail;
                      // }
                      if (a.length !== 0 && a[0].length !== undefined) {
                        return (
                          <div
                            className="my-4 mt-1 me-4 class"
                            key={index}

                            // style={{ height: "320px" }}
                          >
                            <Link
                              to={`/session/join/${course.id}`}
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
                                              ? course.title.slice(0, 20) +
                                                "..."
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
              </div> */}
                </Col>
              </Row>
            </Container>
          </Container>
          <Container fluid className="p-1 m-1 bggrey"></Container>
          <Container
            className=" pt-4"
            style={{
              maxWidth: "1500px",
            }}
          >
            <Row className="mt-2 ">
              <Col lg={20} className="text-center mb-3">
                <h1>UPCOMING SESSIONS</h1>
              </Col>
              <Col
                lg={20}
                className="d-flex justify-content-center align-items-center flex-wrap"
              >
                {courses.length > 0 &&
                  courses.map((course, index) => {
                    let a = course.images;
                    // remember this to open while pushing on the server........
                    if (a.length > 0) {
                      a = a[0];
                    } else if (workSpace.logo.length > 0) {
                      a = workSpace.logo;
                    } else {
                      a = DefaultPic;
                    }
                    console.log(a, "the images");
                    const day = new Date(course.Classes[0].date);
                    // a[0] = workSpace.logo;
                    // if (course.host_details.img_thumbnail.includes("{")) {
                    //   const host = course.host_details.img_thumbnail
                    //     ? course.host_details.img_thumbnail.secure_url !==
                    //       null
                    //       ? JSON.parse(course.host_details.img_thumbnail)
                    //       : null
                    //     : null;
                    // } else {
                    //   const host = course.host_details.img_thumbnail;
                    // }
                    // if (a.length !== 0 && a[0].length !== undefined) {
                    return (
                      <div
                        className="my-4 mt-1 me-4 class"
                        key={index}

                        // style={{ height: "320px" }}
                      >
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noreferrer"
                          className="cp"
                        >
                          <div
                            className="boxshadow rounded-5 mb-2"
                            style={{
                              width: "220px",
                            }}
                          >
                            <div className="profileclassesimg">
                              <img
                                src={a}
                                className="classesimg"
                                alt="profile"
                              />
                            </div>
                            <Row
                              className="profilest bw m-0"
                              style={{
                                overflowY: "hidden",
                              }}
                            >
                              <div
                                className="d-flex justify-content-center gap-2"
                                style={{
                                  overflowX: "hidden",
                                }}
                              >
                                <div>
                                  {course.creator_d.img_thumbnail.length > 0 ? (
                                    <img
                                      src={course.creator_d.img_thumbnail}
                                      width={50}
                                      height={50}
                                      style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                      className="mb-1 mt-2"
                                      alt="logo"
                                    />
                                  ) : (
                                    <img
                                      src={DefaultUserPic}
                                      width={50}
                                      height={50}
                                      style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                      className="mb-1 mt-2 "
                                      alt="logo"
                                    />
                                  )}
                                </div>
                                <div
                                  className=" w-85 ms-1 pt-2"
                                  style={{
                                    margin: "auto",
                                  }}
                                >
                                  <b>
                                    <p
                                      className="gx text-dark"
                                      style={{
                                        margin: "auto",
                                      }}
                                    >
                                      {course.title && course.title.length > 20
                                        ? course.title
                                            .substring(0, 20)
                                            .split(" ")
                                            .slice(0, -1)
                                            .join(" ")
                                        : course.title}
                                    </p>
                                  </b>
                                  <p>
                                    {course.creator_d.first_name}{" "}
                                    {course.creator_d.last_name}
                                  </p>
                                </div>
                              </div>
                              <div
                                className=" w-100 pt-0 pb-3 text-dark"
                                style={{
                                  margin: "auto",
                                  overflowX: "hidden",
                                  overflowY: "hidden",
                                }}
                              >
                                {/* {course.Classes[0].date}
                                <br />
                                Time: 3:30 PM - 4:30 PM */}
                                <ListItem
                                  key={index}
                                  className="d-flex flex-row"
                                >
                                  {/* <ListItemText className="d-flex"
                                    primary={
                                      day.toLocaleDateString("default", {
                                        month: "short",
                                      }) +
                                      " " +
                                      day.getDate() +
                                      " " +
                                      course.Classes[0].time
                                    }
                                    secondary={
                                      "  "+ course.Classes[0].duration + " mins"
                                    }
                                  /> */}
                                  <ListItemText

                                    primary={
                                      day.toLocaleDateString("default", {
                                        month: "short",
                                      }) +
                                      " " +
                                      day.getDate() +
                                      " " +
                                      course.Classes[0].time +
                                      ""
                                    }
                                  />
                                  <p>
                                    {course.Classes[0].duration + " minutes"}
                                  </p>
                                </ListItem>
                              </div>
                            </Row>
                          </div>
                        </a>
                      </div>
                    );
                  })}
              </Col>
              <Col md={5} className="m-5 "></Col>
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </Container>
  );
};

export default Classroom;
