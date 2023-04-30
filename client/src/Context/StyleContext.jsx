import React from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const StyleContext = createContext();
export default StyleContext;

export const StyleProvider = ({ children }) => {
  // eslint-disable-next-line
  const [active, setActive] = useState("Home");
  const [darkmode, setDarkmode] = useState(false);

  const activeNav = (e) => {
    setActive(e);
  };

  const successToast = (msg) => {
    // console.log(msg);
    if (darkmode) {
      toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const infoToast = (msg) => {
    // console.log(msg);
    if (darkmode) {
      toast.info(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.info(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const errorToast = (msg) => {
    // console.log(msg);
    if (darkmode) {
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const warningToast = (msg) => {
    // console.log(msg);
    if (darkmode) {
      toast.warning(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.warning(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };


  const contextData = {
    activeNav,
    darkmode,
    setDarkmode,
    successToast,
    infoToast,
    errorToast,
    warningToast,
  };

  return (
    <StyleContext.Provider value={contextData}>
      {children}
    </StyleContext.Provider>
  );
};
