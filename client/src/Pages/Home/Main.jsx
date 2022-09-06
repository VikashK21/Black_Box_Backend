import React,{useContext, useEffect} from "react";
import { Container } from "react-bootstrap";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Classes from "../../Components/Home/Classes";
import ImageSlider from "../../Components/Home/ImageSlider";
import AuthContext from "../../Context/AuthContext";


const Main = () => {

  
  
  return (
    <div className="p-0 m-0 mainpage">
      <Header />

      <ImageSlider/>

      <Classes/>
     
      <Container fluid className="white p-0 m-0"></Container>
      <Container fluid className="white p-0 m-0"></Container>
      <Container fluid className="white p-0 m-0"></Container>

      <Footer/>
      
    </div>
  );
};

export default Main;
