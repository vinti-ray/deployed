import React, { useEffect, useState } from "react";
import { Button,  } from "react-bootstrap";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer } from "cdbreact";
// import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from 'cdbreact';
import { NavLink } from "react-router-dom";
import Sidebar from "./sideBar";

function DataTable() {

  let token = localStorage.getItem("token");


  let [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    axios
      .get("https://gaudy-impossible-pulsar.glitch.me/getdata", { headers: { token: token } })
      .then((e) => {
        setList(e.data.message);
      });
  }, []);

  const filteredData = list.filter((item) =>
  item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) 
);


  const data = () => {
    let keyData = [];
    for (let i = 0; i < filteredData.length; i++) {
      let obj = {};
      obj.billno = i + 1;
      obj.name = filteredData[i].customerName;
      obj.id = filteredData[i]._id;
      obj.number = filteredData[i].number;
      obj.amount = filteredData[i].total;
      obj.paidAmount = filteredData[i].netTotal;
      let x = filteredData[i].createdAt;
      const dateObj = new Date(x);
      const y = dateObj.toISOString().slice(0, 10);
      obj.date = y;

      keyData.push(obj);
      // obj={}
    }

    return {
      columns: [
        {
          label: "Bill No",
          field: "billno",
          width: 100,
          attributes: {
            "aria-controls": "DataTable",
            "aria-label": "Name",
          },
        },
        {
          label: "Invoice Id ",
          field: "id",
          width: 250,
        },
        {
          label: "Customer Name ",
          field: "name",
          width: 150,
        },

        {
          label: "Customer Number ",
          field: "number",
          width: 100,
        },
        {
          label: "Bill amount ",
          field: "amount",
          width: 150,
        },
        {
          label: " Paid amount",
          field: "paidAmount",
          sort: "asc",
          width: 150,
        },
        {
          label: "Generated date",
          field: "date",
          sort: "disabled",
          width: 150,
        },
      ],

      rows: keyData,
    };
  };

  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <CDBContainer className="container">
        {/* generateinvoice */}
        <CDBCard>
          <NavLink  to="/billing">
            <Button type="submit" className="buttonOne">
              Create Invoice
            </Button>
          </NavLink>
          <CDBCardBody>
            <div className="search-container" style={{ margin: "0px 0px 0px 800px" }}>
              <input
                type="text"
                placeholder="Search by name.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CDBDataTable
              entriesOptions={[5, 10, 15]}
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
    </div>
  );
}

export default DataTable;
