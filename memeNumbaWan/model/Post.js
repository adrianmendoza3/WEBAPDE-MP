const mongoose = require("mongoose")

var PostSchema = mongoose.Schema({
//    name : String,
//    price : Number,
//    cuisine : String

    Caption : {
        type: String,
        required: true,
        unique: true
    },
    UserID : Number,
    MemePic : String,
    Likers : Number,
    Disapprovers : String,
    SharedTo : Number,
    Privacy : Boolean
})

var Post = mongoose.model ("post", FoodSchema)

module.exports = {
    Post
}

var a = {
    Post
}