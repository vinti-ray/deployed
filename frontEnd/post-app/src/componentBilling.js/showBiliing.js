import React, { useEffect, useState } from "react";
import { Button, Form, Table,Card } from "react-bootstrap";
import axios from "axios";
import "./billing.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import Shop from "./shopDetail";


function Invoice() {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [items, setItems] = useState([ { itemName: "", quantity: 0, discountedPrice: 0, mrp: 0, value: 0 } ]);
  const [paymentMehtod,setPaymentMethod]=useState("")
  const [date,setDate]=useState("")

  const [total,setTotal]=useState("")
  const [netTotal,setNetTotal]=useState("")


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;  
     // e.target=<input type="text" class="form-control" value="7676667" name="discountedPrice">       
    const list = [...items];
    list[index][name] = value;       //index will give index of each item in item array  list[index][name]  
    list[index].value =  list[index].quantity*(list[index].mrp-(list[index].mrp*list[index].discountedPrice/100));      //value=quantity*(price-(price*discountPrice/100) 
    setItems(list);

    let total=0
    for(let i=0;i<items.length;i++){
        total=total+items[i].value
    }

    setTotal(total)
    let netTotal=total+(total*(28/100))
            setNetTotal(netTotal)                 //let amountToPay=total+(total*(GST/100))

  };

  const handleAddItem = () => {
    setItems([ ...items,{ itemName: "", quantity: 0, discountedPrice: 0, mrp: 0, value: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const list = [...items];

    list.splice(index, 1);
    setItems(list);


  };



  const handleSubmit = (e) => {

    e.preventDefault();
    window.print();
    let data={
        customerName:customerName,
        number:customerNumber,
        item:items,
        paymentMethod:paymentMehtod,
        total:total,
        netTotal:netTotal
    }
    
    axios.post("http://localhost:3001/createbill",data).then((e)=>{console.log(e)})
  };

  const paymentMethods = [
    { label: 'Credit Card/ Debit Card', value: 'credit_card/debit_card' },
    { label: 'Cash', value: 'cash' },
    { label: 'Upi', value: 'upi' },
  ];



  return (
    <div className="container">
                <Card className="invoice-card">
      <h1 className="text-center">Invoice</h1>
                    <Shop/>
      <Form onSubmit={handleSubmit}>

      <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control className="input" type="date" style={{ width: '50%' }} value={date} onChange={(e) => setDate(e.target.value)}  required/>
        </Form.Group>

        <Form.Group controlId="customerName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control className="input" type="text" style={{ width: '50%' }} value={customerName} onChange={(e) => setCustomerName(e.target.value)}  required/>
        </Form.Group>

        <Form.Group controlId="customerNumber">
          <Form.Label>Customer Number</Form.Label><Form.Control className="input" type="text"   value={customerNumber}  style={{ width: '50%' }} onChange={(e) => setCustomerNumber(e.target.value)}  required />
        </Form.Group>


        <Table  >
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Discounted Price</th>
              <th>MRP</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>

                <td>
                  <Form.Control className="input" type="text" name="itemName" value={item.itemName} onChange={(e) => handleInputChange(e, index)} />
                </td>

                <td>
                  <Form.Control className="input" type="text" name="quantity" value={item.quantity} onChange={(e) => handleInputChange(e, index)}/>
                </td>

                <td>
                  <Form.Control className="input" type="text"  name="discountedPrice" value={item.discountedPrice} onChange={(e) => handleInputChange(e, index)} />
                </td>
                
                <td>
                  <Form.Control className="input"
                    type="text"   name="mrp"  value={item.mrp} onChange={(e) => handleInputChange(e, index)} />
                </td>

                <td>{item.value}</td>
                <td>
                  <Button variant="danger" className="no-print" onClick={() => handleRemoveItem(index)}><FontAwesomeIcon icon={faTrash} /> </Button>
                  </td>
                  <Button variant="warning" className="no-print" onClick={() => handleAddItem(index)}>  <FontAwesomeIcon icon={faPlus} /></Button>
                  </tr>))}

                  <tr>  <th>Total </th>  <th></th>
                        <th></th>
                        <th></th>
                  <td>
                  <Form.Control  value={total} />
                </td>
                  </tr>

                 
                    <tr>
                    <th>CGST </th>
                        
                        <th><td>14</td></th>
                        </tr>
                        <tr>
                    <th>SGST </th>
              
                        <th><td>14</td></th>
                        </tr>

                        <tr>  <th>Total Payable Amount </th>  <th></th>
                        <th></th>
                        <th></th>
                  <td>
                  <Form.Control  value={netTotal} />
                </td>
                  </tr>

                  </tbody>

                  <Form.Group controlId="customerNumber" className="no-print" >
              <Form.Label className="payment">Payment Method:</Form.Label>
                  {paymentMethods.map((paymentMethod) => (
                    <Form.Check
                    key={paymentMethod.value}
                    type="radio"
                    // id={paymentMethod.value}
                    label={paymentMethod.label}
                    name="paymentMethod"
                    value={paymentMethod.value}
                    checked={paymentMehtod === paymentMethod.value}
                    onChange={(e) => setPaymentMethod(e.target.value )}
                
                    />
                ))} </Form.Group>

                            </Table>
                            <div className="no-print">
                            <Button type="submit"  className="headertwo"  onClick={handleSubmit} >Generate Invoice</Button>
                            </div>

                            </Form>
                            <Card.Footer className="invoice-footer">
          <div>
            <p style={{color:"black"}}>
              Thank you for your business! If you have any questions, please
              contact us at vinti@gmail.com.
            </p>
          </div>
        </Card.Footer>
                            </Card>
                            </div>

                  )}


 export default Invoice