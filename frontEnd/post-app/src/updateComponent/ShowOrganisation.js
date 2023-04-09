import React, { useEffect, useState } from "react";
import { Button, Form, Table, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./update.css"
import { Link,NavLink } from "react-router-dom";

import Sidebar from "../componentBilling.js/sideBar";
import jwt_decode from 'jwt-decode';

function ShowUser(){
  const [organisationName, setorganisationName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  
    const [id,setId]=useState("")
    let navigate=useNavigate()
    let token=localStorage.getItem("token")
    // const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
      return () => {};
    },[])

    useEffect(()=>{
      let token=localStorage.getItem("token")
      const decodedToken = jwt_decode(token);
      setId(decodedToken.id)
      axios.get("http://localhost:3001/getUser",{ headers: { "token": token } }).then((e)=>{setEmail(e.data.message.email);setorganisationName(e.data.message.organisationName)})

    },[])
  


    return(

      <div>    <div className='sidebar'>
      <Sidebar/>
    </div>
        <div  className="main-content">


        <Card className="organisationcard"  >
            <h1 className="org">Organisation's profile</h1>
            <Form  >
            <Form.Group controlId="formBasicName" className="mb-3">
   
   <Form.Label style={{color:"black"}}>Organisation's Name</Form.Label>


   <Form.Control style={{ width: '50%' }} disabled value={organisationName} />

 </Form.Group>

 <Form.Group controlId="formBasicEmail" className="mb-3">
   <Form.Label style={{color:"black"}}>Email Address</Form.Label>

   <Form.Control   style={{ width: '50%' }} disabled value={email}  />

 </Form.Group>

 {/* <Form.Group controlId="formBasicPassword" className="mb-3">
   <Form.Label style={{color:"black"}}>Password</Form.Label>

   <Form.Control  value={password} disabled style={{ width: '50%' }}  required={true}  />
  
 </Form.Group> */}


            </Form>
          {/* <Button type="outline-warning" className="editButton" > */}
          <div className="editButton" >
          <NavLink exact to="/updateOrganisation" >
          <FontAwesomeIcon icon={faEdit} />

              Edit 
              </NavLink>
          </div>

            {/* </Button> */}
        </Card>
        </div>
        </div>
    )
}
export default ShowUser