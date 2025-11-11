
import express, { json } from 'express'
import cors from 'cors';
import 'dotenv/config'
import ConnectDB from './config/mongodb.js';
import ConnectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app=express()
const port = process.env.PORT || 4000
ConnectDB()
ConnectCloudinary()

// middleware
app.use(json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send("Api is working")
})

app.listen(port,()=>
    console.log(`Server is running on port ${port}`)
)
