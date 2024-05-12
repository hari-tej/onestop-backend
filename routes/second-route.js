const express= require('express');
const second=require('../models/second');
const register=require('../models/register');
const Secondimage=require('../models/second-image');
const middleware=require('../verify');
const router= express.Router();
const jwt=require('jsonwebtoken');
require('dotenv').config();


router.get('/second',async(req,res)=>{
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

router.get('/second/read',async(req,res)=>{
    await second.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
});

router.post('/second/post',async(req,res)=>{
    const userid=req.body.userid;
    const rollno=req.body.rollno;
    const name=req.body.name;
    const comment=req.body.comment;
    const link=req.body.link;

    const user= await second.create({userid:userid,rollno:rollno,name:name,comment:comment,link:link});
   
   try{
      user.save();
      res.send("entry added");
   }catch(err){
       console.log(err);
   }
});



router.post('/second/image',async(req,res)=>{
    const userid=req.body.userid;
    const name=req.body.name;
    const rollno=req.body.rollno;
    const description=req.body.description;
    const imageurl=req.body.imageurl;
    const user= await Secondimage.create({userid:userid,name:name,rollno:rollno,description:description,imageurl:imageurl});
    try{
        user.save();
        res.send("url added");
    }catch(err){
        console.log(err);
    }

});

router.get('/second/url',async(req,res)=>{
    await Secondimage.find().then((result,err)=>{
        if(err){
            return res.send(err);
        }else{
            return res.send(result);
        }
    });
})


router.delete('/second/:id',async(req,res)=>{
    const id= req.params.id;
    
    try{
        const user= await second.findByIdAndDelete(id).exec();
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.put('/second/update',async(req,res)=>{
    const id=req.body.id;
    const comment=req.body.comment;
    const newlink=req.body.newlink;
    try{
        const user= await second.findById(id);
        user.comment=comment;
        user.link=newlink;
        await user.save();
        res.status(200).json({message:"updated successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});

router.delete('/second/image/delete/:id',async(req,res)=>{
    const id= req.params.id;
    try{
        const user= await Secondimage.findByIdAndDelete(id).exec();
        res.status(200).json({message:"deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
});


module.exports=router;