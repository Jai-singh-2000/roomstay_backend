const roomSchema = require("./../models/HotelModel")
const Floor = require("../models/FloorModal")
const Hotel = require("../models/HotelModel")

const createRoomController = async (req, res) => {
    try {
        const { hotelId, roomNumber, roomType, price, maxPeople, description, amenities } = req.body;

        if (!hotelId || !roomNumber || !roomType || !price || !maxPeople) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Check if Hotel exists
        const existingHotel = await Hotel.findOne({ _id: hotelId });
        if (!existingHotel) {
            
            res.status(422).json({
                success: false,
                message: "Hotel does not exist"
            });

            return 
        }

        // Create room
        const newRoom = await Room.create({
            Hotel: hotelId,
            roomNumber: roomNumber,
            roomType: roomType,
            price: price,
            description: description,
            amenities: amenities
        })

        if (newRoom) {
            res.status(201).json({
                success: true,
                message: "Room created successfully"
            });
        }else{
            throw new Error("Somthing is wrong")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
const deleteRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;

        // Check if roomId is provided
        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "Room ID is missing"
            });
        }

        // Check if room exists
        const existingRoom = await Room.findOne({ _id: roomId });
        if (!existingRoom) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // Delete the room
        await Room.deleteOne({ _id: roomId });

        return res.status(200).json({
            success: true,
            message: "Room deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const updateRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { hotelId, floorId, roomNumber, roomType, price, maxPeople, description, amenities } = req.body;

        // Check if roomId is provided
        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "Room ID is missing"
            });
        }

        // Check if room exists
        const existingRoom = await Room.findOne({ _id: roomId });
        if (!existingRoom) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // Check if hotelId and floorId are provided and valid
        if (hotelId) {
            const existingHotel = await Hotel.findOne({ _id: hotelId });
            if (!existingHotel) {
                return res.status(404).json({
                    success: false,
                    message: "Hotel not found"
                });
            }
            existingRoom.hotel = hotelId;
        }

        if (floorId) {
            const existingFloor = await Floor.findOne({ _id: floorId });
            if (!existingFloor) {
                return res.status(404).json({
                    success: false,
                    message: "Floor not found"
                });
            }
            existingRoom.floor = floorId;
        }

        // Update room details
        if (roomNumber) existingRoom.roomNumber = roomNumber;
        if (roomType) existingRoom.roomType = roomType;
        if (price) existingRoom.price = price;
        if (maxPeople) existingRoom.maxPeople = maxPeople;
        if (description) existingRoom.description = description;
        if (amenities) existingRoom.amenities = amenities;

        // Save updated room
        await existingRoom.save();

        return res.status(200).json({
            success: true,
            message: "Room updated successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getAllRoomsByHotelAndFloorController = async (req, res) => {
    try {
        const { hotelId, floorId } = req.params;

        // Check if hotelId and floorId are provided
        if (!hotelId || !floorId) {
            return res.status(400).json({
                success: false,
                message: "Hotel ID or Floor ID is missing"
            });
        }

        // Find all rooms with the given hotelId and floorId
        const rooms = await Room.find({ hotel: hotelId, floor: floorId });

        return res.status(200).json({
            success: true,
            data: rooms
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


// async function getHotelByIdController(req, res) {
//     try {
//         const { hid } = req.params;
//         const hotelObj = await Hotel.findOne({ _id: hid })
//         if (hotelObj) {
//             res.status(200).json({
//                 success: true,
//                 message: "Hotel find succussfully",
//                 data: hotelObj || {}
//             })
//         } else {
//             res.status(422).json({
//                 success: true,
//                 message: "Hotel did not found",
//                 data: {}
//             })
//         }

//     } catch (error) {
//         res.status(401).json({
//             success: false,
//             message: "Somthing is wrong"
//         })
//     }
// }

module.exports={createRoomController,deleteRoomController,updateRoomController,getAllRoomsByHotelAndFloorController
}