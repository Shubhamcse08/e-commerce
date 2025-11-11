import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken =(id)=>{
        return jwt.sign({id},process.env.JWT_SECRET)
}

// Routes for user login
const userLogin =async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user= await userModel.findOne({email})

        // if not exists
        if(!user){
            return res.json({success:false,message:"User do't exists"})
        }

        // user exists then pass check 
        const isMatch= await bcrypt.compare(password,user.password)

        if(isMatch){
            const token= createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.error(error)
        res.json({success:false,message:error.message})
    }

}


// Routes for user register
const registerUser =async(req,res)=>{

    
    try {
        const {name,email,password}=req.body;

        // checking userr already exits or not 
        const exists = await userModel.findOne({email})

        if(exists){
            return res.json({success:false,message:"User already exists."})
        }

        // validating email format & strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"Please provide a valid email."})
        }

        if(password.length < 8){
            return res.json({success:false , message:"Please provide a strong password."})
        }

        // encrypt pass
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt)

        // create user 
        const newuser= new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user= await newuser.save()

        // create token for user 
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.error(error)
        res.json({success:false,message:error.message})
    }
}


// Routes for admin login
const adminLogin =async(req,res)=>{
    try {
        const {email,password}=req.body
        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASS) {
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid Credential"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {userLogin,registerUser,adminLogin} ;