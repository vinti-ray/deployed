import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import "./billing.css"
function Billing(){
    const [customerName,setCustomerName]=useState("") 

    const [mobile,setMobile]=useState("")

    const [quantity,setQuantity]=useState("")

    const [price,setPrice]=useState("")

    const [item,setItem] =useState("")
    const [value,setValue]=useState("")
    const [discountPrice,setDiscountPrice]=useState("")
    const [paymentMehtod,setPaymentMethod]=useState("")
    const [total,setTotal]=useState("")
    const [show,setShow]=useState(false)
    const [list,setList]=useState([item,quantity,discountPrice,price,value])  

    const ShowName=()=>{
        if(show==true){
            setShow(false)
        }else{
            setShow(true)
        }
    }

    // const HandleRemove=(index)=>{
    //     const a=[...list]
    //     a.splice(index,1)
    //     setList(a)
    // }

    const generateInvoice = () => {
        window.print();
      };

      useEffect(()=>{
        setValue(quantity*(price-(price*discountPrice/100)))
        setTotal(value)
      },[quantity, price, value])

  const HandleSubmit=(e)=>{
    e.preventDefault()
    let data={
        customerName:customerName,
        number:mobile,
        item:item,
        quantity:quantity,
        discountedPrice:discountPrice,
        MRP:price,
        paymentMethod:paymentMehtod
    }
    
    axios.post("http://localhost:3001/createbill",data).then((e)=>{console.log(e)})

  }
 
  const paymentMethods = [
    { label: 'Credit Card/ Debit Card', value: 'credit_card/debit_card' },
    { label: 'Cash', value: 'cash' },
    { label: 'Upi', value: 'upi' },
  ];

    return (
        <div>
        <Card className="invoice-card">
        <h1 className="headerone">Bill Page</h1>
        <Card.Header className="invoice-header">
          <h2 className="headerone">Invoice</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={HandleSubmit}>
            <Form.Group controlId="customerName">
              <Form.Label>Customer Name:</Form.Label>
              <Form.Control
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="customerNumber">
              <Form.Label>Customer Number:</Form.Label>
              <Form.Control
                type="text"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                required
              />
            </Form.Group>
            {/* <div>
                <button onClick={ShowName}  >+</button>
                {show&& }
               </div> */}
               <Table   hover responsive >
                   <thead >
                    <tr  >
                        <th>Item Name  <td>
                                    <Form.Control type="text" name="item name" value={item} onChange={(event)=>setItem(event.target.value)}/>
                                </td>
                                
                                </th>
                        <th>Quantity  <td>
                                    <Form.Control type="text" name="item name" value={quantity} onChange={(event)=>setQuantity(event.target.value)}/>
                                </td></th>
                        <th>discountedPrice <td>
                                    <Form.Control type="text" name="item name" value={discountPrice} onChange={(event)=>setDiscountPrice(event.target.value)}/>
                                </td></th>
                        <th>MRP <td>
                                    <Form.Control type="text" name="item name" value={price} onChange={(event)=>setPrice(event.target.value)}/>
                                </td></th>
                        <th>value <td>
                                    <Form.Control type="text" name="item name" value={value} disabled/>
                                </td></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Total </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><td>{total}</td></th>
                        
                    </tr>
                    <tr>
                    <th>CGST </th>
                        
                        <th><td>14</td></th>
                        </tr>
                        <tr>
                    <th>SGST </th>
              
                        <th><td>14</td></th>
                        </tr>

                   </thead>

                   <Form.Group controlId="customerNumber" >
              <Form.Label>Payment Method:</Form.Label>
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
                ))}

            </Form.Group>

               </Table>


               <Button type="submit"  className="headertwo" onClick={generateInvoice} >Generate Invoice</Button>

            </Form>
           </Card.Body>

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
    )
}

export default Billing