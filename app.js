
const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Post = require("./models/Post")

const app = express()

dotenv.config();
app.use(express.urlencoded({extended:true}))//read data from url
app.use(express.json())//convert data to json
app.set('view engine','ejs');

//middleware is a function bewteen request and response
app.use(express.static('public'))
app.get("/",async (req,res)=>{
    const posts = await Post.find({})

    res.render('index',{
        posts
    })
})

app.get("/about",(req,res)=>{
    res.render('about')
})

app.get("/add",(req,res)=>{
    res.render('add')
})

app.get("/posts/:id",async (req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render('post',{
        post
    })  
});

app.post("/posts",async (req,res)=>{
    await Post.create(req.body);
    res.redirect('/')
})



mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open",()=>{
  console.log("Connected Successfully");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})