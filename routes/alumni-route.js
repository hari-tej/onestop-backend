const express= require('express');
const Alumni=require('../models/alumni')
const router= express.Router();
const register=require('../models/register');
const middleware= require('../verify')
const jwt=require("jsonwebtoken");
require('dotenv').config();

router.get('/alumni',async(req,res)=>{
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
router.get('/alumni/read',async(req,res)=>{
    await Alumni.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
});

router.post('/alumni/post',async(req,res)=>{
    const userid=req.body.userid;
    const name=req.body.name;
    const rollno=req.body.rollno;
    const imageurl=req.body.imageurl;
    const personname=req.body.personname;
    const personbatch=req.body.personbatch;
    const company=req.body.company;
    const role=req.body.role;
    const pack=req.body.pack;
    const location=req.body.location;
    const instagram=req.body.instagram;
    const linkedin=req.body.linkedin;
    const personalemail=req.body.personalemail;
   


    const user= await Alumni.create({userid:userid,name:name,rollno:rollno,imageurl:imageurl,personname:personname,personbatch:personbatch,company:company,role:role,pack:pack,location:location,instagram:instagram,linkedin:linkedin,personalemail:personalemail});
   try{
      user.save();
      await register.findByIdAndUpdate(userid,{ $inc: {placementcontri:1} });
      res.send("entry added");
   }catch(err){
       console.log(err);
   }
});

router.delete('/alumni/:id',async(req,res)=>{
    const id= req.params.id;
    try{
        const user= await Alumni.findByIdAndDelete(id).exec();
        await register.findByIdAndUpdate("662b6aaad4d45611e59e98ff",{$inc:{placementcontri:-1}});
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.put('/alumni/update',async(req,res)=>{
    const id=req.body.id;
    const personname=req.body.personname;
    const personbatch=req.body.personbatch;
    const company=req.body.company;
    const role=req.body.role;
    const pack=req.body.pack;
    const location=req.body.location;
    const instagram=req.body.instagram;
    const linkedin=req.body.linkedin;
    const personalemail=req.body.personalemail;
    try{
        const user= await Alumni.findById(id);
        user.personname=personname;
        user.personbatch=personbatch;
        user.company=company;
        user.role=role;
        user.pack=pack;
        user.location=location,
        user.instagram=instagram,
        user.linkedin=linkedin,
        user.personalemail=personalemail,
       
        await user.save();
        res.status(200).json({message:"updated successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

module.exports=router;