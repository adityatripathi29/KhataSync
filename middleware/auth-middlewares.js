const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedin = async(req,res,next)=>{
    if(req.cookies.token){
      try{
        let decoded =  jwt.verify(req.cookies.token,process.env.jwt_KEY);
        let user = await userModel.findOne({email:decoded.email});
        req.user = user
        next()
       }
       catch(err){
        res.send(err.message)
       }
    }
    else{
        res.redirect("/")
    }
};

module.exports.redirectifLoggedin = (req,res,next)=>{
    if(req.cookies.token){
        try{
          let decoded = jwt.verify(req.cookies.token,process.env.jwt_KEY);
          res.redirect("/profile")
        }
        catch(err){
           return next();
        }
    }
    else return next();
}