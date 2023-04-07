import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./login.css"
function RegisterUser() {
  const [firstname, setFirstName] = useState('');
  const [fnameError, setfNameError] = useState('');
  const [lastname, setLastName] = useState('');
  const [LastnameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorConfirmPassword, setconfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let fnameError='';
    let emailError = '';
    let passwordError = '';
    let LastnameError='';
 
  const nameRegex=/[a-zA-Z]{3,}/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

  if (!nameRegex.test(firstname)) {
    fnameError = 'please enter valid name';
  }
  if (!nameRegex.test(lastname)) {
    LastnameError = 'please enter valid name';
  }

  if (!emailRegex.test(email)) {
    emailError = 'please enter valid email Id';
  }

  if (!passwordRegex.test(password)) {
    passwordError = 'Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number';
  }

    setfNameError(fnameError);
    setLastNameError(LastnameError)
    setEmailError(emailError);
    setPasswordError(passwordError);

    return !(LastnameError||fnameError||emailError || passwordError);
  };


 const handleConfirmPassword = (event) => {
     
     setconfirmPassword(event.target.value)
     if (event.target.value !== password) {
        setconfirmPasswordError("passwword not matched")
    }
    

}

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {

    const data={
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password,
        confirmPassword:confirmPassword
    }
    axios.post("http://localhost:3001/createuser",data).then(()=>{navigate('/login')}).catch((e)=>{setEmailError(e.response.data.message)})
  }
  };

  return (
    <Container >

      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit} className='register'>
          <Row className="my-4">
        <Col>
          <h1 className='headerTitle'>Sign Up</h1>
        </Col>
      </Row>
            <Form.Group controlId="name" className="mb-3">
   
              <Form.Label style={{color:"black"}}>First Name</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>

              <Form.Control style={{ width: '110%' }} type="text" value={firstname} required={true} onChange={(event) => setFirstName(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{fnameError}</div>
            </Form.Group>

            <Form.Group controlId="name" className="mb-3">
           <Form.Label style={{color:"black"}}>Last Name</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control type="text" style={{ width: '110%' }}  value={lastname} required={true} onChange={(event) => setLastName(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{LastnameError}</div>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label style={{color:"black"}}>Email Address</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control  type="email" style={{ width: '110%' }} value={email} required={true} onChange={(event) => setEmail(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{emailError}</div>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label style={{color:"black"}}>Password</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control  type="password" style={{ width: '110%' }} value={password} required={true} onChange={(event) => setPassword(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{passwordError}</div>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label style={{color:"black"}}>confirm Password</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control  type="password" style={{ width: '110%' }} value={confirmPassword} required={true} onChange={handleConfirmPassword} />
              <div style={{ color: 'red'}} className="error">{errorConfirmPassword}</div>
            </Form.Group>
  <br/>
            <Button variant="outline-danger" type="submit" size='lg' className='button'>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterUser;