const express= require('express');
const place=require('../models/placement')
const router= express.Router();
const register=require('../models/register');
const middleware= require('../verify')
const jwt=require("jsonwebtoken");
require('dotenv').config();

router.get('/place',async(req,res)=>{
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
router.get('/place/read',async(req,res)=>{
    await place.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
});

router.post('/place/post',async(req,res)=>{
    const userid=req.body.userid;
    const name=req.body.name;
    const rollno=req.body.rollno;
    const company=req.body.company;
    const role=req.body.role;
    const pack=req.body.pack;
    const rounds=req.body.rounds;
    const difficulty=req.body.difficulty;
    const details=req.body.details;
   


    const user= await place.create({userid:userid,name:name,rollno:rollno,company:company,role:role,pack:pack,rounds:rounds,difficulty:difficulty,details:details});
   try{
      user.save();
      await register.findByIdAndUpdate(userid,{ $inc: {placementcontri:1} });
      res.send("entry added");
   }catch(err){
       console.log(err);
   }
});

router.delete('/place/:id',async(req,res)=>{
    const id= req.params.id;
    try{
        const user= await place.findByIdAndDelete(id).exec();
        await register.findByIdAndUpdate("662b6aaad4d45611e59e98ff",{$inc:{placementcontri:-1}});
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.put('/place/update',async(req,res)=>{
    const id=req.body.id;
    const company=req.body.company;
    const role=req.body.role;
    const pack=req.body.pack;
    const rounds=req.body.rounds;
    const difficulty=req.body.difficulty;
    const details=req.body.details;
    try{
        const user= await place.findById(id);
        user.company=company;
        user.role=role;
        user.pack=pack;
        user.rounds=rounds;
        user.difficulty=difficulty;
        user.details=details;
        await user.save();
        res.status(200).json({message:"updated successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

module.exports=router;