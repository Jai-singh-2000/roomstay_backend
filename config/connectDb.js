const mongoose=require("mongoose")


async function connectDatabase(){
    try{
        console.log(process.env.MONGO_URI)
        const connection=await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")
    }catch(error)
    {
        console.log(error)
    }
}


module.exports=connectDatabase;