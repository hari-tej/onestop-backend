const express= require('express');
const router= express.Router();
const verify=require('../verify');
const jwt=require('jsonwebtoken');
const register=require('../models/register');
require('dotenv').config();

router.get('/profile',async(req,res)=>{       
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

module.exports=router;