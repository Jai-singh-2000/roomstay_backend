const express = require("express")
const route = express.Router()
const floorController=require("../controller/FloorController")

route.get("/getFloors/:hid", floorController.getAllFloors)

route.post("/createFloor", floorController.createFloorController)


module.exports = route