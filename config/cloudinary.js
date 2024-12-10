const cloudinary = require('cloudinary').v2

exports.connectCloudinary = async function(){
    await cloudinary.config({
        cloud_name:process.env.CLOUDNAME,
        api_key:process.env.CLOUDKEY,
        api_secret:process.env.CLOUDSEC
    })
    console.log('connected to cloudinary')
}
