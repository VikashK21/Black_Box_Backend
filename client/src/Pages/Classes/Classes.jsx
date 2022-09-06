import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";
import ReadMoreReact from 'read-more-react';

const Classes = () => {
  const { goToTop, getCoursesList, courseList } = useContext(AuthContext);

  useEffect(() => {
    goToTop();
    getCoursesList();
  }, []);

  return (
    <Container fluid className=" p-0 m-0 bggrey">
      <Header />
      <Container fluid className="p-0 m-0 white"></Container>
      <Container fluid className=" mb-5 m-0 p-0 bggrey">
        <Container
          fluid
          className="p-0 m-0 d-flex justify-content-center classescontainer w-100"
        >
          <Container className="p-0 m-0 mb-5">
            <div className="d-flex justify-content-center flex-column w-100">
              <div>
                <h2 className="text-center gl my-5">CLASSES</h2>
              </div>

               <Row className="mb-5 px-2 d-flex justify-content-center m-0 p-0">
                {/* Map a function to display the classes list */}
                {courseList &&
                  courseList.map((course) => {
                    // console.log(course.images);
                    const a = JSON.parse(course.images);
                    return (
                      <Col
                        key={course.id}
                        className="my-4 cp position-relative"
                        style={{ minWidth: "320px", maxWidth: "320px" , minHeight: '400px' }}
                      >
                        <Link to={`/classes/join/${course.id}`}>
                          <div onClick={goToTop} className="zoom">
                            <div className="imgdiv">
                              <img
                                src={a[0]}
                                alt="No images uploaded"
                                className="classesimg p-0 m-0"
                              />
                              {/* <img src={course.images[0].secure_url} className="classesimg p-0 m-0" /> */}
                            </div>
                            <Row className="profile m-0 p-2 pt-4">
                              <h6 className="gx classtitlee">{course.title}</h6>
                              <p className="clsdesc">
                              <ReadMoreReact
                                    text={course.description}
                                    min={150}
                                    ideal={200}
                                    max={500}
                                    readMoreText=".. read more"
                                  />
                                </p>

                              <Col xs={8} className="p-2 pt-2 pb-0">
                                <h6 className="gx tutorname">
                                  {course.host_details.first_name}{" "}
                                  {course.host_details.last_name}
                                </h6>
                                <p className="gl text-dark">Instructor</p>
                              </Col>
                              <div className="  clsfee p-2 pt-0">
                                <div className="d-flex">
                                  <h6 className="gx">
                                    <span className="textgrey">FEE:</span> ₹
                                    {course.price}
                                    <span className="gl">/ person</span>
                                  </h6>
                                </div>
                                <div className="d-flex">
                                  <h6 className="gx">
                                    <span className="textgrey"> Type:</span>{" "}
                                    {course.duration_type}
                                  </h6>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Link>
                      </Col>
                    );
                  })}
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Link to="/classes" onClick={goToTop}>
                    <button className="seemore gx">SEE MORE</button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Container>
        </Container>
      </Container>
      <Container
        fluid
        className="m-0 p-0 white"
        style={{
          backgroundColor: "#fff",
        }}
      ></Container>
      <Footer />
    </Container>
  );
};

export default Classes;
