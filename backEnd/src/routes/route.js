const express=require("express")
const router=express.Router()
const {createData,login}=require("../controller.js/user")
const {createBill}=require("../controller.js/billingController")

router.post("/createuser",createData)
router.post("/login",login)
router.post("/createbill",createBill)

module.exports=router