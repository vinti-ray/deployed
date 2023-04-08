import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
// import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Sidebar from "./sideBar";
import BootstrapTable from 'react-bootstrap-table-next';
function DataTable(){
    let [list,setList]=useState([])



    let token=localStorage.getItem("token")
    useEffect(()=>{
      axios.get("http://localhost:3001/getdata", { headers: { "token": token } }).then((e)=>{setList(e.data.message);  })
    },[])


    const data = () => {
        let keyData=[]
        for(let i=0;i<list.length;i++){
            let obj={}
            obj.billno=i+1
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
        <div>
        <div className='sidebar'>
        <Sidebar/>
      </div>
        <CDBContainer className="container" >
{/* generateinvoice */}
            <CDBCard>
            <NavLink exact to="/abc" >
             <Button type="submit"  className="buttonOne" >Add Invoice</Button> 
             </NavLink>
                <CDBCardBody>
                    <CDBDataTable

                    // striped
                    // bordered
                    // hover
                    // scrollY
                    // entriesOptions={[5,10,15]}
                    // striped
                    // bordered
                    // hover
                    // // scrollX
                    // // scrollY
                    // // maxHeight="300xp"
                    // data={data()}
                    // materialSearch
                    // paging={false}
                    striped bordered hover data={data()} searching={false}
                    // searchLabel="Search"
                    // search={handleSearch}
                    // searchValue={searchValue}
                    
                    />

 
                </CDBCardBody>
            </CDBCard>

        </CDBContainer>
        </div>
      )
}

export default DataTable