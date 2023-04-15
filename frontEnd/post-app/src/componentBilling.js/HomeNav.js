import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Button, Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap';
import { FaSignOutAlt,FaUser,FaCog,FaBeer    } from 'react-icons/fa';
import "./sidebar.css"
// import About from "../faviconIcon.json/icon";

function Logout() {
    // Clear session data, e.g. by calling an API endpoint or removing cookies
    // ...
    localStorage.removeItem('token');
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
        <div>


        <Navbar className="Nav ">
            {/* <NavbarBrand href="/">
              <FaBeer /> Profile
            </NavbarBrand> */}


            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse  id="basic-navbar-nav">
                <Nav className="mr-auto ">

                    <NavDropdown  id="basic-nav-dropdown"  title={<><img src="https://www.seekpng.com/png/detail/202-2024774_my-profile-comments-my-profile-icon-png.png"alt="image"  height="20"/> </>}>
                             <NavDropdown.Item href="/organisationprofile">
                             <FaUser /> Profile
                             </NavDropdown.Item>

                             {/* <NavDropdown.Item href="#action/3.2">
                             <FaCog /> Setting
                                </NavDropdown.Item> */}
                                <NavDropdown.Divider/>

                                <NavDropdown.Item onClick={Logout}> <FaSignOutAlt />Logout </NavDropdown.Item>


                    </NavDropdown>

                </Nav>

            </Navbar.Collapse>


      {/* <Button className="btn" onClick={Mode}>Enable dark mode</Button> */}
        </Navbar>


        </div>
    )

    // function Mode(){
    //     document.body.style.backgroundColor = 'black'
    // }
}

export default MyNavbar