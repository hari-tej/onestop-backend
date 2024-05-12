const mongoose=require('mongoose');

const alumniSchema= new mongoose.Schema({
     userid:{
      type:String
     },
     name:{
        type:String,
        required:true
     },
     rollno:{
        type:String,
        required:true
     },
     personname:{
      type:String,
      required:true
     },
     personbatch:{
      type:Number,
      required:true
     },
     imageurl:{
        type:String,
        required:true
     },
     company:{
        type:String,
        required:true
     },
     role:{
        type:String,
        required:true
     },
     pack:{
        type:String,
        required:true
     },
     location:{
        type:String,
        required:true
     },
     instagram:{
          type:String,
          required:true
     },
     linkedin:{
         type:String,
         required:true
     },
     personalemail:{
        type:String
     }
     

},{timestamps:true});

const Alumni=mongoose.model('Alumni',alumniSchema);
module.exports=Alumni;