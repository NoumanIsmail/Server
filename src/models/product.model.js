import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        trim:true
    },
    stock:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:[String],
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }

},{timestamps:true})

export const Product = mongoose.model('Product',productSchema)