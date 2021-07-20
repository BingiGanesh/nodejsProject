import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum : ['User','Admin'],
        default: 'User'
    }
},
    {
        timestamps:true
    }
)

const user = mongoose.model('User',UserSchema)

export default user;