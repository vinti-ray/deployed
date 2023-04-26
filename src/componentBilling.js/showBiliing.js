import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Table,
  Card,
  ButtonGroup,
  Row

} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./billing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sideBar";

import jwt_decode from "jwt-decode";
// import jsPDF from 'jspdf';
// import html2pdf from 'html2pdf.js';
import GooglePyment from "../paytmComponet/googlePay";
// import generatePDF from "./generatePdf";

// import Shop from "./shopDetail";

function Invoice() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [items, setItems] = useState([
    { itemName: "", quantity: 0, discountedPrice:0, mrp: 0, value: 0 },
  ]);

  const [paymentMehtod, setPaymentMethod] = useState("");
  const [numberError, setNumberError] = useState("");
  const [paymentError, setPayementError] = useState("");
  const [itemNumberError, setitemNumberError] = useState("");
  const [total, setTotal] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [itemError, setItemError] = useState("");

  const [id, setId] = useState("");

  const [orgemail, setorgemail] = useState("");
  const [DisabelData, setDisabelData] = useState(true);
  useEffect(() => {
    setorgemail(localStorage.getItem("email"));
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    // e.target=<input type="text" class="form-control" value="7676667" name="discountedPrice">
    const list = [...items];
    list[index][name] = value; //index will give index of each item in item array  list[index][name]
    list[index].value =
      list[index].quantity *
      (list[index].mrp - list[index].mrp * (list[index].discountedPrice / 100)); //value=quantity*(price-(price*discountPrice/100)
    setItems(list);
  };
  useEffect(() => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].value;
    }

    setTotal(total);
    let netTotal = total + total * (28 / 100);
    setNetTotal(netTotal); //let amountToPay=total+(total*(GST/100))

  }, [items]);

  const validate = (e) => {
    let check = "";
    let error = "";
    let itemError = "";
    let naemError = "";

    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const numberRegex = /^\d*\.?\d+$/;
    let justNumber = /^\d+$/;
    if (!regex.test(customerNumber)) {
      error = "please enter valid mobile number ";
    }

    setNumberError(error);
    if (!regex.test(items[0].mrp)) {
    }
    if (paymentMehtod == "") {
      check = "please select payment option";
    }
    if (customerName == "") {
      naemError = "please enter customer name";
    }
    setPayementError(check);
    setNameError(naemError);

    const list = [...items];
    for (let i = 0; i < list.length; i++) {
      if (!numberRegex.test(list[i].mrp)) {
        itemError = "mrp should be number";
      }
      if (!justNumber.test(list[i].discountedPrice)) {
        itemError = "discounted should be number";
      }
      if (!justNumber.test(list[i].quantity)) {
        itemError = "quantity should be number";
      }
      if (!list[i].mrp) {
        itemError = "please enter mrp";
      }
      if (!list[i].quantity) {
        itemError = "please enter quantity";
      }
      if (list[i].itemName == "") {
        itemError = "please enter item name";
      }
    }

    setitemNumberError(itemError);

    return !(error || check || itemError);
  };
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemName: "",
        quantity: "",
        discountedPrice: "",
        mrp: "",
        value: "",
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const list = [...items];

      list.splice(index, 1);
      setItems(list);
    } else {
      {
        setItems([
          {
            itemName: "",
            quantity: 0,
            discountedPrice: 0,
            mrp: 0,
            value: 0,
          },
        ]);
      }
    }
  };

  const generateInvoice = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    const isValid = validate();
    if (isValid && items) {
      window.print();
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    setId(decodedToken.id);
  }, []);


  // const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    const isValid = validate();
    if (isValid) {
      const formData = new FormData();
      // formData.append('invoice', pdf);
      formData.append("customerName", customerName);
      formData.append("number", customerNumber);
      formData.append("item", JSON.stringify(items));
      formData.append("paymentMethod", paymentMehtod);
      formData.append("total", total);
      formData.append("netTotal", netTotal);
      formData.append("organisationId", id);
      formData.append("email", email);

      axios
        .post("http://localhost:3001/createbill", formData, {
          headers: { token: token, "Content-Type": "multipart/form-data" },
        })
        .then((e) => {
          navigate("/");
        });
    }
  };

  const HandleRadio = (e) => {
    e.preventDefault();
    if (e.target.value == "credit_card/debit_card" ) {
      setDisabelData(false);
    }else{
      setDisabelData(true)
    }
  };

  const paymentMethods = [
    { label: "Credit Card / Debit Card   ", value: "credit_card/debit_card" },
    { label: "Cash  ", value: "cash" },
    { label: "Upi  ", value: "upi" },
  ];

  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="main-content" id="invoice-content">
        <Card className="invoice-card">
          <h1 className="text-center">Invoice</h1>

          <Form encType="multipart/form-data" onSubmit={handleSubmit}>
 

            <Form.Group controlId="customerName" className="mb-3">
              <Form.Label style={{ color: "black" }}>Customer Name</Form.Label>
              <Form.Control
                className="input"
                type="text"
                style={{ width: "50%" }}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <div style={{ color: "red" }} className="error">
                {nameError}
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label style={{ color: "black" }}>Email</Form.Label>
              <Form.Control
                className="input"
                type="email"
                style={{ width: "50%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="customerNumber" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                Customer Number
              </Form.Label>
              <Form.Control
                className="input"
                maxLength={10}
                type="text"
                value={customerNumber}
                style={{ width: "50%" }}
                onChange={(e) => setCustomerNumber(e.target.value)}
                required
              />
              <div style={{ color: "red" }} className="error">
                {numberError}
              </div>
            </Form.Group>

            <Table>
              <thead>
                <tr><th>Item Name</th><th>Quantity</th><th>Discount (%)</th><th>MRP</th><th>Value</th><th></th></tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}><td>
                      <Form.Control
                        className="input"
                        type="text"
                        name="itemName"
                        value={item.itemName}
                        onChange={(e) => handleInputChange(e, index)}
                        required={true}
                      />
                    </td><td>
                      <Form.Control
                        className="input"
                        type="text"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(e, index)}
                        required={true}
                      />
                    </td><td>
                      <Form.Control
                        className="input"
                        type="text"
                        name="discountedPrice"
                        max="100"
                        value={item.discountedPrice}
                        onChange={(e) => {
                          if (Number(e.target.value) <= 100) {
                            handleInputChange(e, index);
                          }
                        }}
                        required={true}
                      />
                    </td><td>
                      <Form.Control
                        className="input"
                        type="text"
                        name="mrp"
                        value={item.mrp}
                        onChange={(e) => handleInputChange(e, index)}
                        required={true}
                      />
                    </td><td>{item.value}</td><td><Button
                        variant="danger"
                        className="no-print"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button></td><td>
                      <Button
                        variant="warning"
                        className="no-print"
                        onClick={() => handleAddItem(index)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </td></tr>
                ))}
                <tr style={{ color: "red" }} className="error">{itemError}</tr>
                <tr style={{ color: "red" }} className="error">{itemNumberError}</tr>

                <tr><th>Total </th> <th></th><th></th><th></th><td><Form.Control value={total} readOnly /></td></tr>

                <tr><th>CGST </th><th>14</th></tr><tr><th>SGST </th><th>14</th></tr>
                <tr><th>Total Payable Amount </th><th></th> <th></th><th></th><td><Form.Control value={netTotal} readOnly/></td></tr>
              </tbody></Table>

            <Form.Group className="no-print">
              <Row>
                <Form.Label className="payment" style={{ color: "black" }}>
                  Payment Method:
                </Form.Label>
              </Row>
              <ButtonGroup>
                {paymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.value} className="mr-3" style={{padding:"10px"}}>
                    <Form.Check
                      type="radio"
                      variant="primary"
                      label={paymentMethod.label}
                      name="paymentMethod"
                      value={paymentMethod.value}
                      checked={paymentMethod === paymentMethod.value}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                      }}
                      onClick={HandleRadio}
                    />
                  </div>
                ))}
              </ButtonGroup>
              <p style={{ color: "red" }} className="error">
                {paymentError}
              </p>
            </Form.Group>

            <div className="no-print" id="buttons">
              <div
                style={{ float: "right", position: "relative", margin: "20px" }}
              >
                <GooglePyment price={netTotal} isDisabled={DisabelData} />
              </div>
              <Button
                type="submit"
                className="headerthree"
                onClick={generateInvoice}
              >
                Generate Invoice
              </Button>
              <Button type="submit" className="headerfour">
                paid
              </Button>
            </div>
          </Form>
          <Card.Footer className="invoice-footer">
            <div className="footer">
              <p style={{ color: "black" }}>
                * Thank you for your business! If you have any questions, please
                contact us at {orgemail}.
              </p>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default Invoice;
