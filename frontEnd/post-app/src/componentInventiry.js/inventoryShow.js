import React, { useEffect } from 'react';
import DataInventory from "./DataTable";
import { Button, Form, Table,Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function InventoryHome(){
    let token=localStorage.getItem("token")
    const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
    },[])
    return (
        <div className="main-content">
      <Card  style={{ height: "800px" }}>
        <DataInventory/>
      </Card>
      </div>
    )
}
export default InventoryHome;