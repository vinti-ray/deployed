import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import "./Sale.css"
function SaleData(){
    let [list,setList]=useState([])
    // const [searchValue,setSearchValue]=useState("")
    let token=localStorage.getItem("token")

    useEffect(()=>{
      axios.get("http://localhost:3001/getSaleData",{ headers: { "token": token } }).then((e)=>setList(e.data.message))
    },[])
//  const handleSearch=(value)=>{
//     setSearchValue(value)
//  }


    const data = () => {
        let keyData=[]
        for(let i=0;i<list.length;i++){
            let obj={}

            obj.totalSale=list[i].totalSale
            obj.customerName=list[i].name
            obj.customerNumber=list[i].number

            obj.billAmount=list[i].billAmount
            obj.paidAmount=list[i].paidAmount
            obj.generatedDate=list[i].generatedDate


            keyData.push(obj)
            obj={}
  
        }
    // console.log(keyData);
        return {
          columns: [
            {
                label: 'Total sale ',
                field: 'totalSale',
                width: 250,
                // attributes: {
                //   'aria-controls': 'DataTable',
                //   'aria-label': 'Name',
                // },
              },
              {
                label: 'Customer Name ',
                field: 'customerName',
                width: 200,
              },
    
            {
              label: 'Customer Number   ',
              field: 'customerNumber',
              width: 270,
            },
            {
                label: 'Bill amount   ',
                field: 'billAmount',
                width: 270,
              },
              {
                label: 'Paid amount',
                field: 'paidAmount',
                width: 270,
              },
              {
                label: 'Generated date ',
                field: 'generatedDate',
                width: 270,
              },
             

           
          ],

          rows: keyData
   
        };
      };

      return(
        <CDBContainer className="tablesale" >
{/* generateinvoice */}
            <CDBCard>

                <CDBCardBody>
                    <CDBDataTable

                    striped
                    bordered
                    hover
                    entriesOptions={[5,10,15]}
                    entries={5}
                    pagesAmount={4}
                    data={data()}
                    materialSearch={true}
                    // searchLabel="Search"
                    // search={handleSearch}
                    // searchValue={searchValue}
                    
                    />

 
                </CDBCardBody>
            </CDBCard>

        </CDBContainer>
      )
}

export default SaleData