import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./registration.css"
function RegisterUser() {
  const [organisationName, setorganisationName] = useState('');
  const [organisationNameError, setOrganisationNameError] = useState('');
  // const [lastname, setLastName] = useState('');
  // const [LastnameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');


  const [number, setNumber] = useState('');
  const [numberError,setNumberError]=useState("")
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPincode] = useState('');
  const [pincodeError,setPincodeError]=useState("")


  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorConfirmPassword, setconfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let organisationNameError='';
    let emailError = '';
    let passwordError = '';
    let pincodeError=''
    let confirmpass=""
    // let LastnameError='';
 
  const nameRegex=/[a-zA-Z]{3,}/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberregex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
  const passwordRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
const pincoderegex=/^[1-9][0-9]{5}$/
  if(!numberregex.test(number)){
    setNumberError("please provide valid mobile number")
  }
  if (!nameRegex.test(organisationName)) {
    organisationNameError = 'please enter valid name';
  }
  if(!pincoderegex.test(pinCode)){
    pincodeError="please enter valid pincode"
    
  }

  if (confirmPassword !== password) {
    confirmpass="password not matched"

}
  // if (!nameRegex.test(lastname)) {
  //   LastnameError = 'please enter valid name';
  // }

  if (!emailRegex.test(email)) {
    emailError = 'please enter valid email Id';
  }


  if (!passwordRegex.test(password)) {
    passwordError = 'Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number';
  }

  setOrganisationNameError(organisationNameError);
  setPincodeError(pincodeError)
    // setLastNameError(LastnameError)
    setEmailError(emailError);
    setPasswordError(passwordError);
    setconfirmPasswordError(confirmpass)

    return !(organisationNameError||emailError || passwordError||confirmpass);
  };


//  const handleConfirmPassword = (event) => {
     
//      setconfirmPassword(event.target.value)
//      if (event.target.value !== password) {
//         setconfirmPasswordError("passwword not matched")
//     }
    

// }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {

    const data={
      organisationName:organisationName,
        email:email,
        password:password,
        confirmPassword:confirmPassword,
        country:country,
        state:state,
        city:city,
        pincode:pinCode
    }
    axios.post("https://truth-glib-star.glitch.me/createuser",data).then(()=>{navigate('/login')}).catch((e)=>{if(e.response.data.message="email is already used"){setEmailError("email is already used,please use another email")}else{alert(e)}})
  }
  };

  return (
    <Container className="my-container">

      <Row className="justify-content-md-center">
        <Col  xs={12} md={6}>
          <Form onSubmit={handleSubmit} className='register'>
          <Row className="my-4">
        <Col>
          <h1 className='headerRegister'>Sign Up</h1>
        </Col>
      </Row>
      <Row>

<Col>

            <Form.Group controlId="formBasicName" className="mb-3">
   
              <Form.Label style={{color:"black"}}>Organization's Name</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>

              <Form.Control  style={{ width: '100%' }} type="text" value={organisationName} required={true} onChange={(event) => setorganisationName(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{organisationNameError}</div>
            </Form.Group>
            </Col>



            <Col>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{color:"black"}}>Email Address</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control  type="email" style={{ width: '100%' }} value={email} required={true} onChange={(event) => setEmail(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{emailError}</div>
            </Form.Group>




          </Col>
          </Row>
          <Row>
            <Col>

                      <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label style={{color:"black"}}>Password</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control  type="password" style={{ width: '100%' }} value={password} required={true} onChange={(event) => setPassword(event.target.value)} />
              <div style={{ color: 'red'}} className="error">{passwordError}</div>
            </Form.Group>

            </Col>

            <Col>
            
            <Form.Group controlId="password" className="mb-3">
              <Form.Label style={{color:"black"}}>confirm Password</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control  type="password" style={{ width: '100%' }} value={confirmPassword} required={true} onChange={((e)=>setconfirmPassword(e.target.value))} />
              <div style={{ color: 'red'}} className="error">{errorConfirmPassword}</div>
            </Form.Group>
            
            </Col>
          </Row>

          <Row>
            <Col>
            <Form.Group controlId="customerNumber" className="mb-3">
            <Form.Label style={{color:"black"}}>Country</Form.Label>
            <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
            <Form.Control
              className="input"

              type="text"
              value={country}
              style={{ width: "100%" }}
              onChange={(e) => setCountry(e.target.value)}
              required
            />


          </Form.Group>
            </Col>

            <Col>
            <Form.Group controlId="customerNumber" className="mb-3">
            <Form.Label style={{color:"black"}}>State</Form.Label>
            <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
            <Form.Control
              className="input"

              type="text"
              value={state}
              style={{ width: "100%" }}
              onChange={(e) => setState(e.target.value)}
              required
            />
         

          </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
            <Form.Group controlId="customerNumber" className="mb-3">
            <Form.Label style={{color:"black"}}>City</Form.Label>
            <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
            <Form.Control
              className="input"

              type="text"
              value={city}
              style={{ width: "100%" }}
              onChange={(e) => setCity(e.target.value)}
              required
            />
                      </Form.Group>
            </Col>

            <Col>
            <Form.Group controlId="customerNumber" className="mb-3">
            <Form.Label style={{color:"black"}}>Pincode</Form.Label>
            <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
            <Form.Control
              className="input"
              maxLength={6}
              type="text"
              value={pinCode}
              style={{ width: "100%" }}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          <div style={{ color: 'red'}} className="error">{pincodeError}</div>

          </Form.Group>
            </Col>
          </Row>







  <br/>
            <Button variant="outline-danger" type="submit" size='lg' className='button'>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterUser;