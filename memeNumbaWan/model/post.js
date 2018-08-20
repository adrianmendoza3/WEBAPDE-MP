const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

//const UserSchema = new Schema({
//    username: { type: String, required: true}
//})

//const TagSchema = mongoose.Schema({
//    name : { type: String, required: true}     
//})

const PostSchema = new Schema({
    title: String,
    user: String,
    tags: [String],
    likers: [String],
    unlikers: [String],
    time: {type: Date, default: Date.now},
    privacy: Boolean,
    sharedTo: [String]
})

const Post = mongoose.model("post", PostSchema);

module.exports = PostSchema

var a = {
    Post
}