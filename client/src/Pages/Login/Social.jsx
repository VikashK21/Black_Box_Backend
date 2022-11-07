import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
    console.log("closed and doing the next task");
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
      "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400",
    );
  }, [url]);
  return (
    <div>
      <button onClick={profileNavigtr}>Profile</button>
    </div>
  );
}

export default Social;
