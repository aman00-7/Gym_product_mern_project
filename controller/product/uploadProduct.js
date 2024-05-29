const uploadProductPermission = require("../../helper/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try{
      const sessionuserId=req.userId
      if(!uploadProductPermission(sessionuserId)){
        throw new Error("Permission required")
      }

      const UploadProduct=new productModel(req.body)
      const saveProduct=await UploadProduct.save()

      res.status(201).json({
        message:"Product upload successfully",
        error:false,
        success:true, 
        data:saveProduct
      })
    }catch(err){
        res.status(400).json({
            message:err.message||err,
            error:true,
            success:false
        })
    }
}

module.exports=UploadProductController