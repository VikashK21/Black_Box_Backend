import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../blackbox-logo-01.png";
import { BsSearch } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatarr from "./Avatarr";

const Header = () => {
  const [navb, setNavb] = useState(false);

  const handleNavbar = () => {
    window.scrollY >= 20 ? setNavb(true) : setNavb(false);
  };

  window.addEventListener("scroll", handleNavbar);

  return (
    <>
      <nav className={navb ? "active w-100" : "w-100"}>
        <Container
          fluid
          className="d-flex justify-content-between w-100 p-3 navbar"
        >
          <div>
            <Link to="/main">
              <img src={Logo} width={200} className="p-0 m-0 cp" />
            </Link>
          </div>
          <div className="">
            <div className="navs align-items-center">
              <b>
                <ul className="navul">
                  {/* <li>
                    <Link to="/" className="link px-3 ">
                      STREAM
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/classes" className="link px-3 ">
                      JOIN
                    </Link>
                  </li>
                  <li>
                    <Link to="/host" className="link px-3 ">
                      HOST
                    </Link>
                  </li>
                  {/* <li>
                    <Link to='/enter' className='link px-2 '>
                    <BsSearch className="" size={25} />
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to="/login" className="link px-2 ">
                      <BsGlobe className="" size={25} />
                    </Link>
                  </li> */}
                  <li>
                    {/* <Link to="/profile" className="link px-2 ">
                      <FaRegUser className="" size={25} />
                    </Link> */}
                    
                      <Avatarr />
                      

                  </li>
                  {/* <li>
                    <Link to="/nav" className="link px-3 pt-1 ">
                      <GiHamburgerMenu className="" size={30} />
                    </Link>
                  </li> */}
                </ul>
              </b>
            </div>
          </div>
        </Container>
      </nav>
      <nav className={navb ? "active w-100 navs2" : "w-100 navs2"}>
        <Container fluid className="d-flex justify-content-between w-100 p-3 ">
            <div>
              <Link to="/main">
                <img src={Logo} width={150} className="p-0 m-0 cp" />
              </Link>
            </div>
            <div className="">
              <div className="navs align-items-center">
                <b>
                  <ul className="navul">
                  <li>
                    {/* <Link to='/enter' className='link px-2 '> */}
                    <BsSearch className="" size={25} />
                    {/* </Link> */}
                  </li>
                  <li>
                    <Link to="/login" className="link px-2 ">
                      <BsGlobe className="" size={25} />
                    </Link>
                  </li>
                  <li>
                    {/* <Link to="/profile" className="link px-2 "> */}
                      {/* <FaRegUser className="" size={25} /> */}
                      
                      <Avatarr />
                    {/* </Link> */}
                  </li>
                    <li>
                      <Link to="/nav" className="link px-3 pt-1 ">
                        <GiHamburgerMenu className="" size={30} />
                      </Link>
                    </li>
                  </ul>
                </b>
              </div>
            </div>
          
        </Container>
      </nav>
    </>
  );
};

export default Header;
