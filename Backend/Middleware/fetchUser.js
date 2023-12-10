const express=require("express");
var jwt = require('jsonwebtoken');
const JWT_SECRET="JATIN";
const mongoose = require("mongoose");

const fetchUser=(req,res,next)=>{
    const token=req.header("auth-token");
try {
    if(!token){
        return res.status(400).json({err:"Please log in"});
    }
    const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
} catch (error) {
    return res.status(400).json({err:"Problem with user"});
}
}
module.exports=fetchUser;