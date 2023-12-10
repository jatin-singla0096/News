var express = require('express');
var Router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require("mongoose");
const User=require("../Models/user");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET="JATIN";
const fetchUser =require("../Middleware/fetchUser");

Router.post("/createUser",[body('email').isEmail(),
body('name').isLength({min:5}),
body('password').isLength({min:5})],async (req,res)=>{
let success=false;
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({success:success,"msg":"Validations are not Fullfield",errors: errors.array() });
}
let user = await User.findOne({ email: req.body.email });
if(user){return res.json({success:false,msg:"user is already exist! Please made account with another email"})}
let salt=await bcrypt.genSalt(10);
let passwordHash=await bcrypt.hash(req.body.password, salt);
user=await User.create({name:req.body.name,email:req.body.email,password:passwordHash});
const data={user:{id:user._id}};
success=true;
var token = jwt.sign(data,JWT_SECRET);
return res.json({success:success,token});
})

Router.get("/userData",fetchUser,async (req,res)=>{
    let user=await User.findById(req.user.id);
return res.json(user);
})

Router.post("/login",[body('email').isEmail(),
body('password').isLength({min:5})],async (req,res)=>{
 let success=false;
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({success:success,"msg":"Validations are not Fullfield",errors: errors.array() });
}
let user=await User.findOne({email:req.body.email});
if(!user){
    return res.json({success,msg:"User not found!Please create an account to login"})
}
let passwordCompare=await bcrypt.compare(req.body.password,user.password);
if(!passwordCompare){
    return res.json({type:"Invalid Credentials"})
}
const data={user:{id:user._id}};
success=true;
var token = jwt.sign(data,JWT_SECRET);
return res.json({success:success,token});
})

Router.post("/updateUserData",fetchUser,async (req,res)=>{
    let updatedData=await User.findById(req.user.id);
    if(req.body.password===req.body.Cpassword && updatedData){
    updatedData.name=req.body.name;
    let salt=await bcrypt.genSalt(10);
let passwordHash=await bcrypt.hash(req.body.password, salt);
    updatedData.password=passwordHash;
    let user=await User.findByIdAndUpdate(req.user.id,{$set:updatedData},{new:true});
return res.json(user);}
else{
    return res.json({msg:"error occured"});
}
})

Router.post("/confirmPassword",fetchUser,async (req,res)=>{
    let user=await User.findById(req.user.id);
    let passwordCompare=await bcrypt.compare(req.body.password,user.password);
if(!passwordCompare){
    return res.json({success:false,msg:"Password doesnot matched"});
}
else{
    return res.json({success:true});
}
})

module.exports=Router;