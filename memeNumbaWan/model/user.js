const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create user schema and model

//const PostSchema = new Schema({
//    title: String,
//    tags: [String],
//    likers: [String],
//    unlikers: [String],
//    time: {type: Date, default: Date.now},
//    privacy: Boolean,
//    sharedTo: [String]
//})

const UserSchema = new Schema({
    username: {
        type:String,
        index: true
    },
    password: String,
    description: String,
    posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    
})

const User = mongoose.model ("user", UserSchema);

module.exports = {
    User
}

var a = {
    User
}

//CREATE NEW USER
exports.createNew = function(user){
  return new Promise(function(resolve, reject){
    console.log ("-----model/user/createNew-----")

    var u = new User(user)

    u.save().then(()=>{
      console.log ("*NEW USER CREATED!*")
//        res.redirect("/redirectprofile")
    }, (err)=>{
      console.log ("*NEW USER NOT CREATED!*")
//        res.render("landing.hbs")
    })

//    p.save().then((newPost)=>{
//      resolve(newPost)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//GET ONE USER BY USERNAME & PASSWORD
exports.getOneByUnameAndPword = function(uname, pword){
  return new Promise(function(resolve, reject){
    console.log ("-----model/user/getOneByUnameAndPword-----")

    User.findOne({
            username : uname,
            password : pword
    }).then((user)=>{
        if(user != null){
           console.log ("*GOT ONE USER!*")

//            console.log(user.username + ": " + user.password);
//            req.session.username = user.username;
//            console.log("uname sesh: "+req.session.username);
//            res.redirect("/")
        }
        else{
           console.log ("*USER DOES NOT EXIST!*")

//            res.redirect("/")
//            console.log("cannot login")
        }
    }, (err)=>{
        console.log ("*USER DOES NOT EXIST!*")
//        res.render("landing.hbs")
    })

// SAMPLE:
//    Post.findOne({_id:id}).then((post)=>{
//      console.log(post)
//      resolve(post)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//GET ONE USER BY USERNAME
exports.getOneByUname = function(uname){
  return new Promise(function(resolve, reject){
    console.log ("-----model/user/getOneByUnameAndPword-----")

    User.findOne({
            username : uname
    }).then((user)=>{
        if(user != null){
           console.log ("*GOT ONE USER!*")

//            console.log(user.username + ": " + user.password);
//            req.session.username = user.username;
//            console.log("uname sesh: "+req.session.username);
//            res.redirect("/")
        }
        else{
           console.log ("*USER DOES NOT EXIST!*")

//            res.redirect("/")
//            console.log("cannot login")
        }
    }, (err)=>{
        console.log ("*USER DOES NOT EXIST!*")
//        res.render("landing.hbs")
    })

// SAMPLE:
//    Post.findOne({_id:id}).then((post)=>{
//      console.log(post)
//      resolve(post)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//FIND ONE AND PUSH POSTS
exports.updateAndPush = function(id, post){
  return new Promise(function(resolve, reject){
    console.log ("-----model/user/updateAndPush-----")

    User.findOneAndUpdate({
        _id : id
    },{
        $push: {posts : post}
    },{
        new: true
    }, function(err, doc){
        if(err){
            console.log ("*USER NOT UPDATED!*")
        }
        console.log(doc);
    });
  })
}

