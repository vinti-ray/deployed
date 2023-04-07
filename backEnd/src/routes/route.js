const express=require("express")
const router=express.Router()
const {createData,login}=require("../controller.js/user")
const {createBill,getData}=require("../controller.js/billingController")
const{createInventory,getInventory}=require("../controller.js/inventory")
const {createEmployee}=require("../controller.js/employee")

router.post("/createuser",createData)
router.post("/login",login)
router.post("/createbill",createBill)
router.get("/getdata",getData)

router.post("/createInventory",createInventory)
router.get("/getinventory",getInventory)

router.post("/createemplyee",createEmployee)

module.exports=router