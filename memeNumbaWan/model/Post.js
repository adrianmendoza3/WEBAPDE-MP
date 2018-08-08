const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const PostSchema = new Schema({

    title: String,
    uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    user: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    likers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    unlikers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    time: {type: Date, default: Date.now},
    privacy: Boolean,
    sharedTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    
})


const Post = mongoose.model ("post", PostSchema);

module.exports = {
    Post
}

var a = {
    Post
}