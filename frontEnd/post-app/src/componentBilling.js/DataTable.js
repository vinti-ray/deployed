import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
// import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Sidebar from "./sideBar";
import BootstrapTable from 'react-bootstrap-table-next';
function DataTable(){  function testClickEvent(param) {
  alert('Row Click Event');
}
let token=localStorage.getItem("token")
const navigate = useNavigate();
useEffect(()=>{
  if(!token){
    navigate('/login')
  }
  return () => {};
},[])

    let [list,setList]=useState([])



    // let token=localStorage.getItem("token")
    useEffect(()=>{
      axios.get("http://localhost:3001/getdata", { headers: { "token": token } }).then((e)=>{setList(e.data.message);  })
    },[])


    const data = () => {
        let keyData=[]
        for(let i=0;i<list.length;i++){
            let obj={}
            obj.billno=i+1
            obj.name=list[i].customerName
            obj.id=list[i]._id
            obj.number=list[i].number
            obj.amount=list[i].total
            obj.paidAmount=list[i].netTotal
            let x=list[i].createdAt
            const dateObj = new Date(x);
             const y = dateObj.toISOString().slice(0, 10);
             obj.date=y

            keyData.push(obj)
            // obj={}
  
        }
    // console.log(keyData);
        return {
          columns: [
            {
                label: 'Bill No',
                field: 'billno',
                width: 100,
                attributes: {
                  'aria-controls': 'DataTable',
                  'aria-label': 'Name',
                },
              },
              {
                label: 'Invoice Id ',
                field: 'id',
                width: 250,
              },
              {
                label: 'Customer Name ',
                field: 'name',
                width: 150,
              },
    
            {
              label: 'Customer Number ',
              field: 'number',
              width: 100,
            },
            {
              label: 'Bill amount ',
              field: 'amount',
              width: 150,
            },
            {
              label: ' Paid amount',
              field: 'paidAmount',
              sort: 'asc',
              width: 150,
            },
            {
                label: 'Generated date',
                field: 'date',
                sort: 'disabled',
                width: 150,
              },

     
          ],

          rows: keyData
   
        };
      };

      return(
        <div>
        <div className='sidebar'>
        <Sidebar/>
      </div>
        <CDBContainer className="container" >
{/* generateinvoice */}
            <CDBCard>
            <NavLink exact to="/abc" >
             <Button type="submit"  className="buttonOne" >Create Invoice</Button> 
             </NavLink>
                <CDBCardBody>
                    <CDBDataTable

                    entriesOptions={[5,10,15]}
                    striped
                    bordered
                    hover
                    scrollX
                    maxHeight="50vh"
                    data={data()}
                    searching={true}

                    
                    />

 
                </CDBCardBody>
            </CDBCard>

        </CDBContainer>
        </div>
      )
}

export default DataTable