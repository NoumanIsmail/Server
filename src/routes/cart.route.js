// routes/cartRoutes.js
import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js   ';


const cartRouter = express.Router();

cartRouter.post('/cart', addToCart); // Add or update cart
cartRouter.get('/cart/:userId', getCart); // Get user's cart
cartRouter.delete('/cart/:userId/:productId', removeFromCart); // Remove item from cart

export default cartRouter;
