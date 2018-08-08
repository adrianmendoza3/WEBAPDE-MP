const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const PostSchema = new Schema({

    title: String,
    likes: {
        type: Number,
        default: 0
    },
    uid: ObjectId,
    user: String,
    tags: Array,
    likers: Array,
    unlikers: Array,
    time: {type: Date, default: Date.now},
    privacy: Boolean,
    sharedTo: Array
    
})


const Post = mongoose.model ("post", PostSchema);

module.exports = {
    Post
}

var a = {
    Post
}