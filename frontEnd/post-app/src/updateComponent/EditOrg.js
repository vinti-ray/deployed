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

function EditOrg(){
  const [organisationName, setorganisationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [organisationNameError, setOrganisationNameError] = useState('');
    const [id,setId]=useState("")
    let navigate=useNavigate()
    let token=localStorage.getItem("token")

    const validate = () => {
        let organisationNameError='';
        let emailError = '';
        let passwordError = '';
        // let LastnameError='';
     
      const nameRegex=/[a-zA-Z]{3,}/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    
      if (!nameRegex.test(organisationName)) {
        organisationNameError = 'please enter valid name';
      }
      // if (!nameRegex.test(lastname)) {
      //   LastnameError = 'please enter valid name';
      // }
    
      if (!emailRegex.test(email)) {
        emailError = 'please enter valid email Id';
      }
    
    if(password!=""){

        if (!passwordRegex.test(password)) {
            passwordError = 'Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number';
        }
    }
    
      setOrganisationNameError(organisationNameError);
        // setLastNameError(LastnameError)
        setEmailError(emailError);
        setPasswordError(passwordError);
    
        return !(organisationNameError||emailError || passwordError);
      };
    
    // const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
      return () => {};
    },[])

    useEffect(()=>{
      let token=localStorage.getItem("token")
    //   let password=localStorage.getItem("password")
    //   setPassword(password)
      const decodedToken = jwt_decode(token);
      setId(decodedToken.id)
      axios.get("http://localhost:3001/getUser",{ headers: { "token": token } }).then((e)=>{setEmail(e.data.message.email);setorganisationName(e.data.message.organisationName)})

    },[])

    const HandleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) {
    
        const data={
            organisationName:organisationName,
            email:email,
            password:password,
        }
        axios.post("http://localhost:3001/updateUser",data,{ headers: { "token": token } }).then(()=>{navigate('/organisationprofile')}).catch((e)=>{setEmailError(e.response.data.message)})
      }
      };
  


    return(

      <div>    <div className='sidebar'>
      <Sidebar/>
    </div>
        <div  className="main-content">


        <Card className="organisationcard"  >
            <h1 className="org">Organisation's profile</h1>
            <Form  onSubmit={HandleSubmit}>
            <Form.Group controlId="formBasicName" className="mb-3">
   
   <Form.Label style={{color:"black"}}>Update Organisation's Name</Form.Label>


   <Form.Control style={{ width: '50%' }} type="text"  value={organisationName} onChange={((e)=>setorganisationName(e.target.value))}/>
   <div style={{ color: 'red'}} className="error">{organisationNameError}</div>

 </Form.Group>

 <Form.Group controlId="formBasicEmail" className="mb-3">
   <Form.Label style={{color:"black"}}>Update Email Address</Form.Label>

   <Form.Control type="text"  style={{ width: '50%' }}  value={email} onChange={((e)=>setEmail(e.target.value))} />
   <div style={{ color: 'red'}} className="error">{emailError}</div>

 </Form.Group>

<Form.Group controlId="formBasicPassword" className="mb-3">
   <Form.Label style={{color:"black"}}>Update Password</Form.Label>

   <Form.Control type="password"  value={password}  style={{ width: '50%' }}  onChange={((e)=>setPassword(e.target.value))}  />
   <div style={{ color: 'red'}} className="error">{passwordError}</div>
  
 </Form.Group> 


         <Button type="outline-warning" className="editButton" >
              Update

            </Button> 
            </Form>
        </Card>
        </div>
        </div>
    )
}
export default EditOrg