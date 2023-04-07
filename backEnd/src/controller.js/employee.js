const employeeModel=require("../model/employSchema")
const {uploadFile}=require("../aws/aws")

const createEmployee=async(req,res)=>{
    let data=req.body
    console.log(data);
    let {   staffName,  number,email,image,  dateOfJoining, salary, department  } =data
    let files=req.files
  if(!staffName) return res.status(400).send({status:false,message:"please upload staff name"})
  if(!number) return res.status(400).send({status:false,message:"please upload staff number"})
  if(!email) return res.status(400).send({status:false,message:"please upload staff email"})
  if(!dateOfJoining) return res.status(400).send({status:false,message:"please upload staff dateOfJoining"})
  if(!salary) return res.status(400).send({status:false,message:"please upload staff salary"})
  if(!department) return res.status(400).send({status:false,message:"please upload staff department"})
    // if (files&&files.length!=0) {
    //     data.image=files
    // }

    // if (Object.keys(req.body).length == 0) 
    //     return res.status(400).send({ status: false, message: "Please Enter data in body" })
    console.log(files);

//    if(files&&files.length>0){
    let uploadFileUrl=await uploadFile(image)
    data.image=uploadFileUrl
//    }else{
//        return res.status(400).send({status:false,message:"please upload image"})
//     }
    
   const createData=await employeeModel.create(data)
   return res.status(201).send({status:true,message:createData})

}
module.exports={createEmployee}