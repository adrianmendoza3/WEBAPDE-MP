const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//const PostSchema = new Schema ({
//    title: String,
//    user: String,
//    likers: [String],
//    unlikers: [String],
//    time: {type: Date, default: Date.now},
//    privacy: Boolean,
//    sharedTo: [String]
//})
const TagSchema = mongoose.Schema({  
    name : {type: String, required: true}, 
    posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

delete mongoose.connection.models['tag'];
const Tag = mongoose.model ("tag", TagSchema)

module.exports = {
    Tag
}

var a = {
    Tag
}

//CREATE NEW TAG
module.exports.createNew = function(tag){
  return new Promise(function(resolve, reject){
    console.log ("-----model/tag/createNew-----")

    var t = new Tag(tag)

    t.save().then(()=>{
      console.log ("*NEW POST CREATED!*")
//        res.redirect("/redirectprofile")
    }, (err)=>{
//        res.render("index.hbs")
    })

//    p.save().then((newPost)=>{
//      resolve(newPost)
//    }, (err)=>{
//      reject(err)
//    })
  })
}

//GET ONE TAG
module.exports.getOne = function(tagname){
  return new Promise(function(resolve, reject){
    console.log ("-----model/tag/getOne-----")

    Tag.findOne({
      name: tagname
    }).then((tag)=>{
       console.log ("*GOT ONE TAG!*")

//      res.render("meme.hbs", {
//          post
//      })
    }, (err)=>{
       console.log ("*TAG DOES NOT EXIST!*")

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

//FIND ONE AND PUSH POSTS
module.exports.updateAndPush = function(id, post){
  return new Promise(function(resolve, reject){
    console.log ("-----model/tag/updateAndPush-----")

    Tag.findOneAndUpdate({
        _id : id
    },{
        $push: {posts : post}
    },{
        new: true
    }, function(err, doc){
        if(err){
            console.log ("*TAG NOT UPDATED!*")
        }
        console.log(doc);
    });
  })
}

//DELETE POST
module.exports.deletePost = function(id){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/deletePost-----")

    Tag.deleteOne({
      _id: id
    }).then((tag)=>{
       console.log ("*TAG DELETED!*")

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


