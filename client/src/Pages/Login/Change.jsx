import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext from "../../Context/AuthContext";

const Change = () => {
  const { changePass, setValues, values } = useContext(AuthContext);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container fluid className="d-flex justify-content-center  page p-0 m-0">
        <div className=" logindiv text-start  ">
          <h4 className=" gl ps-3">Change Password</h4>
          {/* <p className="desc">
            We've sent an OTP to <br/> +91 9207404868.
          </p> */}

          <form className="d-flex flex-column m-2 mt-5  " onSubmit={changePass}>
            <TextField
              label="Password"
              placeholder=" Enter your password"
              variant="outlined"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  changePass();
                }
              }}
              className=" mb-3"
              name="password"
              type="password"
              onChange={changeHandler}
            />
            <TextField
              label="Confirm password"
              placeholder="Confirm your password"
              variant="outlined"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  changePass();
                }
              }}
              className=" mb-3"
              name="cpassword"
              type="password"
              onChange={changeHandler}
            />

            <div className=" d-flex flex-column">
              <div className=" pt-2 w-100">
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
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default Change;
