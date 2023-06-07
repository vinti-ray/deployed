import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "./forget.css"

function EmailVerify() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otp,setOtp]=useState("")

// useEffect(()=>{
//   window.location.reload(true)
// },[])
// useEffect(()=>{

//       window.location.reload();

//  },[null])

  const navigate = useNavigate();





  const handleSubmit = async (event) => {
    event.preventDefault();

    
 

    const data={
        email:email,
      
    }
    await axios.post("https://gaudy-impossible-pulsar.glitch.me/forgetPassword",data).then((responce)=>{localStorage.setItem("otp",responce.data.message);localStorage.setItem("email",email)  ; setOtp(responce.data.message);navigate('/otpverify');}).catch((e)=>{if(e.response.data.message=="no email found") {setEmailError(e.response.data.message)} })
  }




  return (

    <Container className='containerlogin' >

      <Row className="justify-content-md-center">
        <Col  xs={12} md={6}>
          <Form onSubmit={handleSubmit} className='emailverify' >
          <h1 className='forgettitle'>Forget Password</h1>

            <Form.Group  controlId="formBasicName" className="mb-3" >
     
              <Form.Label style={{color:"black"}}>Email Address</Form.Label> 
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>

              <Form.Control type="email" style={{ width: '100%' }}  value={email}  required={true} onChange={(event) => setEmail(event.target.value)}   />

              <div style={{ color: 'red'}} className="error">{emailError}</div>
             </Form.Group>




            
            <Button variant="outline-danger" type="submit" size="lg" className='button' >Send OTP</Button>

         
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EmailVerify;
