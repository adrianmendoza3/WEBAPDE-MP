const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create user schema and model

//const TagSchema = mongoose.Schema({
//    name : { type: String, required: true} , 
//})

const PostSchema = new Schema({
    title: String,
    tags: [String],
    likers: [String],
    unlikers: [String],
    time: {type: Date, default: Date.now},
    privacy: Boolean,
    sharedTo: [String]
})

const UserSchema = new Schema({
    username: {
        type:String,
        index: true
    },
    password: String,
    description: String,
    posts : [PostSchema]
    
})

const User = mongoose.model ("user", UserSchema);

module.exports = UserSchema
//{
//    User
//}

var a = {
    User
}