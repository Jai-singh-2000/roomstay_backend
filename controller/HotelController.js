const User = require("../models/UserModel");
const Hotel = require("../models/HotelModel");


async function createHotel(req, res) {
    try {
        const { name, location, image, description } = req.body;

        const userId = req.UserId;

        console.log(name, location, image, description, userId)

        const hotelObj = await Hotel.findOne({ User: userId, name: name })

        console.log(hotelObj, "resop")
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

async function getAllHotel(res, res) {
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

module.exports = {
    createHotel, getAllHotel
}

