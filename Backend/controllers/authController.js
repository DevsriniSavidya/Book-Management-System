import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register Method
export const register = async (req,res)=>{
    try {
        const {userName,email,password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({userName,email,password:hashedPassword});
        await user.save();
        res.status(201).json({message: "User registered Successfully!"})
    } catch(error){
        res.status(500).json({message:error.message})
    }
};

//Login Method
export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message:"User not found"});

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET_KEY ,{expiresIn:"10h"});
        res.json({token,userId: user._id})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}




