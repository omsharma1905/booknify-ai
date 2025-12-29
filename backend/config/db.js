const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);

        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: true,
            serverSelectionTimeoutMS: 5000,
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB runtime error", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.error("MongoDB disconnected");
        });

        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDb", err);
        process.exit(1);
    }
};

module.exports = connectDB;