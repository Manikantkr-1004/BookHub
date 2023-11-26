const jwt = require('jsonwebtoken');
require("dotenv").config();

const authorMiddleware = (req,res,next)=>{
    let token = req.headers?.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                res.status(400).send({msg:"Token Expired, Login Please!!"})
            }else{
                req.body = {...req.body, author_id: decoded.author_id, author_name: decoded.author_name};
                next();
            }
        })
    }else{
        res.status(400).send({msg:"Token Expired, Login Please!!"})
    }
}

module.exports = {authorMiddleware};