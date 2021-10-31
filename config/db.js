const mongoose = require("mongoose");
const uri = process.env.DB_URL;

const connect = async function () {
    try {
        await mongoose.connect(uri, () => {
            console.log("✅ Connect to mongoDB successfully!\n\n");
        });
    } catch (error) {
        console.log("❌ Failed to connect to MongoDB!");
        console.log(error.message);
    }
};

module.exports = { connect };
