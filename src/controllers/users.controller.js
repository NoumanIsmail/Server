import { User } from "../models/users.model.js";

const getUsers = async(req,res)=>{
 try {
    const users = await User.find({})
    res.status(200).json({message:"Users List", success:true, users})
 } catch (error) {
    res.status(500).json({message:"Internal Server Error...", success:false, error})
 }   
}
const singleUser = async (req,res)=>{
   try {
      const {id} = req.params
      const user = await User.findById(id)
      if(!user){
         res.status(404).json({success:false,message:"no such User.."})
      }
      res.status(200).json({success:true,message:"Single User...",user})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }

}
const postUser = async (req,res)=>{
   try {
      const {email} = req.body
      const validate = await User.findOne({email})
      if(validate){
         return res.status(401).json({success:false,message:"Email Already Exist..."})
      }
      const user = await User.create(req.body)
      res.status(201).json({message:"User Added...", success:true,user})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }
}
const putUser = async (req,res)=>{
   try {
      const {id} = req.params
      const user = await User.findByIdAndUpdate(id)
      if(!user){
         res.status(404).json({success:false,message:"no such User.."})
      }
      res.status(200).json({success:true,message:"User Updated Successflly...", user})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }
}
const delelteUser = async (req,res)=>{
   try {
      const {id} = req.params
      const user = await User.findByIdAndDelete(id)
      if(!user){
         res.status(404).json({success:false,message:"no such User.."})
      }
      res.status(200).json({success:true,message:"User Deleted Successfully..."})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }
}

export {getUsers,postUser,putUser,delelteUser,singleUser}