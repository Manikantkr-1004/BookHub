const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    username:{type:String, required: true},
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    created: {type:String, required: true}
},{
    versionKey: false
});

const authorModel = mongoose.model('author',authorSchema);

module.exports = {authorModel};