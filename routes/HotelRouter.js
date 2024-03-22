const express = require("express");
const route = express.Router();
const hotelController = require("../controller/HotelController");

route.post("/createHotel", hotelController.createHotelController);

route.get("/getMyHotels", hotelController.getMyHotels);

route.put("/updateHotels", hotelController.updateHotelController);

route.delete("/deleteHotel/:hid", hotelController.deleteHotelController);

module.exports = route;
