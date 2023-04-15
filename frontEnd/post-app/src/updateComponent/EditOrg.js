import React, { useEffect, useState } from "react";
import { Button, Form, Table, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./update.css";
import { Link, NavLink } from "react-router-dom";

import Sidebar from "../componentBilling.js/sideBar";
import jwt_decode from "jwt-decode";

function EditOrg() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorConfirmPassword, setconfirmPasswordError] = useState('');
 
  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setoldPasswordError] = useState("");
  const [id, setId] = useState("");
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const validate = () => {
    let confirmpass=""
    // let passwordError = '';
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!passwordRegex.test(password)) {
      
      setPasswordError(
        "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }

    if (confirmPassword !== password) {
      confirmpass="password not matched"
  
  }
    
  setconfirmPasswordError(confirmpass)
    return !(passwordError||confirmpass);
  };

  // const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    return () => {};
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setId(decodedToken.id);
  }, []);

  const HandleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      const data = {
        password: password,
        oldPassword: oldPassword,
      };
      axios
        .put("http://localhost:3001/updatePassword", data, {
          headers: { token: token },
        })
        .then(() => {
          navigate("/organisationprofile");
        })
        .catch((e) => {console.log(e);
          setoldPasswordError(e.response.data.message);
        });
    }
  };

  return (
    <div>
      {" "}
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Card className="passwordcard">
          <h1 className="org">Update Password</h1>
          <Form onSubmit={HandleSubmit}>

          <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                Old Password
              </Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control
                type="password"
                value={oldPassword}
                style={{ width: "50%" }}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <div style={{ color: "red" }} className="error">
                {oldPasswordError}
              </div>
            </Form.Group>
            
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                New Password
              </Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control
                type="password"
                value={password}
                style={{ width: "50%" }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div style={{ color: "red" }} className="error">
                {passwordError}
              </div>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label style={{color:"black"}}>confirm Password</Form.Label>
              <label style={{ color: 'red', marginLeft: '5px' }} >*</label>
              <Form.Control  type="password" style={{ width: '50%' }} value={confirmPassword} required={true} onChange={((e)=>setconfirmPassword(e.target.value))} />
              <div style={{ color: 'red'}} className="error">{errorConfirmPassword}</div>
            </Form.Group>

            <p style={{color:"black"}} > <NavLink to="/emailverify" className='forget'> Forgot Password?</NavLink></p> 

            <Button variant="outline-warning" className="editButton" type="submit">
              Update
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
export default EditOrg;
