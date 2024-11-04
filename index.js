// NODE Imports
import express from 'express';
import mongoose from 'mongoose';
import Dotenv  from 'dotenv';

const app = express();
app.use(express.json())
Dotenv.config()

const port = process.env.PORT
const uri = process.env.URI


// ROTUES Imports
import userRouter from './src/routes/users.route.js';
import categoryRoutes from './src/routes/category.route.js';
import productRoute from './src/routes/product.model.js';
import cartRouter from './src/routes/cart.route.js';
import orderRoute from './src/routes/Order.route.js';

app.use('/api/v1',userRouter);
app.use('/api/v1',categoryRoutes);
app.use('/api/v1', productRoute);
app.use('/api/v1', cartRouter);
app.use('/api/v1', orderRoute);














app.get('/hi', (req, res)=>{
    res.send('hello it`s me')
})

// DB Connection
mongoose.connect(uri).then(()=>{

    console.log("connected to E commerce Db ")
    // Server Connecton
    app.listen( port , ()=>{
        console.log("Server is Running on Port http://localhost:3000")
    })
}).catch((err)=>{
    console.log(err)
})