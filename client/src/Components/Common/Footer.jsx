import React from "react";
import { Col, Container } from "react-bootstrap";
// import Logo from "../../blackbox-logo-01.png";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <Container
      fluid
      className="m-0 p-0 boxshadow"
      style={{ bottom: 0, zIndex: 999 }}
    >
      {/* {props.feeds ? (
        " "
      ) : (
        <Row className="m-0 p-0 footerrow align-items-center"
      >
        <Col md={4} className="footercol d-none d-md-block">
          <center>
            <h1 className="gl ">CONTACT</h1>
            <p className="gl moto">learn@blackis.in</p>
          </center>
        </Col>
        <Col
          md={4}
          className="footercol "
          style={{
            borderRight: "1.5px solid #000",
            borderLeft: "1.5px solid #000",
          }}
        >
          <center>
            <div className="icon1 mb-5">
              <h1 className="gl ">CONTACT</h1>
              <p className="gl moto">learn@blackis.in</p>
            </div>
            <img src={Logo} alt="logo" width={230} className="mb-4 pb-2" />
            <p className="gl moto">
              TEACH WHAT YOU LOVE.
              <br />
              LEARN WHAT YOU SEEK.
            </p>
            <Row className="w-50 mt-5">
              <Col xs={3}>
                <GrFacebookOption size={25} />
              </Col>
              <Col xs={3}>
                <AiOutlineInstagram size={25} />
              </Col>
              <Col xs={3}>
                <AiOutlineTwitter size={25} />
              </Col>
              <Col xs={3}>
                <FaLinkedinIn size={25} />
              </Col>
            </Row>
            <div className="icon1 mt-5">
              <h1 className="gl ">FAQs</h1>
              <p className="gl moto">your questions answered</p>
            </div>
          </center>
        </Col>
        <Col md={4} className="footercol d-none d-md-block">
          <center>
            <h1 className="gl ">FAQs</h1>
            <p className="gl moto">your questions answered</p>
          </center>
        </Col>
      </Row>
      )
      } */}
      <Container
        fluid
        className="w-100 py-1 m-0 text-light p-0 bgdark align-items-center icon2"
        style={{ position: "fixed", bottom: 0, zIndex: 999 }}
      >
        <Container>
          <div className="d-flex justify-content-between">
            <div>
              <p className="gl textwhite mb-0 ">
                Copyright © 2022 Blackis.in. All rights reserved.
              </p>
            </div>
            <div className="d-flex ">
              <Col
                className="mx-2 cp"
                style={{
                  minWidth: "fit-content",
                }}
              >
                <Link to="/privacy" className="text-white">
                  Privacy
                </Link>
              </Col>
              <Col
                className="mx-2 cp"
                style={{
                  minWidth: "fit-content",
                }}
              >
                <Link to="/terms" className="text-white">
                  Terms of use
                </Link>
              </Col>
              {/* <Col className="mx-2 cp">Careers</Col> */}
              <Col
                className="mx-2 cp"
                style={{
                  minWidth: "fit-content",
                }}
              >
                Contact
              </Col>
              <Col className="mx-1 cp">
                <GrFacebookOption size={25} />
              </Col>
              <Col className="mx-1 cp">
                <AiOutlineInstagram size={25} />
              </Col>
              <Col className="mx-1 cp">
                <AiOutlineTwitter size={25} />
              </Col>
              <Col className="mx-1 cp">
                <FaLinkedinIn size={25} />
              </Col>
            </div>
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default Footer;
