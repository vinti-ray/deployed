const billinModel=require("../model/billing")

const createBill=async(req,res)=>{
             let data=req.body
             console.log(data)
            //  let {customerName,number,item,quantity,discountedPrice,MRP,paymentMethod}=data

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
              const createData=await billinModel(data)
              return res.status(201).send({status:true,message:createData})



}
module.exports={createBill}