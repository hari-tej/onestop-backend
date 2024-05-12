const express= require('express');
const register=require('../models/register');
const second=require('../models/second');
const secondimage=require('../models/second-image');
const thirdimage=require('../models/third-image');
const fourthimage=require('../models/fourth-image');
const third=require('../models/third');
const fourth=require('../models/fourth');
const place=require('../models/placement');
const Admin= require('../models/admin-register');
const alumni=require('../models/alumni');
const router= express.Router();
const jwt=require("jsonwebtoken");
require('dotenv').config();

router.get('/admin',async(req,res)=>{
  const token= req.headers.authorization.split(" ")[1];
  jwt.verify(token,process.env.JWT_ADMIN_SECRET_KEY,async(err,decoded)=>{
    if(err){
      return res.status(400).json({message:'unauthorized'});
    }
    try{
      const user=await Admin.findById(decoded.id);
      if(!user){
          return res.status(404).json({message:"user not found"});
      }
       
       res.json(token);

    }catch(err){
      console.log(err);
      res.status(500).json({message:"internal server error"});
    }
  }); 
})


router.get('/admin/register/read',async(req,res)=>{
      try{
         const user=await register.find();
         res.send(user);

      }catch(err){

        console.log(err);
        res.status(500).json({message:"server error"});
      }
});
router.get('/admin/second/read',async(req,res)=>{
  try{
     const user=await second.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});

router.get('/admin/secondurl/read',async(req,res)=>{
  try{
     const user=await secondimage.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});


router.get('/admin/third/read',async(req,res)=>{
  try{
     const user=await third.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});

router.get('/admin/thirdurl/read',async(req,res)=>{
  try{
     const user=await thirdimage.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});
router.get('/admin/fourth/read',async(req,res)=>{
  try{
     const user=await fourth.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});
router.get('/admin/fourthurl/read',async(req,res)=>{
  try{
     const user=await fourthimage.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});
router.get('/admin/placement/read',async(req,res)=>{
  try{
     const user=await place.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});

router.put('/admin/register/update',async(req,res)=>{
      const id=req.body.id;
      const username=req.body.username;
      const rollno=req.body.rollno;
      const batch=req.body.batch;
      const email=req.body.email;
      try{
        const updateuser= await register.findById(id);
         updateuser.name=username;
         updateuser.rollno=rollno;
         updateuser.batch=batch;
         updateuser.email=email;

         updateuser.save();
         res.status(200).json({message:"details updated successfully"});


      }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
      }
});

router.delete('/admin/register/delete/:id',async(req,res)=>{
    const id=req.params.id;
    try{
       const user= await register.findByIdAndDelete(id).exec();
       res.status(200).json({message:"entry deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.delete('/admin/second/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await second.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

router.delete('/admin/secondurl/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await secondimage.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});


router.delete('/admin/third/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await third.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

router.delete('/admin/thirdurl/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await thirdimage.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});
router.delete('/admin/fourth/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await fourth.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

router.delete('/admin/fourthurl/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await fourthimage.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

router.delete('/admin/placement/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await place.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

router.get('/admin/alumni/read',async(req,res)=>{
  try{
     const user=await alumni.find();
     res.send(user);

  }catch(err){

    console.log(err);
    res.status(500).json({message:"server error"});
  }
});

router.delete('/admin/alumni/delete/:id',async(req,res)=>{
  const id=req.params.id;
  try{
     const user= await alumni.findByIdAndDelete(id).exec();
     res.status(200).json({message:"entry deleted successfully"});

  }catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});
module.exports=router;
