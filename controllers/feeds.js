const cloudinary = require('cloudinary').v2
const Post = require('../models/Post')

exports.getFeeds = async(req,res)=>{
    let posts = await Post.find().sort({id:-1})
    return res.render('feeds',{user:req.user,posts})
}

exports.getAddPost = (req,res)=>{
    return res.render('create')
}

exports.addPost = async(req,res)=>{
    let image = req.files.image
    let caption = req.body.caption

    let result = await cloudinary.uploader.upload(image.tempFilePath,{folder:'testfolder'})

    await Post.create({
        id:`P${Date.now()}`,
        userid:req.user.id,
        image:result.secure_url,
        caption:caption,
        username:req.user.username
    });
    return res.redirect('/'+req.user.username)
}

exports.likeORUnlike = async(req,res)=>{
    let {postid} = req.params
    let post = await Post.findOne({id:postid})

    if(!post){
        return res.redirect('/')
    }

  

    let indexOfLikingPerson = post.likes.findIndex((i)=>i==req.user.id)

    if(indexOfLikingPerson==-1){
        post.likes.push(req.user.id)
    }else{
        post.likes.splice(indexOfLikingPerson,1)
    }

    await post.save()

    return res.redirect('/')
}

exports.viewPost = async(req,res)=>{
    const id = req.params.id

    let p = await Post.findOne({id:id})
    if(!p){
        return res.redirect('/')
    }
    return res.render('post',{p,user:req.user})
}