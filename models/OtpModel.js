const mongoose=require("mongoose")

const otpSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        ref:"User"
    },
    otp:{
        type:String,
        required:true
    },

},{timestamps:true})

const Otp=mongoose.model("Otp",otpSchema)

module.exports=Otp