import jwt from 'jsonwebtoken';


const userMiddleware = async (req,res,next) =>{
    const token = req.cookies.token;
        try {
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Attach decoded data (userId, role) to req.user
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
}
export default userMiddleware;