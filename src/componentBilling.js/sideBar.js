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
        axios.get("https://gaudy-impossible-pulsar.glitch.me/getUser",{ headers: { "token": token } }).then((e)=>{setName(e.data.message.name); document.getElementById("favicon").href=e.data.message.profileImage; document.getElementById("titleHtml").innerHTML=e.data.message.name})
        
      
      }

      return () => {};
    },[])

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
                
                <NavLink  to="/" >
                    <CDBSidebarMenuItem icon='columns'>Billing</CDBSidebarMenuItem>
                </NavLink>


                <NavLink  to="/inventoryhome" >
                    <CDBSidebarMenuItem icon='columns'>Inventory</CDBSidebarMenuItem>
                </NavLink>

                <NavLink  to="/employeeHome" >
                    <CDBSidebarMenuItem icon='columns'>Staff</CDBSidebarMenuItem>
                </NavLink>

                <NavLink  to="/salehome" >
                    <CDBSidebarMenuItem icon='columns'>Total Sale</CDBSidebarMenuItem>
                </NavLink>

            </CDBSidebarMenu>

        </CDBSidebarContent>
         


     </CDBSidebar>
    </div>
  );
}

export default Sidebar;
