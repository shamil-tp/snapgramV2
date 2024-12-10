const User = require("../models/User")
const jwt = require('jsonwebtoken')

exports.isLoggedIn =(req,res,next)=>{
    if(!req.user){
        return res.redirect('/login')
    }
    return next()
}

exports.currentUser =(req,res,next)=>{
    try{
        if(req.url=='/logout'){
            return next()
        }
        let token = req.cookies?.uc  
        if(token){
            req.user=jwt.verify(token,process.env.JWT_SECRET)
            return next()
        }
        return next()
    }catch(e){
        return res.redirect('/logout')
    }
  
    return next()
}