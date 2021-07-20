import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description : {
        type: String,
        required:true
    },
    qty : {
        type: Number,
        required:true
    },
    rate : {
        type: Number,
        required:true
    }

},
    {
       timestamps:true
    }
)

const product = mongoose.model("Product",productSchema)

export default product;