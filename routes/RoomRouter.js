const express = require("express")
const route = express.Router()

const {createRoomController,deleteRoomController,updateRoomController,getAllRoomsByHotelAndFloorController} = require("../controller/RoomController")

// POST METHOD || CREATE ROOM CONTROLLER

route.post("/createRoom",createRoomController)

// DELETE METHOD || DELETE ROOM CONTROLLER

route.get("/deleteroom:roomId",deleteRoomController)
route.put("/updateroom:roomId",updateRoomController)
route.get("/getAllrooms:hotelId:floorId",getAllRoomsByHotelAndFloorController)

module.exports = route