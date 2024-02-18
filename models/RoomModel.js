const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    Hotel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Hotel"
    },
    roomNumber: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
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
        tv: {
            type: Boolean,
            default: false
        },
        powerBackup: {
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