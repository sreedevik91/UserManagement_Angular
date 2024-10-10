const express = require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const route=require('./routes/userRoutes')
const cors=require('cors')

const app=express()

dotenv.config()

const connectDb=mongoose.connect(process.env.MONGO_URL)
connectDb.then(()=>{
    console.log('db connected');
}).catch((error)=>{
    console.log(error.message);
})

app.use('/',route)

app.listen(process.env.PORT || 4000, ()=>{
    console.log('Server running at port 4000');
})