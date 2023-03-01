import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Classes from "../../Components/Home/Classes";
import ImageSlider from "../../Components/Home/ImageSlider";
import AuthContext from "../../Context/AuthContext";

const Main = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-0 m-0 mainpage">
      <Header />

      <ImageSlider />

      <Classes />

      {/* <Container fluid className="white p-0 m-0"></Container> */}
      {/* <Container fluid className="white p-0 m-0"></Container> */}
      <Container fluid className="white p-0 m-0"></Container>

      <Footer />
    </div>
  );
};

export default Main;
