import { Category } from "../models/category.model.js";



const getCategory = async(req,res)=>{
 try {
    const category = await Category.find({})
    res.status(200).json({message:"Category List", success:true, category})
 } catch (error) {
    res.status(500).json({message:"Internal Server Error...", success:false, error})
 }   
}
const singleCategory = async (req,res)=>{
   try {
      const {id} = req.params
      const category = await Category.findById(id)
      if(!category){
         res.status(404).json({success:false,message:"no such Category.."})
      }
      res.status(200).json({success:true,message:"Single Category...",category})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }

}
const postCategory = async (req,res)=>{
   try {
      const {name} = req.body
      const validate = await Category.findOne({name})
      if(validate){
         return res.status(401).json({success:false,message:"Name Already Exist..."})
      }
      const user = await Category.create(req.body)
      res.status(201).json({message:"Category Added...", success:true,user})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }
}
const putCategory = async (req,res)=>{
   try {
      const {id} = req.params
      const category = await Category.findByIdAndUpdate(id,req.body,{new:true})
      if(!category){
         res.status(404).json({success:false,message:"no such Category.."})
      }
      res.status(200).json({success:true,message:"Category Updated Successflly...", category})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }
}
const delelteCategory = async (req,res)=>{
   try {
      const {id} = req.params
      const category = await Category.findByIdAndDelete(id)
      if(!category){
         res.status(404).json({success:false,message:"no such category.."})
      }
      res.status(200).json({success:true,message:"User Deleted Successfully..."})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error...", success:false, error})
   }
}

export {getCategory,postCategory,putCategory,singleCategory,delelteCategory}