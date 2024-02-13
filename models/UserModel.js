const mongosse = require("mongoose");

const userSchema = mongosse.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        phoneNo: {
            type: String
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    {
        timestamps: true
    }
)

const User = mongosse.model("User", userSchema);

module.exports = User;

