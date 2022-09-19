import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
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
      link: "",
      images: [""],
      structure: "",
      classes: "",
      methodology: [{}],
      content: [{}],
      requirements: [{}],
    });

    setImage([]);
  }, []);

  return (
    <Container fluid className="p-0 m-0 ">
      <Header />
      <Container className="m-0 p-0 white"></Container>
      <Container
        fluid
        className="d-flex bggrey justify-content-center py-5 mb-5"
      >
        <div>
          <h1 className="regtitle">Course type</h1>
        </div>
      </Container>
      <Container
        className="d-flex justify-content-center my-4"
        style={{
          minHeight: "300px",
        }}
      >
        <div className="mt-5 d-flex justify-content-center w-75">
          <div className="w-100 text-end pe-5">
            <Button
              variant="contained"
              className="h-25 w-50 bgy"
              onClick={() => {
                setCourse({ ...course, type: "Course" });
                navigate("/hosting");
              }}
            >
              Course
            </Button>
            <b>
              <p className="gl pt-4">Here you can host a class</p>
              <p className="gl ">
                where you can teach one course on the same subject by taking
                multiple days to complete the whole topic. You will have to
                mention what topics you will be convering in different days.
              </p>
              {/* <p className="gl ">E.g. </p> */}
            </b>
          </div>
          <div className="w-100 ps-5">
            <Button
              variant="contained"
              className="h-25 w-50  bgy"
              onClick={() => {
                setCourse({ ...course, type: "Classes" });
                navigate("/hosting2");
              }}
            >
              Class
            </Button>
            <b>
              <p className="gl pt-4">Here you can host a class</p>
              <p className="gl ">
                where you can teach one class on the same subject by teaching on
                different days. You can set different days as the students will
                feel flexible to choose any class they are available to.
              </p>
              {/* <p className="gl ">E.g. </p> */}
            </b>
          </div>
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Choose;
