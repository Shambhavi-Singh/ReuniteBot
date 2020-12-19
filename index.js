const express = require("express")
const mongoose = require('mongoose');

var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json());
var postsService = require("./PostService");
app.use( express.static( "public" ) );
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home")
})

app.get("/about",function(req,res){
    res.render("about");
})
app.get("/feed",function(req,res){
    res.render("feed");
})

app.get("/developers",function(req,res){
    res.render("developers");
})
//experimental
app.get("/missing",function(req,res){
    res.render("missingChildren"); 
})
app.get("/wantMoreData",function(req,res){
    const offset = req.query.offset;
    const promise = postsService.getPost(offset);
    promise.then(posts => {res.json(posts)});
})
//experimental
app.listen(3000,function(err){
    if(!err){
        console.log("server started")
    }
})