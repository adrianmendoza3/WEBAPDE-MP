const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create user schema and model

const UserSchema = new Schema({
    username: String,
    name: String,
    password: String,
    description: String
//    img: {
//        type: String,
//        default: '/img/samples/sample_profile.jpg',
//    },
//    postIDs : {
//        type : Array,
//        default: null
//    }
    
})

const User = mongoose.model ("user", UserSchema);

module.exports = {
    User
}

var a = {
    User
}