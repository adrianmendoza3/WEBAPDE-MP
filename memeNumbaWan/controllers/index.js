const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
const mongoose = require("mongoose")
const Post = require("../model/post")
const User = require("../model/user")
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

router.get("/myprofile", (req, res, next) => { //post???
    console.log("GET /redirect profile");
        var posters;
    if(req.session.username != null){
        Post.getAllFiltered(req.session.username).then((posts)=>{
            posters = posts
        }).then(()=>{
            User.getOneByUname(req.session.username).then((user)=>{
                res.render("profile.hbs", {
                    posts : posters,
                    user : req.session.username,
                    description: user.description

                });
            }, (err)=>{

            })
        }), (err)=>{
            res.render("index.hbs")
        }
    }
});

router.get("/redirectprofile", (req, res, next) => { //post???
    console.log("GET /redirect profile");

    console.log("UID" + req.query._id)

    User.getOneByUID(
        req.query._id
    ).then((user)=>{
        console.log("USERID IS BLANK" + user._id)
    }, (err)=>{
        console.log(err)
    })

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
               posts : posts,
               user : req.session.username
           });
       }, (err)=>{
           res.render("index.hbs")
   })

   }
});


router.get("/memeNA", (req, res) => { //????DELETE THIS
    console.log("GET /memeNA");
    console.log(req.query.id)
    Post.getOne(req.query.id).then((posts)=>{
        console.log(posts)
        res.render("memeNA.hbs", {
            posts
        })
    }, (err)=>{

    })


    // res.redirect("/redirectmeme");
});

router.get("/meme", (req, res) => { //post

    Post.getOne(req.query.id).then((posts)=>{
        res.render("meme.hbs", {
            posts
        })
    }, (err)=>{

    })

});

// router.get("/redirectmeme", (req, res, next) => { //index???
//     console.log("GET /meme");
//
//
//
//    if(req.session.username != null){
//        Post.getAll().then((posts)=>{
//            res.render("meme.hbs", {
//                posts : posts
//            });
//        }, (err)=>{
//            res.render("index.hbs")
//        })
//    }
//    else {
//        Post.getAll().then((posts) => {
//            res.render("memeNA.hbs", {
//                posts: posts //pass username
//            });
//        }, (err) => {
//            res.render("index.hbs")
//        })
//    }
//
// });


//////// TO BE FIXED

//delete post
//edit post
//delete tag




router.get("/tag", (req, res) => { //index or delete???
    console.log("GET /tag");

    res.render("tag.hbs");
});

router.get("/tagNA", (req, res) => { //index or delete???
    console.log("GET /tagNA");

    res.render("tagNA.hbs");
});

//////

router.get("/index", (req, res) => {
   console.log("GET /index");
   res.redirect("/");
//    res.render("index.hbs");
});

module.exports = router