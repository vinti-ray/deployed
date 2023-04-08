import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import "./login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [remember,setRemember]=useState(false)
  const [storedemail,setStoredemail]=useState("")
  const [storedPassword,setStoredPassword]=useState("")


  const navigate = useNavigate();


  useEffect(()=>{


        setStoredemail(localStorage.getItem("email"))
        setStoredPassword(localStorage.getItem("password"))

  },[])


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(remember)
    if(remember){
      localStorage.setItem("email",email)
      localStorage.setItem("password",password)
    }

    const data={
        email:email,
        password:password
    }
    await axios.post("http://localhost:3001/login",data).then((responce)=>{    localStorage.setItem("token", responce.data.message);localStorage.setItem("email",email);navigate('/');}).catch((e)=>{if(e.response.data.message=="invalid password") {setPasswordError(e.response.data.message)} else{setEmailError(e.response.data.message)}})
  }




  return (

    <Container  >
      {/* <Row >
        <Col>
          <h1 className='headerTitle'>Sign In</h1>
        </Col>
      </Row> */}
      <Row >
        <Col md={8}>
          <Form onSubmit={handleSubmit} className='loginform' >
          <h1 className='headerTitle'>Sign In</h1>

            <Form.Group className="mb-3" controlId="inlineFormInputName" lab>
     
              <Form.Label style={{color:"black"}}>Email Address</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>

              <Form.Control type="email" defaultValue={storedemail} autoComplete='email' value={email}  required={true} onChange={(event) => setEmail(event.target.value)}   />

              <div style={{ color: 'red'}} className="error">{emailError}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{color:"black"}}>Password</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>

              <Form.Control type="password" value={password} autoComplete="current-password" required={true}  defaultValue={storedPassword} onChange={(event) => setPassword(event.target.value)}  />

              
              <div style={{ color: 'red'}} className="error">{passwordError}</div>
            </Form.Group>

            <Form.Check type="checkbox" label="Remember me" checked={remember} onChange={(e)=>setRemember(e.target.checked)}/>


            
            <Button variant="outline-danger" type="submit" size="lg" className='button' >Sign In</Button>

            <p style={{color:"black"}}>If you are not a registered user please <a href='/register'>sign up</a></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
