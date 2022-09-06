import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";

const Choose = () => {
  const { course, setCourse } = useContext(AuthContext);
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
  }, []);

  return (
    <Container fluid className="p-0 m-0 ">
      <Header />
      <Container className="m-0 p-0 white"></Container>
      <Container className="d-flex justify-content-center"
      style={{
        minHeight: "300px",
      }}
      >
        <div className="mt-5 d-flex">
        <Button variant="contained"   className="h-25 w-100 mx-2 bgy"
          onClick={() => {
            setCourse({ ...course, type: "Course" });
            navigate("/hosting");
          }}
        >
          Course
        </Button>
        <Button variant="contained"  className="h-25 w-100 mx-2 bgy"
          onClick={() => {
            setCourse({ ...course, type: "Classes" });
            navigate("/hosting2");
          }}
        >
          Class
        </Button>
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Choose;
