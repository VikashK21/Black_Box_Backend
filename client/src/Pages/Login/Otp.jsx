import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const Otp = () => {
  const { OtpLogin, setValues, values } = useContext(AuthContext);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values.otp);
  };

  return (
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container fluid className="d-flex justify-content-center  page p-0 m-0">
        <div className=" logindiv ">
          <h1 className=" gl title">OTP Login</h1>
          {/* <p className="desc">Not yet joined? <span className="underline cp">Register</span></p> */}

          <form className="d-flex flex-column m-2 mt-5  " onSubmit={OtpLogin}>
            <p className="text-start mb-0">Enter you email : </p>
            <TextField
              onChange={changeHandler}
              type="email"
              className="mb-1 w-100 mobile m-0 p-0"
              id="outlined-basic"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  OtpLogin();
                }
              }}
              label="Email"
              variant="outlined"
              name="email"
              required
            />
            <div className=" d-flex flex-column">
              <div className=" pt-2 w-100">
                <Button
                  variant="contained"
                  type="submit"
                  className="bgdark w-100 "
                >
                  Send OTP
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Otp;
