const express = require("express")
const route = express.Router()
const hotelController = require("../controller/HotelController")
const authToken = require("../middlewares/tokenMiddleware")

route.post("/createHotel", authToken, hotelController.createHotelController)

route.get("/getHotels", authToken, hotelController.getMyHotels)

route.put("/updateHotels", authToken, hotelController.updateHotelController)

route.delete("/deleteHotel/:hid", authToken, hotelController.deleteHotelController)



module.exports = route