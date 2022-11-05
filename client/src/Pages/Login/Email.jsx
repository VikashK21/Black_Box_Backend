// import React from 'react'
import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

const Email = () => {
    const { loginUser, setValues, values } = useContext(AuthContext);

    const changeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

  return (
    <Container fluid className="loginpage p-0 m-0 ">
    <Header />
    <Container fluid className="white m-0 p-0"></Container>

    <Container fluid className="d-flex justify-content-center  page p-0 m-0">
      <div className=" logindiv ">
        <h1 className=" gl title">Enter your email address </h1>
        

        <form className="d-flex flex-column m-2 mt-5  " onSubmit={loginUser}>
          <TextField
            label="Email"
            variant="outlined"
            className=" mb-3"
            name="email"
            onChange={changeHandler}
          />
                   
          <div className="mt-3 d-flex flex-column">
            
            <div className="mt-4 pt-2 w-100">
              <Button
                variant="contained"
                type="submit"
                className="bgdark w-100 "
              >
               Submit
              </Button>
            </div>
          </div>
        </form>
        <div className="my-4">
          <hr />
        </div>

       
        {/* <GoogleLoginButton onClick={google} /> */}
        <FacebookLoginButton />
      </div>
    </Container>

    <Footer />
  </Container>
  )
}

export default Email
