const express= require('express');
const register=require('../models/register');
const Admin=require('../models/admin-register');
const bcrypt=require('bcrypt');
const router= express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config();


/* router.post('/login',async(req,res)=>{
   
      const email=req.body.email;
      const password=req.body.password;
      await register.findOne({email:email})
      .then((user)=> {
        if(user){
            bcrypt.compare(password,user.password,(response,err)=>{
                if(response){
                    res.json("success");
                }else{
                  res.json("error");
                }
            })         
        }else{
            res.json("record does not exist");
        }
    })
   
    }); */

 // for students   
 router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try{
        const exist= await register.findOne({email});
        if(!exist){
             return res.status(400).json({message:"user not found"});
        }
        const match= await bcrypt.compare(password,exist.password);
        if(match){
            const token=jwt.sign({id:exist._id},process.env.JWT_SECRET_KEY,{expiresIn:'1hr'});
            res.json({token});
        }else{
            res.status(400).json({message:'invalid username or password'});
        }
    
        /*if(exist.password !== password){
            return res.status(400).send("invalid credentials");
        }
        const payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'chegondi@24',{expiresIn:36000000},(err,token)=>{
            if(err) throw err;
            return res.json({token});
        }) */

    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"});
    } 
 });


 // for admin
 router.post('/login/admin',async(req,res)=>{
    const{username,password}=req.body;
    try{
        const exist= await Admin.findOne({username});
        if(!exist){
             return res.status(400).json({message:"user not found"});
        }
        const match= await bcrypt.compare(password,exist.password);
        if(match){
            const token=jwt.sign({id:exist._id},process.env.JWT_ADMIN_SECRET_KEY,{expiresIn:'1hr'});
            res.json({token});
        }else{
            res.status(400).json({message:'invalid username or password'});
        }
    
        /*if(exist.password !== password){
            return res.status(400).send("invalid credentials");
        }
        const payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'chegondi@24',{expiresIn:36000000},(err,token)=>{
            if(err) throw err;
            return res.json({token});
        }) */

    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"});
    } 
 });





   

module.exports=router;