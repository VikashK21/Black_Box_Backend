import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";
import ReadMoreReact from "read-more-react";

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

              <div
                className=" px-2 d-flex justify-content-center m-0 p-0 abcd ps-5 py-5"
                style={{
                  overflowX: "scroll",
                }}
              >
                <div
                  style={{
                    minWidth: "220px",
                    maxWidth: "220px",
                    minHeight: "400px",
                  }}
                ></div>
                {courseList &&
                  courseList.length > 4 &&
                  courseList.map((course) => {
                    const a = JSON.parse(course.images);
                    return (
                      <div
                        key={course.id}
                        className="my-4 mt-0 cp position-relative me-2 pt-2"
                        style={{
                          minWidth: "220px",
                          maxWidth: "220px",
                          minHeight: "400px",
                        }}
                      >
                        <Link to={`/classes/join/${course.id}`}>
                          <div onClick={goToTop} className="zoom">
                            <div className="imgdiv">
                              <img
                                src={a[0]}
                                alt="No images uploaded"
                                className="classesimg p-0 m-0"
                              />
                            </div>
                            <Row className="profile m-0  pt-2">
                              <h6 className="gx classtitlee">
                                {course.title && course.title.length > 30
                                  ? course.title.substring(0, 30) + "..."
                                  : course.title}
                              </h6>
                              <p className="clsdesc">
                                {/* <ReadMoreReact
                              text={course.description}
                              min={150}
                              ideal={200}
                              max={500}
                              readMoreText=".. read more"
                            /> */}
                                {course.description &&
                                course.description.length > 60
                                  ? course.description.substring(0, 60) + "..."
                                  : course.description}
                              </p>
                              <Col xs={8} className="p-2 pt-2 pb-0">
                                <h6 className="gx tutorname">
                                  {course.host_details.first_name}
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
                                    <span className="textgrey"> Type:</span>
                                    {course.duration_type}
                                  </h6>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Container>
        </Container>
      </Container>
      {/* <Container fluid className=" mb-5 m-0 p-0 bggrey">
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
                {courseList &&
                  courseList.map((course) => {
                    const a = JSON.parse(course.images);
                    return (
                      <Col
                        key={course.id}
                        className="my-4 cp "
                        
                        md={2}
                      >
                        <Link to={`/classes/join/${course.id}`}>
                          <div onClick={goToTop} className="zhoom">
                            <div className="imgdiv2">
                              <img
                                src={a[0]}
                                alt="No images uploaded"
                                className="classesimg p-0 m-0"
                              />
                            </div>
                            <Row className="profile m-0 p-2 ps-1 pt-2">
                              <h6 className="gx classtitlee ps-1 p-0 m-0 pt-2">
                                {course.title
                                  ? course.title.length > 20
                                    ? course.title.slice(0, 20) + ".."
                                    : course.title
                                  : "No title"}
                              </h6>
                              <p className="clsdesc ps-1 pt-0 p-0 m-0">
                               
                               {course.description
                                  ? course.description.length > 20
                                    ? course.description.slice(0, 20) + ".."
                                    : course.description
                                  : ""} 
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
            </div>
          </Container>
        </Container>
      </Container> */}

      <Footer />
    </Container>
  );
};

export default Classes;
