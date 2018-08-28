const express = require("express")
const router = express.Router()
const Post = require("../model/post")
const User = require("../model/user")
const Tag = require("../model/tag")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)
// localhost:3000/post/


router.get("/postDelete", urlencoder, (req, res) => { //post
    console.log("POST /postDelete");

    console.log("Body id is: " + req.query.id);

    Post.deletePost(
        req.query.id
    ).then((post)=>{
        console.log(post)
        if(post!=null){
            res.redirect("/")
        }
    })

});



router.get("/postShare", urlencoder, (req, res) => {
    var user = req.query.shareuser
    //get id

    console.log(user)
    Post.updateAndPushSharedTo()


})

router.post("/postEdit", urlencoder, (req, res) => { //post
    console.log("POST /postEdit");
//            title, user, tags:tagID, likers, unlikers, time, privacy, sharedTo, filename, originalfilename

    var id = req.body.id // for finding one post
    console.log("Body id = " + id)
    var title = req.body.edittitle
    console.log("Title = " + title)
    var user = req.session.username;
    var filename;
    var originalfilename
//    User.getOneByUname(
//        user
//    ).then((user)=>{
//        if(user != null){
//            Uid = user._id;
//
//        }
//        else{
//            Uid = 0000;
//        }
//    })
//    var tags = req.body.tags; //process csv
    var likers; //default null
    var unlikers; //default null
    var time; //set to now

    var tags = req.body.edittags

    var privacy
    var sharedTo; //default null

    Post.getOne(
        id
    ).then((post)=>{
        if(post != null){
            title = post.title
            user = post.user
            tags = post.tags
            likers = post.likers
            unlikers = post.unlikers
            time = post.time
            privacy = post.privacy
            sharedTo = post.sharedTo
            filename = post.filename
            originalfilename = post.originalfilename
//            if(!req.body.edittitle){
//                console.log("WALANG LAMAN TITLE!!")
//                console.log("post.title="+ post.title)
//                title = post.title
//            }
//            if(!req.body.edittags){
//                console.log("WALANG LAMAN TAGS!!")
//                tags = post.tags
//            }
        }
        else{
            console.log("ERROR IN FINDING ONE IN POST")
        }

        // SET ALL VALUES
        privacy = req.body.editprivacy
        if(privacy=="private"){
            privacy = true;
        }
        else {
            privacy = false;
        }
        console.log("Privacy: " + privacy)

        if(req.body.edittitle != null){
            //            console.log("WALANG LAMAN TITLE!!")
            //            console.log("post.title="+ post.title)
            title = req.body.edittitle
        }
        if(req.body.edittags != null){
            console.log("WALANG LAMAN TAGS!!")
            tags = req.body.edittags
        }

    }).then(()=>{


        Post.updateOneByUser(id, user, title, tags, likers, unlikers, time, privacy, sharedTo, filename, originalfilename).then((updatedpost)=>{

            if(updatedpost != null){
                console.log("TANGINAAA")
            }

            res.redirect("/redirectprofile")

        })
    }, (err)=>{

    })



//        (title, user, tags, likers, unlikers, time, privacy, sharedTo, filename, originalfilename){



});


//ADDED BY CHESIE: upload meme
const multer = require("multer")
const fs = require("fs")
const path = require("path")
const UPLOAD_PATH = path.resolve(__dirname, "uploads")
const upload = multer({
    dest: UPLOAD_PATH,
    limits: {
        fileSize : 10000000,
        files : 2
    }
})

router.post("/upload", upload.single("img"), urlencoder, (req, res) => { //post
    console.log("post /uploaded");
    console.log("uname sesh: "+req.session.username);
    var postID;
    var title ="", id, user ="", tags="", likers, unlikers, time, privacy="false", sharedTo, tagID, fname="", ofname="";

    fname=req.file.filename
    ofname=req.file.originalname
    console.log("filename: "+ fname)
    console.log("originalname: "+ ofname)
    Post.createNew(title, user, tags, likers, unlikers, time, privacy, sharedTo, fname, ofname).then((post)=>{
        postID = post._id
        console.log("POST ID: " +post)
    }).then(()=>{
        title = req.body.memetitle;
        user = req.session.username;

        User.getOneByUname(
            user
        ).then((user)=>{
            if(user != null){
                console.log("USER: " + user)
                id = user._id;

            }
            else{
                id = 0000;
            }
        }).then(()=>{
//
            tags = req.body.tags; //process csv
            console.log("BEFORE GETONE: "+tags)
            Tag.getOne(
                tags
            ).then((tag)=>{
                if(tag != null){ //existing tag
                    console.log("tag exists!!")
                    tagID = tag._id
                    Tag.updateAndPush(tag._id, postID)

                    //                       title, user, tagID, likers, unlikers, time, privacy, sharedTo, postID, filename, originalfilename
                    updatePost(title, user, tagID, likers, unlikers, time, privacy, sharedTo, postID, fname, ofname)

                    res.redirect("/")
                }
                else{
                    console.log("tag DOES NOT exists!!")

                    Tag.createNew(tags, postID).then((tag)=>{
                        tagID = tag._id
                    }).then(()=>{
                        console.log("HIII BITCHESS")
                        privacy = req.body.privacy;

                        if(privacy=="private"){
                            privacy = true;
                        }
                        else {
                            privacy = false;
                        }

                        console.log("TAG ID = " + tagID);

                        //                         title, user, tagID, likers, unlikers, time, privacy, sharedTo, postID, filename, originalfilename
                        updatePost(title, user, tagID, likers, unlikers, time, privacy, sharedTo, postID, fname, ofname);
                        console.log("HIII AGAIN BITCHESS")
                    }, (err)=>{
                        console.log("ERROR: Somethings wrong")
                    })

                    res.redirect("/")

                }
//            console.log("IT SHOULD BE WORKING")
//            res.redirect("/")
            }, (err)=>{
                console.log(err)
                return null
            })
//
        })
    })
});

router.get("/photo/:id", (req, res)=>{
    console.log(req.params.id)
    console.log("HELP ME LORD")
    Post.findOneFunction(req.params.id).then((doc)=>{
        console.log("rendering photo")
        fs.createReadStream(path.resolve(UPLOAD_PATH, doc.filename)).pipe(res)
    }, (err)=>{
        console.log(err)
        res.sendStatus(404)
    })
})

function updatePost(title, user, tagID, likers, unlikers, time, privacy, sharedTo, postID, filename, originalfilename){

    if(tagID != null){
        Post.updateOneByID(postID, title, user, tagID, likers, unlikers, time, privacy, sharedTo, filename, originalfilename)
        User.updateAndPush(user, postID)
    }
    else{
        console.log("No tag yet????")
    }
}

module.exports = router
