
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
    let email=req.headers['email']
    let taskStatus=req.params.status
    try{
        let data=await taskModel.find({email:email,status:taskStatus})
        return {status:'success',msg:'Task Updated Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'Task  is not Updated',err:e.toString()}
    }
}

const dashboardTaskStatusService=async(req)=>{
    let email=req.headers['email']
    try{
        let newTask=await taskModel.countDocuments({email:email,status:'new'})
        let completedTask=await taskModel.countDocuments({email:email,status:'completed'})
        let canceledTask=await taskModel.countDocuments({email:email,status:'canceled'})
        let progressTask=await taskModel.countDocuments({email:email,status:'progress'})

        let data=[
            {
                taskName:'New',
                count:newTask
            },
            {
                taskName:'Completed',
                count:completedTask
            },
            {
                taskName:'Canceled',
                count:canceledTask
            },
            {
                taskName:'Progress',
                count:progressTask
            }
        ]
                
        return {status:'success',msg:'Task Counted Successfully',data:data}
    }catch (e) {
        return {status:'failed',msg:'Task  is not Updated',err:e.toString()}
    }
}


module.exports={
    createTaskService,
    deleteTaskService,
    updateTaskService,
    taskListByStatusService,
    dashboardTaskStatusService
}
