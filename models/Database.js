const mongoose = require("mongoose");
require("dotenv").config();

// Anslut till MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database: " + error);
});

module.exports = mongoose.connection;