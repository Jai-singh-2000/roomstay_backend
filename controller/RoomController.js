const Floor = require("../models/FloorModal")
const Hotel = require("../models/HotelModel")
const Room = require("../models/RoomModel")

const createRoomController = async (req, res) => {
    try {
        const { hotelId, roomNumber, roomType, price, description, amenities } = req.body;

        if (!hotelId || !roomNumber || !roomType || !price || !description) {
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

        const roomExist = await Room.findOne({ Hotel: hotelId, roomNumber: roomNumber })
        console.log(roomExist,hotelId,roomNumber)
        if (roomExist) {
            res.status(422).json({
                success: false,
                message: "Room already exists"
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
        } else {
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


const getAllRoomsController = async (req, res) => {
    try {
        const rooms = await Room.find();

        return res.status(200).json({
            success: true,
            data: rooms
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const getRoomsByHotelController = async (req, res) => {
    try {
        const { hotelId } = req.params;
        // console.log(req.params)

        const rooms = await Room.find({ Hotel: hotelId });
        console.log(hotelId, "hote")
        res.status(200).json({
            success: true,
            data: rooms || []
        });
        return;

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const getRoomByIdController = async (req, res) => {
    try {
        const { roomId } = req.params;

        if (!roomId) {
            return res.status(422).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const room = await Room.findOne({ _id: roomId });

        if (room === null) {
            res.status(200).json({
                success: true,
                data: room
            });

        } else {
            res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};



module.exports = {
    createRoomController, deleteRoomController, updateRoomController, getAllRoomsController, getRoomByIdController, getRoomsByHotelController
}