const express=require('express')    
const router= express.Router()
const userController= require('../controllers/userController')
const bodyParser= require('body-parser')
const cors=require('cors')
const tokenMiddleware=require('../middleware/verifyToken')


const userRoute=express()

userRoute.use(express.json())
userRoute.use(cors())


// app.use(express.json())
// app.use(cors({
//     origin:'http://localhost:4200',
//     methods:'GET,POST,PUT,DELETE,PATCH',
//     allowedHeaders:'Content-Type,Authorization'
// }))

userRoute.use(bodyParser.urlencoded({extended:true}))

userRoute.route('/').get((req,res)=>{
    console.log('done');
    res.send('welcome')
})

userRoute.route('/addUser')
.get(userController.loadAddUser)
.post(userController.addUser)

// userRoute.route('/login').post(userController.userLogin)
// userRoute.route('/profile/:id').get(tokenMiddleware,userController.getUser)

userRoute.route('/profile').get(tokenMiddleware,userController.getUser)
userRoute.route('/userDetails/:id').get(tokenMiddleware,userController.getUserById)
userRoute.route('/users').get(tokenMiddleware,userController.getUsers)
userRoute.route('/login').post(userController.verifyLogin)
userRoute.route('/updateProfile/:id').post(userController.updateUser)
userRoute.route('/deleteUser/:id').delete(userController.deleteUser)


module.exports=userRoute