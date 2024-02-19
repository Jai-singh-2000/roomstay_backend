const User = require("../models/UserModel");
const Hotel = require("../models/HotelModel");


async function createHotelController(req, res) {
    try {
        const { name, location, image, description } = req.body;

        const userId = req.userId;


        const hotelObj = await Hotel.findOne({ User: userId, name: name })

        if (hotelObj) {
            res.status(409).json({
                success: false,
                message: "Hotel already is created"
            })
            return;
        }

        const result = await Hotel.create({
            name: name,
            location: location,
            image: image,
            description: description,
            User: userId
        })

        // console.log(result, "result")
        res.status(201).json({
            success: true,
            message: "Hotel is created successfully"
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal server error"
        })
    }
}

async function getAllHotelController(req, res) {
    try {
        // const {} = req.body; 
        const allHotels = await Hotel.find()

        res.status(200).json({
            success: true,
            message: "Hotel fetch succussfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

async function updateHotelController(req, res) {
    try {
        const { name, location, image, description } = req.body;
        const userId = req.userId;
        if (!name) {
            res.status(401).json({
                success: false,
                message: "Somthing is error"
            })
            return;
        }

        const result = await Hotel.findOneAndUpdate({ User: userId, name: name }, { location: location, image: image, description: description })

        console.log(result, "result")

        res.status(200).json({
            success: true,
            message: "Hotel details update successfully"
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal server error"
        })
    }
}

async function deleteHotelController(req, res) {
    try {
        const { name } = req.body;
        const hotelId = req.params;

        const userId = req.userId;

        const result = Hotel.deleteAndUpdate({ _id: hotelId, User: userId })
        console.log(result, "mila")

        res.status(200).json({
            success: true,
            message: "deleted"
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal server error"
        })

    }
}
module.exports = {
    createHotelController, getAllHotelController, updateHotelController, deleteHotelController
}

