const mongoose = require("mongoose");

const floorSchema = mongoose.Schema({
    Hotel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Hotel"
    },
    floorNo: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const Floor = mongoose.model("Floor", floorSchema)

module.exports = Floor;