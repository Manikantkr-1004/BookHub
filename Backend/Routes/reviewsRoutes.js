const express = require("express");
const jwt = require("jsonwebtoken");
const { reviewModel } = require("../Models/reviews");
require('dotenv').config();

const reviewsRouter = express.Router();

//To get specific book's reviews, pass bookId as a id in params
reviewsRouter.get('/get/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        let reviews = await reviewModel.find({book_id:id});
        res.send({msg:'Reviews Getting Successfully!!',reviews});
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To published new review, pass bookId as a id in params & 
//comment & user_id & username & published need as a req.body & token need as a headers authorization
reviewsRouter.post('/add/:id',async(req,res)=>{
    const {id} = req.params;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not Authorized, Please Login"});
            }else{
                let review = new reviewModel({comments:[req.body],book_id:id})
                await review.save();
                res.send({msg:'Comment Published Successfully!!'})
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To reply an exist comment, pass commentId as a id in params &
//comment & user_id & username & published need as a req.body & token need as a headers authorization
reviewsRouter.patch('/reply/:id',async(req,res)=>{
    const {id} = req.params;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not Authorized, Please Login"});
            }else{
                let review = await reviewModel.findOne({_id:id});
                let arr = review.comments;
                arr.push(req.body);
                let updatedReview = await reviewModel.findByIdAndUpdate({_id:id},{comments:arr});
                res.send({msg:'Reply Added Successfully!!'});
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
        console.log(error);
    }
})

module.exports = {reviewsRouter}
