const router= require('express').Router();
const userModel= require('../models/Users');
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { hashed, match } = require("../utils/passHash");

const generateToken=(id) => {
    return jwt.sign({ id }, process.env.secret, { expiresIn: "1h" });
  };

router.post('/register',async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const hashedPass = hashed(password);
        const user = await userModel.create({ name, email, password: hashedPass });
        res.status(201).json(user);
    }catch(e){
        res.status(400).json({ message: e.message });
    }
})
router.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await userModel.findOne({ email });
        if (match(password, user.password)) {
          res.status(200).json({
           token: generateToken(user.id),
          });
        } else {
          res.status(400).json({ 
            status: "failed",
            message: "Wrong Password" });
        }
    }catch(e){
        res.status(400).json({ message: e.message });
    }
})

module.exports = router;