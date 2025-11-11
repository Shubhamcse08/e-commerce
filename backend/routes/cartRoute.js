import express, { Router } from 'express'
import { updateCart,getUserCart,addTocart } from '../controller/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter= express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addTocart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter;