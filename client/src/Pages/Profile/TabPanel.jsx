import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
// import Class2 from "../../Images/Classes/class2.jpg";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import AlertDialog from "./AlertDialog";
import { Link, useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, setShowclasses, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    // user,
    hostedClasses,
    joinedClasses,
    hcl,
    jcl,
    // deleteCourse,
    // showclasses,
    setShowclasses,
    scollToRef,
    // callJoinMeeting,
    infoToast,
    // enterR,
    // setEnterR,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    hostedClasses();
    joinedClasses();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="boxshadow bgw p-4 rounded-3">
      <Box sx={{ width: "100%" }}>
        {/* <h4 className="gl textgrey">My classes</h4> */}
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="d-flex justify-content-between"
        >
          <div className="d-flex" ref={scollToRef}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tab label="Students" {...a11yProps(0)} />
              <Tab label="Teacher" {...a11yProps(1)} />
              <Tab
                label="X"
                onClick={() => setShowclasses(false)}
                className="d-flex justify-content-start"
              />
            </Tabs>
            {/* <button>X</button> */}
          </div>
        </Box>
        <TabPanel value={value} index={1}>
          <Row className="loginpage">
            {hcl ? (
              hcl.length > 0 ? (
                hcl.map((item, index) => {
                  const a = JSON.parse(item.images);

                  return (
                    <Col md={4} key={index}>
                      <Row className="my-3 w-100 bs">
                        <Col xs={9}>
                          <Row>
                            <Col xs={4}>
                              <Link to={`/classes/join/${item.id}`}>
                                <img
                                  src={a[0]}
                                  alt="classes"
                                  className="w-100"
                                />
                              </Link>
                            </Col>
                            {/* <Col xs={8}>
                        <h5>Instructor : You</h5>
                        <h5>Class : {item.title}</h5>
                        <h5>Number of classes : {item.Classes.length} </h5>
                        <h5>Participants : {item.Participants.length}</h5>
                      </Col> */}
                            <Col xs={8} className=" align-content-center">
                              <h6>
                                Instructor :<b> You</b>
                              </h6>
                              <h6>
                                Title :{" "}
                                <b>
                                  {item.title.length > 20
                                    ? item.title.slice(0, 40) + "..."
                                    : item.title}
                                </b>
                              </h6>
                              <h6>
                                Classes : <b>{item.Classes.length}</b>
                              </h6>
                              <h6>
                                Participants : <b>{item.Participants.length}</b>
                              </h6>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={3}>
                          <Row
                            className="mt-2 m-0 "
                            style={{
                              margin: "auto",
                            }}
                          >
                            <div className=" h-75 my-1 ">
                              <AlertDialog title={item.title} id={item.id} />

                              {/* <a
                                href={item.link}
                                target="_blank"
                                className="w-100"
                              >
                                <Button
                                  variant="contained"
                                  className="bgy text-dark w-100 my-2 px-2"
                                >
                                  Join
                                </Button>
                              </a> */}
                              {item.link && item.link.length > 0 ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-100"
                                >
                                  <Button
                                    variant="contained"
                                    className="bgy text-dark w-100 my-2 px-2"
                                  >
                                    Join
                                  </Button>
                                </a>
                              ) : (
                                item.dolphin && (
                                  <Link
                                    to={`/joinmeeting/cls/${item.id}/${item.dolphin.meeting_id}`}
                                  >
                                    <Button
                                      variant="contained"
                                      className="bgy text-dark w-100 my-2 px-2"
                                    >
                                      Join
                                    </Button>
                                  </Link>
                                )
                              )}
                              <Link to={`/edit/course/${item.id}`}>
                                <Button
                                  variant="contained"
                                  className="bg-dark text-white w-100 my-1 px-2"
                                >
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  );
                })
              ) : (
                <h1 className="text-center">No classes hosted</h1>
              )
            ) : (
              ""
            )}
          </Row>
        </TabPanel>
        <TabPanel value={value} index={0}>
          <div className="loginpage">
            {jcl ? (
              jcl.length > 0 ? (
                jcl.map((item, index) => {
                  const a = JSON.parse(item.course.images);

                  return (
                    <Row className="my-3 w-100 bs" key={index}>
                      <Col md={6}>
                        <Row className="my-3">
                          <Col xs={3}>
                            <img src={a[0]} alt="classes" className="w-100" />
                          </Col>
                          <Col xs={6} className=" align-content-center">
                            <h6>
                              Instructor :
                              <b> {item.course.host_details.first_name}</b>
                            </h6>
                            <h6>
                              Title : <b>{item.course.title}</b>
                            </h6>
                            <h6>
                              Classes : <b>{item.course.Classes.length}</b>
                            </h6>
                            <h6>
                              Fee : <b>Rs.{item.course.price}</b>
                            </h6>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={6}>
                        <Row className=" m-0 ">
                          <h6 className="p-0">Join the class</h6>
                          {
                            item.course.link && item.course.link.length > 0 ? (
                              <>
                                <a
                                  href={item.course.link}
                                  target="_blank"
                                  className="w-50 p-0"
                                  rel="noreferrer"
                                >
                                  <Button
                                    variant="primary"
                                    className="mt-2  w-100 bgy border-0 text-dark"
                                    style={{
                                      height: "40px",
                                      width: "180px",
                                    }}
                                    onClick={() => {
                                      // callJoinMeeting(item.course.dolphin.meeting_id);
                                    }}
                                  >
                                    Enter room
                                  </Button>
                                </a>
                              </>
                            ) : (
                              //  enterR ?
                              <>
                                <Button
                                  variant="primary"
                                  className="mt-2  w-75 bgy border-0 text-dark"
                                  style={{
                                    height: "40px",
                                    width: "120px",
                                  }}
                                  onClick={() => {
                                    // callJoinMeeting(item.course.dolphin.meeting_id);
                                    if (
                                      item.course.dolphin &&
                                      item.course.dolphin.hasOwnProperty(
                                        "meeting_id",
                                      )
                                    )
                                      navigate(
                                        `/joinmeeting/cls/${item.course.id}/${item.course.dolphin.meeting_id}`,
                                      );
                                    else {
                                      infoToast(
                                        "Please edit the course to be updated.",
                                      );
                                    }
                                  }}
                                >
                                  Enter room
                                </Button>
                              </>
                            )
                            // : (
                            //   <>
                            //     <Button
                            //       variant="primary"
                            //       className="mt-2  w-75 bgy border-0 text-dark"
                            //       style={{
                            //         height: "40px",
                            //         width: "120px",
                            //       }}
                            //       onClick={() => {
                            //         // callJoinMeeting(item.course.dolphin.meeting_id);
                            //         navigate(`/classes/join/${item.course.id}`);
                            //       }}
                            //     >
                            //       Details
                            //     </Button>
                            //   </>
                            // )
                          }
                          {/* <a
                            href={item.course.link}
                            target="_blank"
                            className="w-50 p-0"
                          >
                            <Button
                              variant="primary"
                              className="mt-2  w-100 bgy border-0 text-dark"
                              style={{
                                height: "40px",
                                width: "180px",
                              }}
                              onClick={() => {
                                // callJoinMeeting(item.course.dolphin.meeting_id);
                              }}
                            >
                              Enter room
                            </Button>
                          </a> */}
                        </Row>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <h1>No classes joined</h1>
              )
            ) : (
              ""
            )}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
