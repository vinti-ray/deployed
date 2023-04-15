import Login from "./component.js/Login";
import RegisterUser from "./component.js/registration";
import Billing from "./componentBilling.js/billing";
import Invoice from "./componentBilling.js/showBiliing";
import HomePage from "./componentBilling.js/homepage";
import Sidebar from "./componentBilling.js/sideBar";
import Inventory from "./componentInventiry.js/inventoryCreate";
import InventoryHome from "./componentInventiry.js/inventoryShow";
import EmployeeHome from "./employeeComponent/showEmploy";
import Employee from "./employeeComponent/createEmployee";
import SaleHome from "./SaleComponent/ShowSaleData";
import ShowUser from "./updateComponent/ShowOrganisation";
import EditOrg from "./updateComponent/EditOrg";
import PaytmPayment from "./paytmComponet/paytm";
import GooglePyment from "./paytmComponet/googlePay";
import EmailVerify from "./forgetPassword.js/forgetPassword";
import EnterOtp from "./forgetPassword.js/enterOtp";
import PasswordResetPage from "./forgetPassword.js/emailReset";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
 

    <BrowserRouter>

      <Routes >
      <Route path="/" element={<HomePage />} />
        {/* <Route path="/billing" element={<Billing />} /> */}
        <Route path="/billing" element={<Invoice />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventoryhome" element={<InventoryHome />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employeeHome" element={<EmployeeHome />} />
        <Route path="/salehome" element={<SaleHome />} />
        <Route path="/organisationprofile" element={<ShowUser />} />
        <Route path="/updateOrganisation" element={<EditOrg />} />
        <Route path="/paytm" element={<PaytmPayment />} />
        <Route path="/google" element={<GooglePyment />} />
        <Route path="/emailverify" element={<EmailVerify />} />
        <Route path="/otpverify" element={<EnterOtp />} />
        <Route path="/passwordresetpage" element={<PasswordResetPage />} />

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
