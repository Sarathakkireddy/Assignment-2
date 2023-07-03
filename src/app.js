const express = require('express');
const app = express();
const UserRoute = require('./routes/UserRoute');
const dotenv = require("dotenv").config();
const PostsRoute = require('./routes/PostsRoute');
const jwt = require("jsonwebtoken");
const {protect}=require('./middleware/authMiddleware')
const userModel= require('./models/Users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/posts',protect);
app.use('/user', UserRoute);
app.use('/posts',PostsRoute);
app.get('*',(req,res)=>{
    
    res.status(404).json({
        status:"Failed",
        message: "API not found"
    })
})
module.exports = app;
