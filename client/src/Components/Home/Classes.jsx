import React, { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
// import ReadMoreReact from "read-more-react";
// import $ from "jquery";

// import HoverVideoPlayer from 'react-hover-video-player';
// import Class2 from "../../Images/Classes/class2.jpg";
// import Class3 from "../../Images/Classes/class3.jpg";
// import Class4 from "../../Images/Classes/class4.jpeg";

// import Icon1 from "../../Images/Classes/icon1.jpg";
// import Icon2 from "../../Images/Classes/icon2.png";
// import Icon3 from "../../Images/Classes/icon3.jpeg";
// import Icon4 from "../../Images/Classes/icon4.png";

const Classes = () => {
  const { getCoursesList, courseList, value } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getCoursesList();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      fluid
      className="p-0 m-0 d-flex justify-content-center classescontainer w-100"
    >
      <Container className="p-0 m-0 mb-5">
        <div className="d-flex justify-content-center flex-column w-100 pt-2">
          <div>
            <h2 className="text-center gl my-3">CLASSES</h2>
          </div>

          {/* <div className=" px-2 d-flex justify-content-center m-0 p-0 abcd ps-5 py-5"
          style={{
            overflowX: "scroll",
          }}
          >
            <div 
            style={{
              minWidth: "680px",
              maxWidth: "680px",
              minHeight: "400px",
            }}
            >
            </div>
            {courseList &&
              courseList.length > 4 &&
              courseList.map((course) => {
                const a = JSON.parse(course.images);
                if (course.title.toLowerCase().includes(value.toLowerCase()) || course.description.toLowerCase().includes(value.toLowerCase()) || value === "") {
            
                
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
                        <h6 className="gx classtitlee"
                        >{
                          course.title && course.title.length > 30 ? course.title.substring(0, 30) + "..." : course.title
                          }</h6>
                          <p className="clsdesc">
                            
                            {course.description && course.description.length > 60 ? course.description.substring(0, 60) + "..." : course.description}
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
                          }
    
              })}
          </div>
          <Row className="mb-5 px-2 d-flex justify-content-center m-0 p-0">
            {courseList &&
              courseList.length <= 4 &&
              courseList.map((course) => {
                const a = JSON.parse(course.images);
                return (
                  <Col
                    key={course.id}
                    className="my-4 cp position-relative"
                    style={{
                      minWidth: "220px",
                      maxWidth: "220px",
                      minHeight: "300px",
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
                          <h6 className="gx classtitlee">{
                          course.title && course.title.length > 30 ? course.title.substring(0, 30) + "..." : course.title
                          
                          }</h6>
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
                  </Col>
                );
              })}
          </Row> */}
          <Row className="pb-4 ">
            <div
              className="d-flex w-100 abc"
              style={{
                overflowX: "scroll",
                overflowY: "hidden",
              }}
            >
              {courseList &&
                courseList.length > 0 &&
                // eslint-disable-next-line
                courseList.map((course) => {
                  const a = JSON.parse(course.images)[0];
                  //check if the course name or course description is in the search bar
                  if (
                    course.title.toLowerCase().includes(value.toLowerCase()) ||
                    course.description
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    value === ""
                  ) {
                    return (
                      <div
                        className="my-4 mt-1 me-4 class "
                        onClick={() => navigate("/classes/join/" + course.id)}
                        key={course.id}
                      >
                        <div
                          className="boxshadow  mb-2 mb-5 cp my-4 zoom"
                          style={{
                            width: "190px",
                          }}
                        >
                          <div className="profileclassesimg22">
                            <img
                              src={a}
                              className="classesimg22"
                              alt="classImg"
                            />
                          </div>
                          <Row className="profilest bw m-0 ">
                            <div
                              className="d-flex"
                              style={{
                                overflowX: "hidden",
                              }}
                            >
                              <div className=" w-100 pe-1 ms-1 pt-1 pb-1">
                                <b>
                                  <h5
                                    className="gx py-1 text-dark"
                                    style={{
                                      margin: "auto",
                                      fontSize: "16px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {course.title && course.title.length > 30
                                      ? course.title
                                          .substring(0, 35)
                                          .split(" ")
                                          .slice(0, -1)
                                          .join(" ") + "..."
                                      : course.title}
                                  </h5>
                                </b>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    lineHeight: "1.2",
                                  }}
                                >
                                  {course.description &&
                                  course.description.length > 45
                                    ? course.description
                                        .substring(0, 45)
                                        .split(" ")
                                        .slice(0, -1)
                                        .join(" ") + "..."
                                    : course.description}
                                </p>

                                <div className="  clsfee ">
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
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </Row>
        </div>
      </Container>
    </Container>
  );
};

export default Classes;
