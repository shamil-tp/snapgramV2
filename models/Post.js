const mongoose = require('mongoose');


const usc = new mongoose.Schema({
    id:String,
    userid:String,
    username:String,
    image:String,
    caption:String,
    likes:[String],
    commenets:[{
        userid:String,
        username:String,
        text:String
    }]
});


module.exports = mongoose.model("Post", usc);