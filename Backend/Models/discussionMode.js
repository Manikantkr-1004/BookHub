const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema({
    chat:{type:Array, required: true},
    book_id: {type:String, required: true},
    book_title: {type: String,required: true},
    book_author: {type: String, required: true},
    book_image: {type:String, required: true}
},{
    versionKey: false
});

//In the chat array, these things we need
// comment: {type:String, required: true},
// username: {type:String, required: true},
// user_id: {type:String, required: true},
// published: {type:String, required: true}

const discussionModel = mongoose.model('discussion',discussionSchema);

module.exports = {discussionModel};