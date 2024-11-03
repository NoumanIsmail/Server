import express from 'express';
import { deleteProduct, getProduct, postProduct, putProduct, singleProduct } from '../controllers/product.controller.js';
const productRoute = express.Router()
productRoute.get('/product',getProduct)
productRoute.post('/product',postProduct)
productRoute.get('/product/:id',singleProduct)
productRoute.put('/product/:id',putProduct)
productRoute.delete('/product/:id',deleteProduct)


export default productRoute;
