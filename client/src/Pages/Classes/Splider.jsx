import React, { useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Class1 from "../../Images/Classes/class2.jpg";
import Img from "./Img";

const Splider = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div
      className="my-4 mt-5 pt-1"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Splide
        aria-label="My Favorite Images"
        style={{ width: "100%", height: "100%" }}
        options={{
          // type: "loop",
          drag: "free",
          gap: "1rem",
          perPage: 3,
        }}
      >
        {props.course.images.map((image) => (
          <SplideSlide key={image} className="d-flex justify-content-center" >
            <Img src={image} />
          </SplideSlide>
        ))}

        {/* <SplideSlide >
          <Img image={Class1}/>
        </SplideSlide> */}

        {/* <SplideSlide className="d-flex justify-content-center">
          <img src={Class1} alt="Image 2" className="classimages" />
        </SplideSlide> */}
      </Splide>
    </div>
  );
};

export default Splider;
