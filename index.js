import express from "express";
import mongoose from "mongoose";
import admin from "./routes/admin.js";
import customer from "./routes/customer.js";
import Product from "./models/product.js";



const app = express();


app.use(express.json())

const uri = "mongodb+srv://root:root@cluster0.i7gng.mongodb.net/Infoware?retryWrites=true&w=majority";

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false,useCreateIndex:true })
    .then((res)=>{
        console.log("connected")
    })
    .catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send("Please read Readme.md file!")
})
app.get('/products',async (req,res)=>{
    const products = await Product.find()
    return res.status(200).json({products})
})

app.use('/admin',admin)

app.use('/user',customer)

app.listen(4000)