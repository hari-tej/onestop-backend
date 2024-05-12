const mongoose= require('mongoose');

const thirdSchema= new mongoose.Schema({
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

const Third= mongoose.model('Third',thirdSchema);
module.exports=Third;