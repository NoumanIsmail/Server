import jwt from 'jsonwebtoken';
import { User } from '../models/users.model';


const userMiddleware = async (req,res,next) =>{
    const token = req.cookie.token
    if(!token){
        res.status(401).json({message:"no token found...", success:false});
    }
    try {
        const verifyUser = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(verifyUser.userId);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' ,success:false, error});
    }
}