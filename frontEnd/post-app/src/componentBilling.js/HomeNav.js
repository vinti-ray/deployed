import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap';
import { FaSignOutAlt,FaUser,FaCog,FaBeer    } from 'react-icons/fa';
import "./sidebar.css"

function Logout() {
    // Clear session data, e.g. by calling an API endpoint or removing cookies
    // ...
    localStorage.clear();
    // Redirect to the login page
    window.location.href = '/login';
  }
function MyNavbar(){
    // const [isLoggedin, setIsLoggedin] = useState(true);
    // let token=localStorage.getItem("token")
    // useEffect(()=>{
    //     if(!token){
    //       navigate('/login')
    //     }
    //   },[])
    // const decodedToken = jwt_decode(token);
    // console.log(decodedToken);
    // let name=decodedToken.name
    // console.log(token)
    const navigate = useNavigate();
    // const Logout=()=>{
    //     localStorage.clear();
      

    // }
    // useEffect(()=>{
    //     if(!token){
    //       navigate('/login')
    //     }
    //   },token)
    // console.log(token);
    return(
        <Navbar className="Nav">
            {/* <NavbarBrand href="/">
              <FaBeer /> Profile
            </NavbarBrand> */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse  id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link> */}
                    <NavDropdown  title="Profile" id="basic-nav-dropdown">
                             <NavDropdown.Item href="#action/3.1">
                             <FaUser /> User
                             </NavDropdown.Item>

                             <NavDropdown.Item href="#action/3.2">
                             <FaCog /> Setting
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>

                                <NavDropdown.Item onClick={Logout}> <FaSignOutAlt />Logout </NavDropdown.Item>


                    </NavDropdown>

                </Nav>

            </Navbar.Collapse>


        </Navbar>
    )
}

export default MyNavbar