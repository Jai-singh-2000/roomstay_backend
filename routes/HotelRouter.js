const express = require("express")
const route = express.Router()
const hotelController = require("../controller/HotelController")
route.post("/createHotel", hotelController.createHotelController)
route.get("/getHotels", hotelController.getAllHotelController)
route.put("/updateHotels", hotelController.updateHotelController)
route.delete("/deleteHotel/:hid",hotelController.deleteHotelController)
route.get("/getHotelById/:hid",hotelController.getHotelByIdController)


module.exports = route