const express=require("express")
const dotenv=require("dotenv")
const app=express()
const PORT=3000
const userRoutes=require("./routes/UserRouter")
const connectDatabase=require("./config/connectDb");

dotenv.config()
connectDatabase()


// middleware (Routes)
app.use(express.json())
app.use(userRoutes)



app.listen(PORT,()=>{
    console.log("Server start on ",PORT )
})