require('dotenv').config()

const express=require('express')
const cookieParser = require('cookie-parser')
let app=express()

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static('static'))
app.use(express.urlencoded())
app.use(cookieParser())


const { isLoggedIn, currentUser } = require('./middleware/auth')
app.use(currentUser)

const {connectDb} = require('./config/database')
connectDb()
const {connectCloudinary} = require('./config/cloudinary')
connectCloudinary()

const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))


const { getLoginPage, getRegisterPage, register, login, logout } = require('./controllers/auth')
const { getFeeds, getAddPost, addPost, likeORUnlike, viewPost } = require('./controllers/feeds')
const {messages,messageSent, getPeopleListForMessage} = require('./controllers/messages')
const { getProfile, viewPeople, followPerson, unfollowPerson } = require('./controllers/profile')




app.get('/login',getLoginPage)
app.post('/login',login)
app.get('/register',getRegisterPage)
app.post('/register',register)
app.get('/logout',logout)

app.get('/message',isLoggedIn,getPeopleListForMessage)

// app.get('/messages',isLoggedIn,messages)
// app.post('/message',messageSent)

app.get('/',isLoggedIn,getFeeds)
app.get('/:username',getProfile)
app.get('/people/all',viewPeople)
app.get('/people/follow/:personid',isLoggedIn,followPerson)
app.get('/people/unfollow/:personid',isLoggedIn,unfollowPerson)



app.get('/post/add',getAddPost)
app.post('/post/add',addPost)
app.get('/post/:id',viewPost)
app.get('/post/:postid/like',isLoggedIn,likeORUnlike)



app.listen(8000,'192.168.1.12',()=>{
    console.log("app started")
})