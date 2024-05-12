const express= require('express');
const fourth=require('../models/fourth');
const register=require('../models/register');
const middleware=require('../verify');
const Fourthimage=require('../models/fourth-image');
const jwt=require('jsonwebtoken');
const router= express.Router();
require('dotenv').config();

router.get('/fourth',async(req,res)=>{
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


router.get('/fourth/read',async(req,res)=>{
    await fourth.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
});

router.post('/fourth/post',async(req,res)=>{
    const userid=req.body.userid;
    const rollno=req.body.rollno;
    const name=req.body.name;
    const comment=req.body.comment;
    const link=req.body.link;

    const user= await fourth.create({userid:userid,rollno:rollno,name:name,comment:comment,link:link});
   try{

      user.save();
      res.send("entry added");
   }catch(err){
       console.log(err);
   }
});

router.post('/fourth/image',async(req,res)=>{
    const userid=req.body.userid;
    const name=req.body.name;
    const rollno=req.body.rollno;
    const description=req.body.description;
    const imageurl=req.body.imageurl;
    const user= await Fourthimage.create({userid:userid,name:name,rollno:rollno,description:description,imageurl:imageurl});
    try{
        user.save();
        res.send("url added");
    }catch(err){
        console.log(err);
    }

});

router.get('/fourth/url',async(req,res)=>{
    await Fourthimage.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
});


router.delete('/fourth/:id',async(req,res)=>{
    const id= req.params.id;
  
    try{
        const user= await fourth.findByIdAndDelete(id).exec();
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.delete('/fourth/image/delete/:id',async(req,res)=>{
    const id= req.params.id;
    try{
        const user= await Fourthimage.findByIdAndDelete(id).exec();
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.put('/fourth/update',async(req,res)=>{
    const id=req.body.id;
    const comment=req.body.comment;
    const newlink=req.body.newlink;
    try{
        const user= await fourth.findById(id);
        user.comment=comment;
        user.link=newlink;
        await user.save();
        res.status(200).json({message:"updated successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});


module.exports=router;