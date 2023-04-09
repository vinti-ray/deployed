const billinModel=require("../model/billing")

const createBill=async(req,res)=>{
             let data=req.body
             console.log(data)
             let {customerName,number,item,organisationId,paymentMethod}=data
             if(!customerName) return res.status(400).send({status:false,message:"please provide customer name"})
             if(!number) return res.status(400).send({status:false,message:"please provide customer number"})
            //  if(typeof number!=="number") return res.status(400).send({status:false,message:"please provide customer number in number format"})
             if(item.length<1) return res.status(400).send({status:false,message:"please provide item"})
             
             if(!organisationId) return res.status(400).send({status:false,message:"please provide organisationId"})
             
             if(!paymentMethod) return res.status(400).send({status:false,message:"please provide paymentMethod"})
             
            // for(let i=0;i<item.length.length;i++){
            //    if(typeof item[i].MRP!=="number") return res.status(400).send({status:false,message:"please provide mrp number in number format"})
            //    if(typeof item[i].quantity!=="number") return res.status(400).send({status:false,message:"please provide quantity in number format"})
            //    if(typeof item[i].discountedPrice!=="number") return res.status(400).send({status:false,message:"please provide discount in number format"})
            // }
             

            //  //subtracting discount from main value
            //  let discountAmount=[]
            //  for(let i=0;i<MRP.length;i++){
            //   let x= MRP[i]-(MRP[i]*(discountedPrice[i]/100))
             
            //   discountAmount[i]=x
            //  }
            //  //value of each item
            // let value=[]
            //   for(let i=0;i<item.length;i++){
            //     let x=item[i]
            //     value[i]=quantity[i]*discountAmount[i]
            //   }

            //    data.value=value
            //    //total price
            //    let total=0
            //    for(let i=0;i<value.length;i++){
            //      total+=value[i]
            //    }
            //    data.total=total
            // //calculatin gst
            // // 1,000+ (1,000X(18/100)) = 1,000+180 = Rs. 1,180
            //     let GST=18
            //     data.GST=GST
            //     let amountToPay=total+(total*(GST/100))
            //     data.amountToPay=amountToPay



               //creating data in database
              const createData=await billinModel.create(data)
              return res.status(201).send({status:true,message:createData})



}

const getData=async(req,res)=>{
   try {
      // let token=req.headers["token"]
      let organisationId=req.decode.id
      // console.log(req.decode.id);
      const getData=await billinModel.find({organisationId:organisationId}).lean()
      if(!getData) return res.status(500).send({status:false, message:"no data present in data base"})
      for(let i=0;i<getData.length;i++){
         let x=getData[i].total
         getData[i].total=x.toFixed(2)
         let y=getData[i].netTotal
         getData[i].netTotal=y.toFixed(2)
      }
      return res.status(201).send({status:true,message:getData})
   } catch (error) {
      return res.status(500).send({status:false, message:error.message})
   }
}
module.exports={createBill,getData}