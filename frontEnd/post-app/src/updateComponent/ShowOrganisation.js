import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Form, Table, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Card, ListGroup, ListGroupItem, Button, Image } from 'react-bootstrap';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./update.css";
import { Link, NavLink } from "react-router-dom";

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

  const [profileImage, setProfileImage] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  // const [password, setPassword] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };
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
      .get("http://localhost:3001/getUser", { headers: { token: token } })
      .then((e) => {
        setEmail(e.data.message.email);
        setorganisationName(e.data.message.name);
        setCountry(e.data.message.country);
        setCity(e.data.message.city);
        setPincode(e.data.message.pincode);
        setState(e.data.message.state);
        setStaff(e.data.message.numberOfEmployee);
        setImagePreview(e.data.message.profileImage);
        console.log(e.data.message.profileImage);
      });
  }, []);

  const validate = () => {
    let error = "";
    const pincoderegex = /^[1-9][0-9]{5}$/;

    if (!pincoderegex.test(pincode)) {
      error = "please enter valid pincode";
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
        .post("http://localhost:3001/updateUser", formData, {
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
            )}
            {/* 
          {imagePreview && (
        <div style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', }}  >
          <img
            src={imagePreview}
            alt="Selected Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )} */}

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

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>TotalStaff</Form.Label>

              <Form.Control style={{ width: "50%" }} disabled value={staff} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>Country</Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>State</Form.Label>

              <Form.Control
                style={{ width: "50%" }}
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
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
                onChange={(e) => setPincode(e.target.value)}
              />
              <div style={{ color: "red" }} className="error">
                {pincodeError}
              </div>
            </Form.Group>
            <Button
              variant="outline-warning"
              type="submit"
              size="lg"
              className="buttonShowOrg"
            >
              Update{" "}
            </Button>
          </Form>


            <NavLink exact to="/updateOrganisation">
              <Button variant="outline-warning" type="submit" className="buttonShowOrg" size="lg">
                Update Password
              </Button>
            </NavLink>

        </Card>
      </div>
    </div>
  );
}
export default ShowUser;
