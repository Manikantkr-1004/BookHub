const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{type:String, required: true},
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    created: {type:String, required: true},
    purchased: {type:Array, required: true},
    cart: {type:Array, required: true},
    image: {type:String, required: false}
},{
    versionKey: false
});

const userModel = mongoose.model('user',userSchema);

module.exports = {userModel};