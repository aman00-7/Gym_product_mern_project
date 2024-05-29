const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try{
      const {email,password,name}=req.body
      
      const user=await userModel.findOne({email})

      if(user){
        throw new Error("Already user exits")
      }

      if(!name){
        throw new Error("please enter name")
      }
      if(!email){
        throw new Error("please enter email")
      }
      if(!password){
        throw new Error("please enter password")
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword =await bcrypt.hashSync(password, salt);
     
      if(!hashPassword){
        throw new Error("somthing is wrong")
      }

      const payload={
        ...req.body,
        role:"GENERAL",
        password:hashPassword
      }

      const userData=new userModel(payload)
      const saveUser=await userData.save()

      res.status(201).json({
        data:saveUser,
        success:true,
        error:false,
        message:"user created successfuly"
      })

    }catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false
        })
    }
}

module.exports=userSignUpController