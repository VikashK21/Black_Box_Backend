import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";

const Choose = () => {
  const { course, setCourse, setImage } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCourse({
      title: "",
      description: "",
      price: "",
      max_students: "",
      type: "",
      images: [""],
      structure: "",
      classes: "",
      methodology: [{}],
      content: [{}],
      requirements: [{}],
    });

    setImage([]);
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="p-0 m-0 ">
      <Header />
      <Container className="m-0 p-0 white"></Container>
      <Container
        fluid
        className="d-flex bggrey justify-content-center py-2 pb-2 mb-5"
      >
        <div>
          <h1 className="regtitle">Formats</h1>
        </div>
      </Container>
      <Container
        className=" my-4"
        style={{
          minHeight: "300px",
        }}
      >
        <Row className="d-flex justify-content-center text-center">
          <Col md={8}>
            <p className="description">
              There are two formats in which classes are conducted on Black Box.
              One as a single class. And the other as a course conducted as a
              series of classes over time. You can choose the format you want to
              host your class based on whether it is a single class or a course.
              Click on the appropriate button below to host your class/ course.
            </p>
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-center w-100">
          <Col className="w-100 text-end pe-5">
            <Button
              variant="contained"
              className="h-100 w-25 bgy"
              onClick={() => {
                setCourse({ ...course, type: "Course" });
                navigate("/hosting");
              }}
            >
              Course
            </Button>
          </Col>
          <Col className="w-100 ps-5">
            <Button
              variant="contained"
              className="h-100 w-25  bgy"
              onClick={() => {
                setCourse({ ...course, type: "Classes" });
                navigate("/hosting2");
              }}
            >
              Class
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default Choose;
