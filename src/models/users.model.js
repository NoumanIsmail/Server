import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
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

usersSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

usersSchema .methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User',usersSchema);