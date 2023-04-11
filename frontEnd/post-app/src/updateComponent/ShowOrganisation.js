import React, { useEffect, useState } from "react";
import { Button, Form, Table, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Card, ListGroup, ListGroupItem, Button, Image } from 'react-bootstrap';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./update.css";
import { Link, NavLink } from "react-router-dom";
import ProfileImageUpload from "./profileImagetwo";
import ProfileImageEditor from "./profileImageOne";

import Sidebar from "../componentBilling.js/sideBar";
import jwt_decode from "jwt-decode";

function ShowUser() {
  const [organisationName, setorganisationName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [staff, setStaff] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [pincodeError,setPincodeError]=useState("")
  // const [password, setPassword] = useState('');

  const [id, setId] = useState("");
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
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
    axios
      .get("http://localhost:3001/getUser", { headers: { token: token } })
      .then((e) => {
        setEmail(e.data.message.email);
        setorganisationName(e.data.message.name);
        setCountry(e.data.message.country);
        setCity(e.data.message.city);
        setPincode(e.data.message.pincode);
        setState(e.data.message.state);
        setStaff(e.data.message.numberOfEmployee);
      });
  }, []);

  const validate = () => {
  
const pincoderegex=/^[1-9][0-9]{5}$/

  if(!pincoderegex.test(pincode)){
    setPincodeError("please enter valid pincode")
  }






    // setLastNameError(LastnameError)
    setEmailError(emailError);


    return !emailError ;
  };


  const HandleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      const data = {
        organisationName: organisationName,
        email: email,
        country: country,
        state: staff,
        city: city,
        pincode: pincode,
      };
      axios
        .post("http://localhost:3001/updateUser", data, {
          headers: { token: token },
        })
        .then(() => {
          navigate("/organisationprofile");
        })
        .catch((e) => {
          setEmailError(e.response.data.message);
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
        {/* <Card  className="organisationcard"> */}
        {/* <Image src={user.profilePicture} roundedCircle /> */}
        {/* <Card.Body>
        <Card.Title style={{color:"black"}}>{organisationName}</Card.Title>
        {/* <Card.Text>{email}</Card.Text> */}

        {/*  </Card.Body>
      <ListGroup className="list-group-flush">
        
        <ListGroupItem >{organisationName}</ListGroupItem>
        <ListGroupItem>{email}</ListGroupItem>
        {/* <ListGroupItem>{user.address}</ListGroupItem> 
      </ListGroup>
    </Card> */}

        <Card className="organisationcard">
          {/* <Row>

           <Col> */}

          <div className="img">
            {profileImage ? (
              <ProfileImageEditor onChange={profileImage} />
            ) : (
              <ProfileImageUpload onChange={setProfileImage} />
            )}
          </div>
          {/* <h1 className="org">Organisation's profile</h1> */}

          {/* </Col>
              <Col> */}

          {/* </Col> */}
          {/* </Row> */}
          <Form onSubmit={HandleSubmit}>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                Organisation's Name
              </Form.Label>

              <Form.Control style={{ width: "50%" }} value={organisationName}  onChange={(e) => setorganisationName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>Email Address</Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
                 <div style={{ color: 'red'}} className="error">{emailError}</div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>TotalStaff</Form.Label>

              <Form.Control style={{ width: "50%" }} disabled value={staff} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>Country</Form.Label>

              <Form.Control style={{ width: "50%" }} value={country}  onChange={(e) => setCountry(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>State</Form.Label>

              <Form.Control style={{ width: "50%" }} value={state}  onChange={(e) => setState(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>City</Form.Label>

              <Form.Control style={{ width: "50%" }} value={city}  onChange={(e) => setCity(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label style={{ color: "black" }}>Pin Code</Form.Label>

              <Form.Control
                value={pincode}
                style={{ width: "50%" }}
                required={true}
                onChange={(e) => setPincode(e.target.value)}
              />
                 <div style={{ color: 'red'}} className="error">{pincodeError}</div>
            </Form.Group>
          <Button variant="outline-warning" type="submit" size='lg' className="buttonShowOrg">Update  </Button>
          </Form>



<p className="buttonShowOrg">

            <NavLink exact to="/updateOrganisation">
              <FontAwesomeIcon icon={faEdit} />
              Update Password?
            </NavLink>
</p>



        </Card>
      </div>
    </div>
  );
}
export default ShowUser;
