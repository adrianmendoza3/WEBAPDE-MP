const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
const mongoose = require("mongoose")
const Post = require("../model/post")
const router = express.Router()
const auth = require("../middlewares/auth")

router.use("/post", require("./post"))
router.use("/user", require("./user"))
router.use("/tag", require("./tag"))

// create the route for the index/home page
router.get("/", (req, res)=>{
  console.log("GET /")

    if(req.session.username){
        Post.getAll().then((posts)=>{
            res.render("home.hbs", {
                posts
            })
        })
    }else{
        Post.getAll().then((posts)=>{
            res.render("index.hbs", {
                posts
            })
        })

        // res.redirect("/")
    }
})


router.get("/logout", (req, res) => { //user or index?
    console.log("GET /logout");

    req.session.destroy((err)=> {
        if(err){
            console.log(err)
        } else {
            console.log("Destroyed sesh")
        }

    })
    res.redirect("/");
//    res.render("index.hbs");
});


router.get("/uploadmeme", (req, res) => { //INDEX??? // upload to go to upload page
    console.log("get /uploadmeme");
    console.log("uname sesh: "+req.session.username);

    res.render("uploadmeme.hbs");
});

router.get("/profile", (req, res) => { //index???
    console.log("GET /profile");
    // console.log("uname sesh: "+req.session.username);

    res.redirect("/redirectprofile");
});

router.get("/profileNA", (req, res) => { //?????DELETE THIS
    console.log("GET /profileNA");

    res.redirect("/redirectprofile");
});

router.get("/redirectprofile", (req, res, next) => { //post???
    console.log("GET /redirect profile");

    if(req.session.username != null){
        Post.getAllFiltered(req.session.username).then((posts)=>{
            res.render("profile.hbs", {
                posts : posts,
                user : req.session.username

            });
        }, (err)=>{
            res.render("index.hbs")
        })
   }
   else{
       Post.getAll().then((posts)=>{
           res.render("profileNA.hbs", {
               posts : posts
           });
       }, (err)=>{
           res.render("index.hbs")
   })

   }
});


router.get("/meme", (req, res) => { //post
    console.log("GET /meme");

    Post.getOne({
        _id: req.query.id
    }).then((post)=>{
        res.render("meme.hbs", {
            post
        })
    }, (err)=>{
      console.log("ANO NA")
    })
});

router.get("/redirectmeme", (req, res, next) => { //index???
    console.log("GET /meme");



   if(req.session.username != null){
       Post.getAll().then((posts)=>{
           res.render("meme.hbs", {
               posts : posts
           });
       }, (err)=>{
           res.render("index.hbs")
       })
   }
   else {
       Post.getAll().then((posts) => {
           res.render("memeNA.hbs", {
               posts: posts
           });
       }, (err) => {
           res.render("index.hbs")
       })
   }

});

router.get("/index", (req, res) => {
   console.log("GET /index");
   res.redirect("/");
//    res.render("index.hbs");
});

module.exports = router