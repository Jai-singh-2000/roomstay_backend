const mongoose=require("mongoose")

const roomSchema=new mongoose.Schema({
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Hotel"
    },
    roomNumber:{
        type:Number,
        required:true
    },
    roomType:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true,
        default:1
    },
    description:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:false
    },


},{timestamps:true})


const Room = mongoose.model("Room", roomSchema);
module.exports=Room