import React, { useEffect, useState } from "react";
import { Button, Form, Table, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Employee(){
    const [staffName,setStaffName]=useState("")
    const [number,setNumber]=useState("")
    const [email,setEmail]=useState("")
    const [dateOfJoining,setDateOfJoining]=useState("")
    const [salary,setSalary]=useState("")
    const [image,setImage]=useState("")
    const [department,setDepartment]=useState("")
    let navigate=useNavigate()

    const HandleSubmit=(e)=>{
        e.preventDefault()

        let data={
            staffName:staffName,
            number:number,
            email:email,
            dateOfJoining:dateOfJoining,
            salary:salary,
            image:image,
            department:department

        }
        axios.post("http://localhost:3001/createemplyee",data).then((e)=>navigate("/"))
    }

    return(
        <div  className="main-content">


        <Card className="employee"  >
            <h1 className="header">Create Employee Data</h1>
            <Form onSubmit={HandleSubmit}>
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
              type="file"
              style={{ width: "50%" }}
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
    )
}
export default Employee