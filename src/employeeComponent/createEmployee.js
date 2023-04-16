import React, { useEffect, useState, useRef } from "react";
import { Button, Form,  Card } from "react-bootstrap";
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
    const [numberError,setNumberError]=useState("")
    const [digitError,setDigitError]=useState("")
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

    useEffect(()=>{
      let token=localStorage.getItem("token")
      if(!token){
        navigate('/login')
        window.location.reload()
      }
      return () => {};
    },[])

    const validate=(e)=>{
      let error=""
      let digitErr=""
      const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
      const numberRegex = /^\d+$/;
      if(!regex.test(number)){
       error="please enter valid mobile number "
      }
      if(!numberRegex.test(salary)){
        digitErr="please enter valid  number "
       }
       setDigitError(digitErr)
      setNumberError(error)
      return !(error||digitErr)
    }

    const Department = [
      'General Office',
      'Purchase Department',
      'Sales Department',
      'Personnel Department',
      'Production Department',
      'Accounts Department',
      'Export Department'
    ];
    

    const HandleSubmit=(e)=>{
        e.preventDefault()
        const isValid = validate();
        if (isValid) {
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
  
        

           let token=localStorage.getItem("token")

        axios.post("http://localhost:3001/createemplyee",formData,{ headers: { "token": token } }).then((e)=>navigate("/employeeHome"))
    }}



    return(
      <div>
        <div className='sidebar'>
      <Sidebar/>
    </div>

        <div  className="main-content">


        <Card className="employee"  >
            <h1 className="header">Employee Details</h1>
            <Form encType="multipart/form-data" onSubmit={HandleSubmit}>
            <Form.Group  className="mb-3">
            <Form.Label style={{color:"black"}}>Staff Name</Form.Label>
            <Form.Control

              type="text"
              style={{ width: "50%" }}
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              required={true}
            />
            </Form.Group>


            
            <Form.Group  className="mb-3">
            <Form.Label style={{color:"black"}}>Number</Form.Label>
            <Form.Control
              className="input"
              maxLength={10}
              type="text"
              style={{ width: "50%" }}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required={true}
            />
          </Form.Group>

          <div style={{ color: 'red'}} className="error">{numberError}</div>
         
          <Form.Group  className="mb-3">
            <Form.Label style={{color:"black"}}>Email</Form.Label>
            <Form.Control
              className="input"
              type="email"
              style={{ width: "50%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </Form.Group>


          <Form.Group  className="mb-3">
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

          <Form.Group  className="mb-3">
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
          <div style={{ color: 'red'}} className="error">{digitError}</div>

          <Form.Group  className="mb-3">
            <Form.Label style={{color:"black"}}>Image</Form.Label>
            <Form.Control
              className="input"
              id="file-upload"
              accept=".png,.jpeg,.jpg"
              type="file"
              style={{ width: "50%" }}
              ref={image}
              // value={image}
              // onChange={image}
              required={true}
            />
          </Form.Group>

          <Form.Group>
      <Form.Label>Department</Form.Label>
      <Form.Control as="select"    style={{ width: "50%" }} value={department} onChange={((e)=>setDepartment(e.target.value))}>
        {/* <option>Department</option> */}
        <option value="General Office">General Office</option>
        <option value="Purchase Department">Purchase Department</option>
        <option value="Sales Department">Sales Department</option>
        <option value="Personnel Department">Personnel Department</option>
        <option value="Production Department">Production Department</option>
        <option value="Accounts Department">Accounts Department</option>
        <option value="Export Department">Export Department</option>
      </Form.Control>
    </Form.Group>

          
          {/* <Form.Group controlId="customerName" className="mb-3">
          {/* {Department.map(
        (variant) => ( 
          <DropdownButton
            // as={ButtonGroup}
               key="Department"
            // id={`dropdown-variants-${variant}`}
            // variant={variant.toLowerCase()}
            title="Department"
          >
            {Department.map((data)=>{
                <Dropdown.Item eventKey="1">{data}</Dropdown.Item>
            })}
          <Dropdown.Item eventKey="1">gfhfd</Dropdown.Item>
            {/*   <Dropdown.Item eventKey="2">Another action</Dropdown.Item> */}
            {/* <Dropdown.Item eventKey="3" active>
              Active Item  
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> 
          </DropdownButton>
        {/* ),
      )} */}
        
        
         {/* <Form.Label style={{color:"black"}}>Department</Form.Label>
            <Form.Control 
           
            //  {Department.map((option, index) => (
            //    <Dropdown.Item key={index}>{option}</Dropdown.Item>
            //  ))}

              className="input"

              type="dropdown"
              style={{ width: "50%" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required={true}
            />  */}
          {/* </Form.Group> */}



          <Button type="submit" className="employeebutton" >
              Submit
            </Button>

            </Form>
        </Card>
        </div>
        </div>
    )
}
export default Employee