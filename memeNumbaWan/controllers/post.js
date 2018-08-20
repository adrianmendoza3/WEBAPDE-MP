/*

Controllers folder should contain all routes dedicated to the particular document
Controllers should not directly access and manipulate the db, it should access the models folder files

*/
const express = require("express")
const router = express.Router()
const Post = require("../model/post")
const bodyparser = require("body-parser")
const auth = require("../middlewares/auth")

const app = express()

const urlencoder = bodyparser.urlencoded({
  extended : true
})

router.use(urlencoder)
// localhost:3000/post/

router.post("/", auth, (req, res)=>{
  console.log("POST /post/")

  var post = {
    text : req.body.text
  }

  Post.create(post).then((post)=>{
    Post.getAll().then((posts)=>{
      res.render("home", {
        posts
      })
    })
  },(error)=>{
    res.render("index", {
      error : "some error in posting: " + error
    })
  })

})

// localhost:3000/post/someid
router.get("/:id", (req, res)=>{
  console.log("POST /post/"+req.params.id)
  Post.get(req.params.id).then((post)=>{
    console.log(post)
    res.render("post", {
      post
    })
  },(error)=>{
    res.render("home", {
      error
    })
  })
})

// always remember to export the router
module.exports = router
