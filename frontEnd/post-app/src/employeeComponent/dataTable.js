import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { NavLink } from 'react-router-dom';

function DataEmployee(){
    let [list,setList]=useState([])
    // const [searchValue,setSearchValue]=useState("")
    let token=localStorage.getItem("token")

    useEffect(()=>{
      axios.get("http://localhost:3001/getemployee",{ headers: { "token": token } }).then((e)=>setList(e.data.message))
    },[])
//  const handleSearch=(value)=>{
//     setSearchValue(value)
//  }


    const data = () => {
        let keyData=[]
        for(let i=0;i<list.length;i++){
            let obj={}

            obj.staffName=list[i].staffName
            obj.number=list[i].number
            obj.email=list[i].email
            // obj.dateOfJoining=list[i].dateOfJoining

            let x=list[i].dateOfJoining
            const dateObj = new Date(x);
             const y = dateObj.toISOString().slice(0, 10);
             obj.dateOfJoining=y

            obj.salary=list[i].salary
            // obj.image=list[i].image
            obj.department=list[i].department

            keyData.push(obj)
            obj={}
  
        }
    // console.log(keyData);
        return {
          columns: [
            {
                label: 'Staff Name ',
                field: 'staffName',
                width: 250,
                // attributes: {
                //   'aria-controls': 'DataTable',
                //   'aria-label': 'Name',
                // },
              },
              {
                label: 'Number',
                field: 'number',
                width: 200,
              },
    
            {
              label: 'Email  ',
              field: 'email',
              width: 270,
            },
            {
                label: ' Date of Joining  ',
                field: 'dateOfJoining',
                width: 270,
              },
              {
                label: 'Salary',
                field: 'salary',
                width: 270,
              },
              {
                label: 'Department ',
                field: 'department',
                width: 270,
              },
             

           
          ],

          rows: keyData
   
        };
      };

      return(
        <CDBContainer className="tableEmployee" >
{/* generateinvoice */}
            <CDBCard>
            <NavLink exact to="/employee" >
             <Button type="submit"  className="buttonOne" >Add Employee Data</Button> 
             </NavLink>
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

export default DataEmployee