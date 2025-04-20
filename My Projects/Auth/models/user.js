import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/Authapp")

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number
})

export const userModel=mongoose.model('user',userSchema);