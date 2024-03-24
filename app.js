const express = require("express");
const dotenv = require("dotenv");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/UserRouter");
const hotelRoutes = require("./routes/HotelRouter");
const roomRoutes = require("./routes/RoomRouter");
const paymentRoutes = require("./routes/PaymentRouter");
const orderRoutes = require("./routes/OrderRouter");
const planRoutes = require("./routes/PlanRouter");
const connectDatabase = require("./config/connectDb");
const authToken = require("./middlewares/tokenMiddleware");
dotenv.config();
connectDatabase();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello World! Running");
});

// middleware (Routes)
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(roomRoutes);
app.use(authToken, hotelRoutes);
app.use(authToken, paymentRoutes);
app.use(authToken, planRoutes);
app.use(authToken, orderRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server start on ", process.env.PORT || PORT);
});
