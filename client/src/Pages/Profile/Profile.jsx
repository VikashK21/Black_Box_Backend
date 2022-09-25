import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Whatsnew from "../../Components/Feeds/Whatsnew";
import Classes from "../../Images/Classes/classes.jpg";
import Class2 from "../../Images/Classes/class2.jpg";
import AuthContext from "../../Context/AuthContext";
import DefaultPic from "../../Images/defualtProPic.jpg";
import { AiFillHeart } from "react-icons/ai";
import TabPanel from "./TabPanel";
// import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";
import StyleContext from "../../Context/StyleContext";
import { FaRegComment } from "react-icons/fa";

const Profile = () => {
  const {
    getCoursesList,
    courseList,
    // setCourseList,
    reaction,
    triggerReaction,
    DynamicTimer,
    showclasses,
    setShowclasses,
    scollToRef,
    
  } = useContext(AuthContext);

  const { successToast, errorToast } = useContext(StyleContext);
  // const [reaction, setReaction] = useState([]);

  useEffect(() => {
    getCoursesList();
    DynamicTimer();
  }, []);

  const [timer, setTimer] = useState(true);
  const [expiryTime, setExpiryTime] = useState(
    "Sun Sep 18 2022 20:50:00 GMT+0530 (India Standard Time)"
  );
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    countdownHours: "",
    countdownMinutes: "",
    countdownSeconds: "",
  });

  const CountdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
        setTimer(false);
      }
    }, 1000);
  };

  useEffect(() => {
    CountdownTimer();
  });

  // const [showclasses, setShowclasses] = useState(false);

  return (
    <Container fluid className="m-0 p-0 bgg">
      <Header />
      <Container fluid className="white bggrey"></Container>
      <Whatsnew />
      <Container fluid className="p-0 m-0 bggrey">
        <Container
          className="p-2 pt-4"
          style={{
            maxWidth: "1000px",
          }}
        >
          {showclasses ? (
            <div >
              <TabPanel />
            </div>
          ) : (
            <Row className="mt-2 ">
              <Col md={5} className="p-0">
                <div className="bgw rounded-3 ps-3 py-3 boxshadow me-2 mb-2">
                  {showclasses === false && (
                    <>
                      {timer ? (
                        <Row className="mt-2 ">
                          <b>
                            <h2>Your next class starts in </h2>
                          </b>
                          <Col xs={3} className="p-2 timer">
                            <h1>
                              {countdownTime.countdownDays.toString().length ===
                              1
                                ? "0" + countdownTime.countdownDays
                                : countdownTime.countdownDays}
                            </h1>

                            <b>
                              <p className="ps-3">Days</p>
                            </b>
                          </Col>
                          <Col xs={3} className="p-2 timer">
                            <h1>
                              {countdownTime.countdownHours.toString()
                                .length === 1
                                ? "0" + countdownTime.countdownHours
                                : countdownTime.countdownHours}
                            </h1>
                            <b>
                              <p className="ps-3">Hours</p>
                            </b>
                          </Col>
                          <Col xs={3} className="p-2 timer">
                            <h1>
                              {countdownTime.countdownMinutes.toString()
                                .length === 1
                                ? "0" + countdownTime.countdownMinutes
                                : countdownTime.countdownMinutes}
                            </h1>
                            <b>
                              <p className="ps-2">Minutes</p>
                            </b>
                          </Col>
                          <Col xs={3} className="p-2 timer">
                            <h1>
                              {countdownTime.countdownSeconds.toString()
                                .length === 1
                                ? "0" + countdownTime.countdownSeconds
                                : countdownTime.countdownSeconds}
                            </h1>
                            <b>
                              <p className="ps-2">Seconds</p>
                            </b>
                          </Col>
                        </Row>
                      ) : (
                        <Row className="mt-2 m-0 ">
                          <h4 className="p-0">Hurraay!</h4>
                          <h5 className="p-0">
                            The wait is over. Join the class!
                          </h5>
                          <a
                            href="http://localhost:3000/hosting"
                            target="_blank"
                            className="w-50 p-0"
                          >
                            <Button
                              variant="primary"
                              className="mt-2  w-100 bgy border-0"
                            >
                              Enter room
                            </Button>
                          </a>
                        </Row>
                      )}

                      {timer ? (
                        <div className="my-3">
                          <h4>Date: June 21, 22, 23. </h4>
                          <h4>Time: 10:00 AM - 11:00 AM</h4>
                        </div>
                      ) : (
                        <Row className="my-3">
                          <Col md={3}>
                            <img src={Class2} alt="classes" className="w-100" />
                          </Col>
                          <Col md={6} className=" align-content-center">
                            <h6>
                              Instructor :<b> Name</b>
                            </h6>
                            <h6>
                              Class : <b>Class</b>
                            </h6>
                            <h6>
                              Duration : <b>45 mins</b>
                            </h6>
                            <h6>
                              Day : <b>#22</b>
                            </h6>
                          </Col>
                        </Row>
                      )}
                      <div>
                        
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-2 rounded-3 bgw p-3 pe-0 boxshadow me-2">
                  <h2 className="gl">My Classes</h2>
                  <img
                    src={Classes}
                    className=" p-0 m-0 w-75 cp"
                    onClick={() => {
                      setShowclasses(true);
                      scollToRef.current.scrollIntoView();

                    }}
                    style={{
                      borderRadius: "15px",
                    }}
                  />
                </div>
              </Col>
              <Col md={7} className="p-0 ">
                <div className="feeds pt-1">
                  {courseList.length > 0 &&
                    courseList.map((course, index) => {
                      const host = course.host_details.img_thumbnail
                        ? course.host_details.img_thumbnail.secure_url !== null
                          ? JSON.parse(course.host_details.img_thumbnail)
                          : null
                        : null;
                      const a = JSON.parse(course.images);
                      if (a.length !== 0) {
                        return (
                          <div
                            className="mb-4 bgw rounded-3 p-3 ps-2 ms-1 me-2  boxshadow"
                            key={index}
                          >
                            <Row className=" ">
                              <Col md={8}>
                                <div className="d-flex">
                                  {/* <img
                                    src={
                                      host
                                        ? host.secure_url
                                          ? host.secure_url
                                          : DefaultPic
                                        : DefaultPic
                                    }
                                    alt="classes"
                                    className="ic"
                                  /> */}
                                  <div
                                    
                                  >
                                    <h5 className="ps-3">{course.title}</h5>
                                  </div>
                                </div>
                              </Col>
                              {/* <Col
                                md={4}
                                className="d-flex justify-content-end pe-4"
                              >
                                <div
                                  className="d-flex"
                                  style={{
                                    margin: "auto",
                                  }}
                                >
                                  <h6 className="pe-2">
                                    <b>
                                      {course.host_details.first_name}{" "}
                                      {course.host_details.last_name}
                                    </b>
                                  </h6>
                                  <img
                                    src={
                                      host
                                        ? host.secure_url
                                          ? host.secure_url
                                          : DefaultPic
                                        : DefaultPic
                                    }
                                    alt="classes"
                                    className="ic"
                                  />
                                </div>
                                <div
                                  style={{
                                    margin: "auto 0",
                                  }}
                                >
                                  :
                                </div>
                              </Col> */}
                            </Row>
                            <Link to={`/classes/join/${course.id}`}>
                              <Row className="d-flex justify-content-center bgw m-0 p-0">
                                <img
                                  src={a[0]}
                                  alt=""
                                  className="ms-1"
                                  style={{
                                    width: "100%",
                                  }}
                                />
                              </Row>
                            </Link>
                            <Row className="mt-2">
                              {/* <Col md={1}></Col> */}
                              {/* <Col
                                md={5}
                                className="d-flex justify-content-start"
                              >
                                <Button
                                  variant="contained "
                                  className="bgy text-white outline-0"
                                  onClick={() => {
                                    console.log("clicked");
                                    //Copy the link to clipboard
                                    navigator.clipboard.writeText(
                                      `http://localhost:3000/classes/join/${course.id}`
                                    );
                                    successToast("Link copied to clipboard");
                                  }}
                                >
                                  Copy
                                </Button>
                              </Col> */}
                              <Col
                                md={5}
                                className="d-flex justify-content-start ps-4"
                              >
                                <div className="cp">
                                  {reaction.length > 0 &&
                                  reaction[index].count > 0
                                    ? reaction[index].count
                                    : " "}
                                </div>
                                <AiFillHeart
                                  className="cp"
                                  onClick={() => {
                                    triggerReaction(index, course.id);
                                  }}
                                  size={30}
                                  style={{
                                    color:
                                      reaction.length > 0 &&
                                      reaction[index].heart
                                        ? "orange"
                                        : "gray",
                                  }}
                                />
                                <FaRegComment size={28} />
                              </Col>
                              <Col md={1}></Col>
                            </Row>
                          </div>
                        );
                      }
                    })}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </Container>
      <Footer feeds="true" />
    </Container>
  );
};

export default Profile;
