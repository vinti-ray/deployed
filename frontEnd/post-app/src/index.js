import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component.js/Login";
import RegisterUser from "./component.js/registration";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
// import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import Billing from "./componentBilling.js/billing";
import Invoice from "./componentBilling.js/showBiliing";
import HomePage from "./componentBilling.js/homepage";
import Sidebar from "./componentBilling.js/sideBar";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>

  <BrowserRouter>

    <Routes >
    <Route path="/register" element={<RegisterUser />} />
  <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  <App/>
  </>
);
