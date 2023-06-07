import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./update.css";
import {  NavLink } from "react-router-dom";
// import faviconUpdate from "../faviconIcon.json/icon";

// import Dropzone from 'react-dropzone';
import Sidebar from "../componentBilling.js/sideBar";
import jwt_decode from "jwt-decode";
// import ProfileImageUpload from "./profileImagetwo";

function ShowUser() {
  const [organisationName, setorganisationName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [staff, setStaff] = useState("");


  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  // const [password, setPassword] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);



  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);


if(event.target.files[0]){

  setImagePreview(URL.createObjectURL(event.target.files[0])); 
}


    //URL.createObjectURL is a built-in JavaScript function that creates a URL for a given object in memory. 
  };


  useEffect(() => {
    const faviconUpdate = async () => {
      const favicon = document.getElementById("favicon");
       document.getElementById("titleHtml").innerHTML=organisationName
        favicon.href = imagePreview
        // titleHtml
    };
    faviconUpdate();
  }, [imagePreview,organisationName]);
  // let token = localStorage.getItem("token");

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
      .get("https://gaudy-impossible-pulsar.glitch.me/getUser", { headers: { token: token } })
      .then((e) => {
        setEmail(e.data.message.email);
        setorganisationName(e.data.message.name);
        setCountry(e.data.message.country);
        setCity(e.data.message.city);
        setPincode(e.data.message.pincode);
        setState(e.data.message.state);
        setStaff(e.data.message.numberOfEmployee);
        setImagePreview(e.data.message.profileImage);
        
      });
  }, []);

  const validate = () => {
    let emailError=""
    let error = "";
    const pincoderegex = /^[1-9][0-9]{5}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pincoderegex.test(pincode)) {
      error = "please enter valid pincode";
    }

    if (!emailRegex.test(email)) {
      emailError = 'please enter valid email Id';
    }
  

    setPincodeError(error);
    // setLastNameError(LastnameError)
    setEmailError(emailError);

    return !(emailError || error);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      const formData = new FormData();
      formData.append("profileImage", selectedImage);
      formData.append("organisationName", organisationName);
      formData.append("email", email);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("pincode", pincode);

      axios
        .post("https://gaudy-impossible-pulsar.glitch.me/updateUser", formData, {
          headers: { token: token },
        })
        .then(() => {
          alert("profile updated successfully");
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
      {/* <faviconUpdate icon={imagePreview}/> */}
      <div className="main-content">
        <Card className="organisationcard">
          <div className="img">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected Profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/16/16363.png"
                alt="Selected Profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              />
            )}


            <input type="file" accept="image/*" onChange={handleImageSelect} />
          </div>

          <Form onSubmit={HandleSubmit}>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                Organization's Name
              </Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={organisationName}
                onChange={(e) => setorganisationName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>Email Address</Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div style={{ color: "red" }} className="error">
                {emailError}
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label style={{ color: "black" }}>TotalStaff</Form.Label>

              <Form.Control style={{ width: "50%" }} disabled value={staff} />
            </Form.Group>

            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label style={{ color: "black" }}>Country</Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label style={{ color: "black" }}>State</Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label style={{ color: "black" }}>City</Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label style={{ color: "black" }}>Pin Code</Form.Label>

              <Form.Control
                value={pincode}
                style={{ width: "50%" }}
                required={true}
                maxLength={6}
                onChange={(e) => setPincode(e.target.value)}
              />
              <div style={{ color: "red" }} className="error">
                {pincodeError}
              </div>
            </Form.Group>



<Row>
  <Col>
            <Button
              variant="outline-danger"
              type="submit"
             
              className="buttonShowOrg"
              >
              Update
            </Button>
              </Col>
              <Col>
            <NavLink  to="/updateOrganisation">
              <Button variant="outline-danger" type="submit" className="buttonShowOrg" >
                Update Password
              </Button>
            </NavLink>
              </Col>
            </Row>
          </Form>




        </Card>
      </div>
    </div>
  );
}
export default ShowUser;
