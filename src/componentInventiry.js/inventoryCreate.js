import React, { useEffect, useState } from "react";
import { Button, Form,  Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./inventory.css"
import Sidebar from "../componentBilling.js/sideBar";
import jwt_decode from 'jwt-decode';
function Inventory(){
    const [brandName,setBrandName]=useState("")
    const [itemName,setItemName]=useState("")
    const [itemQuantity,setItemQuantity]=useState("")
    const [numberError,setNumberError]=useState("")
    const [id,setId]=useState("")
    let navigate=useNavigate()
    let token=localStorage.getItem("token")
    // const navigate = useNavigate();
    useEffect(()=>{

      if(!token){
        navigate('/login')
        window.location.reload()
      }else{
        const decodedToken = jwt_decode(token);
        setId(decodedToken.id)
      }
      return () => {};
    },[])

    // useEffect(()=>{
    //   let token=localStorage.getItem("token")
    //   const decodedToken = jwt_decode(token);
    //   setId(decodedToken.id)

    // },[])

    const validate=(e)=>{
      let error=""
      const regex = /^\d+$/;
      if(!regex.test(itemQuantity)){
       error="please enter valid  number "
      }
      setNumberError(error)
      return !error
    }
    const HandleSubmit=(e)=>{
        e.preventDefault()
        let token=localStorage.getItem("token")
        const isValid = validate();
        if (isValid) {
        let data={
            brandName:brandName,
            itemName:itemName,
            itemQuantity:itemQuantity,
            organisationId:id
        }
        axios.post("https://thunder-chill-wound.glitch.me/createInventory",data,{ headers: { "token": token } }).then((e)=>navigate("/inventoryhome"))
    }}

    return(

      <div>    <div className='sidebar'>
      <Sidebar/>
    </div>
        <div  className="main-content">


        <Card className="inventory"  >
            <h1 className="header">Manage Inventory </h1>
            <Form onSubmit={HandleSubmit}>
            <Form.Group controlId="customerName"  className="mb-3">
            <Form.Label style={{color:"black"}}>Brand Name</Form.Label>
            <Form.Control

              type="text"
              style={{ width: "50%" }}
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required={true}
            />
            </Form.Group>


            
            <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Item Name</Form.Label>
            <Form.Control
              className="input"
              type="text"
              style={{ width: "50%" }}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required={true}
            />
          </Form.Group>


          <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Item Quantity</Form.Label>
            <Form.Control
              className="input"
              type="text"
              style={{ width: "50%" }}
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              required={true}
            />
          </Form.Group>
          <div style={{ color: 'red'}} className="error">{numberError}</div>

          <Button type="submit" className="classbutton" >
              Submit
            </Button>

            </Form>
        </Card>
        </div>
        </div>
    )
}
export default Inventory