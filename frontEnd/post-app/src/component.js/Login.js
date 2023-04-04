import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "./login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
//   const navigate = useNavigate();


  const validate = () => {
    let emailError = '';
    let passwordError = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

  if (!emailRegex.test(email)) {
    emailError = 'Invalid email';
  }

  if (!passwordRegex.test(password)) {
    passwordError = 'Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number';
  }

    setEmailError(emailError);
    setPasswordError(passwordError);

    return !(emailError || passwordError);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
//     const isValid = validate();
//     if (isValid) {
//     const data={
//         email:email,
//         password:password
//     }
//     await axios.post("http://localhost:3001/login",data).then((responce)=>{    localStorage.setItem("token", responce.data.msg);navigate('/');}).catch((e)=>{if(e.response.data.msg=="invalid password") {setPasswordError(e.response.data.msg)} else{setEmailError(e.response.data.msg)}})
//   }
  };



  return (
    <Container className='box' >
      <Row className="my-4">
        <Col>
          <h1>Sign In</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit} className='form'>
            <Form.Group className="mb-3" controlId="formBasicEmail" lab>
     
              <Form.Label>Email Address</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control type="email" value={email}  required={true} onChange={(event) => setEmail(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{emailError}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control type="password" value={password} required={true} onChange={(event) => setPassword(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{passwordError}</div>
            </Form.Group>
            <Button variant="success" type="submit">Sign In</Button>
            
            <p>If you are not a registered user please <a href='/register'>sign up</a></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
