import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    CDBSidebar,CDBSidebarContent,

    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';

function Sidebar() {
    const [name,setName]=useState("")
    // const token = localStorage.getItem("token");
    let token=localStorage.getItem("token")
    const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }else{
        axios.get("http://localhost:3001/getUser",{ headers: { "token": token } }).then((e)=>setName(e.data.message.name))
      }

      return () => {};
    },[])
    // const decodedToken = jwt_decode(token);


    // let name=decodedToken.name
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>


     <CDBSidebar textColor="black" backgroundColor="white">
        <CDBSidebarHeader >
        <a href="/" className="text-decoration-none" style={{ color: 'black' }}>
            {name}
            </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
            <CDBSidebarMenu>

                {/* <NavLink exact to="/" >
                    <CDBSidebarMenuItem >Billing</CDBSidebarMenuItem>
                </NavLink> */}
                
                <NavLink exact to="/" >
                    <CDBSidebarMenuItem icon='columns'>Billing</CDBSidebarMenuItem>
                </NavLink>


                <NavLink exact to="/inventoryhome" >
                    <CDBSidebarMenuItem icon='columns'>Inventory</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/employeeHome" >
                    <CDBSidebarMenuItem icon='columns'>Staff</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/salehome" >
                    <CDBSidebarMenuItem icon='columns'>Total Sale</CDBSidebarMenuItem>
                </NavLink>

            </CDBSidebarMenu>

        </CDBSidebarContent>
         


     </CDBSidebar>
    </div>
  );
}

export default Sidebar;
