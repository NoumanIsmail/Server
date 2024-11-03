import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
    name:{
        type:String,
        trim:true,
        default:'Guest'
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    }
},{timestamps:true})

export const User = mongoose.model('User',usersSchema);