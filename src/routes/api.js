const express=require('express')
const authVerifyMiddleware=require('../middlewares/authVerifyMiddleware')

const userController=require('../controllers/userController')
const taskController=require('../controllers/taskController')


const router=express.Router()

router.post('/createUser',userController.UserRegistration)
router.get('/login',userController.UserLogin)
router.get('/logout',userController.UserLogout)


router.get('/updateProfile',authVerifyMiddleware,userController.userProfileUpdate)

router.post('/createTask',authVerifyMiddleware,taskController.createTask)
router.post('/updateTask/:id',authVerifyMiddleware,taskController.updateTask)
router.get('/deleteTask/:id',authVerifyMiddleware,taskController.deleteTask)
router.get('/listByStatus/:status',authVerifyMiddleware,taskController.listTaskByStatus)


module.exports=router;