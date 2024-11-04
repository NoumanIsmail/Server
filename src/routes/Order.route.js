import express from 'express';
import { checkOut } from '../controllers/Order.Controller.js';
const orderRoute = express.Router()

orderRoute.post('/checkout', checkOut);
export default orderRoute;