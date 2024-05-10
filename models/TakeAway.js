const mongoose = require("mongoose");

// Lunch Schema
const takeAwaySchema = new mongoose.Schema({
    coursename: {
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
    }
});

// Lägg till lunch
takeAwaySchema.statics.add = async function (coursename, category, price) {
    try {
        const takeAway = new this({coursename, category, price});
        await takeAway.save();
        return takeAway;
    } catch(error) {
        throw error;
    }
};


const TakeAway = mongoose.model("Take Away", takeAwaySchema);
module.exports = TakeAway;