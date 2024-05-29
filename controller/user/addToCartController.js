const addToCartModel=require("../../models/cartProduct")

const addToCartController=async(req,res)=>{
    try{
      const {productId}=req?.body
      const currentUser=req.userId
      
     const isProductAvalible=await addToCartModel.findOne({productId})
     if(isProductAvalible){
        return res.json({
            message:"Already exit prodct in cart",
            success:false,
            error:true
        })
      }

      const payload={
        productId:productId,
        quantity:1,
        userId:currentUser,
      }

    const newAddCart=new addToCartModel(payload)

    const saveProduct=await newAddCart.save()

    return res.json({
        data:saveProduct,
        message:"Product Added To Cart",
        success:true,
        error:false
    })

    }catch(err){
        res.json({
            message:err?.message||err,
            error:true,
            success:false
        })
    }
}

module.exports=addToCartController