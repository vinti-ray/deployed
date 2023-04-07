const mongoose=require("mongoose")

const employeeSchema=new mongoose.Schema({
    staffName:{
        type:String,
        required:true
    },
    number :{
        type:Number,
        required:true
    },

    email :{
        type:String,
        required:true
    },
    dateOfJoining :{
        type:Date,
        required:true
    },
    salary :{
        type:Number,
        required:true
    },
    image :{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }

},{timestamps:true})
module.exports=mongoose.model("employee",employeeSchema)