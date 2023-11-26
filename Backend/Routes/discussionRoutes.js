const express = require("express");
const jwt = require("jsonwebtoken");
const { discussionModel } = require("../Models/discussionMode");
require('dotenv').config();

const discussionRouter = express.Router();

//To get all discussions, token need as a headers authorization
discussionRouter.get('/get',async(req,res)=>{
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not Authorized, Please Login"});
            }else{
                let discussions = await discussionModel.find();
                res.send({msg:'Discussions Getting Successfully!!',discussions});
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To Publish new Discussion, book_id & book_title & book_author & book_image need as a query
//comment & user_id & username & published need as a req.body & token need as a headers authorization
discussionRouter.post('/add',async(req,res)=>{
    const {book_id,book_title,book_author,book_image} = req.query;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not Authorized, Please Login"});
            }else{
                let discussion = new discussionModel({chat:[req.body],book_id,book_title,book_author,book_image})
                await discussion.save();
                res.send({msg:'Discussion Published Successfully!!'})
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To reply an exist discussion, pass discussionId as a id in params
//comment & user_id & username & published need as a req.body & token need as a headers authorization
discussionRouter.patch('/reply/:id',async(req,res)=>{
    const {id} = req.params;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not Authorized, Please Login"});
            }else{
                let discussion = await discussionModel.findOne({_id:id});
                let arr = discussion.chat;
                arr.push(req.body);
                let updatedDiscussion = await discussionModel.findByIdAndUpdate({_id:id},{chat:arr});
                res.send({msg:'Reply Added Successfully!!'});
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
        console.log(error);
    }
})

module.exports = {discussionRouter}
