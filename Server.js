

const express = require("express")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const session = require("express-session") //for cookies also
const path = require("path")
const cookieparser = require("cookie-parser") //for cookies also
// const mongoose = require("mongoose")
// const mongostore = require("connect-mongo")(session)


const app = express()
const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.use(express.static(__dirname+"/views"))



app.get("/", (req, res, next) => {
    console.log("GET /")



    console.log("HI")
})

//app.use(express.static(path.join(__dirname, "views")))

app.listen(3000, () => {
    console.log("listening in port 3000")
})

