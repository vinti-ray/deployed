import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { NavLink } from 'react-router-dom';

function DataTable(){
    let [list,setList]=useState([])
    // const [searchValue,setSearchValue]=useState("")

    useEffect(()=>{
      axios.get("http://localhost:3001/getdata").then((e)=>setList(e.data.message))
    },[])
//  const handleSearch=(value)=>{
//     setSearchValue(value)
//  }


    const data = () => {
        let keyData=[]
        for(let i=0;i<list.length;i++){
            let obj={}
            obj.billno=list[i]._id
            obj.name=list[i].customerName
            obj.number=list[i].number
            obj.amount=list[i].total
            obj.paidAmount=list[i].netTotal
            let x=list[i].createdAt
            const dateObj = new Date(x);
             const y = dateObj.toISOString().slice(0, 10);
             obj.date=y

            keyData.push(obj)
            obj={}
  
        }
    // console.log(keyData);
        return {
          columns: [
            {
                label: 'Bill no',
                field: 'billno',
                width: 250,
                attributes: {
                  'aria-controls': 'DataTable',
                  'aria-label': 'Name',
                },
              },
              {
                label: 'Customer Name ',
                field: 'name',
                width: 200,
              },
    
            {
              label: 'Customer Number ',
              field: 'number',
              width: 270,
            },
            {
              label: 'Bill amount ',
              field: 'amount',
              width: 100,
            },
            {
              label: ' Paid amount',
              field: 'paidAmount',
              sort: 'asc',
              width: 100,
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
        <CDBContainer className="container" >
{/* generateinvoice */}
            <CDBCard>
            <NavLink exact to="/abc" >
             <Button type="submit"  className="buttonOne" >Add Invoice</Button> 
             </NavLink>
                <CDBCardBody>
                    <CDBDataTable

                    striped
                    bordered
                    hover
                    entriesOptions={[5,20,25]}
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

export default DataTable