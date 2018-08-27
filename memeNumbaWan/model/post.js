const mongoose = require("mongoose")
//const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId


const PostSchema = mongoose.Schema({
    title: String,
    user: String,
    tags: [String],
    likers: [String],
    unlikers: [String],
    time: {type: Date, default: Date.now},
    privacy: Boolean,
    sharedTo: [String]
})

delete mongoose.connection.models['post'];
const Post = mongoose.model("post", PostSchema);


module.exports = {
    Post
}

var a = {
    Post
}

//CREATE NEW POST
module.exports.createNew = function(post){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/createNew-----")

    var p = new Post(post)

    p.save().then((newPost)=>{
      console.log ("*NEW POST CREATED!*")

      resolve(newPost)
    }, (err)=>{
      reject(err)
    })
  })
}

//FIND ONE AND UPDATE BY ID ONLY
module.exports.updateOneByID = function(id, newPost){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/updateOneByID-----")

    Post.findOneAndUpdate({
        _id : id
    }, newPost).then(()=>{
       console.log ("*POST UPDATED!*")
//        res.redirect("/redirectprofile")
    })

// SAMPLE:
//    Post.findOneAndUpdate({
//      _id : id
//    }, update, {
//      new : true
//    }).then((newPost)=>{
//      resolve(newPost)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//FIND ONE AND UPDATE BY ID AND USER (private/public)
module.exports.updateOneByUser = function(id, user, newPost){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/updateOneByUser-----")

    Post.findOneAndUpdate({
        _id : id,
        user : user
    }, newPost).then(()=>{
       console.log ("*POST UPDATED!*")
//        res.redirect("/redirectprofile")
    })

// SAMPLE:
//    Post.findOneAndUpdate({
//      _id : id
//    }, update, {
//      new : true
//    }).then((newPost)=>{
//      resolve(newPost)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//FIND ONE AND PUSH TAGS
module.exports.updateAndPush = function(id, tag){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/updateAndPush-----")

    Post.findOneAndUpdate({
        _id : id
    },{
        $push: {tags : tag}
    },{
        new: true
    }, function(err, doc){
        if(err){
            console.log ("*POST NOT UPDATED!*")
        }
        console.log(doc);
    });
  })
}

//GET ALL POSTS
module.exports.getAll = function(){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/getAll-----")

    Post.find().then((posts)=>{
       console.log ("*GOT ALL POSTS!*")
       resolve(posts)
//      res.render("home.hbs", {
//        posts : posts,
//      });
    }, (err)=>{
       console.log ("*DID NOT GET ALL POSTS!*")
       reject(err)

//      res.render("landing.hbs")
    })

// SAMPLE:
//    Post.find().then((posts)=>{
//      resolve(posts)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//GET ALL POSTS FILTERED BY NAME
module.exports.getAllFiltered = function(uname){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/getAll-----")

    Post.find({
        user : req.session.username
    }).then((posts)=>{
       console.log ("*GOT ALL POSTS!*")
       resolve(posts)
//      res.render("home.hbs", {
//        posts : posts,
//      });
    }, (err)=>{
       console.log ("*DID NOT GET ALL POSTS!*")
       reject(err)

//      res.render("landing.hbs")
    })

// SAMPLE:
//    Post.find().then((posts)=>{
//      resolve(posts)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//GET ONE POST
module.exports.getOne = function(id){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/getOne-----")

    Post.findOne({
      _id: id
    }).then((post)=>{
       console.log ("*GOT ONE POST!*")

//      res.render("meme.hbs", {
//          post
//      })
    }, (err)=>{
       console.log ("*POST DOES NOT EXIST!*")

        reject(err)
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

//DELETE POST
module.exports.deletePost = function(id){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/deletePost-----")

    Post.deleteOne({
      _id: id
    }).then((post)=>{
       console.log ("*POST DELETED!*")

//      res.redirect("/redirectprofile")
    })

// SAMPLE:
//    Post.remove({
//      _id : id
//    }).then((result)=>{
//      resolve(result)
//    }, (err)=>{
//      reject(err)
//    })
  })
}
