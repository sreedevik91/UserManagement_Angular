const mongoose= require("mongoose");

const user=mongoose.Schema({
    username: {
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('user',user)