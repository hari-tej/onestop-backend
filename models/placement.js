const mongoose=require('mongoose');

const placeSchema= new mongoose.Schema({
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
     rounds:{
        type:Number,
        required:true
     },
     difficulty:{
          type:String,
          required:true
     },
     details:{
         type:String,
         required:true
     }
     

},{timestamps:true});

const Place=mongoose.model('Place',placeSchema);
module.exports=Place;