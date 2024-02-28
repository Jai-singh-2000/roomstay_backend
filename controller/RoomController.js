const roomSchema = require("./../models/HotelModel")
const Floor = require("../models/FloorModal")
const Hotel = require("../models/HotelModel")

const createRoomController = async (req, res) => {
    try {
        const { hotelid, floorid, roomNumber, roomType, price, maxPeople, description, amenities } = req.body;

        if (!hotelid || !floorid || !roomNumber || !roomType || !price || !maxPeople) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Check if Hotel exists
        const existingHotel = await Hotel.findOne({ _id: hotelid });
        if (!existingHotel) {
            return res.status(422).json({
                success: false,
                message: "Hotel does not exist"
            });
        }

        // Check if Floor exists in Hotel
        const existingFloor = await Floor.findOne({ _id: floorid });
        if (!existingFloor || existingFloor.hotel !== hotelid) {
            return res.status(422).json({
                success: false,
                message: "Floor does not exist in the specified Hotel"
            });
        }

        // Create room
        const newRoom = new Room({
            hotel: hotelid,
            floor: floorid,
            roomNumber: roomNumber,
            roomType: roomType,
            price: price,
            maxPeople: maxPeople,
            description: description,
            amenities: amenities
        });

        const savedRoom = await newRoom.save();

        if (savedRoom) {
            return res.status(201).json({
                success: true,
                message: "Room created successfully"
            });
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
        const { hotelid, floorid, roomNumber, roomType, price, maxPeople, description, amenities } = req.body;

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
        if (hotelid) {
            const existingHotel = await Hotel.findOne({ _id: hotelid });
            if (!existingHotel) {
                return res.status(404).json({
                    success: false,
                    message: "Hotel not found"
                });
            }
            existingRoom.hotel = hotelid;
        }

        if (floorid) {
            const existingFloor = await Floor.findOne({ _id: floorid });
            if (!existingFloor) {
                return res.status(404).json({
                    success: false,
                    message: "Floor not found"
                });
            }
            existingRoom.floor = floorid;
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


module.exports={createRoomController,deleteRoomController,updateRoomController,getAllRoomsByHotelAndFloorController
}