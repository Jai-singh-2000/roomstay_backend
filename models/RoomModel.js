const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false,
        required: true
    },
    amenities: {
        ac: {
            type: Boolean,
            default: false
        },
        wifi: {
            type: Boolean,
            default: false
        },
        cctv: {
            type: Boolean,
            default: false
        },
        tv: {
            type: Boolean,
            default: false
        },
        parking: {
            type: Boolean,
            default: false
        },
        geyser: {
            type: Boolean,
            default: false
        }
    }


}, { timestamps: true })


const Room = mongoose.model("Room", roomSchema);
module.exports = Room