const Floor = require("../models/FloorModal")
const Hotel = require("../models/HotelModel")

async function getAllFloors(req, res) {
    try {
        const floorData = await Floor.find()

        res.status(200).json({
            success: true,
            message: "Floors fetch successfully",
            data: floorData || []
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: "Something is wrong"
        })
    }
}

async function createFloorController(req, res) {
    try {
        const { hotelId, floorNo } = req.body;
        const userId = req.userId;

        if (!hotelId || !floorNo) {
            res.status(422).json({
                success: false,
                message: "Something is missing"
            })
        }

        const existingHotel = await Hotel.findOne({ User: userId })

        if (existingHotel) {
            const existingFloor = await Floor.findOne({ Hotel: hotelId, floorNo: floorNo })

            if (existingFloor) {
                res.status(400).json({
                    success: true,
                    message: "Floor Already created"
                })
                return;
            }

            const floorResponse = await Floor.create({ Hotel: hotelId, floorNo: floorNo })

            res.status(200).json({
                success: true,
                message: "Floor create successfully"
            })

        } else {
            res.status(200).json({
                success: false,
                message: "Hotel does not exist"
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: "Something is wrong"
        })
    }
}

async function deleteFloorController(req, res) {
    try {
        const { hotelId, floorNo } = req.body;

        if (!hotelId || !floorNo) {
            res.status(422).json({
                success: false,
                message: "Something is missing"
            })
        }


        const existingFloor = await Floor.findOne({ Hotel: hotelId, floorNo: floorNo })
        console.log(existingFloor,"check")

        if (!existingFloor) {
            res.status(400).json({
                success: true,
                message: "Floor does not exist"
            })
            return;
        }

        const floorResponse = await Floor.deleteOne({ Hotel: hotelId, floorNo: floorNo })

        res.status(200).json({
            success: true,
            message: "Floor deleted successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: "Something is wrong"
        })
    }
}


module.exports = {
    getAllFloors,
    createFloorController,
    deleteFloorController
}