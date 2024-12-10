const mongoose = require('mongoose')
const uri = process.env.DB

exports.connectDb = function(){
    mongoose.connect(uri).then(()=>{
        console.log('database connected')
    }).catch((e)=>{
        console.log('an error occured during connecting to the database')
        console.log(e)
    })
}
