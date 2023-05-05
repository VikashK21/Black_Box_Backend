import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Utils/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Home from "./Pages/Home/Home";
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
import Host7 from "./Pages/Classes/Host7";
import Host8 from "./Pages/Classes/Host8";
import Host9 from "./Pages/Classes/Host9";
import LinearStepper2 from "./Pages/Classes/LinearStepper2";
import LinearStepper3 from "./Pages/Classes/LinearStepper3";
import Choose from "./Pages/Classes/Choose";
import Trainer from "./Pages/Classes/Trainer";
import Edit from "./Pages/Login/Edit";
import EditCourse from "./Pages/Classes/EditCourse";
import TabPanel2 from "./Pages/Profile/TabPanel";
import Change from "./Pages/Login/Change";
import Social from "./Pages/Login/Social";
// import ClassroomLogin from "./Components/Classroom/Login";
import ClassroomRegistration from "./Components/Classroom/Register";
import Classroom from "./Components/Classroom/Classroom";
import Editclssroom from "./Components/Classroom/Editclssroom";
import Hostclassroom from "./Components/Classroom/Hostclassroom";
import UImeeting from "./integration/UImeeting";
import UIjoinmeeting from "./integration/UIjoinmeeting";
import AdminLogin from "./Pages/Admin/Login";

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
                <Route path="/hosting3" element={<LinearStepper3 />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/edit/profile" element={<Edit />} />
                <Route path="/edit/course/:id" element={<EditCourse />} />
                <Route path="/myclasses" element={<TabPanel2 />} />
              </Route>
              <Route path="/host" element={<Host />} />
              <Route path="/host/2" element={<Host2 />} />
              <Route path="/host/3" element={<Host3 />} />
              <Route path="/host/4" element={<Host4 />} />
              <Route path="/host/5" element={<Host5 />} />
              <Route path="/host/6" element={<Host6 />} />
              <Route path="/host/7" element={<Host7 />} />
              <Route path="/host/8" element={<Host8 />} />
              <Route path="/host/9" element={<Host9 />} />

              <Route path="/main" element={<Main />} />
              <Route path="/nav" element={<Burger />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/join/:id" element={<Join />} />
              <Route path="/trainer/:id" element={<Trainer />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* <Route path="/classroom/login" element={<ClassroomLogin />} /> */}
              <Route
                path="/classroom/register"
                element={<ClassroomRegistration />}
              />
              <Route path="/classroom/edit" element={<Editclssroom />} />
              <Route path="/classroom" element={<Classroom />} />
              <Route path="/classroom/host" element={<Hostclassroom />} />

              <Route path="/login" element={<Login />} />
              <Route path="/otplogin" element={<Otp />} />
              <Route path="/otpverify" element={<OtpVerify />} />
              <Route path="/change-password" element={<Change />} />

              <Route path="/signup" element={<Registration />} />
              <Route path="/social/:subUrl" element={<Social />} />
              <Route path="/meeting" element={<UImeeting />} />
              <Route
                path="/joinmeeting/:type/:course_id/:meeting_id/"
                element={<UIjoinmeeting />}
              />
              <Route path="/api" element={<AdminLogin />} />
            </Routes>
          </AuthProvider>
        </StyleProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
