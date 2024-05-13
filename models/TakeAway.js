const mongoose = require("mongoose");

// Lunch Schema
const takeAwaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Lägg till lunch
takeAwaySchema.statics.add = async function (coursename, category, price) {
    try {
        const takeAway = new this({name, category, price});
        await takeAway.save();
        return takeAway;
    } catch(error) {
        throw error;
    }
};


const TakeAway = mongoose.model("TakeAway", takeAwaySchema);
module.exports = TakeAway;