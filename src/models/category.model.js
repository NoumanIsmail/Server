import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        uinque:true

    },
    image:{
        type:String
    }
},{timestamps:true})

export const Category = mongoose.model("Category",categorySchema)