const addToCartModel = require("../../models/cartProduct")

const deletedAddToCartProduct=async(req,res)=>{
    try{
       const currentUserId=req.currentUserId
       const addCartProductId=req.body._id

       const deleteProduct=await addToCartModel.deleteOne({_id:addCartProductId})
 
       res.json({
        message:"Product Deleted To Cart",
        error:false,
        success:true,
        data:deleteProduct
       })      

    }catch(err){
        res.json({
            message:err?.message||err,
            error:true,
            success:false,
        })
    }
}

module.exports=deletedAddToCartProduct