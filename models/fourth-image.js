const mongoose= require('mongoose');

const fourthimageSchema= new mongoose.Schema({
     userid:{
        type:String,
        required:true
     },
     name:{
        type:String,
        required:true
      },
      rollno:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },
      imageurl:{
        type:String,
        required:true
      }
    

});

const Fourthimage= mongoose.model('Fourthimage',fourthimageSchema);
module.exports=Fourthimage;