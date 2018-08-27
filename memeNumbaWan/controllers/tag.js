const express = require("express")
const router = express.Router()
const Tag = require("../model/tag")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)
// localhost:3000/post/

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
        res.render("index.hbs")
    })
});

module.exports = router