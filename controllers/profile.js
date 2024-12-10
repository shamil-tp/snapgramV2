const User = require('../models/User')
const Post = require('../models/Post')

exports.getProfile = async(req,res)=>{
    let username = req.params.username
    let profile = await User.findOne({username:username})

    if(!profile){
        return res.send('profie not found')
    }

    const posts = await Post.find({userid:profile.id})
    return res.render('profile',{user:req.user,profile,posts})
}


exports.viewPeople = async(req,res)=>{
    let people = await User.find()

    return res.render('people',{people,user:req.user})
}

exports.followPerson = async(req,res)=>{
    let {personid}=req.params

    let person = await User.findOne({id:personid})
    if(!person){
        return redirect('/')
    }

    let me = await User.findOne({id:req.user.id})
    me.following.push(person.id)

    await me.save()

    person.followers.push(me.id)
    await person.save()

    return res.redirect('/'+person.username)
    
}

exports.unfollowPerson= async(req,res)=>{
    let {personid}=req.params

    let person = await User.findOne({id:personid})
    if(!person){
        return redirect('/')
    }

    let me = await User.findOne({id:req.user.id})

    const i1 = person.followers.findIndex((i)=>i==me.id)
    person.followers.splice(i1,1)

    await person.save()

    const i2 = me.following.findIndex((i)=>i==person.id)
    me.following.splice(i2,1)

    await me.save()
    return res.redirect('/'+person.username)

}