import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer',
        required:true
    },
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' ,
                required:true          
            },
            qty:{
                type:Number,
                required:true
            }
        }
    ],
    total_ammount:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    }
},
{
    timestamps:true  
}
)

const order = mongoose.model('Order',orderSchema)

export default order;