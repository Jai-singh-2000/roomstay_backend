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
    image:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        required:true
    },
},{timestamps:true})




const Hotel=mongoose.model("Hotel",hotelSchema)

module.exports=Hotel;