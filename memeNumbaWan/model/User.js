const mongoose = require("mongoose")

var UserSchema = mongoose.Schema({
//    name : String,
//    price : Number,
//    cuisine : String

    Name : {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true
    },
    Password : String,
    Description : String
})

var User = mongoose.model ("user", UserSchema)

module.exports = {
    User
}

var a = {
    User
}