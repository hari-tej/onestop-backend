const mongoose= require('mongoose');

const registerSchema= new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
      rollno:{
        type:String,
        required:true
      },
      batch:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
      }
      

});

const Register= mongoose.model('Register',registerSchema);
module.exports=Register;