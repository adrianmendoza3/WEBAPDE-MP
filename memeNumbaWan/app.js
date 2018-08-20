const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
const mongoose = require("mongoose")
//const mongostore = require("connect-mongo")(session)
const {Post} = require("./model/post.js")
const {Tag} = require("./model/tag.js")
const {User} = require("./model/user.js")
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
//app.use(express.static(__dirname+"/views"));
//app.use(express.static(__dirname+"/storage/images"));
//app.use(express.static(__dirname+"/css"));
//app.use(express.static(__dirname+"/model"))
app.use(express.static(__dirname+"/public"))

app.use(session({
    secret: "super secret",
    name: "super secret",
    resave: true,
    saveUnitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*7*3
    }
}))

app.use(require("./controllers"))

app.listen(3000, () => {
    console.log("listening in port 3000")
});
