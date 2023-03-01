import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../blackbox-logo-01.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Enter = () => {
  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // user ? navigate("/profile") : navigate("/");

    if (user) {
      navigate("/profile");
    }

    setShow(true);
    onkeyup = (e) => {
      if (e.keyCode === 13) {
        setShow(false);

        setTimeout(() => {
          navigate("/main");
        }, 3000);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="page">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 3 }}
          >
            <p className="gx enterpara">
              Teach what you love.
              <br />
              Learn what you seek.
            </p>
            <img src={Logo} alt="" width={180} className="img-fluid" />
            <br />
            <Link to="/main" className="link">
              <p className="mt-3 underline cp">Enter</p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Enter;
