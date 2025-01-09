const userModel = require("../models/userModel");
const TokenHelper = require("../utility/TokenHelper");
const OtpModel = require("../models/otpModel");
const SendEmailUtility=require('../utility/SendEmailUtility')

const userRegistrationService=async (req)=>{
    try{
        let body=req.body
        let email=body['email']
        let queryData=await userModel.findOne({email:email})
        
        if(queryData){
            return {status:'fail',msg:'Email already exist'}
        }
        else{
            let data=await userModel.create(body)
            return {status:'success',msg:'User Created Successfully'}
        }
        
    }catch (e) {
        return {status:'failed',msg:'error happpened',err:e}
    }

}


const userLoginService=async (req)=>{
    try{
        let reqBody=req.body
        const user = await userModel.countDocuments(reqBody);
        if(user>0){
            let matchingStage={$match:{email:reqBody.email}}
            let projectionStage={$project:{'password':0}}
            const userID=await userModel.find({email:reqBody.email}).select('_id');
            const token=await TokenHelper.EncodeToken(reqBody.email,userID[0]['_id'].toString())
            const userData=await userModel.aggregate([
                matchingStage,
                projectionStage
            ])
            return {status:'success',msg:'validOtp',userData:userData,token:token}

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
const userProfileDetailsService=async (req)=>{
    try{
        let email=req.headers['email']
        let data=await userModel.find({email:email})
        return {status:'success',msg:'User Deatils Fetched Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'User  is not Found',err:e.toString()}
    }
}

//Recovery Password

const recoverVerifyEmailService=async (req)=>{
        let email = req.params.email;
        let OTPCode = Math.floor(100000 + Math.random() * 900000)

    try{
        const user = await userModel.countDocuments({email:email});
        if(user>0){
        
            let CreateOTP = await OtpModel.create({email: email, otp: OTPCode})
            let SendEmail = await SendEmailUtility(email,"Your PIN Code is= "+OTPCode,"Task Manager PIN Verification")
    
            return {status:'success',msg:'Email Sent Succesfully'}

        }
        else{
            return {status:'failed',msg:'Email is not Sent'}
        }

    }catch (e) {
        return {status:'failed',msg:e.toString()}
    }
}


const recoverVerifyOTPService=async (req)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;
    try {
        let OTPCount = await OtpModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}, {$count: "total"}])
        if (OTPCount.length>0) {
            let OTPUpdate = await OtpModel.updateOne({email: email, otp: OTPCode, status: status}, {
                email: email,
                otp: OTPCode,
                status: statusUpdate
            })
            return {status:'success',msg:'OTP updated Successfully'}
        } 
        else {
            return {status:'failed',msg:'Invalid OTP Code'}
    
        }
    }
    catch (e) {
        return {status:'error',msg:'OTP Error',err:e.toString()}
    }
}


const recoverResetPassService=async (req)=>{
    let email = req.body['email'];
    let OTPCode = req.body['otp'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    try {
        let OTPUsedCount = await OtpModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])
        if (OTPUsedCount.length>0) {
            let PassUpdate = await userModel.updateOne({email: email}, {
                password: NewPass
            })
            return {status:'success',msg:'Password updated Successfully'}
        } else {
            return {status:'failed',msg:'Invalid OTP Code'}
        }
    }
    catch (e) {
        return {status:'error',msg:'Password recovery Error',err:e.toString()}
    }
}


module.exports={
    userRegistrationService,
    userLoginService,
    userProfileUpdateService,
    userProfileDetailsService,
    recoverVerifyEmailService,
    recoverVerifyOTPService,
    recoverResetPassService
}
