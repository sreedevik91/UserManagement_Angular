const userModel = require('../model/userModel')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()

const loadAddUser = async (req, res) => {
    try {
        res.json('load user works')
    } catch (error) {
        console.log(error.message);

    }
}

const addUser = async (req, res) => {
    try {
        console.log(req.body);

        const user = new userModel(req.body)
        const result = await user.save()
        console.log(result);
        if (result) {
            res.send({ success: true })
            console.log('user created');

        } else {
            res.send({ success: false })
            console.log('user not created');
        }

    } catch (error) {
        console.log(error.message);

    }
}

const verifyLogin=async (req,res)=>{
try {
    const {username , password}=req.body
    const user =await userModel.findOne({username,password})
    console.log('user: ', user);

    if(user.username===username && user.password===password){
    const payload={
        id:user._id,
        username:user.username,
        isAdmin:user.isAdmin
    }

    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'30m'})
    res.json({login:'success',token})
}else{

    }
    
} catch (error) {
    console.log(error.message);
    
}
}

const getUser = async (req, res) => {
    try {
        // const id=req.params.id

        const { id } = req.userTokenData
        console.log('userId: ',id);
        console.log('userTokenData: ',req.userTokenData);
        
        const user = await userModel.findOne({ _id:id})
        console.log("user: ",user);
        
        if (user) {
            res.json({ success: true, data: user })
        } else {
            console.log({ success: false, message: 'Could not get user' });
        }
    } catch (error) {

        console.log(error.message);

    }
}

const getUserById = async (req, res) => {
    try {
    
        const { id } =req.params
        console.log('userId: ',id);
        
        const user = await userModel.findOne({ _id:id})
        console.log("user: ",user);
        
        if (user) {
            res.json({ success: true, data: user })
        } else {
            console.log({ success: false, message: 'Could not get user' });
        }
    } catch (error) {

        console.log(error.message);

    }
}

const getUsers = async (req, res) => {
    try {
        const user = await userModel.find({})

        console.log('All Uaers: ', user);
        
        if (user) {
            res.json({ success: true, data: user })
        } else {
            console.log({ success: false, message: 'Could not get users' });
        }
    } catch (error) {
        console.log(error.message);

    }
}

const updateUser = async (req, res) => {
    try {
        // const id=req.params.id
        // const {usename,email,mobile,password}=req.body

        const { id } = req.params
        // const user = await userModel.findOne({ _id: id })
        // const newValue={...user,...req.body}
        const userUpdate = await userModel.updateOne({ _id: id },{$set:req.body})
        if (userUpdate.modifiedCount>0) {
            res.json({ success: true, data: user })
        } else {
            console.log({ success: false, message: 'Could not update user' });
            res.json({ success: false, message: 'Could not update user' })
        }
    } catch (error) {
        console.log(error.message);

    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const userDelete = await userModel.deleteOne({ _id: id })
        
        if (userDelete.deletedCount>0) {
            res.send({ success: true, data: userDelete })
        } else {
            console.log({ success: false, message: 'Could not delete user' });
        }
    } catch (error) {
        console.log(error.message);

    }
}


module.exports = {
    loadAddUser,
    addUser,
    verifyLogin,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById
}