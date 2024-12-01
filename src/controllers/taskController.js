
const { createTaskService,
        deleteTaskService,
        updateTaskService,
        taskListByStatusService
} = require("../services/taskServices");
exports.createTask=async (req, res)=>{
    const data=await createTaskService(req)
    return res.status(200).json({data:data})
}
exports.deleteTask=async (req, res)=>{
    const data=await deleteTaskService(req)
    return res.status(200).json({data:data})
}
exports.updateTask=async (req, res)=>{
    const data=await updateTaskService(req)
    return res.status(200).json({data:data})
}
exports.listTaskByStatus=async (req, res)=>{
    const data=await taskListByStatusService(req)
    return res.status(200).json({data:data})
}