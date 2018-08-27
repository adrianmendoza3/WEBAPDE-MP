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

router.get("/redirectprofile", auth, (req, res, next) => { //post???
    console.log("GET /redirect profile");
    Post.getAllFiltered({
        req.session.username
    }).then((posts)=>{
        res.render("profile.hbs", {
            posts : posts,
            user : req.session.username,
            username : req.session.username

        });
    }, (err)=>{
        res.render("landing.hbs")
    })
});

router.get("/redirectmeme", auth, (req, res, next) => { //index???
    console.log("GET /meme");

    Post.getAll().then((posts)=>{
        res.render("meme.hbs", {
            posts : posts
        });
    }, (err)=>{
        res.render("landing.hbs")
    })
});

router.get("/profile", (req, res) => { //index???
    console.log("GET /profile");
    console.log("uname sesh: "+req.session.username);

    res.redirect("/redirectprofile");
});

router.get("/profileNA", (req, res) => { //?????DELETE THIS
    console.log("GET /profileNA");

    res.redirect("/redirectprofile");
});

router.get("/postDelete", urlencoder, (req, res) => { //post
    console.log("POST /postDelete");

    console.log("Body id is: " + req.body.id)

    Post.deleteOne({
        _id: req.body.id
    }).then((post)=>{
        res.redirect("/redirectprofile")

    })

});

router.get("/postEdit", urlencoder, (req, res) => { //post
    console.log("POST /postEdit");

    var id = req.body.id // for finding one post
    console.log("Body id = " + id)
    var title = req.body.edittitle
    console.log("Title = " + title)
    var likes;
    var Uid;
    var user = req.session.username;
    User.findOne({
        username : user
    }).then((user)=>{
        if(user != null){
            Uid = user._id;

        }
        else{
            Uid = 0000;
        }
    })
//    var tags = req.body.tags; //process csv
    var likers; //default null
    var unlikers; //default null
    var time; //set to now

    var tags = req.body.edittags

    var privacy = req.body.editprivacy
    if(privacy=="private"){
        privacy = true;
    }
    else {
        privacy = false;
    }
    console.log("Privacy: " + privacy)

    var sharedTo; //default null

    Post.findOne({
        _id : id
    }).then((post)=>{
        if(post != null){
            if(!req.body.edittitle){
                console.log("WALANG LAMAN TITLE!!")
                console.log("post.title="+ post.title)
                title = post.title
            }
            if(!req.body.edittags){
                console.log("WALANG LAMAN TAGS!!")
                tags = post.tags
            }
        }
        else{
            console.log("ERROR IN FINDING ONE IN POST")
        }
    })

    let newPost = {
        title, likes, id:Uid, user, likers, unlikers, time, privacy, sharedTo
    }

    Post.findOneAndUpdate({
        _id : id,
        user : user
    }, newPost).then(()=>{
        res.redirect("/redirectprofile")
    })

});


router.get("/uploadmeme", (req, res) => { //INDEX???
    console.log("get /uploadmeme");
    console.log("uname sesh: "+req.session.username);

    res.render("uploadmeme.hbs");
});

router.post("/upload", urlencoder, (req, res) => { //post
    console.log("post /uploaded");
    console.log("uname sesh: "+req.session.username);

    var title ="", id, user ="", tags, likers, unlikers, time, privacy="false", sharedTo, tagID;

    var x = new Post({
        title, id, user, tags, likers, unlikers, time, privacy, sharedTo
    })

    x.save()

    var postID = x._id

    console.log("Post ID: " +postID)

    title = req.body.memetitle;
    user = req.session.username;

    User.findOne({
        username : user
    }).then((user)=>{
        if(user != null){
            console.log("USER: " + user)
            id = user._id;

        }
        else{
            id = 0000;
        }
    })
//
    tags = req.body.tags; //process csv
//

    Tag.findOne({
        name : tags
    }).then((tag)=>{
        if(tag != null){ //existing tag

            Tag.findOneAndUpdate({_id : tag._id}, {$push: { postID : postID }}, {new: true}, function(err, doc){
                if(err){
                    console.log("Something wrong when updating tag!");
                }
                console.log(doc);
            });

            updatePost(title, id, user, tag._id, likers, unlikers, time, privacy, sharedTo, postID);

        }
        else{
            var f = new Tag({
                name : tags,
                postID : postID
            })

            f.save().then(()=>{
                console.log("F: "+f)
                tagID = f._id
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

                updatePost(title, id, user, tagID, likers, unlikers, time, privacy, sharedTo, postID);
                console.log("HIII AGAIN BITCHESS")
            }, (err)=>{
                console.log("ERROR: Somethings wrong")
            })
        }
        res.redirect("/")
    }, (err)=>{
        console.log(err)
        return null
    })

});


module.exports = router
