const mongoose=require('mongoose');

const homeschema= new mongoose.Schema({
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
        
      }

});

const Home=mongoose.model("Home",homeschema);
module.exports=Home;