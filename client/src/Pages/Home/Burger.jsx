import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../blackbox-logo-01.png";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import AuthContext from "../../Context/AuthContext";

const Burger = () => {
  const [navb, setNavb] = useState(false);
  const [show, setShow] = useState("");
  const navigate = useNavigate();
  const { seenavs } = useContext(AuthContext);

  const handleNavbar = () => {
    window.scrollY >= 20 ? setNavb(true) : setNavb(false);
  };

  window.addEventListener("scroll", handleNavbar);

  return (
    <Container fluid className="p-0 m-0">
      <nav className={navb ? "active w-100" : "w-100"}>
        <Container
          fluid
          className="d-flex justify-content-between w-100 p-3 navbar pe-5"
        >
          <div className="py-2">
            <Link to="/main">
              <img src={Logo} width={200} alt="" className="p-0 m-0 cp" />
            </Link>
          </div>
          <div className="py-2">
            <div className="py-2">
              <b>
                <ul>
                  <li onClick={() => navigate(-1)}>
                    <IoMdClose size={40} className="cp" />
                  </li>
                </ul>
              </b>
            </div>
          </div>
        </Container>
      </nav>
      <nav className={navb ? "active w-100 navs2" : "w-100 navs2"}>
        <Container
          fluid
          className="d-flex justify-content-between w-100 p-3 navbar pe-5"
        >
          <div className="py-2">
            <Link to="/main">
              <img src={Logo} width={200} alt="" className="p-0 m-0 cp" />
            </Link>
          </div>
          <div className="py-2">
            <div className="py-2">
              <b>
                <ul>
                  <li onClick={() => navigate(-1)}>
                    <IoMdClose size={40} className="cp" />
                  </li>
                </ul>
              </b>
            </div>
          </div>  
        </Container>
      </nav>
      <Container fluid className="white"></Container>
      <Container fluid className="white"></Container>
      <Container fluid style={{ minHeight: "500px" }}>
        <Container
          style={{ minHeight: "500px" }}
          className="d-flex justify-content-center"
        >
          <Row className="w-100">
            <Col md={5} className="d-none d-sm-block"></Col>
            <Col md={3} className="text-end me-4">
              {show === "classes" && (
                <>
                  <div className="py-2 ">
                    <h5
                      className="underline cp "
                      onClick={() => {
                        navigate("/classes");
                      }}
                    >
                      YOGA
                    </h5>
                  </div>
                  <div className="py-2">
                    <h5
                      className="underline cp"
                      onClick={() => {
                        navigate("/classes");
                      }}
                    >
                      ZUMBA
                    </h5>
                  </div>
                  <div
                    className="py-2"
                    onClick={() => {
                      navigate("/classes");
                    }}
                  >
                    <h5 className="underline cp">GUITAR</h5>
                  </div>
                  <div className="py-2">
                    <h5
                      className="underline cp"
                      onClick={() => {
                        navigate("/classes");
                      }}
                    >
                      FITNESS
                    </h5>
                  </div>
                </>
              )}
              {show === "live" && (
                <>
                  <div className="py-2 ">
                    <h5 className="underline cp ">GAMES</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">PIANO</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">MUSIC</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">COOKING</h5>
                  </div>
                </>
              )}
              {show === "programmes" && (
                <>
                  <div className="py-2 ">
                    <h5 className="underline cp ">COMPETITIONS</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">PRIZES</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">TOURNAMENTS</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">WINNERS</h5>
                  </div>
                </>
              )}
              {show === "instructors" && (
                <>
                  <div className="py-2 ">
                    <h5 className="underline cp ">MICHAEL SWAMY</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">ANUSHREE DUTTA</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">CLEA CHANDMAL</h5>
                  </div>
                  <div className="py-2">
                    <h5 className="underline cp">SHIVANI DE</h5>
                  </div>
                </>
              )}
            </Col>
            <Col md={3}>
              {/* <div className="py-2">
                <h4
                  className={
                    show === "home"
                      ? "underline cp display-6 text-bold"
                      : "underline cp"
                  }
                  onMouseEnter={() => {
                    setShow("home");
                  }}
                >
                  HOME
                </h4>
              </div> */}
              <div
                className="py-2"
                onClick={() => {
                  navigate("/classes");
                }}
                onMouseLeave={() => {
                  setShow("");
                }}
              >
                <h4
                  className={
                    show === "classes"
                      ? "underline cp display-6 text-bold"
                      : "underline cp"
                  }
                  onMouseEnter={() => {
                    setShow("classes");
                  }}
                  onMouseLeave={() => {
                    setShow("");
                  }}
                >
                  CLASSES
                </h4>
              </div>
              <div className="py-2">
                <h4
                  className={
                    show === "host"
                      ? "underline cp display-6 text-bold"
                      : "underline cp"
                  }
                  onMouseEnter={() => {
                    setShow("host");
                  }}
                  onMouseLeave={() => {
                    setShow("");
                  }}
                >
                  <Link to="/host" className="text-dark">
                    HOST A CLASS
                  </Link>
                </h4>
              </div>
              <div className="py-2">
                <h4
                  className={
                    show === "join"
                      ? "underline cp display-6 text-bold"
                      : "underline cp"
                  }
                  onMouseEnter={() => {
                    setShow("join");
                  }}
                  onMouseLeave={() => {
                    setShow("");
                  }}
                >
                  <Link to="/classroom" className="text-dark">
                    CLASSROOM
                  </Link>
                </h4>
              </div>
              {seenavs && (
                <div className="py-2">
                  <h4
                    className={
                      show === "session"
                        ? "underline cp display-6 text-bold"
                        : "underline cp"
                    }
                    onMouseEnter={() => {
                      setShow("session");
                    }}
                    onMouseLeave={() => {
                      setShow("");
                    }}
                  >
                    <Link to="/classroom/host" className="text-dark">
                      HOST A SESSION
                    </Link>
                  </h4>
                </div>
              )}
              {/* <div className="py-2">
                <h4
                  className={
                    show === "programmes"
                      ? "underline cp display-6 text-bold"
                      : "underline cp"
                  }
                  onMouseEnter={() => {
                    setShow("programmes");
                  }}
                  onMouseLeave={() => {
                    setShow("");
                  }}
                >
                  PROGRAMMES
                </h4>
              </div>
              <div className="py-2">
                <h4
                  className={
                    show === "instructors"
                      ? "underline cp display-6 text-bold"
                      : "underline cp"
                  }
                  onMouseEnter={() => {
                    setShow("instructors");
                  }}
                  onMouseLeave={() => {
                    setShow("home");
                  }}
                >
                  INSTRUCTORS
                </h4>
              </div>
              <div className="py-2">
                <h4
                  className={
                    show === "streaming"
                      ? "underline cp display-6 text-bold"
                      : "underline cp"
                  }
                  onMouseEnter={() => {
                    setShow("streaming");
                  }}
                  onMouseLeave={() => {
                    setShow("home");
                  }}
                >
                  STREAMING
                </h4>
              </div> */}
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default Burger;
