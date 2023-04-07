import Login from "./component.js/Login";
import RegisterUser from "./component.js/registration";
import Billing from "./componentBilling.js/billing";
import Invoice from "./componentBilling.js/showBiliing";
import HomePage from "./componentBilling.js/homepage";
import Sidebar from "./componentBilling.js/sideBar";
import Inventory from "./componentInventiry.js/inventoryCreate";
import InventoryHome from "./componentInventiry.js/inventoryShow";
import Employee from "./employeeComponent/createEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
 

    <BrowserRouter>
        <div className='sidebar'>
          <Sidebar/>
        </div>
      <Routes >
      <Route path="/" element={<HomePage />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/abc" element={<Invoice />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventoryhome" element={<InventoryHome />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </BrowserRouter>

    // <BrowserRouter>
    // <Routes>


    //     <Route path="/register" element={<RegisterUser />} />
    //   <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>

  );
}

export default App;
