import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "./forget.css"

function EnterOtp() {

  const [otp,setOtp]=useState("")
  const [userOtp,setUserOtp]=useState("")
  const[otpError,setotpError]=useState("")



  const navigate = useNavigate();

useEffect(()=>{
      let savedOtp=localStorage.getItem("otp")
      setOtp(savedOtp)
},[])



  const handleSubmit = async (event) => {
    event.preventDefault();

    if(otp!=userOtp){
        setotpError("Inavalid Otp")
    }else{

        navigate('/passwordresetpage')
    }
 

  
  }




  return (

    <Container className='containerlogin' >

      <Row className="justify-content-md-center">
        <Col  xs={12} md={6}>
          <Form onSubmit={handleSubmit} className='emailverify' >
          <h1 className='forgettitle'>Enter Otp</h1>

            <Form.Group  controlId="formBasicName" className="mb-3" lab>
     
              <Form.Label style={{color:"black"}}>OTP</Form.Label> 
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>

              <Form.Control type="text" style={{ width: '100%' }}  value={userOtp}  required={true} onChange={(event) => setUserOtp(event.target.value)}   />

              <div style={{ color: 'red'}} className="error">{otpError}</div>
             </Form.Group>




            
            <Button variant="outline-danger" type="submit" size="lg" className='button' >Submit</Button>

         
          </Form>
        </Col>
      </Row>
    </Container>
  );
}




export default EnterOtp;