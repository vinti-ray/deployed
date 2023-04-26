import React from "react";


import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import "./sidebar.css";

function Logout() {
  // Clear token in localstorage 
  localStorage.removeItem("token");
  // Redirect to the login page
  window.location.href = "/login";
}
function MyNavbar() {

  return (
    <div>
      <Navbar className="Nav ">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ">
            <NavDropdown
              id="basic-nav-dropdown"
              title={
                <>
                  <img
                    src="https://www.seekpng.com/png/detail/202-2024774_my-profile-comments-my-profile-icon-png.png"
                    alt="image"
                    height="20"
                  />{" "}
                </>
              }
            >
              <NavDropdown.Item href="/organisationprofile">
                <FaUser /> Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={Logout}>
                {" "}
                <FaSignOutAlt />
                Logout{" "}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
