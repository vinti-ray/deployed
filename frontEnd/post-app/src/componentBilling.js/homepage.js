import React, { useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sideBar';
import DataTable from './DataTable';
import "./sidebar.css"
import MyNavbar from './HomeNav';
import { Button, Form, Table,Card } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
function HomePage() {
  let token=localStorage.getItem("token")
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  console.log(token)
  return (
    <div className="main-content">
      <Card style={{ height: "800px" }}>
      <MyNavbar/>
      {/* <NavLink exact to="/abc" >
             <Button type="submit"  className="buttonOne" >Add Invoice</Button> 
             </NavLink> */}
      {/* <div className='sidebar'>
        <Sidebar/>
      </div> */}
            <div >
              <div className='datatable'>
              <DataTable/>
              </div>
        
          </div>
          </Card>
          </div>
  );
}

export default HomePage;
