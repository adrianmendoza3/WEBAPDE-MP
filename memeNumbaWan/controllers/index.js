const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
const mongoose = require("mongoose")
const Post = require("../model/post")
const router = express.Router()

router.use("/post", require("./post"))
router.use("/user", require("./user"))

app.get("/", (req, res, next) => {
    console.log("GET /");
    
//    User.find().then((users)=>{
//        console.log(users)
//    })
    
    if(req.session.username != null){
        Post.find().then((posts)=>{
            res.render("home.hbs", {
                posts : posts,
            });
        }, (err)=>{
            res.render("index.hbs")
        })
    }
    else{
        Post.find().then((posts)=>{
            res.render("index.hbs", {
                posts : posts
            });
        }, (err)=>{
            res.render("index.hbs")
        })  
    }

});

module.exports = router