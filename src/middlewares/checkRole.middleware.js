import jwt from 'jsonwebtoken';
import { User } from "../models/users.model.js";

export const authorizeRole = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({ message: "No Token Provided: Access Denied", success: false });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await User.findById(decoded.userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied: You have no permission", success: false });
        }

        // Proceed if the user is an admin
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error...", success: false, error });
    }
};

