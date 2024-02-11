const express=require("express")
const route=express.Router()

route.get("/rooms",(req,res)=>{
    res.json({
        name:"jai"
    })
})





module.exports=route