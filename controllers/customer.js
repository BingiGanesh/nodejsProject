import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import jwt from "jsonwebtoken";

// myOrders, login, orderProduct, addAccount, searchProduct

const secret_key = "INFOWARE";

// customer login
export const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (user) {
        const token = jwt.sign({ user }, secret_key, { expiresIn: '1h' });
        res.status(200).json({ token, message: "User LogedIn Successfully!" })
    }
    else {
        return res.status(200).json({ message: "User not Found!" })
    }
    next()
}
//customer signup
export const addAccount = async (req, res, next) => {
    const { name, email, phone, password } = req.body
    try {
        if (!name || !email || !phone || !password) {
            return res.status(401).json({ message: "Please fill all fields to register like Name , Email , Phone , Password !" })
        } else {
            const user = await User.findOne({ email })
            if (user) {
                return res.status(401).json({ message: "Email Already Exists!" })
            }
            else {
                const newUser = new User({ name, email, phone, password })
                const userSaved = await newUser.save()
                if (userSaved) {
                    // console.log(userSaved)
                    return res.status(201).json({ message: "User Registered Successfully!!" })
                }
                else {
                    return res.status(501).json({ message: "Something went wrong" })

                }

            }
        }
    }
    catch (err) {
        console.log(err);
    }
    next()
}


export const myOrders = async (req, res, next) => {
    //console.log(req.user)
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User Not Found!" })
        }
        else {
            const orders = await Order.find({ user: req.user.user._id })
            if (orders.length > 0) {
                return res.status(200).json({ myOrders: orders })
            }
            return res.status(200).json({ message: "No orders Placed" })
        }
    }
    catch (err) {
        console.log(err);
    }
    next()
}


export const orderProduct = async (req, res, next) => {
    try {
        const { product_id, qty, address } = req.body
        const product = await Product.findById({ _id: product_id })
        const total_ammount = product.rate * qty;
        const newOrder = new Order({ user: req.user.user._id, products: [{ product: product_id, qty }], total_ammount, address })
        if (typeof product != null && qty <= product.qty) {
            const orderSaved = await newOrder.save()
            if (orderSaved) {
                const update_qty = (product.qty - qty);
                Product.findByIdAndUpdate(product_id, { qty: update_qty }, (err, updateProduct) => {
                    updateProduct.save();
                })
                //console.log(orderSaved)
                return res.status(201).json({ message: "Order Placed Successfully!!" })
            }
            else {
                return res.status(501).json({ message: "Something went wrong" })

            }
        }
        else {
            return res.status(401).json({ message: "You placed product is not in stock!" })
        }
    }
    catch (err) {
        console.log(err);
    }
    next()
}


export const searchProduct = async (req, res, next) => {
    try {
        const products = await Product.find({ name: req.params.search })
        if (products.length > 0) {
            return res.status(200).json({ Product_searched: products })
        }
        return res.status(200).json({ message: "No such Product available!" })
    }
    catch (err) {
        console.log(err);
    }
    next()
}

// authenticate user details
export const authenticate = (req, res, next) => {
    const token = typeof req.headers['authorization'] !== 'undefined' ? req.headers['authorization'].split(" ")[1] : null;
    try {
        if (token !== null) {
            const user = jwt.verify(token, secret_key)
            //console.log(user)
            if (user.user.role != 'User') {
                return res.status(400).json({ message: "Please Login as User!" })
            }
            req.user = user
        }
        else {
            return res.status(400).json({ message: "Please Login!" })
        }
    }
    catch (err) {
        if (err && token !== null) {
            return res.status(400).json({ message: "Provide proper token!" })
        }
        return res.status(400).json({ message: "Provide token" })
    }
    next()
}