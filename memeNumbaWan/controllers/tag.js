const express = require("express")
const router = express.Router()
const Post = require("../models/post")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)
// localhost:3000/post/

router.get("/search", (req, res) => { //index???
    console.log("search input: "+req.query.searchinput)

    var input = req.query.searchinput;
    var tagID;

     Tag.getOne({
        input
     }).then((tag)=>{
        if(tag != null){
            console.log("Tag: " + tag)
            tagID = tag._id

            Post.find({
                tags : tag._id
            }).then((posts)=>{
                if(req.session.username != null){
                    res.render("tag.hbs", {
                    name : tag.name,
                    posts : posts
                    });
                }
                else{
                    res.render("tagNA.hbs")
                }
            }, (err)=>{
                res.render("landing.hbs")
            })

        }
        else{
            res.redirect("/")
        }
     })
});

router.post("/deleteTag", (req, res) => { //tag
    console.log("Deleting tag with id of: " + req.body.deletetagid)
});

router.post("/addTag", (req, res) => { //tag
    console.log("GET /addTag");

    var newtag = req.body.addtagname;
//    console.log("NEW TAG ADDED: "+ newtag);
    var postID = req.body.id;
//    console.log("TAG OF POST ID: "+postID); //id of post (not yet used)

    Tag.getOne({
        name : newtag
    }).then((tag)=>{
        if(tag != null){ //existing tag
            console.log("tag "+newtag+" already exists");

            Tag.updateAndPush(tag._id, postID)

            Post.updateAndPush(postID, tags)

            console.log("Postids in found:" + tag.postID.length)
            res.redirect("/redirectprofile")
        }
        else{
            var f = new Tag({
                name : newtag,
                postID : postID
            })

            console.log(f)

            Tag.createNew(f)
        }
    }, (err)=>{
        res.render("landing.hbs")
    })
});

module.exports = router