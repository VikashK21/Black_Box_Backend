import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import Class1 from "../../Images/Classes/class2.jpg";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "@mui/material/Button";
import { BsCalendarDate } from "react-icons/bs";
import Icon2 from "../../Images/Classes/icon2.png";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import YtVid from "./YtVid";
import AuthContext from "../../Context/AuthContext";
// import Splide from "./Splider";
import axios from "axios";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Img from "./Img";
import DefaultPic from "../../Images/defualtProPic.jpg";
import View from "./View";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const Join = () => {
  const { id } = useParams();

  const { BaseUrl, authTokens } = useContext(AuthContext);
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const addingparticipant = async () => {
    await axios
      .post(
        BaseUrl + "/participant/" + id,
        {},
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const checkBeforeJoining = async (id) => {
    await axios
      .get(BaseUrl + "/parallelclasses/" + id, {
        headers: { Authorization: `Bearer ${authTokens}` },
      })
      .then((res) => {
        console.log(res.data);
        displayRazorpay();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayRazorpay = async (price) => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      alert("You are offline");
      return;
    }

    const options = {
      key: "rzp_test_u8GQT2ewwaxjJw",
      currency: "INR",
      amount: course.price * 100,
      name: "BlackBox - Teach and Learn",
      description: "Paying your course/class fee ",
      // image: "https://blackbox.in/assets/images/logo.png",

      handler: function (response) {
        console.log(response);
        alert("Payment Successful");
        alert(response.razorpay_payment_id);
        addingparticipant();
      },

      prefill: {
        name: "Michu",
        email: "m4michu123@gmail.com",
        contact: "9207404868",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const [loading, setLoading] = useState(false);

  return (
    <Container fluid className="m-0 p-0 ">
      <Header />
      <Container fluid className="white"></Container>

      <Container fluid className="p-0 m-0 bggrey">
        <Container className="px-5 pt-2  d-flex justify-content-center">
          <div className="text-center">
            <h1 className="gx classtitle mt-3">
              {course.title ? course.title : "Loading"}
            </h1>
            {/* <h5>Course Type: {course.duration_type}</h5> */}
            <h5>
              {course.duration_type
                ? `Duration Type: ${course.duration_type}`
                : "Loading"}
            </h5>
          </div>
        </Container>
        <Container className="p-5 position-relative">
          <Row>
            <Col md={4} xs={12}>
              <Link to={`/profile/${course.host_details.id}`}>
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
              </Link>

              <Link to={`/profile/${course.host_details.id}`}>
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
              </Link>
            </Col>
            <Col md={8} xs={12}>
              <div className="hostdiv">
                <h6>Taught by</h6>
                <Link to={`/profile/${course.host_details.id}`}>
                  <h2 className="gx text-dark">
                    {course.host_details.first_name
                      ? course.host_details.first_name
                      : "loading"}{" "}
                    {course.host_details.last_name
                      ? course.host_details.last_name !== ""
                        ? course.host_details.last_name
                        : "loading"
                      : ""}
                  </h2>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container
        fluid
        className="p-0 m-0 bgw "
        style={{
          minHeight: "1000px",
        }}
      >
        <Container className="p-5 pt-0 position-relative mt-1">
          <Row className="top-0">
            <Col md={4}></Col>
            <Col
              md={8}
              style={{
                height: "fitContent",
              }}
            >
              <div className=" top-0">
                {course.host_details.about
                  ? course.host_details.about
                  : "Loading"}
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="  d-flex justify-content-center flex-column position-relative fc joincontainer">
          <Row className="w-100">
            <Col md={6} sm={12}>
              <div className="m-0 p-0 ps-1">
                <div className="w-100 mb-2 icon1">
                  <div>
                    {course.structure ? <h5>COURSE STRUCTURE</h5> : ""}
                    {course.structure ? (
                      <p className="fn gl">{course.structure}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {course.Classes
                      ? course.Classes.map((item, index) => {
                          return (
                            <div key={index}>
                              <h5>
                                <span className="textgrey">
                                  Day {index + 1}
                                </span>{" "}
                                : {item.title}
                              </h5>
                              <p className="fn gl">{item.description}</p>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                  <div className="w-100 mt-2 ">
                    {course.content && course.content.length > 1 ? (
                      <h5>COURSE CONTENT</h5>
                    ) : (
                      ""
                    )}
                    {/* Check if the course structure is there in the course and map it */}
                    <ul>
                      {course.content && course.content.length > 1
                        ? course.content.map((item, index) => {
                            return (
                              <li key={index} className="gl fn">
                                {item.content}
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                  <div className="w-100 mt-2 ">
                    {course.methodology && course.methodology.length > 1 ? (
                      <h5>METHODOLOGY</h5>
                    ) : (
                      ""
                    )}
                    {/* Check if the course structure is there in the course and map it */}
                    <ul>
                      {course.methodology && course.methodology.length > 1
                        ? course.methodology.map((item, index) => {
                            return (
                              <li key={index} className="gl fn">
                                {item.methodology}
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                  <div className="w-100 mt-2 ">
                    {course.requirements && course.requirements.length > 1 ? (
                      <h5>REQUIREMENTS</h5>
                    ) : (
                      ""
                    )}
                    <ul>
                      {course.requirements && course.requirements.length > 1
                        ? course.requirements.map((item, index) => {
                            return (
                              <li key={index} className="gl fn">
                                {item.requirements}
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                  <div className="w-100 mt-2 ">
                    {course.classes ? <h5>CLASSES</h5> : ""}
                    {course.classes ? (
                      <p className="fn">{course.classes}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="w-100 mt-5 mb-2 pt-5 icon2">
                  {course.structure ? <h5>COURSE STRUCTURE</h5> : ""}
                  {/* Check if the course structure is there in the course and map it */}

                  {course.structure ? (
                    <p className="fn gl">{course.structure}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="icon2">
                  <div>
                    {course ? (
                      course.Classes ? (
                        course.Classes.length > 0 ? (
                          <h5>Classes</h5>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {course.Classes
                    ? course.Classes.map((item, index) => {
                        return (
                          <div key={index}>
                            <h6 className="gl">
                              <span className="textgrey ">Day {index + 1}</span>{" "}
                              :<b> {item.title}</b>
                            </h6>
                            <p className="fn gl">{item.description}</p>
                          </div>
                        );
                      })
                    : ""}
                </div>
                <div className="w-100 mt-2 icon2">
                  {course.content && course.content.length > 1 ? (
                    <h5>COURSE CONTENT</h5>
                  ) : (
                    ""
                  )}
                  {/* Check if the course structure is there in the course and map it */}
                  <ul>
                    {course.content && course.content.length > 1
                      ? course.content.map((item, index) => {
                          return (
                            <li key={index} className="gl fn">
                              {item.content}
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
                <div className="w-100 mt-2 icon2">
                  {course.methodology && course.methodology.length > 1 ? (
                    <h5>METHODOLOGY</h5>
                  ) : (
                    ""
                  )}
                  {/* Check if the course structure is there in the course and map it */}
                  <ul>
                    {course.methodology && course.methodology.length > 1
                      ? course.methodology.map((item, index) => {
                          return (
                            <li key={index} className="gl fn">
                              {item.methodology}
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
                <div className="w-100 mt-2 icon2">
                  {course.requirements && course.requirements.length > 1 ? (
                    <h5>REQUIREMENTS</h5>
                  ) : (
                    ""
                  )}
                  <ul>
                    {course.requirements && course.requirements.length > 1
                      ? course.requirements.map((item, index) => {
                          return (
                            <li key={index} className="gl fn">
                              {item.requirements}
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
                <div className="w-100 mt-2 icon2">
                  {course.classes ? <h5>CLASSES</h5> : ""}
                  {course.classes ? <p className="fn">{course.classes}</p> : ""}
                </div>
                {/* <Splide props={course.images} /> */}
              </div>
              <div
                className="my-4 mt-5 pt-1"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Splide
                  style={{ width: "100%", height: "100%" }}
                  options={{
                    // type: "loop",
                    drag: "free",
                    gap: "1rem",
                    perPage: 3,
                  }}
                >
                  {course
                    ? course.images
                      ? course.images.map((image, index) => (
                          <SplideSlide
                            key={index}
                            className="d-flex justify-content-center"
                          >
                            {/* <img src={image} className="classimages" /> */}
                            <Img image={image} />
                          </SplideSlide>
                        ))
                      : ""
                    : ""}
                </Splide>
              </div>
            </Col>
            <Col md={6} sm={12} className="mb-5 pb-5">
              {/* <h4 className="gx">Dates</h4> */}
              {/* {course.Classes
                ? course.Classes.map((item, index) => {
                    var day = new Date(item.date);

                    return (
                      <h5 key={index}>
                        {day.toLocaleDateString("default", { month: "short" })}{" "}
                        {day.getDate()}
                        {"      "}
                        {item.time} |
                        <span className="textgrey">
                          {" "}
                          {item.duration} minutes
                        </span>
                      </h5>
                    );
                  })
                : ""} */}

              <div className="joinclassdiv py-4 px-5">
                <h4>
                  <div className="d-flex justify-content-between">
                    <span className="gx">
                      FEE: ₹{course.price ? course.price : ""} / PERSON
                    </span>
                    {/* <View/> */}
                    <React.Fragment>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <span className="gl textgrey cp" onClick={handleClick}>
                          View all dates
                        </span>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          {course.Classes
                            ? course.Classes.map((item, index) => {
                                var day = new Date(item.date);

                                return (
                                  <ListItem key={index}>
                                    <ListItemAvatar>
                                      <Avatar>{index + 1}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        day.toLocaleDateString("default", {
                                          month: "short",
                                        }) +
                                        " " +
                                        day.getDate() +
                                        " " +
                                        item.time
                                      }
                                      secondary={item.duration + " minutes"}
                                    />
                                  </ListItem>
                                );
                              })
                            : ""}
                        </List>
                      </Menu>
                    </React.Fragment>
                  </div>
                </h4>

                <YtVid
                  src={`https://www.youtube.com/embed/${
                    course.Vid_Classes.length !== 0
                      ? course.Vid_Classes[0].name
                      : ""
                  }`}
                  img={course.images[0]}
                />
                <div>
                  <h6>Suggest to friends</h6>
                  <div className="searchdiv mt-2">
                    <input
                      type="text"
                      className="borderlessinput"
                      placeholder="Friend's email address"
                    />
                    <div className="icondiv">
                      <AiOutlineArrowRight
                        className="profilesearch p-2"
                        size={35}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h6>Gift to friends</h6>
                  <div className="searchdiv mt-2">
                    <input
                      type="text"
                      className="borderlessinput"
                      placeholder="Friend's email address"
                    />
                    <div className="icondiv">
                      <AiOutlineArrowRight
                        className="profilesearch p-2"
                        size={35}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-100 mt-3">
                  <Button
                    className="bgdark text-light w-100 rounded-3"
                    onClick={() => {
                      console.log(course.id);
                      checkBeforeJoining(course.id);
                      setLoading(true);
                    }}
                  >
                    {loading ? (
                      <div class="loadingio-spinner-rolling-jm01qv7mmak mx-2">
                        <div class="ldio-cqj9sf9mcdj">
                          <div></div>
                        </div>
                      </div>
                    ) : (
                      " "
                    )}
                    Book your tickets
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Footer />
    </Container>
  );
};

export default Join;

// {course.methodology ? (
//   course.methodology.length > 0 ? (
//     course.methodology.map((methodology, index) => {

//           return (
//             <></>
//           );
//         }
//     )
//     )
//    : (<>
//     "Nothing to show"
//     </>
//   )
// ) : (
//   <>  "Loading"</>

// )}
