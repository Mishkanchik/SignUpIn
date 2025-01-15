import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router"; 
import "./headersColor.css";

function HeaderComponent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const handleAdminClick = () => {
    navigate("/adminPanel"); 
  };

  const handleLogout = () => {
    
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("currentUser");
    setIsAdmin(false); 
    navigate("/signIn"); 
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink
          to="/"
          end
          style={{ margin: "0 10px", textDecoration: "none" }}
        >
          <Navbar.Brand>Navbar</Navbar.Brand>
        </NavLink>
        <Nav className="me-auto">
          <NavLink
            to="/signUp"
            className={({ isActive }) =>
              isActive ? "colorActive" : "colorDefault"
            }
            style={{ margin: "0 10px", textDecoration: "none" }}
          >
            SignUp
          </NavLink>

          <NavLink
            to="/signIn"
            className={({ isActive }) =>
              isActive ? "colorActive" : "colorDefault"
            }
            style={{ margin: "0 10px", textDecoration: "none" }}
          >
            SignIn
          </NavLink>
        </Nav>
        {isAdmin && (
          <Button
            variant="secondary"
            onClick={handleAdminClick}
            style={{ marginLeft: "10px" }}
          >
            Admin Panel
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={handleLogout}
          style={{ marginLeft: "10px" }}
        >
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
