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
    sharedTo: [String],
    filename : String,
    originalfilename: String
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
module.exports.createNew = function(title, user, tags, likers, unlikers, time, privacy, sharedTo, filename, originalfilename){
    return new Promise(function(resolve, reject){
        console.log ("-----model/post/createNew-----")
        console.log(filename)
        console.log(originalfilename)

        var p = new Post({
            title,
            user,
            tags,
            likers,
            unlikers,
            time,
            privacy,
            sharedTo,
            filename,
            originalfilename
        })

        p.save().then((newPost)=>{
            console.log ("NEW POST CREATED!")

            resolve(newPost)
        }, (err)=>{
            reject(err)
        })
    })
};

//FIND ONE AND UPDATE BY ID ONLY
module.exports.updateOneByID = function(id, title, user, tagID, likers, unlikers, time, privacy, sharedTo, filename, originalfilename){
    return new Promise(function(resolve, reject){
        console.log ("-----model/post/updateOneByID-----")

        let newPost = {
            title, user, tags:tagID, likers, unlikers, time, privacy, sharedTo, filename, originalfilename
        }

        Post.findOneAndUpdate({
            _id : id
        }, newPost).then(()=>{
            console.log ("POST UPDATED!")
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
module.exports.updateOneByUser = function(id, user, title, tags, likers, unlikers, time, privacy, sharedTo, filename, originalfilename){
    return new Promise(function(resolve, reject){
        console.log ("-----model/post/updateOneByUser-----")

        let newPost = {
            title, user, tags, likers, unlikers, time, privacy, sharedTo, filename, originalfilename
        }

        console.log(id)
        console.log(user)
        Post.findOneAndUpdate({
            _id : id,
            user : user
        }, newPost).then((updatedpost)=>{
            console.log ("POST UPDATED!")
            console.log(updatedpost)
            resolve(updatedpost)

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

//FIND ONE AND PUSH SHAREDTO USERS
module.exports.updateAndPushSharedTo = function(id, user){
    return new Promise(function(resolve, reject){
        console.log ("-----model/post/updateAndPush-----")

        Post.findOneAndUpdate({
            _id : id
        },{
            $push: {sharedTo : user}
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

//get all by tagname
module.exports.getAllByTagName = function(name){
    return new Promise(function(resolve, reject){
        console.log ("-----model/post/getAll-----")

        Post.find({tags: name}).then((posts)=>{
            // console.log ("*GOT ALL POSTS!*")
            console.log(posts)
            resolve(posts)
//      res.render("home.hbs", {
//        posts : posts,
//      });
        }, (err)=>{
            console.log ("*DID NOT GET ALL POSTS!*")
            reject(err)

//      res.render("index.hbs")
        })

// SAMPLE:
//    Post.find().then((posts)=>{
//      resolve(posts)
//    }, (err)=>{
//      reject(err)
//    })
    })
}


// get all by tag id
module.exports.getAllByTagID = function(id){
    return new Promise(function(resolve, reject){
        console.log ("-----model/post/getAll-----")

        Post.find({tags_id: id}).then((posts)=>{
            // console.log ("*GOT ALL POSTS!*")
            console.log(posts)
            resolve(posts)
//      res.render("home.hbs", {
//        posts : posts,
//      });
        }, (err)=>{
            console.log ("*DID NOT GET ALL POSTS!*")
            reject(err)

//      res.render("index.hbs")
        })

// SAMPLE:
//    Post.find().then((posts)=>{
//      resolve(posts)
//    }, (err)=>{
//      reject(err)
//    })
    })
}

//GET ALL POSTS
module.exports.getAll = function(username){
  return new Promise(function(resolve, reject){
    console.log ("-----model/post/getAll-----")

      if(username != null){
        var Posters

          Post.find({privacy:"false"}).then((posts)=>{
              console.log ("*GOT ALL POSTS!*")
                Posters = posts

          }).then(()=>{
              Post.find({user: username, privacy:"true"}).then((posts)=>{

                  for(var i=0; i<posts.length; i++){
                      // console.log(posts[i])
                      Posters.push(posts[i])
                  }



              }).then(()=>{
                  Post.find({sharedTo: username, privacy:"true"}).then((posts)=>{
                      for(var i=0; i<posts.length; i++){
                          // console.log(posts[i])
                          Posters.push(posts[i])
                      }
                      resolve(Posters)
                  }, (err)=>{
                      console.log("LAST LOOP TO GET")
                  })

              }, (err)=>{
                  console.log ("*DID NOT GET ALL POSTS!*")
                  reject(err)

              })

              // resolve(Posters)

          }, (err)=>{
              console.log ("*DID NOT GET ALL POSTS!*")
              reject(err)

          })


      }
      else{
          Post.find({privacy:"false"}).then((posts)=>{
              console.log ("*GOT ALL POSTS!*")
              resolve(posts)
//      res.render("home.hbs", {
//        posts : posts,
//      });
          }, (err)=>{
              console.log ("*DID NOT GET ALL POSTS!*")
              reject(err)

//      res.render("index.hbs")
          })
      }


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
        user : uname
    }).then((posts)=>{
       console.log ("*GOT ALL POSTS!*")
       resolve(posts)
//      res.render("home.hbs", {
//        posts : posts,
//      });
    }, (err)=>{
       console.log ("*DID NOT GET ALL POSTS!*")
       reject(err)

//      res.render("index.hbs")
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

    Post.find({
      _id: id
    }).then((post)=>{
       console.log ("*GOT ONE POST!*")
        resolve(post)
//      res.render("meme.hbs", {
//          post
//      })
    }, (err)=>{

        console.log ("*POST DOES NOT EXIST!*")
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


//POST.FINDONE
module.exports.findOneFunction = function(id){
    return new Promise(function(resolve, reject){
        console.log ("-----model/post/getOne-----")

        Post.findOne({
            _id: id
        }).then((post)=>{
            // console.log ("*GOT ONE POST!*")
            resolve(post)
//      res.render("meme.hbs", {
//          post
//      })
        }, (err)=>{

            console.log ("*POST DOES NOT EXIST!*")
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
