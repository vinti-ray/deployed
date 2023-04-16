import React, { useEffect, useState } from "react";
import {  Button, } from 'react-bootstrap';
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer  } from 'cdbreact';
import { NavLink } from 'react-router-dom';

function DataInventory(){
    let [list,setList]=useState([])
    // const [searchValue,setSearchValue]=useState("")
    const [searchQuery, setSearchQuery] = useState('');
    let token=localStorage.getItem("token")


    useEffect(()=>{
      axios.get("http://localhost:3001/getinventory",{ headers: { "token": token } }).then((e)=>setList(e.data.message))
    },[])

    const filteredData = list.filter((item) =>
      item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const data = () => {
        let keyData=[]
        for(let i=0;i<filteredData.length;i++){
            let obj={}
           obj.srno=i+1
            obj.brandName=filteredData[i].brandName
            obj.itemName=filteredData[i].itemName
            obj.itemQuantity=filteredData[i].itemQuantity

            keyData.push(obj)

  
        }
    // console.log(keyData);
        return {
          columns: [
            {
              label: 'Sr No',
              field: 'srno',
              width: 100,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
              },
            },
            {
                label: 'Brand Name ',
                field: 'brandName',
                width: 250,
              
              },
              {
                label: 'Item Name',
                field: 'itemName',
                width: 200,
              },
    
            {
              label: 'Item Quantity  ',
              field: 'itemQuantity',
              width: 170,
            },
           
          ],

          rows: keyData
   
        };
      };

      return(
        <CDBContainer className="tableInvenotry" >

            <CDBCard>
            <NavLink exact to="/inventory" >
             <Button type="submit"  className="buttonOne" >Add Product</Button> 
             </NavLink>
                <CDBCardBody>

                <div className="search-container" style={{ margin: "0px 0px 0px 800px" }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

                    <CDBDataTable


                    entriesOptions={[5,10,15]}
                    striped
                    bordered
                    hover
                    scrollX
                    maxHeight="50vh"
                    data={data()}
                    searching={false}


                    />

 
                </CDBCardBody>
            </CDBCard>

        </CDBContainer>
      )
}

export default DataInventory