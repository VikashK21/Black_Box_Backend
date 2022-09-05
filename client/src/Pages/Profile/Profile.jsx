import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Whatsnew from "../../Components/Feeds/Whatsnew";
import Classes from "../../Images/Classes/classes.jpg";
import Class2 from "../../Images/Classes/class2.jpg";
import AuthContext from "../../Context/AuthContext";
import Default from "../../Images/defualtProPic.jpg";

const Profile = () => {
  const { getCoursesList, courseList } = useContext(AuthContext);

  useEffect(() => {
    getCoursesList();
    // eslint-disable-next-line
  }, []);

  const [timer, setTimer] = useState(true);
  const [expiryTime, setExpiryTime] = useState(
    "Thu Sep 01 2022 16:50:00 GMT+0530 (India Standard Time)"
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

  return (
    <Container fluid className="m-0 p-0">
      <Header />
      <Container fluid className="white"></Container>
      <Whatsnew />
      <Container fluid className="p-0 m-0">
        <Container className="p-5 pt-4">
          <Row className="mt-2 ">
            <Col md={4} className="p-0">
              <div>
                {timer ? (
                  <Row className="mt-2 ">
                    <b>
                      <h2>Your next class starts in </h2>
                    </b>
                    <Col xs={3} className="p-2 timer">
                      <h1>
                        {countdownTime.countdownDays.toString().length === 1
                          ? "0" + countdownTime.countdownDays
                          : countdownTime.countdownDays}
                      </h1>

                      <b>
                        <p className="ps-3">Days</p>
                      </b>
                    </Col>
                    <Col xs={3} className="p-2 timer">
                      <h1>
                        {countdownTime.countdownHours.toString().length === 1
                          ? "0" + countdownTime.countdownHours
                          : countdownTime.countdownHours}
                      </h1>
                      <b>
                        <p className="ps-3">Hours</p>
                      </b>
                    </Col>
                    <Col xs={3} className="p-2 timer">
                      <h1>
                        {/* {countdownTime.countdownMinutes} */}
                        {countdownTime.countdownMinutes.toString().length === 1
                          ? "0" + countdownTime.countdownMinutes
                          : countdownTime.countdownMinutes}
                      </h1>
                      <b>
                        <p className="ps-2">Minutes</p>
                      </b>
                    </Col>
                    <Col xs={3} className="p-2 timer">
                      <h1>
                        {/* {countdownTime.countdownSeconds} */}
                        {countdownTime.countdownSeconds.toString().length === 1
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
                    <h2 className="p-0">Hurraay! </h2>
                    <h4 className="p-0">The wait is over. Join the class!</h4>
                    <a
                      href="http://localhost:3000/hosting"
                      target="#"
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
                    <Col md={6}>
                      <h5>Instructor : Name</h5>
                      <h5>Class : Class</h5>
                      <h5>Duration : 45 mins</h5>
                      <h5>Day : #22 </h5>
                    </Col>
                  </Row>
                )}
                <div>
                  <br />
                  <hr />
                </div>
              </div>
              <Row className="mt-2">
                <h2 className="gl">Classes</h2>
                <img
                  src={Classes}
                  className=" p-0 m-0 w-75"
                  style={{
                    borderRadius: "15px",
                  }}
                />
              </Row>
              <Row className="mt-4 ">
                <h2 className="gl">Streaming</h2>
                <img
                  src={Classes}
                  className=" p-0 m-0 w-75 mb-3"
                  style={{
                    borderRadius: "15px",
                  }}
                />
              </Row>

              <hr />
            </Col>
            <Col md={8} className="p-0 ">
              <div className="feeds">
                {courseList
                  ? courseList.map((course, index) => {
                      const host = course.host_details.img_thumbnail
                        ? course.host_details.img_thumbnail.secure_url !== null
                          ? JSON.parse(course.host_details.img_thumbnail)
                          : null
                        : null;
                      const a = JSON.parse(course.images);
                      return (
                        <div className="my-2 bggrey rounded-5 p-3" key={index}>
                          <Row className=" pt-2">
                            <Col md={8}>
                              <p className="gl ps-2">{course.description}</p>
                            </Col>
                            <Col md={4} className="d-flex justify-content-end pe-4">
                              <div className="d-flex">
                                <h6
                                className="pe-2"
                                style={{
                                  margin:'auto',
                                }}>
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
                                        : <Default />
                                      : <Default />
                                  }
                                  alt="classes"
                                  className="ic"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row className="d-flex justify-content-center">
                            <img
                              src={a[0]}
                              alt=""
                              className=""
                              style={{
                                width: "40%",
                              }}
                            />
                          </Row>
                          <Row className="mt-2">
                            <Col md={1}></Col>
                            <Col
                              md={5}
                              className="d-flex justify-content-start"
                            >
                              <button className="btn btn-outline-primary">
                                Share
                              </button>
                            </Col>
                            <Col md={5} className="d-flex justify-content-end">
                              Love
                            </Col>
                            <Col md={1}></Col>
                          </Row>
                        </div>
                      );
                    })
                  : null}
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </Container>
  );
};

export default Profile;
