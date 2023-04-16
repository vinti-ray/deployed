import React, { useState } from "react";
import { Button, Form, Table, Card } from "react-bootstrap";
import axios from "axios";
function PaytmPayment() {
  //   const [paymentDetails, setPaymentDetails] = useState({
  //     amount: '',
  //     orderId: '',
  //     customerId: '',
  //     email: '',
  //     phone: ''
  //   });

  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

//   const handleInputChange = (event) => {
//     setPaymentDetails({
//       ...paymentDetails,
//       [event.target.name]: event.target.value,
//     });
//   };

  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
        let paymentDetails={
      amount: amount,
      orderId:orderId,
      customerId: customerId,
      email: email,
      phone: phone
        }
      const response = await axios.post(
        "http://localhost:3001/paytm",
        JSON.stringify(paymentDetails)
      );

      const result = await response.json();
      if (result.status === "success") {
        window.location.href = result.paymentUrl;
      } else {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing the payment.");
    }
  };

  return (
    <Card>
      <h1>Payment</h1>
      <Form onSubmit={HandleSubmit}>
        <Form.Group controlId="customerName" className="mb-3">
          <Form.Label style={{ color: "black" }}>Amount</Form.Label>
          <Form.Control
            type="text"
            style={{ width: "50%" }}
            value={amount}
            onChange={((e)=>setAmount(e.target.value))}
            required={true}
          />
        </Form.Group>

        <Form.Group controlId="customerName" className="mb-3">
          <Form.Label style={{ color: "black" }}>Order ID:</Form.Label>
          <Form.Control
            type="text"
            style={{ width: "50%" }}
            value={orderId}
            onChange={((e)=>setOrderId(e.target.value))}
            required={true}
          />
        </Form.Group>

        <Form.Group controlId="customerName" className="mb-3">
          <Form.Label style={{ color: "black" }}>Customer ID:</Form.Label>
          <Form.Control
            type="text"
            style={{ width: "50%" }}
            value={customerId}
            onChange={((e)=>setCustomerId(e.target.value))}
            required={true}
          />
        </Form.Group>

        <Form.Group controlId="customerName" className="mb-3">
          <Form.Label style={{ color: "black" }}>Email</Form.Label>
          <Form.Control
            type="text"
            style={{ width: "50%" }}
            value={email}
            onChange={((e)=>setEmail(e.target.value))}
            required={true}
          />
        </Form.Group>

        <Form.Group controlId="customerName" className="mb-3">
          <Form.Label style={{ color: "black" }}>Phone</Form.Label>
          <Form.Control
            type="text"
            style={{ width: "50%" }}
            value={phone}
            onChange={((e)=>setPhone(e.target.value))}
            required={true}
          />
        </Form.Group>

        <Button type="submit" className="employeebutton">
          Submit
        </Button>
      </Form>
    </Card>
  );
}
export default PaytmPayment;
