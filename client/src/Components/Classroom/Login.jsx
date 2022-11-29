import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../Components/Common/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../../Components/Common/Footer";
import AuthContext, { BaseUrl } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useEffect } from "react";

const Login = () => {
  const { loginUser, setValues, values, loading, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const google = () => {
    // window.open(
    //   BaseUrl + "/signup/google",
    //   "_blank",
    //   "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400",
    // );
    navigate("/social/google");
  };

  const facebook = () => {
    navigate("/social/facebook");
  };

  useEffect(() => {
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container fluid className="loginpage p-0 m-0 ">
      <Header />
      <Container fluid className="white m-0 p-0"></Container>

      <Container fluid className="d-flex justify-content-center  page p-0 m-0">
        <div className=" logindiv ">
          <h1 className=" gl title">Classroom </h1>
          <p className="desc">
            Not yet joined?
            <Link to="/classroom/register">
              <span className="underline cp"> Register</span>
            </Link>
          </p>
          <form className="d-flex flex-column m-2 mt-5  " onSubmit={loginUser}>
            <TextField
              label="Email"
              variant="outlined"
              className=" mb-3"
              name="email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  loginUser();
                }
              }}
              onChange={changeHandler}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  loginUser();
                }
              }}
              onChange={changeHandler}
            />
            <div className="mt-3 d-flex flex-column">
              {/* <p className="moto opacity-75">
                Use your email or mobile to signin
              </p> */}
              <center>
                <Link
                  to="/otplogin"
                  className="underline"
                  style={{
                    width: "fit-content",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  Forgot your password
                </Link>
              </center>
              <div className="mt-4 pt-2 w-100">
                <Button
                  variant="contained"
                  type="submit"
                  className="bgdark w-100 "
                >
                  {loading ? (
                    <>
                      <div className="loadingio-spinner-rolling-jm01qv7mmak mx-2">
                        <div className="ldio-cqj9sf9mcdj">
                          <div> </div>
                        </div>
                      </div>
                      Logging in
                    </>
                  ) : (
                    "  Join here"
                  )}
                </Button>
              </div>
            </div>
          </form>
          <div className="my-4">
            <hr />
          </div>

         
          {/* <GoogleLoginButton onClick={google} />

         
          <FacebookLoginButton onClick={facebook} /> */}
        </div>
      </Container>

      <Footer />
    </Container>
  );
};

export default Login;
