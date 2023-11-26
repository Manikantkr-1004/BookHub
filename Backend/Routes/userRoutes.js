const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { userModel } = require("../Models/userModel");
require('dotenv').config();

const userRouter = express.Router();

//For Username Availablity Check, username need as a req.body;
userRouter.post('/usernamecheck',async(req,res)=>{
    try {
        const {username} = req.body;
        const user = await userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
        if(user){
            res.send({msg:'This username is already taken by Others',available:false})
        }else{
            res.send({msg:'This username is available', available: true})
        }
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//For getting All Registered user
userRouter.get('',async(req,res)=>{
    try {
        let users = await userModel.find();
        res.send({msg:"users getting successfully",users})
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//For getting Single User, id need as a params & token needs as a headers authorization
userRouter.get('/user/:id',async(req,res)=>{
    const {id} = req.params;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not Authorized, Please Login"});
            }else{
                let user = await userModel.findOne({_id:id});
                res.send({msg:"user getting successfully",user})
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To Register User, username & name & email & password need as a req.body
userRouter.post('/signup',async(req,res)=>{
    const {username,name,email,password} = req.body;
    try {
        let userCheck = await userModel.findOne({email});
        if(userCheck){
            res.status(400).send({msg:'Email already Registered!!'});
        }else{
            const created = new Date().toLocaleDateString('en-US',{weekday: 'short',year:'numeric',month:'short',day:'numeric'})+' '+ new Date().toLocaleTimeString('en-US');
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({msg:'Something went wrong, Try again.'})
                }else{
                    let user = new userModel({username,name,email,password:hash,created,purchased:[],cart:[]});
                    await user.save();
                    res.status(201).send({msg:"User Registered Successfull."})
                }
            })
        }
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To Login User, identifier(username || email) & password need as a req.body
userRouter.post('/login',async(req,res)=>{
    const {identifier ,password} = req.body;
    try {
        let userCheck = await userModel.findOne({
            $or: [
                { username: { $regex: new RegExp(`^${identifier}$`, 'i') } },
                { email: { $regex: new RegExp(`^${identifier}$`, 'i') } }
              ]
        });

        if(userCheck){
            bcrypt.compare(password,userCheck.password,async(err,result)=>{
                if(result){
                    let token = jwt.sign({_id:userCheck._id},process.env.SECRET);
                    res.send({msg:"Login Successfull!!",token,_id:userCheck._id,name:userCheck.name,username:userCheck.username});
                }else{
                    res.status(400).send({msg:"Wrong Credentials!!"});
                }
            })
        }else{
            res.status(400).send({msg:'Email or Username is not Registered!!'});
        }
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To Update Profile, user's id need as a params & token need as a headers authorization & req.body to update
userRouter.patch('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not Authorized, Please Login"});
            }else{
                let user = await userModel.findByIdAndUpdate({_id:id},req.body);
                res.send({msg:'Profile Updated Successfully!!'})
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

//To Delete Account, user's id need as a params & token need as a headers authorization
userRouter.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    const token = req.headers?.authorization?.split(' ')[1];
    try {
        jwt.verify(token,process.env.SECRET,async(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"You are not authorized, Please Login"})
            }else{
                let author = await userModel.findByIdAndDelete({_id:id});
                res.send({msg:"Account Deleted Successfully!!"});
            }
        })
    } catch (error) {
        res.status(500).send({msg:'Internal Server Error!!'})
    }
})

module.exports = {userRouter};