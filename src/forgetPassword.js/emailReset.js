import React, {  useState } from "react";
import { Button, Form,  Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function PasswordResetPage() {
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setoldPasswordError] = useState("");

  let navigate = useNavigate();


  const validate = () => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }

    return !passwordError;
  };

  // const navigate = useNavigate();




  const HandleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {

        if(password==confirmPassword){
      let email=localStorage.getItem("email")

      const data = {
        password: password,
        email:email

      };
      axios
        .put("http://localhost:3001/updateForgetPassword", data, {
          
        })
        .then(() => {
            if(localStorage.getItem("token")!=null){
                navigate("/organisationprofile")
            }else{

                navigate("/login");
            }
        })
        .catch((e) => {alert(e);
        });
    }
}else{
    setoldPasswordError("password not matched")
}

  };

  return (
    <div>
      {" "}
     

        <Card className="passwordcard">
          <h1 className="org">Update Password</h1>
          <Form onSubmit={HandleSubmit}>

          <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                style={{ width: "50%" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ color: "red" }} className="error">
                {passwordError}
              </div>
            </Form.Group>
            
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                style={{ width: "50%" }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div style={{ color: "red" }} className="error">
                {oldPasswordError}
              </div>
            </Form.Group>



            <Button variant="outline-warning" className="editButton" type="submit">
              Update
            </Button>
          </Form>
        </Card>
      </div>

  );
}
export default PasswordResetPage
