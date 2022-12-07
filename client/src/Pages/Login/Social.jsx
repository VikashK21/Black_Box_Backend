import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";

function Social() {
  let url = "/signup/";
  let { subUrl } = useParams();
  url = url + subUrl;

  const windowsProp = useRef();
  const { loginProcess } = useContext(AuthContext);

  const profileNavigtr = (e) => {
    e.preventDefault();
    windowsProp.current.close();
    axios
      .get(BaseUrl + "/socialuser")
      .then((res) => {
        console.log(res, "the social res");
        loginProcess(res);
      })
      .catch((err) => {
        console.log(err, "the error of social msg");
      });
  };

  useEffect(() => {
    windowsProp.current = window.open(
      BaseUrl + url,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=0,right=100,width=1000,height=1000",
    );
  }, [url]);
  return (
    <div className="container-fluid">
      <div className="container d-flex justify-content-end py-5">
        <Button variant="contained" onClick={profileNavigtr}>
          {" "}
          Go to Profile
        </Button>
      </div>
    </div>
  );
}

export default Social;
