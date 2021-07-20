import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import jwt from "jsonwebtoken";


const secret_key="INFOWARE"

// viewOrders , addProduct , addAccount , login

export const login = async (req,res,next)=>{
    const { email, password} = req.body
    const user = await User.findOne({email,password})
    if(user){
        const token = jwt.sign({user},secret_key,{ expiresIn: '1h' });
        res.status(200).json({token,message:"Admin LogedIn Successfully!"})
    }
    else{
        return res.status(200).json({message:"Admin not Found!"})
    }
}

//user signup
export const addAccount = async (req,res,next)=>{
    const {name, email, phone, password,role} = req.body
    try{ 
        if(!name || !email || !phone || !password){
            return res.status(401).json({message:"Please fill all fields to register like Name , Email , Phone , Password !"})
        }
        else
        {
            const user = await User.findOne({email})
            if(user){
                return res.status(401).json({message:"Email Already Exists!"})
            }
            else
            { 
                const newUser = new User({name, email, phone, password,role})
                const userSaved = await newUser.save()
                if(userSaved){
                    //console.log(userSaved)
                    return res.status(201).json({message:"Admin Registered Successfully!!"})
                }
                else 
                {
                    return res.status(501).json({message:"Something went wrong"})
                
                }
                
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

// addProduct
export const addProduct = async (req,res,next)=>{
    const { name , description, qty, rate} = req.body
    try{ 
        if( !name || !description || !qty || !rate){
            return res.status(401).json({message:"Please provide  all details of Product like Name , Description , Qty , Rate  ! "})
        }
        else
        {
                const product = await Product.findOne({name})
                if(product){
                    return res.status(401).json({message:"This Product Name Already Exists!"})
                }
                else
                { 
                    const newproduct = new Product({name, description, qty, rate})
                    const productSaved = await newproduct.save()
                    if(productSaved){
                        //console.log(productSaved)
                        return res.status(201).json({message:"Product Added Successfully!!"})
                    }
                    else 
                    {
                        return res.status(501).json({message:"Something went wrong"})
                    }
                    
                }
        }
    }
    catch(err){
        console.log(err);
    }
}


// viewOrders 
export const viewOrders = async (req,res,next) =>{
    
   try{
            const orders = await Order.find()
            if(orders.length > 0){
                return res.status(200).json({Orders:orders})
            }
            return res.status(200).json({message:"NO Orders found!"})
   }
   catch(err){
       console.log(err)
   }
}

// authenticate user 

export const authenticate = (req,res,next)=>{
    const token = typeof req.headers['authorization'] !== 'undefined' ? req.headers['authorization'].split(" ")[1] : null;
    try{
        if(token !== null)
        {
            const user = jwt.verify(token,secret_key)
            // console.log(user)
            if(user.user.role != 'Admin'){
                return res.status(400).json({message:"Please Login as Admin!"})
            }
            req.user = user
        }
        else{
            return res.status(400).json({message:"Please Login!"})
        }
    }
    catch(err){
        //  console.log(err)
         if(err && token !== null){
            return res.status(400).json({message:"Provide proper token!"})
         }
         return res.status(400).json({message:"Provide token"})
    }
    next()
} 