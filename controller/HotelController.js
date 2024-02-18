

async function createHotel(req, res) {
    try {
        const { name, location, image, description } = req.body;

        const userId = req.UserId;

        console.log(name, location, image, description, userId)
        res.status(200).json({
            success: true,
            message: "Suc"
        })


    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// async function createHotel(req, res) {
//     try {

//     } catch (error) {
//         res.status().json({
//             success:false,
//             message:"Internal server error"
//         })
//     }
// }

module.exports = {
    createHotel
}

