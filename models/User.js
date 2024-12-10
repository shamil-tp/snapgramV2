const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const usc = new mongoose.Schema({
    id:String,
    name:String,
    phone:String,
    username:String,
    password:{
        type:String,
        select:false
    },
    followers:[String],
    following:[String]
});

//encrypt password before save
usc.pre('save',async function(next){
    if(!(this.isModified('password'))){
        return next()
    }
    this.password= await bcrypt.hash(this.password,10)
    return next()
})

//validate the password with passedon userpassword
usc.methods.isPasswordCorrect = async function(userSendPassword){
    return await bcrypt.compare(userSendPassword,this.password)
}

usc.methods.getJWT = function(){
    return jwt.sign({name:this.name,username:this.username,id:this.id},process.env.JWT_SECRET)
}



module.exports = mongoose.model("User", usc);