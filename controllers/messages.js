const User = require('../models/User')
let sentMessages=[]
exports.messages= (req,res)=>{
    return res.render('messages',{user:req.user,sentMessages:sentMessages})
}
exports.messageSent=(req,res)=>{
    sentMessages.push(req.body.message)
    return res.render('messages',{user:req.user,sentMessages:sentMessages})
}

exports.getPeopleListForMessage = async(req,res)=>{
    let allpeople = await User.find()
    
    let me = await User.findOne({id:req.user.id})

    let mypeople = allpeople.filter((i)=>i.id!=me.id)
    return res.render('message-people',{mypeople,user:req.user})
}