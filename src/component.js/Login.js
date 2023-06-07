import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [remember, setRemember] = useState(true);
  const [storedemail, setStoredemail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setStoredemail(localStorage.getItem("email"));
    setStoredPassword(localStorage.getItem("password"));
    if (storedemail && storedPassword) {
      setEmail(storedemail);
      setPassword(storedPassword);
      setRemember(true);
    } else {
      setRemember(false);
    }
  }, [storedemail, storedPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (remember) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      let x = localStorage.getItem("email", email);
      let y = localStorage.getItem("password", password);
      if (x && y) {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    }

    const data = {
      email: email,
      password: password,
    };
    await axios
      .post("https://gaudy-impossible-pulsar.glitch.me/login", data)
      .then((responce) => {
        localStorage.setItem("token", responce.data.message);
        localStorage.setItem("email", email);
        navigate("/");
        window.location.reload();
      })
      .catch((e) => {
        if (e.response.data.message == "invalid password") {
          setPasswordError(e.response.data.message);
        } else {
          setEmailError(e.response.data.message);
        }
      });
  };

  return (
    <Container className="containerlogin">

      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} className="loginform">
            <h1 className="headerTitle">Sign In</h1>

            <Form.Group controlId="formBasicName" className="mb-3" >
              <Form.Label style={{ color: "black" }}>Email Address</Form.Label>
              <label style={{ color: "red", marginLeft: "5px" }}>*</label>

              <Form.Control
                type="email"
                style={{ width: "100%" }}
                value={email}
                required={true}
                onChange={(event) => setEmail(event.target.value)}
              />

              <div style={{ color: "red" }} className="error">
                {emailError}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: "black" }}>Password</Form.Label>
              <label style={{ color: "red", marginLeft: "5px" }}>*</label>

              <Form.Control
                type="password"
                style={{ width: "100%" }}
                value={password}
                // autoComplete={storedPassword}
                onChange={(event) => setPassword(event.target.value)}
                required={true}
              />

              <div style={{ color: "red" }} className="error">
                {passwordError}
              </div>
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />

            <Button
              variant="outline-danger"
              type="submit"
              size="lg"
              className="button"
            >
              Sign In
            </Button>
            <br />

            <p style={{ color: "black" }} className="forget">
              {" "}
              <a href="/emailverify"> Forgot Password?</a>
            </p>

            <p style={{ color: "black" }} className="forget">
              If you are not a registered user please{" "}
              <NavLink to="/register"> sign up</NavLink>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
