import React from 'react';
import {
    CDBSidebar,CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';
  import jwt_decode from 'jwt-decode';
function Sidebar() {

    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);

    let name=decodedToken.name
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
                    <CDBSidebarMenuItem icon='columns'>Generate Invoice</CDBSidebarMenuItem>
                </NavLink>


                <NavLink exact to="/inventoryhome" >
                    <CDBSidebarMenuItem icon='columns'>Inventory</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/employeeHome" >
                    <CDBSidebarMenuItem icon='columns'>Staff</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/salehome" >
                    <CDBSidebarMenuItem icon='columns'>Total Data</CDBSidebarMenuItem>
                </NavLink>

            </CDBSidebarMenu>

        </CDBSidebarContent>
         
         {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div  style={{ padding: '20px 5px', }}>

            Sidebar footer
            </div>
         </CDBSidebarFooter> */}

     </CDBSidebar>
    </div>
  );
}

export default Sidebar;
