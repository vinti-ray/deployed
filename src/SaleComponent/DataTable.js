import React, { useEffect, useState } from "react";

import axios from "axios";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';

import { useNavigate } from "react-router-dom";
import "./Sale.css"
function SaleData(){
    let [list,setList]=useState([])
    const [searchQuery, setSearchQuery] = useState('');
    // const [searchValue,setSearchValue]=useState("")
    let token=localStorage.getItem("token")
    // let token=localStorage.getItem("token")
    const navigate = useNavigate();
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
      return () => {};
    },[])

    useEffect(()=>{
      axios.get("https://truth-glib-star.glitch.me/getSaleData",{ headers: { "token": token } }).then((e)=>setList(e.data.message))
    },[])
//  const handleSearch=(value)=>{
//     setSearchValue(value)
//  }
const filteredData = list.filter((item) =>
item.generatedDate.includes(searchQuery)
);


    const data = () => {
        let keyData=[]
        for(let i=0;i<filteredData.length;i++){
            let obj={}
            obj.srno=i+1
            obj.totalSale=filteredData[i].totalSale


            obj.billAmount=filteredData[i].billAmount
            obj.paidAmount=filteredData[i].paidAmount
            obj.generatedDate=filteredData[i].generatedDate


            keyData.push(obj)
            // obj={}
  
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
                label: 'Total Bill ',
                field: 'totalSale',
                width: 200,
                // attributes: {
                //   'aria-controls': 'DataTable',
                //   'aria-label': 'Name',
                // },
              },

            {
                label: 'Total Amount',
                field: 'billAmount',
                width: 270,
              },
              {
                label: 'Paid Amount',
                field: 'paidAmount',
                width: 270,
              },
              {
                label: 'Date ',
                field: 'generatedDate',
                width: 100,
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
                  
                <div className="search-container" style={{ margin: "0px 0px 0px 800px" }}>
              <input
                type="text"
                placeholder="Search by date..."
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

export default SaleData