const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    author_id :{type:String, required: true},
    author_name: {type: String, required: true},
    title: {type:String, required: true},
    genre: {type:String, required: true},
    description: {type:String, required: true},
    published: {type:Number, required: true},
    price: {type:Number, required: true},
    pages: {type:Number, required: true},
    imageLink: {type:String, required: true},
    likes: {type:Array, require: true}
},{
    versionKey: false
});

const bookModel = mongoose.model('book',bookSchema);

module.exports = {bookModel};