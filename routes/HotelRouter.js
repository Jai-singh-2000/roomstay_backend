const express = require("express")
const route = express.Router()
const hotelController = require("../controller/HotelController")
route.post("/createHotel", hotelController.createHotelController)
route.get("/getHotels", hotelController.getAllHotelController)
route.put("/updateHotels", hotelController.updateHotelController)
// route.get("/getAllHotels",)
// route.get("/getHotelById",)
// route.put("/updateHotel",)
// route.delete("/deleteHotel",)


module.exports = route