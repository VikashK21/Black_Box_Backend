import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import { Button } from "@mui/material";
import Header from "../Components/Common/Header";

function UImeeting() {
  const {
    startMeeting,
    // setStartMeeting,
    callStartMeeting,
    callJoinMeeting,
    user,
    // callJoinMeetingApi,
    // callStartMeetingApi,
  } = useContext(AuthContext);
  const [enable, setEnable] = useState(false);
  const navigate = useNavigate();
  // let co = 0;
  const startVideoV = async () => {
    try {
      const data = await callStartMeeting("Black Box Meeting");
      // setStartMeeting(data);
      // const data = await callStartMeetingApi("Black Box Meeting");
      // console.log(data, "the res of StartMeeting...");
      if (data) {
        const videoView = new window.DvcExternalAPI(`${data.web_client_uri}`, {
          parentNode: document.querySelector("#meeting-234-dad2342-23"), // container id to mount UI
          lang: "enGB", // language ( enGB represent UK English )
        });
        console.log(videoView, "the ans");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinVideoV = async () => {
    try {
      const data = await callJoinMeeting("49732829129");
      // setStartMeeting(data);
      // const data = await callJoinMeetingApi("4369800980");
      console.log(data.web_client_uri, "the meeting link");
      if (data) {
        const videoView = new window.DvcExternalAPI(`${data.web_client_uri}`, {
          parentNode: document.querySelector("#meeting-234-dad2342-23"), // container id to mount UI
          lang: "enGB", // language ( enGB represent UK English )
        });
        console.log(videoView, "the ans");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
    // if (co === 0) startVideoV();
    // co++;
    console.log(startMeeting, "the useState");
    // eslint-disable-next-line
  }, []);

  // the variable videoView can be used to listen to events emitted from Video View UI.
  return (
    <>
      {enable ? (
        <div
          id="meeting-234-dad2342-23"
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ></div>
      ) : (
        <>
          <Header />
          <Container fluid className="white bggrey"></Container>
          <Container
            fluid
            className="profilediv d-flex flex-column justify-content-center align-items-center bgw pb-5"
          >
            <Col
              md={7}
              className="d-flex justify-content-center pb-5 mb-5 gap-3"
            >
              <Button
                variant="contained"
                type="submit"
                className="bgdark"
                onClick={() => {
                  setEnable((pre) => true);
                  joinVideoV();
                }}
              >
                {" "}
                Join
              </Button>
              <Button
                variant="contained"
                type="submit"
                className="bgdark"
                onClick={() => {
                  setEnable((pre) => true);
                  startVideoV();
                }}
              >
                {" "}
                Start
              </Button>
            </Col>
          </Container>
        </>
      )}
    </>
  );
}

export default UImeeting;
