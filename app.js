const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/UserRouter");
const hotelRoutes = require("./routes/HotelRouter");
const floorRoutes = require("./routes/FloorRouter");
const roomRoutes = require("./routes/RoomRouter");
const connectDatabase = require("./config/connectDb");
const authToken = require("./middlewares/tokenMiddleware");
const mailConnection=require("./config/mail")
// mailConnection({mail:"jai.singh.corporate@gmail.com",subject:"Roomstay",text:"Ab to chal gaya"})
dotenv.config();
connectDatabase();
const cors = require("cors");

// middleware (Routes)
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(hotelRoutes);
app.use(roomRoutes);
app.use(authToken, floorRoutes);

app.listen(PORT, () => {
console.log("Server start on ", PORT);
});