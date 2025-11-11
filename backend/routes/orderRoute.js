import express from 'express'
import {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,updateStatus,userOrders} from '../controller/orderController.js'
import adminauth from '../middleware/adminauth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// admin features
orderRouter.post("/list",adminauth,allOrders )
orderRouter.post("/status",adminauth,updateStatus)

// payment features
orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/stripe",authUser, placeOrderStripe)
orderRouter.post("/razorpay",authUser,placeOrderRazorpay)

// user feature
orderRouter.post("/userorders",authUser,userOrders)

export default orderRouter;