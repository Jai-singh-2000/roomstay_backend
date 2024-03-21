const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/UserRouter");
const hotelRoutes = require("./routes/HotelRouter");
const roomRoutes = require("./routes/RoomRouter");
const paymentRoutes = require("./routes/PaymentRouter");
const connectDatabase = require("./config/connectDb");
const authToken = require("./middlewares/tokenMiddleware");
dotenv.config();
connectDatabase();
const cors = require("cors");

// middleware (Routes)
app.use(express.json());
app.use(cors());
console.log("process.env.PORT", process.env.PORT, "aaya");
app.use(userRoutes);
app.use(authToken, hotelRoutes);
app.use(roomRoutes);
app.use(authToken, paymentRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server start on ", process.env.PORT || PORT);
});
