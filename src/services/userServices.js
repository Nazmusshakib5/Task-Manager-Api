const userModel = require("../models/userModel");
const TokenHelper = require("../utility/TokenHelper");
const userRegistrationService=async (req)=>{
    try{
        let body=req.body
        let data=await userModel.create(body)
        return {status:'success',msg:'User Created Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'user is not Created',err:e.toString()}
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
    let email=req.headers.email
    return {status:'success',email:email}
}


module.exports={
    userRegistrationService,
    userLoginService,
    userProfileUpdateService
}
