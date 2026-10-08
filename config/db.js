const mongoose = require("mongoose");

const connectDB =async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.neclog("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit();
    }
};

module.exports = connectDB;