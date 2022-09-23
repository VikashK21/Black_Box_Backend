import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Class2 from "../../Images/Classes/class2.jpg";
import { Col, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

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
    user,
    hostedClasses,
    joinedClasses,
    hcl,
    jcl,
    deleteCourse,
    showclasses,
    setShowclasses,
  } = useContext(AuthContext);

  useEffect(() => {
    hostedClasses();
    joinedClasses();
  }, []);

  return (
    <div className="boxshadow bgw p-4 rounded-3">
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="d-flex justify-content-between"
      >
        <h4 className="gl textgrey">View my classes</h4>

        <div className="d-flex">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Tab label="Hosted classes" {...a11yProps(0)} />
            <Tab label="Joined classes" {...a11yProps(1)} />
            <Tab label="X" onClick={() => setShowclasses(false)} />
          </Tabs>
          {/* <button>X</button> */}
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <Row>
          {hcl ? (
            hcl.length > 0 ? (
              hcl.map((item, index) => {
                // console.log(item);
                // const a = JSON.parse(item.img_thumbnail);
                // console.log(a);

                const a = JSON.parse(item.images);

                return (
                  <Col md={6} key={index}>
                    <Row className="my-3 w-100 bs">
                      <Col md={9}>
                        <Row>
                          <Col md={4}>
                            <img src={a[0]} alt="classes" className="w-100" />
                          </Col>
                          {/* <Col md={8}>
                        <h5>Instructor : You</h5>
                        <h5>Class : {item.title}</h5>
                        <h5>Number of classes : {item.Classes.length} </h5>
                        <h5>Participants : {item.Participants.length}</h5>
                      </Col> */}
                          <Col md={8} className=" align-content-center">
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
                      <Col md={3}>
                        <Row
                          className="mt-2 m-0 "
                          style={{
                            margin: "auto",
                          }}
                        >
                          <div className="d-flex justify-content-center align-content-center h-75 my-1 ">
                            {/* <Button variant="contained" className="bgy">
                          Edit
                        </Button> */}
                            {item.Participants.length === 0 && (
                              <Button
                                variant="contained"
                                color="error"
                                className="mx-2"
                                onClick={() => {
                                  // deleteClass(item._id);
                                  console.log(item.id);
                                  deleteCourse(item.id);
                                }}
                              >
                                Delete
                              </Button>
                            )}
                          </div>

                          <div className="d-flex justify-content-center align-content-center h-75 my-1 ">
                            {/* <Button variant="contained" className="bgy">
                          Edit
                        </Button> */}
                            {item.Participants.length === 0 && (
                              <Button
                                variant="contained"
                                color="error"
                                className="mx-2"
                                onClick={() => {
                                  // deleteClass(item._id);
                                  console.log(item.id);
                                  deleteCourse(item.id);
                                }}
                              >
                                Delete
                              </Button>
                            )}
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
      <TabPanel value={value} index={1}>
        {jcl ? (
          jcl.length > 0 ? (
            jcl.map((item, index) => {
              return (
                <Row className="my-3 w-100 bs" key={index}>
                  <Col md={6}>
                    <Row className="my-3">
                      <Col md={3}>
                        <img src={Class2} alt="classes" className="w-100" />
                      </Col>
                      <Col md={6} className=" align-content-center">
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
                  <Col md={6}>
                    <Row className=" m-0 ">
                      {/* <h2 className="p-0">Hurraay!</h2> */}
                      <h6 className="p-0">The wait is over. Join the class!</h6>
                      <a
                        href="http://localhost:3000/hosting"
                        target="_blank"
                        className="w-50 p-0"
                      >
                        <Button
                          variant="primary"
                          className="mt-2  w-100 bgy border-0"
                        >
                          Enter room
                        </Button>
                      </a>
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
      </TabPanel>
    </Box>
    </div>
  );
}
