const express=require("express")
const router=express.Router()
const {createData,login}=require("../controller.js/user")

router.post("createuser",createData)
router.post("login",login)

module.exports=router