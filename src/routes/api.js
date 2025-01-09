const express=require('express')
const authVerifyMiddleware=require('../middlewares/authVerifyMiddleware')

const userController=require('../controllers/userController')
const taskController=require('../controllers/taskController')


const router=express.Router()

router.post('/createUser',userController.UserRegistration)
router.post('/login',userController.UserLogin)
router.get('/logout',userController.UserLogout)


router.post('/updateProfile',authVerifyMiddleware,userController.userProfileUpdate)
router.get('/profileDetails',authVerifyMiddleware,userController.userProfileDetails)

router.get("/recoverVerifyEmail/:email",userController.RecoverVerifyEmail);
router.get("/recoverVerifyOTP/:email/:otp",userController.RecoverVerifyOTP);
router.post("/recoverResetPass",userController.RecoverResetPass);

router.post('/createTask',authVerifyMiddleware,taskController.createTask)
router.post('/updateTask/:id',authVerifyMiddleware,taskController.updateTask)
router.get('/deleteTask/:id',authVerifyMiddleware,taskController.deleteTask)
router.get('/listByStatus/:status',authVerifyMiddleware,taskController.listTaskByStatus)
router.get('/dashboardTaskStatus',authVerifyMiddleware,taskController.dashboardTaskStatus)


module.exports=router;