const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//const UserSchema = new Schema({
//    username: { type: String, required: true}
//})

const PostSchema = new Schema({
    title: String,
    user: String,
    likers: [String],
    unlikers: [String],
    time: {type: Date, default: Date.now},
    privacy: Boolean,
    sharedTo: [String]
})

const TagSchema = mongoose.Schema({
    name : { type: String, required: true} , 
    posts : [PostSchema]
})

const Tag = mongoose.model ("tag", TagSchema)

module.exports = TagSchema
//{
//    Tag
//}

var a = {
    Tag
}