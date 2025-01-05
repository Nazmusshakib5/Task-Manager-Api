const {userRegistrationService,userLoginService,userProfileUpdateService}=require('../services/userServices')
const userModel = require("../models/userModel");

exports.UserRegistration=async (req,res)=>{
    // const data=await userRegistrationService(req,res)
    // console.log(data)
    // // if(data['err']['keyPattern']['email']){
    // //     return res.status(200).json({registration:"fail",data:data}) 
    // // }
    // return res.status(200).json({data:data})

    try {
        let reqBody = req.body;

        // Attempt to create the user
        const data = await userModel.create(reqBody);

        // If creation succeeds
        res.status(200).json({
            status: "success",
            msg: "User Created Successfully",
            data: data
        });
    } catch (err) {
        // Handle duplicate key error (MongoDB error code 11000)
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            res.status(200).json({
                status: "fail",
                msg: "Email already exists",
                data: null
            });
        } else {
            // Handle other errors
            res.status(500).json({
                status: "error",
                msg: "An unexpected error occurred",
                error: err.message || err
            });
        }
    }
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

