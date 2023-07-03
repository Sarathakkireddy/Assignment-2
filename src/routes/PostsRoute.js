const router= require('express').Router();
const userModel= require('../models/Users');
const postModel= require('../models/Posts');
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

router.get('/',async (req,res)=>{
   const posts= await postModel.find();
   res.json({
    posts
   })
})
router.post('/',async (req,res)=>{
    try{
    const post=await postModel.create({title: req.body.title,
        body: req.body.body,
        image:req.body.image,
        user: req.user});
    res.json({post});
    }catch(e){
        res.json({message:e.message});
    }
})
router.put('/:postId',async (req,res)=>{
    try{
    const postId=req.params.postId;
    const postToUpdate = await postModel.findById(postId);
    if (!req.user.equals(postToUpdate.user._id)) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      const post = await postModel.findByIdAndUpdate(postId, req.body);
      res.json({
        status: "Successfully updated",
        post
      });
    } 
    }catch(e){
    res.json({message:e.message});
    }
})

router.delete('/:postId',async (req,res)=>{
    try{
        const postId = req.params.postId;
        const postToDelete = await postModel.findById(postId);
        if (!req.user.equals(postToDelete.user._id)) {
          res.status(401).json({
            message: "Unauthorized",
          });
        } else {
          const post = await postModel.findByIdAndDelete(postId);
          res.json({
            status: "Successfully deleted",
          });
        }
    }catch(e){
        res.json({message:e.message});
    }
})


module.exports = router;