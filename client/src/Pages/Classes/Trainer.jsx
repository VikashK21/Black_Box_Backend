import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
// import Splide from "./Splider";
import axios from "axios";
import "@splidejs/react-splide/css";
import DefaultPic from "../../Images/defualtProPic.jpg";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";

const Trainer = () => {

    const { id } = useParams();

  const { BaseUrl,goToTop, getCoursesList, courseList } = useContext(AuthContext);
  const name = localStorage.getItem("name");
  const [course, setCourse] = useState({
    host_details: {
      first_name: "",
      last_name: "",
      img_thumbnail: "{}",
    },
    Vid_Classes: [
      {
        name: "",
      },
    ],
    images: [],
  });

  useEffect(() => {
    getCoursesList();
    const fetchData = async () => {
      await axios
        .get(BaseUrl + "/courses/" + id)
        .then((res) => {
          const data = res.data;
          console.log(data);
          data.host_details.img_thumbnail =
            data.host_details.img_thumbnail.length > 0
              ? JSON.parse(data.host_details.img_thumbnail)
              : "";
          console.log(data);
          setCourse(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);





  return (
    <Container fluid className="m-0 p-0 ">
    <Header />
    <Container fluid className="white"></Container>

    <Container fluid className="p-0 m-0 bggrey ">
     

      <Container className="p-5 position-relative">
        <Row>
          <Col md={4} xs={12}>
            <div className="  d-flex justify-content-center w-100 ">
              <img
                src={
                  course.host_details.img_thumbnail
                    ? course.host_details.img_thumbnail.secure_url
                    : DefaultPic
                }
                alt="class1"
                className="img-fluid iconpic my-5 icon1"
              />
            </div>
            <div className="d-flex justify-content-end w-100 ">
              <img
                src={
                  course.host_details.img_thumbnail
                    ? course.host_details.img_thumbnail.secure_url
                    : DefaultPic
                }
                alt="class1"
                className="img-fluid iconpic icon2 "
              />
            </div>
          </Col>
          <Col md={8} xs={12}>
            <div className="hostdiv">
              <h6>Hello,</h6>
              <h2 className="gx">
               I'm {course.host_details.first_name
                  ? course.host_details.first_name
                  : "loading"}{" "}
                {course.host_details.last_name
                  ? course.host_details.last_name
                  : "loading"}
              </h2>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>

    <Container fluid className="p-0 m-0 bgw ">
      <Container className="p-5 pt-0 position-relative mt-1">
        <Row className="top-0">
          <Col md={4}></Col>
          <Col md={8} style={{
            height: 'fitContent',
        }}>
            <div className=" top-0" >
              {course.host_details.about
                ? course.host_details.about
                : "Loading"}
            </div>
          </Col>
        </Row>
      </Container>

      
    </Container>

    <Container
      fluid
      className="p-0 m-0 mt-5 d-flex justify-content-center classescontainer w-100 bgw"
    >
      <Container className="p-0 m-0 mb-5">
        <div className="d-flex justify-content-center flex-column w-100">
          <div>
            <h2 className="text-center gl mt-5">My Classes</h2>
          </div>

          <Row className="mb-5 px-2 d-flex justify-content-center m-0 p-0">
                {/* Map a function to display the classes list */}
                {courseList &&
                  courseList.slice(0,4).map((course) => {
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
                              <p className="clsdesc"><ReadMoreReact
                                    text={course.description}
                                    min={150}
                                    ideal={200}
                                    max={500}
                                    readMoreText=".. read more"
                                  /></p>

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
         
          <Row className=" m-0 p-0">
            <Col className="d-flex justify-content-center">
              <Link to="/classes">
                <button className="seemore gx">SEE MORE</button>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>

    <Footer />
  </Container>
  )
}

export default Trainer
