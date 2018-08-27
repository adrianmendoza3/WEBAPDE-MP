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
router.get("/", auth, (req, res)=>{
  console.log("GET /")

  Post.getAll().then((posts)=>{
    res.render("home", {
      posts
    })
  })

})

router.get("/uploadmeme", (req, res) => { //INDEX??? // upload to go to upload page
    console.log("get /uploadmeme");
    console.log("uname sesh: "+req.session.username);

    res.render("uploadmeme.hbs");
});

router.get("/profile", (req, res) => { //index???
    console.log("GET /profile");
    console.log("uname sesh: "+req.session.username);

    res.redirect("/redirectprofile");
});

router.get("/redirectprofile", auth, (req, res, next) => { //post???
    console.log("GET /redirect profile");
    Post.getAllFiltered(req.session.username).then((posts)=>{
        res.render("profile.hbs", {
            posts : posts,
            user : req.session.username

        });
    }, (err)=>{
        res.render("index.hbs")
    })
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

router.get("/redirectmeme", auth, (req, res, next) => { //index???
    console.log("GET /meme");

    Post.getAll().then((posts)=>{
        res.render("meme.hbs", {
            posts : posts
        });
    }, (err)=>{
        res.render("index.hbs")
    })
});

module.exports = router