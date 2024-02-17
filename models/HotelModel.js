const mongoose=require("mongoose")

const hotelSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rooms:{
        type:Array,
        required:true,
    },
},{timestamps:true})


const Hotel=mongoose.model("Hotel",hotelSchema)

module.exports=Hotel;