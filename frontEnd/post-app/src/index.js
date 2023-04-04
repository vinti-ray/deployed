import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component.js/Login";
import RegisterUser from "./component.js/registration";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
