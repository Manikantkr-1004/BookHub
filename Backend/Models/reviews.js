const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    comments:{type:Array, required: true},
    book_id: {type:String, required: true}
},{
    versionKey: false
});

//In the Comments array, these things we need
// comment: {type: String, required: true},
// username: {type:String, required: true},
// user_id: {type:String, required: true},
// published: {type:String, required: true}

const reviewModel = mongoose.model('review',reviewSchema);

module.exports = {reviewModel};