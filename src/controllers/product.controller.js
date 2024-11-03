import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";

const getProduct = async (req,res) =>{
    try {
        const products = await Product.find().populate('categoryId','name')
        res.status(200).json({message:"All Products", success:true,products})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
}
const   singleProduct = async (req,res) =>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({message:"no such product", success:false})
        }
        res.status(200).json({message:"Single Product", success:true, product})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
}
const postProduct = async (req,res) =>{
    try {
        const {categoryId} = req.body
        const category = await Category.findById(categoryId)
        if(!category){
            res.status(404).json({message:"Category not found", success:trur})
        }
        const newProduct = await Product.create(req.body)
        res.status(200).json({message:"product created successflly", success:true, newProduct})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
}
const putProduct = async (req,res) =>{
    try {
        const {id} = req.params
        const {categoryId} = req.body
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({message:"Product not found", success:false})
        }
        const category = await Category.findById(categoryId)
        if(!category){
            res.status(404).json({message:"Category Not found", success:false})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({message:"Product Updated Successflly" , success:true, updatedProduct})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
}
const deleteProduct = async (req,res) =>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({message:"Product not found", success:false})
        }
        await Product.findByIdAndDelete(id)
        res.status(200).json({message:"Product Deleted",success:true})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
}

export {getProduct,postProduct,singleProduct,putProduct,deleteProduct}