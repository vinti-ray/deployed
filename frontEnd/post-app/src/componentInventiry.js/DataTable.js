import React, { useEffect, useState } from "react";
import { Form, Button, Table, Card } from 'react-bootstrap';
import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { NavLink } from 'react-router-dom';

function DataInventory(){
    let [list,setList]=useState([])
    // const [searchValue,setSearchValue]=useState("")
    const [searchText, setSearchText] = useState('');
    let token=localStorage.getItem("token")

    useEffect(()=>{
      axios.get("http://localhost:3001/getinventory",{ headers: { "token": token } }).then((e)=>setList(e.data.message))
    },[])
//  const handleSearch=(value)=>{
//     setSearchValue(value)
//  }


    const data = () => {
        let keyData=[]
        for(let i=0;i<list.length;i++){
            let obj={}
           obj.srno=i+1
            obj.brandName=list[i].brandName
            obj.itemName=list[i].itemName
            obj.itemQuantity=list[i].itemQuantity

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

{/* generateinvoice */}
            <CDBCard>
            <NavLink exact to="/inventory" >
             <Button type="submit"  className="buttonOne" >Add Product</Button> 
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
                    searchInput={
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onClick={(e) =>{e.preventDefault();console.log(e) ;setSearchText(e.target.value)}}
                      />
                    }

                    />

 
                </CDBCardBody>
            </CDBCard>

        </CDBContainer>
      )
}

export default DataInventory