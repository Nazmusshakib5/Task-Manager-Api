
const taskModel = require("../models/taskModel");
const createTaskService=async (req)=>{
    try{
        let body=req.body
        body.email=req.headers['email']
        let data=await taskModel.create(body)
        return {status:'success',msg:'Task Created Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'Task is not Created',err:e.toString()}
    }
}

 const deleteTaskService=async (req)=>{
    let id=req.params.id
    let email=req.headers['email']
    try{
        let data=await taskModel.deleteOne({_id:id,email:email})
        return {status:'success',msg:'Task Deleted Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'Task  is not Deleted',err:e.toString()}
    }
}

const updateTaskService=async (req)=>{
    let id=req.params.id
    let email=req.headers['email']
    let bodyData=req.body
    try{
        let data=await taskModel.updateOne({_id:id,email:email},bodyData)
        return {status:'success',msg:'Task Updated Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'Task  is not Updated',err:e.toString()}
    }
}

const taskListByStatusService=async (req)=>{
    let taskStatus=req.params.status
    try{
        let data=await taskModel.find({status:taskStatus})
        return {status:'success',msg:'Task Updated Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'Task  is not Updated',err:e.toString()}
    }
}


module.exports={
    createTaskService,
    deleteTaskService,
    updateTaskService,
    taskListByStatusService
}
