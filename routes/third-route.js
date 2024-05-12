const express= require('express');
const third=require('../models/third');
const middleware=require('../verify');
const register= require('../models/register');
const Thirdimage=require('../models/third-image');
const jwt=require('jsonwebtoken');
const router= express.Router();
require('dotenv').config();


router.get('/third',async(req,res)=>{
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


router.get('/third/read',async(req,res)=>{
    await third.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
});

router.post('/third/post',async(req,res)=>{
    const userid=req.body.userid;
    const rollno=req.body.rollno;
    const name=req.body.name;
    const comment=req.body.comment;
    const link=req.body.link;

    const user= await third.create({userid:userid,rollno:rollno,name:name,comment:comment,link:link});
   try{
      user.save();
      res.send("entry added");
   }catch(err){
       console.log(err);
   }
});

router.post('/third/image',async(req,res)=>{
    const userid=req.body.userid;
    const name=req.body.name;
    const rollno=req.body.rollno;
    const description=req.body.description;
    const imageurl=req.body.imageurl;
    const user= await Thirdimage.create({userid:userid,name:name,rollno:rollno,description:description,imageurl:imageurl});
    try{
        user.save();
        res.send("url added");
    }catch(err){
        console.log(err);
    }

});

router.get('/third/url',async(req,res)=>{
    await Thirdimage.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
});

router.delete('/third/:id',async(req,res)=>{
    const id= req.params.id;
    try{
        const user= await third.findByIdAndDelete(id).exec();
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.delete('/third/image/delete/:id',async(req,res)=>{
    const id= req.params.id;
    try{
        const user= await Thirdimage.findByIdAndDelete(id).exec();
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.put('/third/update',async(req,res)=>{
    const id=req.body.id;
    const comment=req.body.comment;
    const newlink=req.body.newlink;
    try{
        const user= await third.findById(id);
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