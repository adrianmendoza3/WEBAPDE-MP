

const express = require("express");
const hbs = require("hbs");
const bodyparser = require("body-parser");
const session = require("express-session"); //for cookies also
const path = require("path");
const cookieparser = require("cookie-parser"); //for cookies also
// const mongoose = require("mongoose")
// const mongostore = require("connect-mongo")(session)


const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.set("view engine", "hbs");
app.use(express.static(__dirname+"/views"));
app.use(express.static(__dirname+"/storage/images"));
app.use(express.static(__dirname+"/css"));

//
// var staticResourse = '/Users/adrianmendoza/Desktop/Git/WEBAPDE-MP/storage/images';
// app.use(express.static(path.join(staticResourse, 'public2')));

// app.use(express.static(path.join(__dirname, "views")))

app.get("/", (req, res, next) => {
    console.log("GET /");

        res.render("landing.hbs");
//        res.sendFile(path.join(__dirname, "views/landing.hbs"))

    console.log("HI");
});

app.post("/login", urlencoder, (req, res) => {
    console.log("POST /login");

    res.render("home.hbs");
});

app.post("/register", urlencoder, (req, res) => {
    console.log("POST /login");

    res.render("home.hbs");
});

app.get("/profile", (req, res) => {
    console.log("GET /profile");

    res.render("profile.hbs");
});

app.get("/profileNA", (req, res) => {
    console.log("GET /profileNA");
    
    res.render("profileNA.hbs");
});

app.get("/landing", (req, res) => {
    console.log("GET /landing");
    
    res.render("landing.hbs");
});

app.get("/home", (req, res) => {
    console.log("GET /home");

res.render("home.hbs");
});

app.post("/upload", (req, res) => {
    console.log("GET /upload");

    res.render("home.hbs");
});

app.get("/uploadmeme", (req, res) => {
    console.log("GET /uploadmeme");

    res.render("uploadmeme.hbs");
});

app.get("/logout", (req, res) => {
    console.log("GET /logout");

    res.render("landing.hbs");
});

app.get("/memeNA", (req, res) => {
    console.log("GET /memeNA");

    res.render("memeNA.hbs");
});

app.get("/meme", (req, res) => {
    console.log("GET /meme");

    res.render("meme.hbs");
});

app.get("/tag", (req, res) => {
    console.log("GET /tag");

    res.render("tag.hbs");
});

app.get("/tagNA", (req, res) => {
    console.log("GET /tagNA");

    res.render("tagNA.hbs");
});

app.get("/addTag", (req, res) => {
    console.log("GET /addTag");

    res.render("meme.hbs");
});

app.post("/postDelete", (req, res) => {
    console.log("POST /postDelete");
    
    res.render("profile.hbs");
});

app.post("/postEdit", (req, res) => {
    console.log("POST /postEdit");
    
    res.render("profile.hbs");
});

app.use("*", (request, response)=> {
    response.status(404).send("These are not the sites you are looking for");
});

app.listen(3000, () => {
    console.log("listening in port 3000")
});

