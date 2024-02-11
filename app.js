const express=require("express")
const app=express()
const PORT=3000
const userRoutes=require("./routes/UserRouter")

app.use(userRoutes)

app.listen(PORT,()=>{
    console.log("Server start on ",PORT )
})