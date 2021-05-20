
const express = require("express")
const ejs = require("ejs")
const app = express()
app.use(express.json())

app.set('view engine','ejs');

//middleware is a function bewteen request and response
app.use(express.static('public'))
app.get("/",(req,res)=>{
    res.render('index')
})





app.get("/about",(req,res)=>{
    res.render('about')
})

app.get("/add",(req,res)=>{
    res.render('add')
})


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})