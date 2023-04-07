const mongoose=require("mongoose")

const inventorySchema=new mongoose.Schema({
    brandName:{
        type:String,
        required:true
    },
    itemName :{
        type:String,
        required:true
    },

    itemQuantity :{
        type:Number,
        required:true
    }

},{timestamps:true})
module.exports=mongoose.model("inventory",inventorySchema)