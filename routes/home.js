const express= require('express');
const router= express.Router();
const register=require('../models/register');
const home=require('../models/home');
const jwt=require('jsonwebtoken');
require('dotenv').config();

router.get('/home',async(req,res)=>{
  const token= req.headers.authorization.split(" ")[1];
  jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,decoded)=>{
    if(err){
      return res.status(400).json({message:'unauthorized'});
    }
    try{
      const user=await register.findById(decoded.id);
      if(!user){
          return res.status(404).json({message:"user not found"});
      }
       res.json(user);

    }catch(err){
      console.log(err);
      res.status(500).json({message:"internal server error"});
    }
  }); 
});

router.post('/home/post',async(req,res)=>{
  const userid=req.body.userid;
  const name=req.body.name;
  const rollno=req.body.rollno;
  const description=req.body.description;
  const link=req.body.link;
  const imageurl=req.body.imageurl;
  const user= await home.create({userid:userid,name:name,rollno:rollno,description:description,link:link,imageurl:imageurl});
  try{
      user.save();
      res.send("url added");
  }catch(err){
      console.log(err);
  }

});

router.get('/home/read',async(req,res)=>{
  await home.find().then((result,err)=>{
      if(err){
          return res.send(err);
      }else{
          return res.send(result);
      }
  });
});

router.delete('/home/delete/:id',async(req,res)=>{
  const id= req.params.id;
  try{
      const user= await home.findByIdAndDelete(id).exec();
      res.status(200).json({message:"deleted successfully"});
  }
  catch(err){
      console.log(err);
      res.status(500).json({message:"server error"});
  }
});

module.exports=router;