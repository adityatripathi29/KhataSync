const mongoose = require("mongoose")

const userSchema  = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:20,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    profilepicture:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        select:false
    },
    hissab:[{type:mongoose.Schema.Types.ObjectId,ref:"hissab"}]
})

module.exports = mongoose.model("user",userSchema)