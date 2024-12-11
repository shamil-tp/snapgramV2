

exports.viewNotification=(req,res)=>{
    return res.render('notifications',{user:req.user})
}