const userModel = require("../models/userModel");
const TokenHelper = require("../utility/TokenHelper");
const taskModel = require("../models/taskModel");
const userRegistrationService=async (req)=>{
    try{
        let body=req.body
        let data=await userModel.create(body)
        return {status:'success',msg:'User Created Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'user is not Created',err:e}
    }
}


const userLoginService=async (req)=>{
    try{
        let reqBody=req.body
        const user = await userModel.countDocuments(reqBody);
        if(user>0){
            const userID=await userModel.find({email:reqBody.email}).select('_id');
            const token=await TokenHelper.EncodeToken(reqBody.email,userID[0]['_id'].toString())
            return {status:'success',msg:'validOtp',userNo:user,token:token}

        }else{
            return {status:'failed',msg:'InvalidOtp'}
        }

    }catch (e) {
        return {msg:e.toString()}
    }
}

const userProfileUpdateService=async (req)=>{
    try{
        let email=req.headers['email']
        let bodyData=req.body
        let data=await userModel.updateOne({email:email},bodyData)
        return {status:'success',msg:'User Updated Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'User  is not Updated',err:e.toString()}
    }
}


module.exports={
    userRegistrationService,
    userLoginService,
    userProfileUpdateService
}
