const express = require("express")
const route = express.Router()
const hotelController = require("../controller/HotelController")
route.post("/createHotel", hotelController.createHotel)
route.get("/getHotels", hotelController.getAllHotel)
// route.get("/getAllHotels",)
// route.get("/getHotelById",)
// route.put("/updateHotel",)
// route.delete("/deleteHotel",)


module.exports = route