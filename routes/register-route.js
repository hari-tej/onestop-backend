const express= require('express');
const register=require('../models/register');
const Admin=require('../models/admin-register');
const bcrypt=require('bcrypt');
const router= express.Router();





/* router.post('/register',async(req,res)=>{
      const name=req.body.name;
      const email=req.body.email;
      const password=req.body.password;
      const hash= await bcrypt.hash(password,10);
      const user= await register.create({name:name,email:email,password:hash});
      try{
         user.save();
         res.status(200).send("details added successfully");
        
      }catch(err){
        console.log(err);
      }
      
      
  
   
    }); */

    // for students
    router.post('/register',async(req,res)=>{
      try{
        const{name,rollno,batch,email,password}=req.body;
        const exist= await register.findOne({email})
        if(exist){
            return res.status(400).json({message:"user already exist"});
        }
        const hash=await bcrypt.hash(password,10);
        const user= new register({
          name,
          rollno,
          batch,
          email,
          password:hash
        })
        await user.save();
        res.status(200).json({message:'registered successfully'});

      }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
      }
    });


    // for admin
    router.post('/register/admin',async(req,res)=>{
      try{
        const{username,password}=req.body;
        const exist= await Admin.findOne({username});
        if(exist){
            return res.status(400).json({message:"user already exist"});
        }
        const hash=await bcrypt.hash(password,10);
        const admin= new Admin({
          username,
          password:hash
        })
        await admin.save();
        res.status(200).json({message:'registered successfully'});

      }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
      }
    });
    


 
    

module.exports=router;