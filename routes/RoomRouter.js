const express = require("express")
const route = express.Router()
const roomController = require("../controller/RoomController")
const authToken = require("../middlewares/tokenMiddleware")


route.get("/getAllRooms", roomController.getAllRoomsController)

route.get("/getRoomById/:roomId", roomController.getAllRoomsController)

route.post("/createRoom", authToken, roomController.createRoomController)

route.get("/deleteroom/:roomId", authToken, roomController.deleteRoomController)

route.put("/updateroom/:roomId", authToken, roomController.updateRoomController)

// Used for admin dashboard
route.get("/getMyHotelRooms/:hotelId", authToken, roomController.getRoomsByHotelController)

module.exports = route