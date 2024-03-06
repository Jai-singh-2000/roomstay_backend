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

        if (result) {
            res.status(201).json({
                success: true,
                message: "Hotel is created successfully"
            })
        } else {
            throw new Error("Somthing is wrong")
        }


    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal server error"
        })
    }
}


async function getMyHotels(req, res) {
    try {
        const userId = req.userId;
        const allHotels = await Hotel.find({ User: userId })
        console.log(allHotels, "all hotel admin", userId)

        if (allHotels) {
            res.status(200).json({
                success: true,
                message: "Hotel fetch succussfully",
                data: allHotels || []
            })

        } else {
            throw new Error("Somthing is wrong")
        }


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

        if (result) {
            res.status(200).json({
                success: true,
                message: "Hotel details update successfully"
            })
        } else {
            res.status(422).json({
                success: true,
                message: "Hotel did not found"
            })
        }

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal server error"
        })
    }
}


async function deleteHotelController(req, res) {
    try {
        const { hid } = req.params;

        const result = await Hotel.deleteOne({ _id: hid })

        res.status(200).json({
            success: true,
            message: "Hotel deleted successfully"
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal server error"
        })

    }
}



module.exports = {
    createHotelController, updateHotelController, deleteHotelController, getMyHotels
}

