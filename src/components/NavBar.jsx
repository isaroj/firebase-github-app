import { useState, useContext, useEffect} from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

import { Link, useLocation } from "react-router-dom";
import { FaFire, FaHandSpock } from "react-icons/fa";
import fireUserContext from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import isEmpty from "lodash/isEmpty";


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation()

  const toggle = () => setIsOpen(!isOpen);

  const userContext = useContext(fireUserContext);

   useEffect(() => {
     if (sessionStorage.getItem("userData") && !isEmpty(sessionStorage.getItem("userData"))) {
       userContext.setUser(JSON.parse(sessionStorage.getItem("userData")));
     }
   }, []);

  return (
    <div style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 2
    }}>
      <ToastContainer position="top-right" />

      <Navbar expand="md" className="bg-dark">
        <NavbarBrand className="text-white" href="/">
          GitHub Fire <FaFire className="text-warning" />
        </NavbarBrand>
        <NavbarText className="text-white">
          {!isEmpty(userContext.user) ? (
            <>
              <span>Hi, </span>
              <FaHandSpock
                className="text-info"
                style={{ fontSize: "1.2rem", marginRight: "4px" }}
              />
              <span>
                {userContext.user?.email ? userContext.user.email : ""}
              </span>
            </>
          ) : (
            ""
          )}
        </NavbarText>
        <div className="bg-white">
          <NavbarToggler onClick={toggle} />
        </div>
        <Collapse isOpen={isOpen} navbar>
          <Nav style={{ marginLeft: "auto" }} navbar>
            {!isEmpty(userContext.user) ? (
              <NavItem
                onClick={() => {
                  toast.success("user has been logged out");
                  sessionStorage.removeItem("userData");
                  userContext.setUser(null);
                }}
              >
                <NavLink tag={Link} to="/signin" className="text-white">
                  Logout
                </NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  {location.pathname === "/signin" ? (
                    <NavLink tag={Link} to="/signup" className="text-white">
                      SignUp
                    </NavLink>
                  ) : (
                    ""
                  )}
                </NavItem>
                <NavItem>
                  {location.pathname === "/signup" ? (
                    <NavLink tag={Link} to="/signin" className="text-white">
                      SignIn
                    </NavLink>
                  ) : (
                    ""
                  )}
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
