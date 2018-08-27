const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
const mongoose = require("mongoose")
const Post = require("../model/post")
const router = express.Router()
const auth = require("../middlewares/auth")

router.use("/post", require("./post"))
router.use("/user", require("./user"))
router.use("/tag", require("./tag"))

// create the route for the index/home page
router.get("/", auth, (req, res)=>{
  console.log("GET /")

  Post.getAll().then((posts)=>{
    res.render("home", {
      posts
    })
  })

})

module.exports = router