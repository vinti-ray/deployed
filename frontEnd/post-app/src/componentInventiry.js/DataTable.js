import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { NavLink } from 'react-router-dom';

function DataInventory(){
    let [list,setList]=useState([])
    // const [searchValue,setSearchValue]=useState("")

    useEffect(()=>{
      axios.get("http://localhost:3001/getinventory").then((e)=>setList(e.data.message))
    },[])
//  const handleSearch=(value)=>{
//     setSearchValue(value)
//  }


    const data = () => {
        let keyData=[]
        for(let i=0;i<list.length;i++){
            let obj={}

            obj.brandName=list[i].brandName
            obj.itemName=list[i].itemName
            obj.itemQuantity=list[i].itemQuantity

            keyData.push(obj)
            obj={}
  
        }
    // console.log(keyData);
        return {
          columns: [
            {
                label: 'Brand Name ',
                field: 'brandName',
                width: 250,
                attributes: {
                  'aria-controls': 'DataTable',
                  'aria-label': 'Name',
                },
              },
              {
                label: 'Item Name',
                field: 'itemName',
                width: 200,
              },
    
            {
              label: 'Item Quantity  ',
              field: 'itemQuantity',
              width: 270,
            },
           
          ],

          rows: keyData
   
        };
      };

      return(
        <CDBContainer className="tableInvenotry" >
{/* generateinvoice */}
            <CDBCard>
            <NavLink exact to="/inventory" >
             <Button type="submit"  className="buttonOne" >Add Inventory</Button> 
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

export default DataInventory