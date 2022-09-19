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
  const { children, value, index, ...other } = props;

  const { user, hostedClasses, joinedClasses, hcl, jcl } =
    useContext(AuthContext);

  useEffect(() => {
    // console.log('TabPanel useEffect');
    hostedClasses();
    joinedClasses();
    
  }, []);

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

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="d-flex justify-content-between"
      >
        <h1 className="gl textgrey">My Classes</h1>

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
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
          </Tabs>
          {/* <button>X</button> */}
          <p>X</p>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <Row className="my-3 w-100 bs">
          <Col md={6}>
            <Row>
              <Col md={4}>
                <img src={Class2} alt="classes" className="w-100" />
              </Col>
              <Col md={8}>
                <h5>Instructor : You</h5>
                <h5>Class : Class</h5>
                <h5>Time : #22 </h5>
                <h5>Duration : 45 mins</h5>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row className="mt-2 m-0 ">
              <div className="d-flex justify-content-center align-content-center h-100 mt-5">
                <Button variant="contained" className="bgy">
                  Edit
                </Button>
                <Button variant="contained" color="error" className="mx-2">
                  Delete
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Row className="my-3 w-100 bs">
          <Col md={6}>
            <Row>
              <Col md={4}>
                <img src={Class2} alt="classes" className="w-100" />
              </Col>
              <Col md={8}>
                <h5>Instructor : Name</h5>
                <h5>Class : Class</h5>
                <h5>Time : #22 </h5>
                <h5>Duration : 45 mins</h5>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row className="mt-2 m-0 ">
              <h2 className="p-0">Hurraay!</h2>
              <h4 className="p-0">The wait is over. Join the class!</h4>
              <a
                href="http://localhost:3000/hosting"
                target="_blank"
                className="w-50 p-0"
              >
                <Button variant="primary" className="mt-2  w-100 bgy border-0">
                  Enter room
                </Button>
              </a>
            </Row>
          </Col>
        </Row>
      </TabPanel>
    </Box>
  );
}
