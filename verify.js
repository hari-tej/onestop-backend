const jwt= require('jsonwebtoken');
require('dotenv').config();

module.exports= function(req,res,next){
    try{
     const token=req.headers.authorization.split(" ")[1];
     console.log(token);
     
     if(!token){
        return res.status(400).send('token not found');
    }
    res.send("token exists");
    const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=decode.id;
    next();

   }catch(err){
        console.log(err);
        return res.status(500).send("server error");
   } 
       
}
