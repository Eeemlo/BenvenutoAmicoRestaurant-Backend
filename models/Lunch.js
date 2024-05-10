const mongoose = require("mongoose");

// Lunch Schema
const lunchSchema = new mongoose.Schema({
    week: {
        type: Number,
        required: true,
        trim: true
    },
    weekday: {
        type: String,
        required: true
    },
    description1: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Lägg till lunch
lunchSchema.statics.add = async function (week, weekday, description1, description2) {
    try {
        const lunch = new this({week, weekday, description1, description2});
        await lunch.save();
        return lunch;
    } catch(error) {
        throw error;
    }
};


const Lunch = mongoose.model("Lunch", lunchSchema);
module.exports = Lunch;