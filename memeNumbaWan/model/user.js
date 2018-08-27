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

delete mongoose.connection.models['user'];
const User = mongoose.model ("user", UserSchema);

module.exports = {
    User
}

var a = {
    User
}

//CREATE NEW USER
module.exports.createNew = function(username, hashedpassword, description){
  return new Promise(function(resolve, reject){
    console.log ("-----model/user/createNew-----")

    var u = new User({username, password:hashedpassword, description})

    u.save().then((user)=>{
      console.log ("*NEW USER CREATED!*")
        resolve(user)
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
module.exports.getOneByUnameAndPword = function(uname, pword){
  return new Promise(function(resolve, reject){
    console.log ("-----model/user/getOneByUnameAndPword-----")

    User.findOne({
            username : uname,
            password : pword
    }).then((user)=>{
        if(user != null){
            resolve(user)
           console.log ("*GOT ONE USER!*")
                resolve(user)
//            console.log(user.username + ": " + user.password);
//            req.session.username = user.username;
//            console.log("uname sesh: "+req.session.username);
//            res.redirect("/")
        }
        else{
            resolve(user)
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
module.exports.getOneByUname = function(uname){
  return new Promise(function(resolve, reject){
    console.log ("-----model/user/getOneByUname-----")

    User.findOne({
            username : uname
    }).then((user)=>{
        if(user != null){
           console.log ("*GOT ONE USER!*")
            resolve(user)
//            console.log(user.username + ": " + user.password);
//            req.session.username = user.username;
//            console.log("uname sesh: "+req.session.username);
//            res.redirect("/")
        }
        else{
           console.log ("*USER DOES NOT EXIST!*")
            resolve(user)
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
module.exports.updateAndPush = function(id, post){
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


