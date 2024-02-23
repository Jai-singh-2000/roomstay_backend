const express = require("express")
const dotenv = require("dotenv")
const app = express()
const PORT = 3000
const userRoutes = require("./routes/UserRouter")
const hotelRoutes = require("./routes/HotelRouter")
const floorRoutes = require("./routes/FloorRouter")
const connectDatabase = require("./config/connectDb");
const authToken = require("./middlewares/tokenMiddleware")
dotenv.config()
connectDatabase()


// middleware (Routes)
app.use(express.json())
app.use(userRoutes)
app.use(hotelRoutes)
app.use(authToken, floorRoutes)

app.listen(PORT, () => {
    console.log("Server start on ", PORT)
})