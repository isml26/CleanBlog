
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const methodOverride = require('method-override');
const Post = require("./models/Post")
const controller = require("./controller/postController.js")
const app = express()

dotenv.config();
app.use(express.urlencoded({extended:true}))//read data from url
app.use(express.json())//convert data to json
app.set('view engine','ejs');
app.use(methodOverride('_method',{
    methods:['POST','GET'],
  }));

//middleware is a function bewteen request and response
app.use(express.static('public'))

app.get("/",controller.getAllPosts)

app.get("/about",(req,res)=>{
    res.render('about')
})
app.get("/add",(req,res)=>{
    res.render('add')
})

app.get("/posts/:id",controller.getPost);

app.get('/posts/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render('edit', {
      post,
    });
  });

app.put('/posts/:id', controller.updatePost);

app.post("/posts",controller.createPost)

app.delete('/posts/:id',controller.deletePost)


mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open",()=>{
  console.log("Connected Successfully");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})