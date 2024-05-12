const mongoose= require('mongoose');

const fourthSchema= new mongoose.Schema({
      userid:{
        type:String,
      },
      rollno:{
        type:String,
        required:true
      },
      name:{
        type:String,
        required:true
      },
      comment:{
        type:String,
        required:true
      },
      link:{
        type:String,
      }

},{timestamps:true});

const Fourth= mongoose.model('Fourth',fourthSchema);
module.exports=Fourth;