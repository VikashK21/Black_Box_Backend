import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Utils/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Enter from "./Pages/Home/Enter";
import Main from "./Pages/Home/Main";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Login/Registration";

import { AuthProvider } from "./Context/AuthContext";
import Profile from "./Pages/Profile/Profile";
import Otp from "./Pages/Login/Otp";
import OtpVerify from "./Pages/Login/OtpVerify";
import Classes from "./Pages/Classes/Classes";
import Join from "./Pages/Classes/Join";
import Host from "./Pages/Classes/Host";
import Burger from "./Pages/Home/Burger";
import Host2 from "./Pages/Classes/Host2";
import Host3 from "./Pages/Classes/Host3";
import LinearStepper from "./Pages/Classes/LinearStepper";
import Privacy from "./Pages/Home/Privacy";
import Terms from "./Pages/Home/Terms";
import { StyleProvider } from "./Context/StyleContext";
import Host4 from "./Pages/Classes/Host4";
import Host5 from "./Pages/Classes/Host5";
import Host6 from "./Pages/Classes/Host6";
import LinearStepper2 from "./Pages/Classes/LinearStepper2";
import Choose from "./Pages/Classes/Choose";
import Trainer from "./Pages/Classes/Trainer";
import Edit from "./Pages/Login/Edit";
import EditCourse from "./Pages/Classes/EditCourse";

function App() {
  return (
    <>
      <BrowserRouter>
        <StyleProvider>
          <AuthProvider>
            <ToastContainer />
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Enter />} />
              <Route path="/main" element={<Main />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/host" element={<Choose />} />
                <Route path="/hosting" element={<LinearStepper />} />
                <Route path="/hosting2" element={<LinearStepper2 />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit/profile" element={<Edit />} />
                <Route path="/edit/course/:id" element={<EditCourse />} />
              </Route>
              <Route path="/host" element={<Host />} />
              <Route path="/host/2" element={<Host2 />} />
              <Route path="/host/3" element={<Host3 />} />
              <Route path="/host/4" element={<Host4 />} />
              <Route path="/host/5" element={<Host5 />} />
              <Route path="/host/6" element={<Host6 />} />
              <Route path="/main" element={<Main />} />
              <Route path="/nav" element={<Burger />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/join/:id" element={<Join />} />
              <Route path="/trainer/:id" element={<Trainer />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              <Route path="/login" element={<Login />} />
              <Route path="/otplogin" element={<Otp />} />
              <Route path="/otpverify" element={<OtpVerify />} />

              <Route path="/signup" element={<Registration />} />
            </Routes>
          </AuthProvider>
        </StyleProvider>
      </BrowserRouter>
    </>
  );
}

export default App;