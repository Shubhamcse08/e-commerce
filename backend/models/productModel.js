import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    name:{type:String ,reqiured:true},
    description:{type:String ,reqiured:true},
    price:{type:Number ,reqiured:true},
    image:{type:Array ,reqiured:true},
    category:{type:String ,reqiured:true},
    subCategory:{type:String ,reqiured:true},
    sizes:{type:Array ,reqiured:true},
    bestseller:{type:Boolean ,reqiured:true},
    date:{type:Number ,reqiured:true},
})

const productModel= mongoose.model.product || mongoose.model("product",ProductSchema)

export default productModel;