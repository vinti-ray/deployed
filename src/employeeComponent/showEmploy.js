import React, { useEffect } from 'react';
import DataEmployee from './dataTable';
import { Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../componentBilling.js/sideBar';
import MyNavbar from '../componentBilling.js/HomeNav';
function EmployeeHome(){
    let token=localStorage.getItem("token")
    const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/login')
        window.location.reload()
      }
      return () => {};
    },[])
    return (
        <div>
            <div className='sidebar'>
      <Sidebar/>
    </div>

        <div className="main-content">
      <Card  style={{ height: "800px" }}>
      <MyNavbar/>
        <DataEmployee/>
      </Card>
      </div>
      </div>
    )
}
export default EmployeeHome;