import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component.js/Login";
import RegisterUser from "./component.js/registration";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Billing from "./componentBilling.js/billing";
import Invoice from "./componentBilling.js/showBiliing";
import Sidebar from "./componentBilling.js/homepage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>

    <Routes>
    <Route path="/" element={<Sidebar />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/abc" element={<Invoice />} />
    </Routes>
  </BrowserRouter>
);
