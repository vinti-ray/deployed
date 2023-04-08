const express=require("express")
const router=express.Router()
const {createData,login}=require("../controller.js/user")
const {createBill,getData}=require("../controller.js/billingController")
const{createInventory,getInventory}=require("../controller.js/inventory")
const {createEmployee,getEmployee}=require("../controller.js/employee")
const {auth}=require("../middleware/auth")
const {getSaleData}=require("../controller.js/saleController")

router.post("/createuser",createData)
router.post("/login",login)

router.post("/createbill",auth,createBill)
router.get("/getdata",auth,getData)

router.post("/createInventory",auth,createInventory)
router.get("/getinventory",auth,getInventory)

router.post("/createemplyee",auth,createEmployee)
router.get("/getemployee",auth,getEmployee)

router.get("/getSaleData",auth,getSaleData)
module.exports=router