const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const app=express();
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT || 3003;



mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to database successfully");
    app.listen(PORT,()=>{
        console.log("server running at 3000");
    });

}).catch((err)=>{
      console.log(err);
});

const second=require('./routes/second-route')
app.use(second);

const third=require('./routes/third-route')
app.use(third);

const fourth=require('./routes/fourth-route')
app.use(fourth);

const register= require('./routes/register-route');
app.use(register);

const login= require('./routes/login');
app.use(login);

const place=require('./routes/place-route');
app.use(place);

const home=require('./routes/home');
app.use(home);

const profile=require('./routes/profile');
app.use(profile);

const admin=require('./routes/admin-route');
app.use(admin);

const alumni=require('./routes/alumni-route');
app.use(alumni);



