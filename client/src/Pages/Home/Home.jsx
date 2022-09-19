import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Home = () => {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    } else {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);

      setTimeout(() => {
        navigate("/enter");
      }, 4000);
    }
  }, []);

  return (
    <>
      <Container
        className="page"
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            // alert('Enter');
            navigate("/enter");
          }
        }}
      >
        <AnimatePresence>
          {show && (
            <motion.div
              key="box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              transition={{ duration: 3 }}
            >
              <p className="first gl">
                Seekers of the world unite.
                <br />
                You have nothing to lose but <br />
                your ignorance.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default Home;
