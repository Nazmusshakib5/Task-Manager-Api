const {
    userRegistrationService,
    userLoginService,
    userProfileUpdateService,
    userProfileDetailsService,
    recoverVerifyEmailService,
    recoverVerifyOTPService,
    recoverResetPassService
}=require('../services/userServices')
const userModel = require("../models/userModel");

exports.UserRegistration=async (req,res)=>{
    const data=await userRegistrationService(req)
    return res.status(200).json({data:data})

}

exports.UserLogin=async (req,res)=>{
    const data=await userLoginService(req)
    if(data['status']==='success'){
        let cookieOption={expires:new Date(Date.now()+24*6060*1000),httponly:false}
        res.cookie('token',data['token'],cookieOption)
        return res.status(200).json(data);
    }
    else {
        return res.status(200).json(data);
    }
}

//user Logout managed Here

exports.UserLogout=async (req,res)=>{
    let cookieOption={expires:new Date(Date.now()-24*6060*1000),httponly:false}
    res.cookie('token','',cookieOption)
    return res.status(200).json({msg:'successfully logged out'});

}

exports.userProfileUpdate=async (req,res)=>{
    const  data=await userProfileUpdateService(req)
    return res.status(200).json({data:data})
}

exports.userProfileDetails=async (req,res)=>{
    const  data=await userProfileDetailsService(req)
    return res.status(200).json({data:data})
}

//Recovery Password

exports.RecoverVerifyEmail=async (req,res)=>{
    const  data=await recoverVerifyEmailService(req)
    return res.status(200).json({data:data})
}


exports.RecoverVerifyOTP=async (req,res)=>{
    const  data=await recoverVerifyOTPService(req)
    return res.status(200).json({data:data})
}

exports.RecoverResetPass=async (req,res)=>{
    const  data=await recoverResetPassService(req)
    return res.status(200).json({data:data})
}
