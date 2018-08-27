const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
const mongoose = require("mongoose")
//const mongostore = require("connect-mongo")(session)

//const {Post} = require("./model/Post.js")
//const {Tag} = require("./model/Tag.js")
//const {User} = require("./model/User.js")
const crypto = require("crypto")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/memeNumbaWan", {
    useNewUrlParser: true
});

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.set("view engine", "hbs");
app.use(express.static(__dirname+"/views"));
app.use(express.static(__dirname+"/storage/images"));
app.use(express.static(__dirname+"/css"));
app.use(express.static(__dirname+"/model"))
app.use(express.static(__dirname+"/public"))

//
// var staticResourse = '/Users/adrianmendoza/Desktop/Git/WEBAPDE-MP/storage/images';
// app.use(express.static(path.join(staticResourse, 'public2')));

// app.use(express.static(path.join(__dirname, "views")))

////functions:
//function encrypt(text) {
//  return crypto.createHash("md5").update(text).digest("hex")
//}

// function updatePost(title, id, user, tagID, likers, unlikers, time, privacy, sharedTo, postID){ //post
//
//     let newPost = {
//         title, uid:id, user, tags:tagID, likers, unlikers, time, privacy, sharedTo
//     }
//
//     if(tagID != null){
//         Post.findOneAndUpdate({
//             _id : postID
//         }, newPost).then(()=>{
//
//             console.log(newPost)
//         }, (err)=>{
//             console.log(err)
//         })
//
//
//         User.findOneAndUpdate({_id : id}, {$push: { postID : postID }}, {new: true}, function(err, doc){
//             if(err){
//                 console.log("Something wrong when updating data!");
//             }
//             console.log(doc);
//         });
//     }
//     else{
//         console.log("No tag yet????")
//     }
// }

app.use(session({ //controller/index
    secret: "super secret",
    name: "super secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7*3
    }
}))


//app.get("/", (req, res, next) => { //controller/index
//    console.log("GET /");
//
//    if(req.session.username != null){
//        Post.find().then((posts)=>{
//            res.render("home.hbs", {
//                posts : posts,
//            });
//        }, (err)=>{
//            res.render("index.hbs")
//        })
//    }
//    else{
//        Post.find().then((posts)=>{
//            res.render("index.hbs", {
//                posts : posts
//            });
//        }, (err)=>{
//            res.render("index.hbs")
//        })
//
//    }
//});

//app.post("/login", urlencoder, (req, res) => { //controller/user
//    console.log("POST /login");
//
//    var username = req.body.logusername;
//    var password = encrypt(req.body.logpassword);
//
//    console.log("encrypted pw:" +password);
//
//    User.findOne({
//        username : username,
//        password : password
//
//    }).then((user)=>{
//        if(user != null){
//            console.log(user.username + ": " + user.password);
//            req.session.username = user.username;
//            console.log("uname sesh: "+req.session.username);
//
//
//            res.redirect("/")
//        }
//        else{
//            res.redirect("/")
//            console.log("cannot login")
//        }
//    }, (err)=>{
//        res.render("index.hbs")
//    })
//
//
//});

//app.get("/redirectprofile", (req, res, next) => { //post???
//    console.log("GET /redirect profile");
//
//    if(req.session.username != null){
//        Post.find({
//            user : req.session.username
//        }).then((posts)=>{
//            res.render("profile.hbs", {
//                posts : posts,
//                user : req.session.username,
//                username : req.session.username
//
//            });
//        }, (err)=>{
//            res.render("index.hbs")
//        })
//    }
//    else{
//        Post.find().then((posts)=>{
//            res.render("profileNA.hbs", {
//                posts : posts
//            });
//        }, (err)=>{
//            res.render("index.hbs")
//    })
//
//    }
//});

//app.get("/redirectmeme", (req, res) => { //index???
//    console.log("GET /meme");
//
//    if(req.session.username != null){
//        Post.find().then((posts)=>{
//            res.render("meme.hbs", {
//                posts : posts
//            });
//        }, (err)=>{
//            res.render("index.hbs")
//        })
//    }
//    else{
//        Post.find().then((posts)=>{
//            res.render("memeNA.hbs", {
//                posts : posts
//            });
//        }, (err)=>{
//            res.render("index.hbs")
//    })
//
//    }
//});

//app.get("/search", urlencoder, (req, res) => { //tags
//    console.log("search input: "+req.query.searchinput)
//
//    var input = req.query.searchinput;
//    var tagID;
//
//     Tag.findOne({
//        name : input
//     }).then((tag)=>{
//        if(tag != null){
//            console.log("Tag: " + tag)
//            tagID = tag._id
//
//            Post.find({
//                tags : tag._id
//            }).then((posts)=>{
//                if(req.session.username != null){
//                    res.render("tag.hbs", {
//                    name : tag.name,
//                    posts : posts
//                    });
//                }
//                else{
//                    res.render("tagNA.hbs")
//                }
//
//
//            }, (err)=>{
//                res.render("index.hbs")
//            })
//
//        }
//        else{
//            res.redirect("/")
//        }
//     })
//});
//
//app.post("/deleteTag", urlencoder, (req, res) => { //tag
//    console.log("Deleting tag with id of: " + req.body.deletetagid)
//});

//app.post("/addTag", urlencoder, (req, res) => { //tag
//    console.log("GET /addTag");
//
//    var newtag = req.body.addtagname;
////    console.log("NEW TAG ADDED: "+ newtag);
//    var postID = req.body.id;
////    console.log("TAG OF POST ID: "+postID); //id of post (not yet used)
//
//    Tag.findOne({
//        name : newtag
//    }).then((tag)=>{
//        if(tag != null){ //existing tag
//            console.log("tag "+newtag+" already exists");
//
//            Tag.findOneAndUpdate({_id : tag._id}, {$push: { postID : postID }}, {new: true}, function(err, doc){
//                if(err){
//                    console.log("Something wrong when updating tag!");
//                }
//                console.log(doc);
//            });
//
//            Post.findOneAndUpdate({_id : postID}, {$push: { tags : tag._id }}, {new: true}, function(err, doc){
//                if(err){
//                    console.log("Something wrong when updating post!");
//                }
//                console.log(doc);
//            });
//
//            console.log("Postids in found:" + tag.postID.length)
//            res.redirect("/redirectprofile")
//        }
//        else{
//            var f = new Tag({
//                name : newtag,
//                postID : postID
//            })
//
//            console.log(f)
//
//            f.save().then(()=>{
//                //things were correct
//                console.log("Tag:" + newtag)
//                console.log("Postids new:" + f.postID.length)
//                res.redirect("/redirectprofile")
//            }, (err)=>{
//                console.log("ERROR: Somethings wrong")
//                res.render("index.hbs")
//            })
//
////            Tag.update({_id : f._id}, { $push: { postID: postID } })
//        }
//    }, (err)=>{
//        res.render("index.hbs")
//    })
//    //////////////////////////////////////
//
//
//
////    res.redirect("/redirectmeme")
//});

//app.post("/register", urlencoder, (req, res) => { //user
//    console.log("POST /register");
//
//    var username = req.body.regusername;
//    var name = req.body.regname;
//    var password = req.body.regpassword;
//    var conpassword = req.body.regconfirmpassword;
//    var description = req.body.regshortdescription;
//
//    User.findOne({
//        username : username
//    }).then((user)=>{
//        if(user == null){
//            if(password == conpassword){
//                var hashedpassword = encrypt(password);
//
//                var f = new User({
//                    username, name, password: hashedpassword, description
//                })
//
//                f.save().then(()=>{
//                    //things were correct
//                    console.log("UName:" + username + " Name:" + name + " Password:" + password + " Description:" + description)
//                    res.redirect("/")
//                }, (err)=>{
//                    console.log("ERROR: Somethings wrong")
//                    res.render("index.hbs")
//                })
//
//                req.session.username = username
//            }
//            else{
//                // not same password
//                console.log("ERROR: Not same password")
//                res.render("index.hbs")
//            }
//        }
//        else{
//            console.log("ERROR: Username taken")
//            res.render("index.hbs")
//            // username exists
//        }
//    }, (err)=>{
//        res.render("index.hbs")
//    })
//});

//app.get("/profile", (req, res) => { //???????DELETE THIS
//    console.log("GET /profile");
//    console.log("uname sesh: "+req.session.username);
//
//    res.redirect("/redirectprofile");
//});
//
//app.get("/profileNA", (req, res) => { //?????DELETE THIS
//    console.log("GET /profileNA");
//
//    res.redirect("/redirectprofile");
//});

//app.get("/index", (req, res) => {
//    console.log("GET /index");
//    res.redirect("/");
////    res.render("index.hbs");
//});

app.get("/home", (req, res) => { //??????DELETE THIS
    console.log("uname sesh: "+req.session.username);
    console.log("GET /home");

    res.redirect("/")
});

//app.get("/uploadmeme", (req, res) => { //INDEX???
//    console.log("get /uploadmeme");
//    console.log("uname sesh: "+req.session.username);
//
//    res.render("uploadmeme.hbs");
//});
//
//app.post("/upload", urlencoder, (req, res) => { //post
//    console.log("post /uploaded");
//    console.log("uname sesh: "+req.session.username);
//
//    var title ="", id, user ="", tags, likers, unlikers, time, privacy="false", sharedTo, tagID;
//
//    var x = new Post({
//        title, id, user, tags, likers, unlikers, time, privacy, sharedTo
//    })
//
//    x.save()
//
//    var postID = x._id
//
//    console.log("Post ID: " +postID)
//
//    title = req.body.memetitle;
//    user = req.session.username;
//
//    User.findOne({
//        username : user
//    }).then((user)=>{
//        if(user != null){
//            console.log("USER: " + user)
//            id = user._id;
//
//        }
//        else{
//            id = 0000;
//        }
//    })
////
//    tags = req.body.tags; //process csv
////
//
//    Tag.findOne({
//        name : tags
//    }).then((tag)=>{
//        if(tag != null){ //existing tag
//
//            Tag.findOneAndUpdate({_id : tag._id}, {$push: { postID : postID }}, {new: true}, function(err, doc){
//                if(err){
//                    console.log("Something wrong when updating tag!");
//                }
//                console.log(doc);
//            });
//
//            updatePost(title, id, user, tag._id, likers, unlikers, time, privacy, sharedTo, postID);
//
//        }
//        else{
//            var f = new Tag({
//                name : tags,
//                postID : postID
//            })
//
//            f.save().then(()=>{
//                console.log("F: "+f)
//                tagID = f._id
//            }).then(()=>{
//                console.log("HIII BITCHESS")
//                 privacy = req.body.privacy;
//
//                if(privacy=="private"){
//                    privacy = true;
//                }
//                else {
//                    privacy = false;
//                }
//
//                console.log("TAG ID = " + tagID);
//
//                updatePost(title, id, user, tagID, likers, unlikers, time, privacy, sharedTo, postID);
//                console.log("HIII AGAIN BITCHESS")
//            }, (err)=>{
//                console.log("ERROR: Somethings wrong")
//            })
//        }
//        res.redirect("/")
//    }, (err)=>{
//        console.log(err)
//        return null
//    })
//
//});
//
// app.get("/logout", (req, res) => { //user or index?
//     console.log("GET /logout");
//
//     req.session.destroy((err)=> {
//         if(err){
//             console.log(err)
//         } else {
//             console.log("Destroyed sesh")
//         }
//
//     })
//     res.redirect("/");
// //    res.render("index.hbs");
// });
//
// app.get("/memeNA", (req, res) => { //????DELETE THIS
//     console.log("GET /memeNA");
//
//     res.redirect("/redirectmeme");
// });

// app.get("/meme", (req, res) => { //post
//     console.log("GET /meme");
//
//     Post.findOne({
//         _id: req.query.id
//     }).then((post)=>{
//         res.render("meme.hbs", {
//             post
//         })
//     }, (err)=>{
//
//     })
// });

// app.get("/tag", (req, res) => { //index or delete???
//     console.log("GET /tag");
//
//     res.render("tag.hbs");
// });
//
// app.get("/tagNA", (req, res) => { //index or delete???
//     console.log("GET /tagNA");
//
//     res.render("tagNA.hbs");
// });

//app.post("/postDelete", urlencoder, (req, res) => { //post
//    console.log("POST /postDelete");
//
//    console.log("Body id is: " + req.body.id)
//
//    Post.deleteOne({
//        _id: req.body.id
//    }).then((post)=>{
//        res.redirect("/redirectprofile")
//
//    })
//
//});

//app.post("/postEdit", urlencoder, (req, res) => { //post
//    console.log("POST /postEdit");
//
//    var id = req.body.id // for finding one post
//    console.log("Body id = " + id)
//    var title = req.body.edittitle
//    console.log("Title = " + title)
//    var likes;
//    var Uid;
//    var user = req.session.username;
//    User.findOne({
//        username : user
//    }).then((user)=>{
//        if(user != null){
//            Uid = user._id;
//
//        }
//        else{
//            Uid = 0000;
//        }
//    })
////    var tags = req.body.tags; //process csv
//    var likers; //default null
//    var unlikers; //default null
//    var time; //set to now
//
//    var tags = req.body.edittags
//
//    var privacy = req.body.editprivacy
//    if(privacy=="private"){
//        privacy = true;
//    }
//    else {
//        privacy = false;
//    }
//    console.log("Privacy: " + privacy)
//
//    var sharedTo; //default null
//
//    Post.findOne({
//        _id : id
//    }).then((post)=>{
//        if(post != null){
//            if(!req.body.edittitle){
//                console.log("WALANG LAMAN TITLE!!")
//                console.log("post.title="+ post.title)
//                title = post.title
//            }
//            if(!req.body.edittags){
//                console.log("WALANG LAMAN TAGS!!")
//                tags = post.tags
//            }
//        }
//        else{
//            console.log("ERROR IN FINDING ONE IN POST")
//        }
//    })
//
//    let newPost = {
//        title, likes, id:Uid, user, likers, unlikers, time, privacy, sharedTo
//    }
//
//    Post.findOneAndUpdate({
//        _id : id,
//        user : user
//    }, newPost).then(()=>{
//        res.redirect("/redirectprofile")
//    })
//
//});

//app.use("*", (request, response)=> { //index
//    response.status(404).send("These are not the sites you are looking for");
//});

app.use(require("./controllers"))


app.listen(3000, () => { //index
    console.log("listening in port 3000")
});




