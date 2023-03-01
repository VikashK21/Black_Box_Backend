import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@mui/material";
// import $ from "jquery";
// import ReadMoreReact from "read-more-react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
// import Whatsnew from "../../Components/Feeds/Whatsnew";
// import Classes from "../../Images/Classes/classes.jpg";
// import Class2 from "../../Images/Classes/class2.jpg";
import AuthContext from "../../Context/AuthContext";
import DefaultPic from "../../Images/classroomDefault.jpeg";
import DefaultUserPic from "../../Images/defualtProPic.jpg";
// import { AiFillHeart } from "react-icons/ai";
// import ReadMoreReact from "read-more-react";
import { Link, useNavigate } from "react-router-dom";
// import StyleContext from "../../Context/StyleContext";
// import { FaRegComment } from "react-icons/fa";
// import { yellow } from "@mui/material/colors";

const Classroom = () => {
  // const name = localStorage.getItem("name");
  // const pro = localStorage.getItem("propic");
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
  // const [courses, setCourses] = useState([]);
  const [sub, setSub] = useState(false);

  const {
    user,
    setClsroom,
    // setWorkdata,
    workdata,
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
      // console.log("cmaer heretoooo");
      navigate("/signup");
    } else if (user && user.classroom_id) {
      const data = await getWorkSpace();
      setWorkSpace(data);
      await getWorkSpaceClassroom();
      // setCourses(courseD);
      setSeenavs(true);
    } else if (user) {
      // console.log("camer here ");
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
    // console.log(user.classroom_id, "the user from the classroom");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    checkerGetter();
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="m-0 p-0 bgg" style={{ overflowX: "hidden" }}>
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
            className="profilediv d-flex justify-content-center p-0 m-0 bgw my-0"
          >
            <Container className="pc py-5 pb-0">
              <Row>
                <Col lg={1}></Col>
                <Col lg={3}>
                  <Row className="mb-4">
                    {workSpace && user && workSpace.host === user.id ? (
                      <Col
                        md={12}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <div className="ps-2">
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
                    ) : (
                      <Col
                        md={12}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <div className="ps-2 pt-4">
                          {workSpace &&
                          workSpace.logo &&
                          workSpace.logo.length > 0 ? (
                            <img
                              src={workSpace.logo}
                              width={150}
                              height={150}
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              // className="profilepic mb-1 mt-2"
                              alt="logo"
                            />
                          ) : (
                            <img
                              src={DefaultPic}
                              width={150}
                              height={150}
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              // className="profilepic mb-1 mt-2 "
                              alt="logo"
                            />
                          )}
                        </div>
                      </Col>
                    )}

                    {workSpace && user && workSpace.host === user.id && (
                      <Col md={12}>
                        <div className="d-flex justify-content-center align-items-center mt-2 ps-2">
                          {/* <h3>{workSpace && workSpace.title}</h3> */}
                          {/* <p className="">{about}</p> */}
                          {/* <ReadMoreReact
                            text={about}
                            min={150}
                            ideal={150}
                            max={150}
                            readMoreText=".. read more"
                          /> */}
                          {
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
                            </div>
                          }
                          {/* {workSpace && user && workSpace.host === user.id && (
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
                            </div>
                            // <Tooltip
                            //   title={`Admin ~ ${
                            //     workSpace && workSpace.Users[0].first_name
                            //   } ${workSpace && workSpace.Users[0].last_name}`}
                            // >
                            //   {workSpace &&
                            //   workSpace.Users[0].img_thumbnail.length > 0 ? (
                            //     <img
                            //       src={workSpace.Users[0].img_thumbnail}
                            //       width={50}
                            //       height={50}
                            //       style={{
                            //         borderRadius: "50%",
                            //         objectFit: "cover",
                            //       }}
                            //       className="mb-1 mt-2"
                            //       alt="logo"
                            //     />
                            //   ) : (
                            //     <img
                            //       src={DefaultUserPic}
                            //       width={50}
                            //       height={50}
                            //       style={{
                            //         borderRadius: "50%",
                            //         objectFit: "cover",
                            //       }}
                            //       className="mb-1 mt-2 "
                            //       alt="logo"
                            //     />
                            //   )}
                            // </Tooltip>
                          )} */}
                        </div>
                      </Col>
                    )}

                    {/* <Col md={6}>
                      <div className="d-flex justify-content-center align-items-center mt-2 ms-4 ps-5">
                        <div className="ms-5 ps-5"></div>
                      </div>
                    </Col> */}
                  </Row>
                </Col>
                {/* <Col lg={1}></Col> */}
                {/* <Col>
                  <Row className="mb-4"> */}
                <Col
                  lg={7}
                  className=" ps-4 mt-0 abc text-center px-0 d-flex row align-items-center"
                >
                  <h1 className="mt-4">{workSpace && workSpace.title}</h1>
                  {workSpace && workSpace.description}{" "}
                  <p className="pt-1 abc"></p>
                  {/* <div>People you know</div> */}
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
                {/* </Row>
                </Col> */}
              </Row>
            </Container>
          </Container>
          <Container
            fluid
            className=" d-flex justify-content-start align-items-center gap-3 pb-2 pt-0 mt-0 abc"
            style={{
              // boxShadow: "0px 5px #f7f7f7",
              maxWidth: "62%",
              overflowX: "scroll",
              position: "relative",
            }}
          >
            {/* <Tooltip
              title={`Admin ~ ${workSpace && workSpace.Users[0].first_name} ${
                workSpace && workSpace.Users[0].last_name
              }`}
            > */}
            <div className="m-0 mb-0 text-center">
              {workSpace && user && user.img_thumbnail.length > 0 ? (
                <img
                  src={user.img_thumbnail}
                  width={70}
                  height={70}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  // className="mb-1 mt-2"
                  alt="logo"
                />
              ) : (
                <img
                  src={DefaultUserPic}
                  width={70}
                  height={70}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  // className="mb-1 mt-2 "
                  alt="logo"
                />
              )}
              <p className="mb-0 pt-2">You</p>
            </div>
            {workSpace &&
              workSpace.Users.length > 1 &&
              workSpace.Users.map((ele, ind) => (
                <div className="m-0 mb-0 text-center" key={ind}>
                  {user.id !== ele.id &&
                    (ele.img_thumbnail.length > 0 ? (
                      <img
                        src={ele.img_thumbnail}
                        width={70}
                        height={70}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        // className="mb-1 mt-2"
                        alt="logo"
                      />
                    ) : (
                      <img
                        src={DefaultUserPic}
                        width={70}
                        height={70}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        // className="mb-1 mt-2 "
                        alt="logo"
                      />
                    ))}

                  {user.id !== ele.id && (
                    <p className="mb-0 pt-2">{ele.first_name}</p>
                  )}
                </div>
              ))}
            {/* </Tooltip> */}
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
                {workdata &&
                  workdata.length > 0 &&
                  workdata.map((course, index) => {
                    let a = course.images;
                    // remember this to open while pushing on the server........
                    if (a.length > 0) {
                      a = a[0];
                    } else if (workSpace && workSpace.logo.length > 0) {
                      a = workSpace.logo;
                    } else {
                      a = DefaultPic;
                    }
                    // console.log(a, "the images");
                    const day = new Date(course.Classes[0].date);
                    return (
                      <div
                        className="my-4 mt-1 me-4 class"
                        key={index}

                        // style={{ height: "200px" }}
                      >
                        <div
                          className="boxshadow rounded-5 mb-1"
                          style={{
                            width: "220px",
                          }}
                        >
                          {course.link && course.link.length > 0 ? (
                            <a
                              href={course.link}
                              target="_blank"
                              rel="noreferrer"
                              className="cp"
                            >
                              <div className="profileclassesimg">
                                <img
                                  src={a}
                                  className="classesimg"
                                  alt="profile"
                                />
                              </div>
                            </a>
                          ) : course.dolphin ? (
                            <Link
                              to={`/joinmeeting/ses/${course.id}/${course.dolphin.meeting_id}`}
                            >
                              <div className="profileclassesimg">
                                <img
                                  src={a}
                                  className="classesimg"
                                  alt="profile"
                                />
                              </div>
                            </Link>
                          ) : (
                            <div className="profileclassesimg">
                              <img
                                src={a}
                                className="classesimg"
                                alt="profile"
                              />
                            </div>
                          )}
                          <Row
                            className="profilest bw m-0"
                            style={{
                              overflowY: "hidden",
                            }}
                          >
                            <div
                              className="d-flex justify-content-center gap-2 px-1"
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
                                    className=" mt-2"
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
                                    className=" mt-2 "
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
                              className=" w-100 pb-2 text-dark"
                              style={{
                                overflowX: "hidden",
                                overflowY: "hidden",
                              }}
                            >
                              {/* {course.Classes[0].date}
                                <br />
                                Time: 3:30 PM - 4:30 PM */}
                              {/* <ListItem
                                  key={index}
                                  className="d-flex flex-row"
                                > */}
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
                              {/* <ListItemText
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
                                  /> */}
                              {/* <p> */}
                              {day.toLocaleDateString("default", {
                                month: "short",
                              }) +
                                " " +
                                day.getDate() +
                                " " +
                                course.Classes[0].time +
                                ""}{" "}
                              {course.Classes[0].duration + " minutes"}
                              {/* </p> */}
                              {/* </ListItem> */}
                            </div>
                          </Row>
                        </div>
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
