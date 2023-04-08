import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Table, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./employee.css"
import Sidebar from "../componentBilling.js/sideBar";
import jwt_decode from 'jwt-decode';
function Employee(){
    const [staffName,setStaffName]=useState("")
    const [number,setNumber]=useState("")
    const [email,setEmail]=useState("")
    const [dateOfJoining,setDateOfJoining]=useState("")
    const [salary,setSalary]=useState("")
    const image = useRef(null);
//To set the value of a file input element in React, you need to  use the ref attribute to get a reference to the input element, and then set its value using the current property of the ref object.

    const [department,setDepartment]=useState("")
    const [id,setId]=useState("")
    let navigate=useNavigate()
    useEffect(()=>{
      let token=localStorage.getItem("token")
      const decodedToken = jwt_decode(token);
      setId(decodedToken.id)

    },[])
    

    const HandleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData();
        // FormData is a built-in JavaScript object that provides a simple way to construct and send an HTTP request that includes form data, such as text inputs, file uploads, and other types of data.
        formData.append('image', image.current.files[0]);
        formData.append('staffName', staffName);
        formData.append('email', email);
        formData.append('dateOfJoining', dateOfJoining);
        formData.append('salary', salary);
        formData.append('department', department);
        formData.append('number', number);
        formData.append('organisationId', id);
  
        
        console.log(formData);
           let token=localStorage.getItem("token")

        axios.post("http://localhost:3001/createemplyee",formData,{ headers: { "token": token } }).then((e)=>navigate("/employeeHome"))
    }



    return(
      <div>
        <div className='sidebar'>
      <Sidebar/>
    </div>

        <div  className="main-content">


        <Card className="employee"  >
            <h1 className="header">Create Employee Data</h1>
            <Form enctype="multipart/form-data" onSubmit={HandleSubmit}>
            <Form.Group controlId="customerName"  className="mb-3">
            <Form.Label style={{color:"black"}}>Staff Name</Form.Label>
            <Form.Control

              type="text"
              style={{ width: "50%" }}
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              required={true}
            />
            </Form.Group>


            
            <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Number</Form.Label>
            <Form.Control
              className="input"
              type="text"
              style={{ width: "50%" }}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required={true}
            />
          </Form.Group>


          <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Email</Form.Label>
            <Form.Control
              className="input"
              type="text"
              style={{ width: "50%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </Form.Group>


          <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Date of Joining </Form.Label>
            <Form.Control
              className="input"
              type="date"
              style={{ width: "50%" }}
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              required={true}
            />
          </Form.Group>

          <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Salary</Form.Label>
            <Form.Control
              className="input"
              type="text"
              style={{ width: "50%" }}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required={true}
            />
          </Form.Group>

          <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Image</Form.Label>
            <Form.Control
              className="input"
              id="file-upload"
              accept=".jpg,.png,.pdf"
              type="file"
              style={{ width: "50%" }}
              ref={image}
              // value={image}
              // onChange={image}
              required={true}
            />
          </Form.Group>

          <Form.Group controlId="customerName" className="mb-3">
            <Form.Label style={{color:"black"}}>Department</Form.Label>
            <Form.Control
              className="input"
              type="text"
              style={{ width: "50%" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required={true}
            />
          </Form.Group>



          <Button type="submit" className="classbutton" >
              Submit
            </Button>

            </Form>
        </Card>
        </div>
        </div>
    )
}
export default Employee