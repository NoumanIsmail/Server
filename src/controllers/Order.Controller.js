import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";

const checkOut = async (req,res) =>{
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" ,success:false});
        }

        // Calculate total price and check stock
        let totalAmount = 0;
        for (let item of cart.items) {
            if (item.quantity > item.productId.stock) {
                return res.status(400).json({ message: `Insufficient stock for ${item.productId.name}`, success:false });
            }
            totalAmount += item.productId.price * item.quantity;
        }

        // Create order
        const order = await Order.create({
            userId,
            items: cart.items.map(({ productId, quantity }) => ({ productId: productId._id, quantity })),
            totalAmount
        });

        // Reduce stock for each item
        for (let item of cart.items) {
            await Product.findByIdAndUpdate(item.productId._id, {
                $inc: { stock: -item.quantity }
            });
        }

        // Clear user's cart after successful checkout
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export {checkOut}