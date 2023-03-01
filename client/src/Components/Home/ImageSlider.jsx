import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
// import AuthContext from "../../Context/AuthContext";

// import Carousel1 from "../../Images/Carousel/carousel1.jpg";
// import Carousel2 from "../../Images/Carousel/carousel2.jpg";
import Carousel3 from "../../Images/Carousel/carousel3.jpg";
import Carousel4 from "../../Images/Carousel/carousel4.jpg";
import { useNavigate } from "react-router-dom";

const ImageSlider = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="p-0 m-0 w-100">
      <Carousel variant="dark" className="caro">
        <Carousel.Item>
          <img
            className="slideimg "
            src="https://ik.imagekit.io/Michu/BlackBox/A_8IkCQUbCwI.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1663565505200"
            alt="Second slide"
            style={{
              objectPosition: "top",
            }}
          />
          <Carousel.Caption className="c2">
            <h5>BRINGING YOU</h5>
            <h5>THE BEST TEACHERS</h5>
            <b>
              <h6>Dance, Yoga, Music, Fitness , Illustration and more.</h6>
            </b>
            <button
              onClick={() => {
                navigate("/classes");
              }}
            >
              JOIN A CLASS
            </button>
          </Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            className="slideimg "
            src="https://ik.imagekit.io/Michu/BlackBox/B_03SngjxZ2.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1663565484866"
            alt="First slide"
            style={{
              objectPosition: "bottom",
            }}
          />
          <Carousel.Caption className="c1">
            <h5>MAKE THE WORLD</h5>
            <h5>YOUR CLASSROOM</h5>
            <button
              onClick={() => {
                navigate("/host");
              }}
            >
              HOST A CLASS
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="slideimg " src={Carousel3} alt="Third slide" />
          <Carousel.Caption className="c3">
            <h5>VIRTUAL</h5>
            <h5>CLASSROOM</h5>
            <button>KNOW MORE</button>
            <div className="position-relative bt d-flex justify-content-center w-25">
              <p className="under">Join free trial</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="slideimg " src={Carousel4} alt="Third slide" />
          <Carousel.Caption className="c4">
            <h5>STREAMING</h5>
            <button>WATCH NOW</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default ImageSlider;
