import React from 'react';
import {
    CDBSidebar,CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import { NavLink } from 'react-router-dom';
function Sidebar() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>


     <CDBSidebar textColor="black" backgroundColor="white">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none" style={{ color: 'black' }}>
            Anonymous
            </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
            <CDBSidebarMenu>

                <NavLink exact to="/" >
                    <CDBSidebarMenuItem >Billing</CDBSidebarMenuItem>
                </NavLink>
                
                <NavLink exact to="/" >
                    <CDBSidebarMenuItem icon='columns'>Generate Invoice</CDBSidebarMenuItem>
                </NavLink>


                <NavLink exact to="/inventoryhome" >
                    <CDBSidebarMenuItem icon='columns'>Inventory</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/employee" >
                    <CDBSidebarMenuItem icon='columns'>Staff</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/" >
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
