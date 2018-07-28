

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



app.listen(3000, () => {
    console.log("listening in port 3000")
});

