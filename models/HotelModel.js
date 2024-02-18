const mongoose=require("mongoose")

const hotelSchema=mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
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