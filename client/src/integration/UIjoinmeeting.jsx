import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { Col, Container } from "react-bootstrap";
import { Button } from "@mui/material";

function UIjoinmeeting() {
  const { startMeeting, setStartMeeting, callJoinMeeting, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const { meeting_id } = useParams();
  const [loading, setLoading] = useState(true);
  let co = 0;

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
    const startVideoV = async () => {
      try {
        console.log(meeting_id);
        const data = await callJoinMeeting(meeting_id);
        setLoading(false);
        setStartMeeting(data);
        if (data) {
          const videoView = new window.DvcExternalAPI(
            `${data.web_client_uri}`,
            {
              parentNode: document.querySelector("#join-234-dad2342-23"), // container id to mount UI
              lang: "enGB", // language ( enGB represent UK English )
            },
          );
          console.log(videoView, "the ans");
          videoView.addListener(
            "ready-to-close",
            () => console.log("Ready to close"),
            // prompt('Ready to close')
          );
          videoView.addListener(
            "video-conference-joined",
            () => console.log("People are in the conference."),
            // prompt('People are in the conference.')
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (co === 0) startVideoV();
    co++;
    console.log(startMeeting, "the useState");
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <Container
          fluid
          className="profilediv d-flex flex-column justify-content-center align-items-center bgw pb-5"
        >
          <Col md={7} className="d-flex justify-content-center pb-5 mb-5">
            <h3 className="text-dark">
              Please wait for the meeting to beggin...
            </h3>

            {/* <Button
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
            </Button> */}
          </Col>
        </Container>
      ) : (
        <div
          id="join-234-dad2342-23"
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ></div>
      )}
    </>
  );
}

export default UIjoinmeeting;
