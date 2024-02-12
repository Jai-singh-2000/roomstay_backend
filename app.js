const express=require("express")
const app=express()
const PORT=3000
const userRoutes=require("./routes/UserRouter")

// middleware(server)
app.use(express.json())
app.use(userRoutes)



app.listen(PORT,()=>{
    console.log("Server start on ",PORT )
})