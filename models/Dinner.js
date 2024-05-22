const mongoose = require("mongoose");

// User Schema
const dinnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    vegetarian: {
        type: Boolean,
        required: false
    },
    vegan: {
        type: Boolean,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Registrera användare
dinnerSchema.statics.add = async function (name, category, description, price, vegetarian, vegan) {
    try {
        const dinner = new this({name, category, description, price, vegetarian, vegan});
        await dinner.save();
        return dinner;
    } catch(error) {
        throw error;
    }
};


const Dinner = mongoose.model("Dinner", dinnerSchema);
module.exports = Dinner;