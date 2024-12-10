const User = require('../models/User')

exports.getLoginPage = (req,res)=>{
    return res.render('login',{msg:''})
}

exports.getRegisterPage = (req,res)=>{
    return res.render('register')
}

exports.register = async(req,res)=>{
    let id = Date.now()
    const {name,username,phone,password}=req.body
    let notAllowed = ['login','logout','profile','register','messages']
    if(notAllowed.includes(username)){
        return res.send('<h1>This username cannot be processed</h1>')
    }

    await User.create({
        id,name,username,phone,password
    })
    return res.redirect('/login')
}


exports.login= async(req,res)=>{
    let {username,password}=req.body

    let user = await User.findOne({username:username}).select('+password')

    if(!user){
         return res.render('login',{msg:'Invalid username or password'})
    }

    let auth = await user.isPasswordCorrect(password) 

    if(!auth){
         return res.render('login',{msg:'Invalid username or password'})

    }

    let token = user.getJWT()

    return res.cookie('uc',token,{httpOnly:true}).redirect('/')
}

exports.logout = (req,res)=>{
    return res.clearCookie("uc").redirect('/login')
}

exports.getUploadProfile=(req,res)=>{
        return res.render('fileupload')
}

exports.getProfilePage = (req,res)=>{
    let name = req.currentuser
    return res.render('profile',{name})
}
