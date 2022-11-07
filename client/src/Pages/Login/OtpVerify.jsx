import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";

const OtpVerify = () => {

    const {
        OtpVerify,
        setValues,
        values,
      } = useContext(AuthContext);
    
      const changeHandler = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
      }

  return (
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container fluid className="d-flex justify-content-center  page p-0 m-0">
        <div className=" logindiv ">
          <h1 className=" gl title">Enter your OTP</h1>
          <p className="desc">
            We've sent an OTP to <br/> {values.email}
          </p>

          <form className="d-flex flex-column m-2 mt-5  " 
          onSubmit={OtpVerify}>
            <TextField
              label="OTP"
              placeholder="Enter your OTP"
              variant="outlined"
              onKeyDown={
                (e) => {
                  if (e.key === "Enter") {
                    OtpVerify();
                  }
                }
              }
              className=" mb-3"
              name='otp'
              onChange={changeHandler}
            />
        
            <div className=" d-flex flex-column">
              
              <div className=" pt-2 w-100">
                <Button variant="contained" type="submit" className="bgdark w-100 ">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Container>
      <Footer />
    </Container>
  )
}

export default OtpVerify
