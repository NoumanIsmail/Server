// controllers/cartController.js
import { Cart } from "../models/cart.model.js";

// Create or update cart
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (cart) {
            // Cart exists for the user; update the item quantity or add a new item
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // Item already exists in cart, increment its quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Item doesn't exist in cart, add as new item
                cart.items.push({ productId, quantity });
            }

            await cart.save();
            res.status(200).json({message:"Cart Updated Successflly", success:true,cart});
        } else {
            // No cart for user; create a new cart
            const newCart = await Cart.create({
                userId,
                items: [{ productId, quantity }]
            });

            res.status(201).json({message:"New Item Added Successflly",success:true,newCart});
        }
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error...",error });
    }
};
// Get cart
const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json({message:"All Cart Items...",success:true, cart});
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error...",error });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({message:"Item Deleted Successfully...",success:true});
    } catch (error) {
        res.status(500).json({ message:"Internal Server Error...",error });
    }
};
export {getCart,removeFromCart,addToCart}