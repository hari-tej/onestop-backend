const mongoose= require('mongoose');

const secondSchema= new mongoose.Schema({
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
      },
     
},{timestamps:true});

const Second= mongoose.model('Second',secondSchema);
module.exports=Second;